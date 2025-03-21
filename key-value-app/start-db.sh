MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0.11-ubuntu2204"

source .env.db
#root credentials
ROOT_USER="root_user"
ROOT_PASSWORD="root_password"
#key-value credentials


# Connectivity
LOCAL_HOST_PORT=27017
CONTAINER_PORT=27017
source .env.network

#Storage
source .env.volume
VOLUME_CONTAINER_PATH="/data/db"

source setup.sh

if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
    echo "A container with the name $DB_CONTAINER_NAME already exists."
    echo "The container will be removed when stopped."
    echo "To stop the container, run docker kill mongodb"
    exit 1
fi

docker run --rm -d --name $DB_CONTAINER_NAME \
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

