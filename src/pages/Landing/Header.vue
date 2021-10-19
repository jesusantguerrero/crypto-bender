<template>
 <AtSiteHeader
    title="CryptoBenders"
    :links="state.visibleLinks.value"
    link-class="font-bold text-white transition hover:text-roti hover:font-bold"
    :actions="state.actions"
    dot-class="text-roti"
    @action="contract.connectWallet()"
>

  <template v-slot:actions>
    <div class="flex items-center text-gray-400">
      <div v-if="AppState.user" class="mr-2">
        <div>
          {{ AppState.provider.balance || 0}} ETH
        </div>
      </div>
      <div>
        <AtUserButton 
          :user="AppState.user"
          :options="state.options.value"
          @logout="contract.disconnectWallet()" 
        />
      </div>
    </div>
  </template>
</AtSiteHeader>

</template>

<script setup>
import { computed, inject } from "vue";
import { AtSiteHeader, AtUserButton } from "atmosphere-ui";
import AppState from "../../utils/AppState";

const state = {
  title: "CryptoBenders",
  links: [
    {
      name: "Fighting",
      url: "https://bending-battle.vercel.app/",
    },
    {
      name: "Marketplace",
      to: { name: 'marketPlace'},
    },
    {
      name: "My Items",
      to: {name: 'myItems'},
      authenticated: true
    },
  ],
  visibleLinks: computed(() => {
    return state.links.filter((link) => {
      return !link.authenticated || (link.authenticated && AppState.user)
    })
  }),
  actions: [
    {
      name: "Want to play crypto benders?",
      url: "/login",
      class: 'text-gray-300 bg-transparent hover:bg-transparent transition'
    },
    {
      name: "Start",
      class: 'bg-roti px-10 py-2 text-white hover:bg-roti-600 transition',
      emit: true
    },
  ],
  options: computed(() => ({
    account: {
      label: "General options",
      sections: [
        ["Profile", "/settings/profile"],
        ["Favorites", "/favorites"],
        ["My Collection", "/my-items"],
        ["Favorites", "/settings"],
        [""],
        ["logout", { emit: 'logout' }],
      ]
    }
  }))
};

const contract = inject('contract');
</script>