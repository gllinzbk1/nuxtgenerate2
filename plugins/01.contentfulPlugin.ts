// import {createClient} from 'contentful'

// const config = {
//     space: '9nj652pzdj7s',
//     accessToken: '-WJLajjupgnO0O7Fwf_ViCScvmAJ8mUF_-n0PxBIpg8',
//   };

// export default defineNuxtPlugin(() => {
//     return {
//         provide: {
//             contentfulClient :createClient({
//                 space: '9nj652pzdj7s',
//                 accessToken: '-WJLajjupgnO0O7Fwf_ViCScvmAJ8mUF_-n0PxBIpg8',
//               })
//             }
//         }

// })

import { createClient } from "contentful";
import contentful from 'contentful'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const createClientFunc = process.env.NODE_ENV === 'development' ? createClient : contentful.createClient

  const client = createClientFunc({
    space: '9nj652pzdj7s',
    accessToken: '-WJLajjupgnO0O7Fwf_ViCScvmAJ8mUF_-n0PxBIpg8',
  });

  return {
    provide: {
      contentfulClient: client,
    },
  };
});

// import  contentful from "contentful";

// export default defineNuxtPlugin((nuxtApp) => {

//   // use default environment config for convenience
//   // these will be set via `env` property in nuxt.config.js
//   const contentfulConfig = {
//     space: '9nj652pzdj7s',
//     accessToken: '-WJLajjupgnO0O7Fwf_ViCScvmAJ8mUF_-n0PxBIpg8',
//   };
  

//   return {
//     provide: {
//       contentfulClient: contentful.createClient(contentfulConfig)
//     }
//   };
// });