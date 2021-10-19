<template>
  <section class="py-1">  
    <div v-if="state.isLoading">
      <i class="fa fa-spin fa-circle-notch"></i>
    </div>
  
    <div class="space-y-2">
      <BenderSmallCard  v-for="bender in state.benders" :bender="bender" />
    </div>
  </section>
</template>

<script setup>
import { watch, reactive } from "vue";
import { useContract } from "../../utils/useContract";
import BenderSmallCard from "../BenderSmallCard.vue";

defineProps({
  showFilter: {
    type: Boolean,
    
  }
});

const { benderNFT } = useContract();
const state = reactive({
  isLoading: true,
  benders: []
});

const fetchMarketItems = async () => {
  try {
    const benders = await benderNFT.value.getBenders();

    state.benders = benders.map(bender => {  
      return {
        ...bender,
        tokenId: bender.tokenId,
        name: bender.name,
        element: bender.element
      }
    }).sort((a, b) =>  b.HP - a.HP);
  
  } finally {
    state.isLoading = false
  }
}

watch(() => benderNFT.value, () => {
  if (benderNFT.value) {
      fetchMarketItems();
    }
}, { immediate: true });
</script>
