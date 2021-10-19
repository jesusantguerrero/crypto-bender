import Web3Modal from "web3modal/dist";
import { ethers } from "ethers";
import config from "../config";
import { ref, reactive, computed, onMounted, watch } from "vue";
import AppState from "./AppState";

const web3Modal = new Web3Modal({
    cacheProvider: true,
});

export const useBlockchain = (initContract) => {
    const provider = ref(null);
    const signer = ref(null);
    const wallet = ref(null);
    const startApp = ref(initContract);

    const state = reactive({
        balance: 0,
        accounts: [],
        selectedAccount: null,
        formattedBalance: computed(() => 
            formatBalance(state.balance)
        ),
        chainId: null,
        validChain: config.chainId,
        isBadChain: computed(() => {
            const decimalChain = parseInt(state.chainId, 16);
            return state.chainId && decimalChain !== Number(config.chainId);
        }),
        currency: 'ETH',
    })
  
    watch(() => state.selectedAccount, (account) => {
        getBalance(account)
    })

    const formatBalance = () => {
        return  Number(ethers.utils.formatEther(state.balance)).toFixed(4);
    }
  
    const getBalance = async (address) => {
        state.balance = await provider.value.getBalance(address);
        AppState.provider = {
            ...AppState.provider,
            balance: formatBalance(state.balance)
        }
    }
    
    const getAccounts = async () => {
        state.accounts = await provider.value.listAccounts();
        state.selectedAccount = state.accounts[0];
    }

    watch(() => signer.value, async (signer) => {
        AppState.user = signer;
        if (signer) {
            await getAccounts()
        }
    })
    
    const onChangeAccount = async (wallet) => {
        provider.value = new ethers.providers.Web3Provider(wallet, "any");
        const user = provider.value.getSigner();
        startApp.value && await startApp.value();
        signer.value = user;
    }
    
    const connectWallet = async () => {
        wallet.value = await web3Modal.connect();
        await onChangeAccount(wallet.value);
        listenWalletEvents(wallet.value)
    }
    
    const disconnectWallet  = async () => {
        if (wallet.value && wallet.value.close) {
            await wallet.value.close()
        }
        
        web3Modal.clearCachedProvider();
        signer.value = null;
        provider.value = null;
        startApp.value && await startApp.value();
    }
    
    const listenWalletEvents = (walletProvider) => {
        walletProvider.on("accountsChanged", (accounts) => {
            onChangeAccount(walletProvider, accounts)
        });
    }
    
    const setProvider = async () => {
        provider.value = new ethers.providers.JsonRpcProvider(config.rpcURL, "any");
    }

    onMounted(async () => {
        await setProvider()
        startApp.value && await startApp.value();
        if (web3Modal.cachedProvider) {
          connectWallet();
        }
        if (ethereum) {
            state.chainId = await ethereum.request({ method: 'eth_chainId' });
            ethereum.on('chainChanged', () => {
                window.location.reload();
            })
        }
    })

    AppState.provider = {
        login: connectWallet,
        logout: disconnectWallet
    }

    return {
        connectWallet,
        disconnectWallet,
        signer,
        getAccounts,
        state,
        provider,
        startApp
    }
}