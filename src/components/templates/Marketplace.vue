<template>
  <section class="py-5">
    <div class="flex justify-between text-lg text-gray-300" v-if="showFilter">
      <div> {{ benders.length }} results</div>
      <div>
        <select name="" id=""></select>
        <select name="" id=""></select>
        <div></div>
      </div>
    </div>
    
    <div v-if="state.isLoading">
      <i class="fa fa-spin fa-circle-notch"></i>
    </div>
    
    <MarketGrid 
      v-else
      class="w-full py-10 md:gap-5 grid-container" 
      :items="benders"
      @item-clicked="buyItem"
    />  
  </section>
</template>

<script setup>
import { watch, ref, reactive, nextTick, inject } from "@vue/runtime-core";
import { ethers } from "ethers";
import config from "../../config";
import { useContract } from "../../utils/useContract";
import MarketGrid from "../MarketGrid.vue";

defineProps({
  showFilter: {
    type: Boolean,
    
  }
});

const { benderMarket, benderNFT, Market, Cockfighter, connectWallet } = useContract();
let benders = ref([]);
const state = reactive({
  isLoading: true
});

const fetchMarketItems = async () => {
  const marketItems = await benderMarket.value.getMarketItems();
  benders.value = await Promise.all(marketItems.map(async (item) => {
    const bender = await benderNFT.value.getBender(item.tokenId.toNumber());
    
    
    return {
      itemId: item.itemId,
      price: ethers.utils.formatEther(item.price),
      lastPrice: ethers.utils.formatEther(item.lastPrice),
      priceETH: item.price,
      tokenId: item.tokenId,
      seller: item.seller,
      owner: item.owner,
      name: bender.name,
      element: bender.element
    }
  })).catch(err => {
    console.log(err)
  }).finally(() => {
    state.isLoading = false;
  });

  let roosters = await Market.value.getMarketItems();
  roosters = await Promise.all(roosters.map(async(item) => {
    const tokenURI = await Cockfighter.value.tokenURI(item.tokenId.toNumber());
    const bender = await fetch(tokenURI).then(data => data.json()).then( data => data);
    return {
      itemId: item.itemId,
      price: ethers.utils.formatEther(item.price),
      lastPrice: ethers.utils.formatEther(item.lastPrice),
      priceETH: item.price,
      tokenId: item.tokenId,
      seller: item.seller,
      owner: item.owner,
      name: bender.name,
      image: bender.image,
      attributes: bender.attributes,
      element: bender.element
    }
  }))

  benders.value.push(...roosters);
}

watch(() => benderMarket.value, () => {
  if (benderMarket.value) {
      fetchMarketItems();
    }
}, { immediate: true });


const buyItem = async (marketItem) => {
  connectWallet();
  const trx = await benderMarket.value.createMarketSale(config.bendingAddress, marketItem.itemId, { value: marketItem.priceETH });
  trx.wait();
  nextTick(() => {
    fetchMarketItems();
    alert("Purchase done");
  })
}
</script>
