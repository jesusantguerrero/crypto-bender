import Web3Modal from "web3modal/dist";
import { ethers } from "ethers";
import config from "../config";
import { ref, reactive, computed, onMounted, watch } from "vue";
import AppState from "./AppState";

const web3Modal = new Web3Modal({
    cacheProvider: true,
});

export const useContract = () => {
    const provider = ref(null);
    const signer = ref(null);
    const wallet = ref(null);

    const state = reactive({
        balance: 0,
        accounts: [],
        selectedAccount: null,
        mode: "dashboard",
        modes: ['dashboard', 'battle', 'market'],
        formattedBalance: computed(() => 
            formatBalance(state.balance)
        ),
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
    
    //  Contracts
    const benderMarket = ref(null);
    const benderNTF = ref(null);
    
    const initContract = async (signer) => {
        if (!provider.value) {
        setProvider();
        }
        const { BENDER, BENDER_MARKET } = await import(`../utils/contracts.${config.mode}.js`)
        benderMarket.value  = new ethers.Contract(
            config.bendingMarketAddress,
            BENDER_MARKET.abi, 
            signer || provider.value
        );

        benderNTF.value  = new ethers.Contract(
            config.bendingAddress,
            BENDER.abi, 
            signer || provider.value
        );
        
        if (signer) {
            await getAccounts();
        }
    }

    watch(() => signer.value, () => {
        AppState.user = signer.value;
    })
    
    const onChangeAccount = async (wallet) => {
        provider.value = new ethers.providers.Web3Provider(wallet, "any");
        const user = provider.value.getSigner();
        await initContract(user)
        signer.value = user;
    }
    
    const connectWallet = async () => {
        wallet.value = await web3Modal.connect();
        await onChangeAccount(wallet.value);
        listenProviderEvents(wallet.value)
    }
    
    const disconnectWallet  = async () => {
        if (wallet.value.close) {
            await wallet.value.close()
        }
        
        web3Modal.clearCachedProvider();
        signer.value = null;
        provider.value = null;
        initContract();
    }
    
    const listenProviderEvents = (walletProvider) => {
        walletProvider.on("accountsChanged", (accounts) => {
            onChangeAccount(walletProvider, accounts)
        });
    
        walletProvider.on("chainChanged", (chainId) => {
            if (chainId !== chainId) {
                // wrong chain
            }
            console.log(chainId);
        });
    
        walletProvider.on("connect", (info) => {
            console.log(info);
        });
    
        walletProvider.on("disconnect", (error) => {
            console.log(error);
        });
    }
    
    const setProvider = async () => {
        provider.value = new ethers.providers.JsonRpcProvider(config.rpcURL, "any");
    }

    onMounted(async () => {
        initContract();
        if (web3Modal.cachedProvider) {
          connectWallet();
        }
    })

    AppState.provider = {
        login: connectWallet,
        logout: disconnectWallet
    }

    return {
        connectWallet,
        disconnectWallet,
        contractState: state,
        signer,
        benderMarket,
        benderNTF
    }
}