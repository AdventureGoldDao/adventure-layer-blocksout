# Adventure Layer Blockscout frontend

## Development Setup

### Prerequisites

- Node.js 20.11.0+
- NPM 10.2.4+
- Docker (for production builds)

### Local Development

1. Clone the repository:
```sh
git clone git@github.com:AdventureGoldDao/adventure-layer-blocksout.git frontend
cd frontend
```

2. Install dependencies:
```sh
yarn install
```

3. Configure environment:
   - Create `.env.local` file with required variables from docs/ENVS.md
   - Or use predefined configurations from `/configs/envs/`

4. Start development server:
```sh
# With custom configuration
yarn dev

# With predefined configuration
yarn dev:preset <config_preset_name>
```

## Production Deployment

### Using Docker

1. Build the image:
```sh
yarn build:docker

# Which execute the command below
docker build --build-arg GIT_COMMIT_SHA=$(git rev-parse --short HEAD) --build-arg GIT_TAG=$(git describe --tags --abbrev=0) -t blockscout-frontend:local ./

# If we use .env.al as env preset ,add the following parameters
--build-arg ENVS_PRESET=al
```

2. Run the container:
```sh
docker run -p 3000:3000 --env-file <path-to-your-env-file> ghcr.io/blockscout/frontend:latest

# We will run docker using build image
docker run -p 8535:3000 --env-file .env.al blockscout-frontend:local

# The exposed port 8535 should be changed as real ports are.
```

3. Set env parameters

Create an environment file which could be named as `.env.al`

Our explorer support config two and more chains for view

```sh
......
# Must Set default chain api, better same as L2 Backend API
NEXT_PUBLIC_API_HOST=explorer-devnet.adventurelayer.xyz
# NEXT_PUBLIC_API_PORT=
NEXT_PUBLIC_API_BASE_PATH=/l2
NEXT_PUBLIC_API_PROTOCOL=https
NEXT_PUBLIC_API_WEBSOCKET_PROTOCOL=wss
NEXT_PUBLIC_STATS_API_HOST=http://explorer-devnet.adventurelayer.xyz:8080
NEXT_PUBLIC_VISUALIZE_API_HOST=http://explorer-devnet.adventurelayer.xyz:8081
NEXT_PUBLIC_STATS_BASE_PATH=/l2/stats
NEXT_PUBLIC_VISUALIZE_BASE_PATH=/l2/visualize

# Set L2 Backend API
NEXT_PUBLIC_L2_API_HOST=192.168.1.100
NEXT_PUBLIC_L2_API_PROTOCOL=http
NEXT_PUBLIC_L2_API_PORT=
NEXT_PUBLIC_L2_API_WEBSOCKET_PROTOCOL=ws
NEXT_PUBLIC_L2_API_BASE_PATH=/l2
NEXT_PUBLIC_L2_STATS_API_HOST=http://192.168.1.100:8080
NEXT_PUBLIC_L2_VISUALIZE_API_HOST=http://192.168.1.100:8081
# If route with basepath
NEXT_PUBLIC_L2_STATS_BASE_PATH=/l2/stats
NEXT_PUBLIC_L2_VISUALIZE_BASE_PATH=/l2/visualize

# Set Shard Backend API
NEXT_PUBLIC_SHARD_API_HOST=192.168.1.100
NEXT_PUBLIC_SHARD_API_PROTOCOL=http
NEXT_PUBLIC_SHARD_API_PORT=
NEXT_PUBLIC_SHARD_API_WEBSOCKET_PROTOCOL=ws
NEXT_PUBLIC_SHARD_API_BASE_PATH=/shard
NEXT_PUBLIC_SHARD_STATS_API_HOST=http://192.168.1.100:8080
NEXT_PUBLIC_SHARD_VISUALIZE_API_HOST=http://192.168.1.100:8081
# If route with basepath set 
NEXT_PUBLIC_SHARD_STATS_BASE_PATH=/shard/stats
NEXT_PUBLIC_SHARD_VISUALIZE_BASE_PATH=/shard/visualize
```

When user change current chain, `configs/app/al_config.ts` would be update api config from env to storage, then the frontend switch to target chain.

A dev env could be found from [adventure-layer-config](https://github.com/AdventureGoldDao/adventure-layer-config/blob/main/explorer-frontend/.env.al)

### Using Kubernetes

The project includes Helm charts for Kubernetes deployment. See `/deploy/helmfile.yaml` for configuration details.

## Testing

```sh
# Run Jest unit tests
yarn test:jest

# Run Playwright component tests
yarn test:pw:local    # Local environment
yarn test:pw:docker   # Docker environment
```


