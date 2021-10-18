<template>
    <div class="flex flex-col items-center justify-center px-5 py-3 bg-gray-800 border border-gray-600 rounded-lg grid-item">
        <AvatarCard
            :bender="item"
        />

        <div class="w-full mt-5">
            <div class="flex justify-between text-gray-300">
                <span class="font-semibold">Price:</span>
                <span class="font-bold">{{ item.price }} {{ currency }}</span>
            </div>
            <input class="w-full px-2 py-2 border rounded-md" placeholder="0.00 ETH" v-model="item.sellPrice" v-if="mode=='sell'">
            <AtButton class="w-full mt-2 font-bold text-white bg-roti" @click="$emit('item-clicked', item)"> {{ operationLabel }} </AtButton>
        </div>
    </div>
</template>

<script setup>
import AvatarCard from './AvatarCard.vue';
import { AtButton } from "atmosphere-ui";

defineProps({
    item: {
        type: Object,
        required: true
    },
    mode: {
        type: String,
        default: 'buy'
    },
    operationLabel: {
        type: String, 
        default: 'Buy'
    },
    currency: {
        type: String,
        default: 'ETH'
    }
})

defineEmits(['item-clicked'])
</script>

<style lang="scss">
.grid-item {
  max-width: 250px;
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
</style>