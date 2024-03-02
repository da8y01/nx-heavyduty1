console.log('node env', import.meta.env.NODE_ENV)
export const environment = {
  production: import.meta.env.NODE_ENV === 'production',
  shyftRpcUrl: import.meta.env.NG_APP_SHYFT_RPC_URL,
  shyftApiUrl: import.meta.env.NG_APP_SHYFT_API_URL,
  shyftApiKey: import.meta.env.NG_APP_SHYFT_API_KEY,
  mintToken: import.meta.env.NG_APP_MINT_TOKEN,
  walletNetwork: import.meta.env.NG_APP_WALLET_NET
};
