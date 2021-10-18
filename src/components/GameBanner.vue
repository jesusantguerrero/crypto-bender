<template>
  <div
    class="flex items-center justify-around px-5 py-10 rounded-md shadow-md bg-cool-gray-800"
  >
    <div class="text-left">
      <h2 class="text-2xl">Create your benders</h2>
      <h4 class="text-lg text-gray-400">
        Train and fight against other benders
      </h4>
    </div>
    <div>
      <AtButton
        class="font-bold border hover:text-white hover:bg-roti border-roti-500 text-roti"
      >
        Start the game
      </AtButton>
    </div>
  </div>
</template>

<script setup>
    import { AtButton } from "atmosphere-ui";
</script>
