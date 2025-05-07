// import type { Feature } from './types';

import stripTrailingSlash from 'lib/stripTrailingSlash';

import { alNetworkConfig } from '../al_config';
import { getEnvValue } from '../utils';

const apiEndpoint = getEnvValue('NEXT_PUBLIC_STATS_API_HOST');

const title = 'Blockchain statistics';

// const config: Feature<{ api: { endpoint: string; basePath: string } }> = (() => {
//   if (apiEndpoint) {
//     return Object.freeze({
//       title,
//       isEnabled: true,
//       api: {
//         endpoint: apiEndpoint,
//         basePath: stripTrailingSlash(getEnvValue('NEXT_PUBLIC_STATS_API_BASE_PATH') || ''),
//       },
//     });
//   }

//   return Object.freeze({
//     title,
//     isEnabled: false,
//   });
// })();
const config: any = (() => {
  if (apiEndpoint) {
    return {
      title,
      isEnabled: true,
      api: {
        endpoint: apiEndpoint,
        basePath: stripTrailingSlash(getEnvValue('NEXT_PUBLIC_STATS_API_BASE_PATH') || ''),
      },
    };
  }

  return {
    title,
    isEnabled: false,
  };
})();

export const updateStatsApi = (obj: any) => {
  // console.log('updatePublicApi', obj)
  if (!apiEndpoint || !obj) {
    return;
  }
  if (config.api) {
    config.api.endpoint = obj.stats_endpoint;
    config.api.basePath = obj.stats_basepath;
  }
  config.api = {
    endpoint: obj.stats_endpoint,
    basePath: obj.stats_basepath,
  };
};

// console.log('Load public API')
let sn: string | null = 'l2';
if (typeof window !== 'undefined') {
  sn = localStorage.getItem('al_network');
}
if (sn && sn in alNetworkConfig) {
  updateStatsApi(alNetworkConfig[sn]);
}

export default config;
