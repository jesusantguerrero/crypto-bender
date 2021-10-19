<template>
  <main class="w-full bg-gray-800">
    <div class="w-full bg-transparent">
      <Header />
    </div>
    <div class="bg-gray-700 content">
        <MarketGrid 
            class="max-w-5xl py-10 mx-auto md:gap-5 grid-container" 
            :items="benders"
            v-if="!state.isLoading"
            @item-clicked="sellItem"
            mode="sell"
            operation-label="Sell"
        />          
    </div>
    <SiteFooter />
  </main>
</template>

<script setup>
import Header from "./Landing/Header.vue";
import { watch, ref, reactive } from "@vue/runtime-core";
import { ethers } from "ethers";
import config from "../config";
import MarketGrid from "../components/MarketGrid.vue";
import SiteFooter from "./Landing/SiteFooter.vue";
import { useContract } from "../utils/useContract";

const { benderMarket, benderNFT, connectWallet, signer } = useContract();
let benders = ref([]);
const state = reactive({
  isLoading: true
});

const fetchMarketItems = async () => {
  const marketItems = await benderMarket.value.getMyNFTs();
  benders.value = await Promise.all(marketItems.map(async (item) => {
    const bender = await benderNFT.value.getBender(item.tokenId);
    
    return {
      itemId: item.itemId,
      name: 'Item',
      price: ethers.utils.formatEther(item.price),
      priceETH: item.price,
      tokenId: item.tokenId,
      seller: item.seller,
      owner: item.owner,
      name: bender.name,
      element: bender.element
    }
  }));

  if (signer.value.address && benderNFT.value) {
    console.log(await benderNFT.value.balanceOf(signer.value.address));

  }
  state.isLoading = false;
}

watch(() => benderMarket.value, () => {
  if (benderMarket.value) {
    fetchMarketItems();

  }
});



const sellItem = async (marketItem) => {
  await connectWallet();
  if (!marketItem.sellPrice) {
    alert("Set a price for the item");
  }
  const listPricing = await benderMarket.value.getListingPrice();
  const price = ethers.utils.parseEther(marketItem.sellPrice);
  const trx = await benderMarket.value.resellMarketItem(config.bendingAddress, marketItem.tokenId, price,  { value: listPricing });
  trx.wait();
  fetchMarketItems();
  alert("Purchase done");
}
</script>

<style lang="scss">
.grid-container {
  display: flex;
  flex-direction: column;
}

.grid-item {
  max-width: 250px;
}

.content {
  min-height: 80vh;
}

@screen md {
  .grid-container {
    display: grid;
    grid-template-columns:  repeat(4, minmax(250px, 250px));
  }

  .grid-item {
    max-width: 250px;
  }
}

html {
  @apply bg-gray-700;
}
</style>