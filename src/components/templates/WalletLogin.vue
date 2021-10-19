<template>
  <section class="py-5 text-center text-white">
    <h1 class="text-xl font-bold"> You need an Ethereum wallet to use CryptoBenders.</h1>
    <h2 class="mb-10 text-sm font-bold text-gray-300">Connect with one of our available wallet providers or create a new one.</h2>
    
    <div 
      target="_blank"
      @click="connectWithMetamask" 
      class="flex items-center justify-between w-full max-w-4xl px-5 mx-auto space-x-5 overflow-hidden font-bold bg-gray-800 border border-gray-700 rounded-md cursor-pointer h-14"
    >
        MetaMask: <span class="text-gray-300">if not installed it will install first</span>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed } from "@vue/runtime-core";
import MetaMaskOnboarding from '@metamask/onboarding';
import { useContract } from "../../utils/useContract";

const { connectWallet, contractState } = useContract();
const state = reactive({
  isLoading: true
});

const hasMetamask = computed(() => {
  return !!window.ethereum;
})


const connectWithMetamask = async (event) => {
  if (hasMetamask.value) {
    event.preventDefault();
    console.log(connectWallet)
    connectWallet();
  } else {
    const onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
  }
}
</script>
