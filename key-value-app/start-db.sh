MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0.11-ubuntu2204"

source .env.db
#root credentials
ROOT_USER="root_user"
ROOT_PASSWORD="root_password"
#key-value credentials
KEY_VALUE_DB="key-value-db"
KEY_VALUE_USER="key-value-user"
KEY_VALUE_PASSWORD="key-value-password"

# Connectivity
LOCAL_HOST_PORT=27017
CONTAINER_PORT=27017
source .env.volume
VOLUME_CONTAINER_PATH="/data/db"
source .env.network

source setup.sh

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "A container with the name $CONTAINER_NAME already exists."
    echo "Thee container will be removed when stopped."
    echo "To stop the container, run docker kill mongodb"
    exit 1
fi

docker run --rm -d --name $CONTAINER_NAME \
  -e MONGODB_INITDB_ROOT_USERNAME=$ROOT_USER \
  -e MONGODB_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
  -e KEY_VALUE_DB=$KEY_VALUE_DB \
  -e KEY_VALUE_USER=$KEY_VALUE_USER \
  -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
  -p $LOCAL_HOST_PORT:$CONTAINER_PORT \
  -v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
  -v ./db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongodb-init.js:ro \
  --network $NETWORK_NAME \
  $MONGODB_IMAGE:$MONGODB_TAG

