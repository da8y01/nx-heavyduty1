// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  shyftApiUrl: 'https://api.shyft.to',
  shyftApiKey: import.meta.env.NG_APP_SHYFT_API_KEY,
  mintToken: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
  walletNetwork: 'devnet'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
