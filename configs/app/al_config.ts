import stripTrailingSlash from 'lib/stripTrailingSlash';

import { getEnvValue } from './utils';

// 52.206.132.165:8588 对应链：chainid：242069, http://3.84.203.161:8515 ws://3.84.203.161:8516
// 54.145.142.106:8588 对应链：chainid：12340111 http://3.84.203.161:8547  ws://3.84.203.161:8548
// 52.90.225.30:8588 对应链： chainid：12340112, http://3.84.203.161:8557  ws://3.84.203.161:8558
const apiHost = getEnvValue('NEXT_PUBLIC_L2_API_HOST');
const apiSchema = getEnvValue('NEXT_PUBLIC_L2_API_PROTOCOL') || 'https';
const apiPort = getEnvValue('NEXT_PUBLIC_L2_API_PORT');
const apiEndpoint = [
  apiSchema || 'https',
  '://',
  apiHost,
  apiPort && ':' + apiPort,
].filter(Boolean).join('');

const socketSchema = getEnvValue('NEXT_PUBLIC_L2_API_WEBSOCKET_PROTOCOL') || 'wss';
const socketEndpoint = [
  socketSchema,
  '://',
  apiHost,
  apiPort && ':' + apiPort,
].filter(Boolean).join('');
const basePath = stripTrailingSlash(getEnvValue('NEXT_PUBLIC_L2_API_BASE_PATH') || '');

const apiHostShard = getEnvValue('NEXT_PUBLIC_SHARD_API_HOST');
const apiSchemaShard = getEnvValue('NEXT_PUBLIC_SHARD_API_PROTOCOL') || 'https';
const apiPortShard = getEnvValue('NEXT_PUBLIC_SHARD_API_PORT');
const apiEndpointShard = [
  apiSchemaShard || 'https',
  '://',
  apiHostShard,
  apiPortShard && ':' + apiPortShard,
].filter(Boolean).join('');

const socketSchemaShard = getEnvValue('NEXT_PUBLIC_SHARD_API_WEBSOCKET_PROTOCOL') || 'wss';
const socketEndpointShard = [
  socketSchemaShard,
  '://',
  apiHostShard,
  apiPortShard && ':' + apiPortShard,
].filter(Boolean).join('');
const basePathShard = stripTrailingSlash(getEnvValue('NEXT_PUBLIC_SHARD_API_BASE_PATH') || '');

const apiStatsEndpoint = getEnvValue('NEXT_PUBLIC_L2_STATS_API_HOST');
const apiVisualizeEndpoint = getEnvValue('NEXT_PUBLIC_L2_VISUALIZE_API_HOST');
const apiStatsBasePath = stripTrailingSlash(getEnvValue('NEXT_PUBLIC_L2_STATS_API_BASE_PATH') || '');
const apiVisualizeBasePath = stripTrailingSlash(getEnvValue('NEXT_PUBLIC_L2_VISUALIZE_API_BASE_PATH') || '');

const apiStatsEndpointShard = getEnvValue('NEXT_PUBLIC_SHARD_STATS_API_HOST');
const apiVisualizeEndpointShard = getEnvValue('NEXT_PUBLIC_SHARD_VISUALIZE_API_HOST');
const apiStatsBasePathShard = stripTrailingSlash(getEnvValue('NEXT_PUBLIC_SHARD_STATS_API_BASE_PATH') || '');
const apiVisualizeBasePathShard = stripTrailingSlash(getEnvValue('NEXT_PUBLIC_SHARD_VISUALIZE_API_BASE_PATH') || '');

export const alNetworkConfig: any = {
  l2: {
    name: 'L2',
    host: apiHost || 'explorer-devnet.adventurelayer.xyz',
    protocol: apiSchema || 'https',
    port: apiPort || '',
    endpoint: apiEndpoint || 'https://explorer-devnet.adventurelayer.xyz',
    socket: socketEndpoint || 'wss://explorer-devnet.adventurelayer.xyz',
    basePath: basePath,
    stats_endpoint: apiStatsEndpoint,
    stats_basepath: apiStatsBasePath,
    visualize_endpoint: apiVisualizeEndpoint,
    visualize_basepath: apiVisualizeBasePath,
  },
  shard1: {
    name: 'Shard 1',
    host: apiHostShard || 'explorer-devnet.adventurelayer.xyz',
    protocol: apiSchemaShard || 'https',
    port: apiPortShard || '',
    endpoint: apiEndpointShard || 'https://explorer-devnet.adventurelayer.xyz',
    socket: socketEndpointShard || 'wss://explorer-devnet.adventurelayer.xyz',
    basePath: basePathShard,
    stats_endpoint: apiStatsEndpointShard,
    stats_basepath: apiStatsBasePathShard,
    visualize_endpoint: apiVisualizeEndpointShard,
    visualize_basepath: apiVisualizeBasePathShard,
  },
  // shard2: {
  //   host: 'explorer-devnet.adventurelayer.xyz',
  //   protocol: 'https',
  //   port: '',
  //   endpoint: 'https://explorer-devnet.adventurelayer.xyz',
  //   socket: 'wss://explorer-devnet.adventurelayer.xyz',
  //   basePath: '/shard2',
  // },
  // l2: {
  //   host: '52.206.132.165',
  //   protocol: 'http',
  //   port: '8588',
  //   endpoint: 'http://52.206.132.165:8588',
  //   socket: 'ws://52.206.132.165:8588',
  //   basePath: 'l2',
  // },
  // shard1: {
  //   host: '54.145.142.106',
  //   protocol: 'http',
  //   port: '8588',
  //   endpoint: 'http://54.145.142.106:8588',
  //   socket: 'ws://54.145.142.106:8588',
  //   basePath: 'shard1',
  // },
  // shard2: {
  //   host: '52.90.225.30',
  //   protocol: 'http',
  //   port: '8588',
  //   endpoint: 'http://52.90.225.30:8588',
  //   socket: 'ws://52.90.225.30:8588',
  //   basePath: 'shard2',
  // },
};
