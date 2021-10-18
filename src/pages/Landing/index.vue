<template>
  <main class="w-full bg-gray-800">
    <div class="w-full bg-transparent">
      <Header />
    </div>
    <div class="py-20 text-center pb-30 bg-cool-gray-700 text-gray-50">
        <h1 class="text-4xl"> Domain the elements and conquer </h1>
        <div>
            <p class="pt-5 text-xl">
                The future of digital racehorse ownership is here. Race your way to the top and build your legacy today.
            </p>

            <div class="mt-5 space-x-3">
                <AtButton class="px-10 font-bold text-white bg-roti" @click="contract.connectWallet">
                  Start
                </AtButton>
            </div>
        </div>
    </div>
    <div class="w-full bg-cool-gray-900">
      <div class="py-20 mx-auto text-center space-y-28 max-w-7xl">
          
      </div>
    </div>
    <div class="w-full bg-cool-gray-900">
      <div class="py-5 mx-auto text-center text-white max-w-7xl">
          <h2 class="text-lg font-bold text-left">
            <i class="fas fa-store"></i>
            On Sale
          </h2>
          <Marketplace />
          <AtButton class="font-bold border hover:text-white hover:bg-roti border-roti-500 text-roti"> See the market</AtButton>
      </div>
      <div class="py-20 mx-auto text-center text-white max-w-7xl">
          <GameBanner class="mb-28"/>
          <h2 class="text-lg font-bold text-left">
            <i class="fas fa-medal"></i>
            Rankings
          </h2>
          <Ranking class="mt-5"/>
      </div>
    </div>
    <SiteFooter />
  </main>
</template>

<script setup>
import { inject } from "vue";
import { AtButton } from "atmosphere-ui";
import Header from "./Header.vue";
import SiteFooter from "./SiteFooter.vue";
import Marketplace from "../../components/templates/Marketplace.vue";
import GameBanner from "../../components/GameBanner.vue";
import Ranking from "../../components/templates/Ranking.vue";

const contract = inject('contract');

const state = {
  features: {
      row1: [
          {
              emoji: "📦",
              name: "Firebase",
          },
          {
              emoji: "📦",
              name: "TailwindCSS",
          },
          {
              emoji: "📦",
              name: "Storybook",
          }
      ],
        row2: [
              {
                  emoji: "📦",
                  name: "Atmosphere UI",
              },
              {
                  emoji: "📦",
                  name: "Vue 3",
              },
              {
                emoji: "📦",
                name: "Vue Testing Library",
                 
      }],
        row3: [
              {
                  emoji: "📦",
                  name: "Full auth flow",
                  description: "Authentication, registration, password update, password confirmation, Social logins"
              },
              {
                  emoji: "📦",
                  name: "API, Teams, Payment",
              },
              {
                emoji: "📦",
                name: "Settings",
                 
      }],
  }
};
</script>
