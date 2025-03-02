# Adventure Layer Blockscout frontend


## Development Setup

### Prerequisites

- Node.js 20.11.0+
- NPM 10.2.4+
- Docker (for production builds)

### Local Development

1. Clone the repository:
```sh
git clone https://github.com/blockscout/frontend.git
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
```

2. Run the container:
```sh
docker run -p 3000:3000 --env-file <path-to-your-env-file> ghcr.io/blockscout/frontend:latest
```

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


