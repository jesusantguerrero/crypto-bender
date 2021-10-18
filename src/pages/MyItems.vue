<template>
  <main class="w-full bg-gray-800">
    <div class="w-full bg-transparent">
      <Header />
    </div>
    <article class="bg-gray-800 content">
        <section class="py-10 mx-auto max-w-7xl">
          <h2 class="text-xl font-bold text-left text-gray-300"> My NFT's</h2>
          <MarketGrid 
              class="md:gap-5 grid-container" 
              :items="benders"
              v-if="!state.isLoading"
              @item-clicked="resellItem"
              mode="sell"
              operation-label="Sell"
          />
        </section>

        <!-- <section class="py-10 mx-auto max-w-7xl">
          <h2 class="text-xl font-bold text-left text-gray-300"> Created tokens</h2>
          <MarketGrid 
              class=" md:gap-5 grid-container" 
              :items="nonTokens"
              v-if="!state.isLoading"
              @item-clicked="sellItem"
              mode="sell"
              operation-label="Set for Sale"
          />          
        </section> -->
    </article>
    <SiteFooter />
  </main>
</template>

<script setup>
import Header from "./Landing/Header.vue";
import { useContract } from "../utils/useContract";
import { watch, ref, reactive } from "@vue/runtime-core";
import { ethers } from "ethers";
import config from "../config";
import MarketGrid from "../components/MarketGrid.vue";
import SiteFooter from "./Landing/SiteFooter.vue";

const { benderMarket, benderNTF, connectWallet, signer } = useContract();
let benders = ref([]);
const state = reactive({
  isLoading: true
});

const fetchMarketItems = async () => {
  try {
    const marketItems = await benderMarket.value.getMyNFTs();
    benders.value = await Promise.all(marketItems.map(async (item) => {
      const bender = await benderNTF.value.getBender(item.tokenId);
      
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
  
    if (signer.value.address && benderNTF.value) {
      console.log(await benderNTF.value.balanceOf(signer.value.address));
  
    }
    state.isLoading = false;
  } catch (err) {
    state.isLoading = false;
  }
}

const nonTokens = ref([]);
const fetchMyBenders = async () => {
  const tokens = await benderNTF.value.getMyBenders();
  nonTokens.value = tokens.map((item) => ({
      price: 0,
      priceETH: 0,
      tokenId: item.tokenId,
      seller: 'Me',
      owner: '',
      name: item.name,
      element: item.element
  }))
}

watch(() => benderMarket.value, () => {
  if (benderMarket.value) {
    fetchMarketItems();
    fetchMyBenders();
  }
});

const sellItem = async (token) => {
  await connectWallet();
  if (!token.sellPrice) {
    alert("Set a price for the item");
  }
  const listPricing = await benderMarket.value.getListingPrice();
  const price = ethers.utils.parseEther(token.sellPrice);
  const trx = await benderMarket.value.createMarketItem(config.bendingAddress, token.tokenId, price,  { value: listPricing });
  trx.wait();
  fetchMarketItems();
  alert("The item is on sale");
}

const resellItem = async (marketItem) => {
  await connectWallet();
  if (!marketItem.sellPrice) {
    alert("Set a price for the item");
  }
  const listPricing = await benderMarket.value.getListingPrice();
  const price = ethers.utils.parseEther(marketItem.sellPrice);
  const trx = await benderMarket.value.resellMarketItem(config.bendingAddress, marketItem.itemsId, price,  { value: listPricing });
  trx.wait();
  fetchMarketItems();
  alert("The iten is on the Marketplace");
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
  @apply bg-gray-500;
}
</style>