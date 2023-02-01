/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_COIN_GECKO_API_URL: string;
    readonly VITE_CONTRACT_ADDRESS_DEPLOYER: string;
    readonly VITE_CONTRACT_VERSION: string;
    readonly VITE_MINT_COST: number;
    readonly VITE_STACKS_API_URL: string;
    readonly VITE_STACKS_CHAIN_ID: string;
    readonly VITE_STACKS_NETWORK: string;
    readonly VITE_STACKS_TESTNET_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
