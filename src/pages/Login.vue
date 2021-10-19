<template>
  <main> 
    <section class="relative w-full bg-gray-800">
      <div class="w-full bg-transparent">
        <Header />
        <div class="w-full py-2 font-bold text-center text-white bg-red-400" v-if="contractState.isBadChain">
          You are in an invalid network, the valid one is:  Mumbai
        </div>
      </div>
      <div class="bg-gray-700 marketplace-content"> 
        <WalletLogin class="pt-5 mx-auto max-w-7xl"/>
      </div>
    </section>
    <SiteFooter class="relative" />
  </main>
</template>

<script setup>
import Header from "./Landing/Header.vue";
import WalletLogin from "../components/templates/WalletLogin.vue";
import SiteFooter from "./Landing/SiteFooter.vue";
import { useContract } from "../utils/useContract";


const { contractState } = useContract();
</script>

<style lang="scss">
.marketplace-content {
  min-height: 80vh;
}
</style>
