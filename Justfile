# Help
default:
    just --list

build:
    npm run build

run:
    npm run dev

test:
    npm run test

lint:
    npm run lint

format:
    npm run format

docker-build:
    . ./.env && \
    docker build -t ranckosolutionsinc/svelte-password-manager:latest \
      --build-arg DATABASE_URL="$DATABASE_URL" \
      --build-arg DATABASE_AUTH_TOKEN="$DATABASE_AUTH_TOKEN" .
    
docker-run:
    . ./.env
    docker run -d \
        -p 5173:5173 \
        -e DATABASE_URL=$DATABASE_URL \
        -e DATABASE_AUTH_TOKEN=$DATABASE_AUTH_TOKEN \
        --name svelte-password-manager \
        ranckosolutionsinc/svelte-password-manager:latest

docker-stop:
    docker stop svelte-password-manager

docker-rm:
    docker rm svelte-password-manager

log:
    docker logs svelte-password-manager -f 

docker-clean:
    docker stop svelte-password-manager
    docker rm svelte-password-manager -f 
    docker rmi ranckosolutionsinc/svelte-password-manager:latest -f

      