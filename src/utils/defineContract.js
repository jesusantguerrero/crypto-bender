import { ethers } from "ethers";
import config from "../config";
import { ref } from "vue";
import { useBlockchain } from "./useBlockchain";


export const defineContract = () => {
    //  Contracts
    const benderMarket = ref(null);
    const benderNFT = ref(null);
    const userMarket = ref(null);
    const userNFT = ref(null);
    const Market = ref(null);
    const Cockfighter = ref(null);
    // blockchain
    const { connectWallet, disconnectWallet, signer, state, startApp, provider } = useBlockchain();

    const initContract = async (signer) => {
        const { BENDER, BENDER_MARKET, MARKET, NFT } = await import(`../utils/contracts.${config.mode}.js`)
        benderMarket.value  = new ethers.Contract(
            config.bendingMarketAddress,
            BENDER_MARKET.abi, 
            provider.value
        );

        benderNFT.value  = new ethers.Contract(
            config.bendingAddress,
            BENDER.abi, 
            provider.value
        );

        userMarket.value  = new ethers.Contract(
            config.bendingMarketAddress,
            BENDER_MARKET.abi, 
            signer || provider.value
        );

        userNFT.value  = new ethers.Contract(
            config.bendingAddress,
            BENDER.abi, 
            signer || provider.value
        );
        
        console.log(config.marketAddress, config, "Hola")
        Cockfighter.value = new ethers.Contract(
            config.roosterAddress,
            NFT.abi,
            provider.value
        )

        Market.value = new ethers.Contract(
            config.marketAddress,
            MARKET.abi,
            provider.value
        )
    }

    startApp.value = initContract;



    
    return {
        connectWallet,
        disconnectWallet,
        contractState: state,
        signer,
        benderMarket,
        benderNFT,
        userMarket,
        userNFT,
        Market,
        Cockfighter
    }
}