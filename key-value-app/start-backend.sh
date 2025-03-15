BACKEND_IMAGE="key-value-backend"
BACKEND_CONTAINER_NAME="backend"

source .env.db

# Connectivity
LOCAL_HOST_PORT=3000
CONTAINER_PORT=3000
source .env.network
PORT=3000

if [ "$(docker ps -aq -f name=$BACKEND_CONTAINER_NAME)" ]; then
    echo "A backend container with the name $BACKEND_CONTAINER_NAME already exists."
    echo "Thee container will be removed when stopped."
    echo "To stop the container, run docker kill mongodb"
    exit 1
fi

docker build -t $BACKEND_IMAGE \
  -f backend/Dockerfile.dev \
  backend

docker run --rm -d --name $BACKEND_CONTAINER_NAME \
  -e KEY_VALUE_DB=$KEY_VALUE_DB \
  -e MONGODB_HOST=$DB_CONTAINER_NAME \
  -e KEY_VALUE_USER=$KEY_VALUE_USER \
  -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
  -e PORT=$PORT \
  -p $LOCAL_HOST_PORT:$CONTAINER_PORT \
  -v ./backend/src:/app/src \
  --network $NETWORK_NAME \
  $BACKEND_IMAGE

