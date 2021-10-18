<script setup>
import { computed } from "@vue/reactivity";;

const props = defineProps({
    bender: {
        type: Object,
        required: true,
    },
    isSelected: {
        type: Boolean,
        default: false,
    }
})

const element = props.bender.element.toLowerCase();

const nationColor = computed(() => {
    const elements = {
        air: 'bg-blue-300 border-blue-200',
        fire: 'bg-fire-500 border-fire-400',
        earth: 'bg-green-500 border-green-400',
        water: 'bg-blue-600 border-blue-500'
    }
    return elements[element]
})

const bgImages = computed(() => {
    const bgImages = {
        fire: '/fire-bg.jpg',
        earth: '/earth-bg.jpg',
        air: '/air-bg.jpg',
        water: '/water-bg.jpg',
    };

    const bgImage = bgImages[element]

    return {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
    }
})

const bendingIcon = computed(() => {
    const bgImages = {
        fire: 'fas fa-fire',
        water: 'fas fa-water',
        air: 'fas fa-wind',
        earth: 'fas fa-feather-alt',
    };

    return bgImages[element]
})

const orbeColor = computed(() => {
    const elements = {
        air: 'bg-blue-400 border-gray-200',
        fire: 'bg-fire-400 border-fire-200',
        earth: 'bg-green-400 border-roti-300',
        water: 'bg-blue-400 border-blue-700'
    }
    return elements[element]
})
</script>

<template>
<div class="flex items-center justify-between w-full space-x-5 overflow-hidden bg-gray-800 border border-gray-700 rounded-md h-14">
    <div class="flex items-center px-5 space-x-2">
        <span title="Nation" class="flex items-center justify-center text-sm text-white border-2 border-white rounded-full w-9 h-9 right-2 bottom-2" :class="[orbeColor]">
            <i :class="bendingIcon" />
        </span>
        <div> <span class="font-bold">{{bender.name }}</span> - <span class="capitalize">{{bender.element}}</span>Bender </div>
    </div>
    <div class="flex items-center space-x-5">
        <div> <span class="font-bold">{{bender.health }} </span> health | <span class="capitalize">{{bender.HP}}</span> Exp. </div>
        <div> <span class="font-bold text-roti">{{bender.record.wins }}</span> Wins / <span class="font-bold capitalize text-fire-100">{{bender.record.losses}}</span> losses</div>
        <div :style="bgImages" class="w-5 bg-red-300 h-14 opacity-40">
        </div>
    </div>
</div>
</template>
