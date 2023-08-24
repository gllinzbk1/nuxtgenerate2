// import { PiniaSharedState } from 'pinia-shared-state';

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.$pinia.use(PiniaSharedState({
//     enable: true,
//   }));
// });
import type { StoreGeneric } from 'pinia'

const storeMap = new Map<string, StoreGeneric>()

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(({ store: piniaStore }) => {
    storeMap.set(piniaStore.$id, piniaStore)
  });
});


