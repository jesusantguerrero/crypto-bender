export default {
    appName: 'Lumiere',
    home: 'dashboard',
    loginRoutes: ['login', 'register'],
    FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_APP_KEY,
    FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
    FIREBASE_SENDER_ID: import.meta.env.VITE_FIREBASE_SENDER_ID,
    PUSH_PK: import.meta.env.VITE_PUSH_PK,
    MEASUREMENT_ID: import.meta.env.VITE_MEASUREMENT_ID,
    supabaseURL: import.meta.env.VITE_SUPABASE_URL,
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    // app env
    bendingAddress: import.meta.env.VITE_BENDING_ADDRESS,
    bendingMarketAddress: import.meta.env.VITE_BENDING_MARKET_ADDRESS,
    rpcURL: import.meta.env.VITE_RPC_URL,
    mode: import.meta.env.VITE_CONTRACT_MODE || 'prod',
    chainId: import.meta.env.VITE_CHAIN_ID,
}