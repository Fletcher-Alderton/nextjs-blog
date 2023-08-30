# How to Install Immich on Portainer using NFS Shares

In this guide, we'll walk you through the process of installing Immich on Portainer while utilizing NFS shares for data storage. Immich is a collection of services that work together to deliver specific functionality. This guide assumes you have basic familiarity with Docker, Docker Compose, and Portainer.

### Prerequisites

- Docker installed on your system
- Docker Compose installed on your system
- A running instance of Portainer
- Access to an NFS server with the required shares

### Steps

#### Log in to Portainer

   Log in to your Portainer dashboard.
   
#### Create your new volumes

 Your will need to have your nfs shares and necessary folders already setup.
	 If not I have a guide to help you [here]()
	 You will need the folders
		- `/your-nf—share/immich/data` for data storage
		- `/your-nfs-share/immich/redis` for Redis storage
		- `/your-nfs—share/immich/tsdata` for Typesense storage
		- `/your-nfs—share/immich/database` for PostgreSQL storage
  Go to the “Volumes” section in Portainer
  Create a new volume
  Click the NFS toggle and input the necessary data
	 1. The ip is the ip address of your server
	 2. The location should be the complete location to your nfs share folders
 
#### Create a New Stack

   1. Navigate to the "Stacks" section in Portainer.
   2. Click "Add Stack" to create a new stack. This is where we'll define the Immich services.

#### Configure Stack Details

   1. Set the name for the stack, e.g., "immich-stack".
   2. In the "Web editor" section, paste the following Docker Compose content. This content includes the services and volume mappings required for Immich:
   3. **If your volumes are named differently you need to add them to the list of external volumes in the docker compose file**

```yaml
version: "3.8"

services:
  immich-server:
    container_name: immich_server
    image: ghcr.io/immich-app/immich-server:${IMMICH_VERSION:-release}
    command: [ "start.sh", "immich" ]
    volumes:
      - ${DATA}:/usr/src/app/upload
    env_file:
      - stack.env
    depends_on:
      - redis
      - database
      - typesense
    restart: always

  immich-microservices:
    container_name: immich_microservices
    image: ghcr.io/immich-app/immich-server:${IMMICH_VERSION:-release}
    command: [ "start.sh", "microservices" ]
    volumes:
      - ${DATA}:/usr/src/app/upload
    env_file:
      - stack.env
    depends_on:
      - redis
      - database
      - typesense
    restart: always

  immich-machine-learning:
    container_name: immich_machine_learning
    image: ghcr.io/immich-app/immich-machine-learning:${IMMICH_VERSION:-release}
    volumes:
      - ${REDIS}:/cache
    env_file:
      - stack.env
    restart: always

  immich-web:
    container_name: immich_web
    image: ghcr.io/immich-app/immich-web:${IMMICH_VERSION:-release}
    env_file:
      - stack.env
    restart: always

  typesense:
    container_name: immich_typesense
    image: typesense/typesense
    environment:
      - TYPESENSE_API_KEY=${TYPESENSE_API_KEY}
      - TYPESENSE_DATA_DIR=/data
    volumes:
      - ${TSDATA}:/data
    restart: always

  redis:
    container_name: immich_redis
    image: redis:6.2-alpine
    restart: always

  database:
    container_name: immich_postgres
    image: postgres:14-alpine
    env_file:
      - stack.env
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_DB: ${DB_DATABASE_NAME}
    volumes:
      - ${DATABASE}:/var/lib/postgresql/data
    restart: always

  immich-proxy:
    container_name: immich_proxy
    image: ghcr.io/immich-app/immich-proxy:${IMMICH_VERSION:-release}
    environment:
      - IMMICH_SERVER_URL
      - IMMICH_WEB_URL
    ports:
      - 2283:8080
    depends_on:
      - immich-server
      - immich-web
    restart: always

volumes:
  DATA:
    external: true
  immich_data:
    external: true
  REDIS:
    external: true
  immich_redis:
    external: true
  TSDATA:
    external: true
  immich_tsdata:
    external: true
  DATABASE:
    external: true
  immich_database:
    external: true
```

##### Define Environment Variables

   1. In the same "Web editor" section, scroll down to the bottom and click "Advanced view."
   3. Copy and paste the environment variables from your provided `.env` file into this new `stack.env` file.
   4. Click “Advanced view” again and input the necessary changes such as the names of the volumes you created.

```env
DB_HOSTNAME=immich_postgres
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE_NAME=immich
REDIS_HOSTNAME=immich_redis
DATABASE=immich_database
REDIS=immich_redis
TSDATA=immich_tsdata
DATA=immich_data
TYPESENSE_API_KEY=some-random-text
PUBLIC_LOGIN_PAGE_MESSAGE=Hey!
IMMICH_WEB_URL=http://immich-web:3000
IMMICH_SERVER_URL=http://immich-server:3001
IMMICH_MACHINE_LEARNING_URL=http://immich-machine-learning:3003
```

##### Deploy the Stack

   Scroll  to the bottom of the "Web editor" section and click "Deploy the stack." Portainer will use the provided Docker Compose file and environment variables to deploy the Immich services.
   
   Once the deployment is complete, Immich services will be operational on your Portainer setup, utilizing NFS shares for data storage.



### Configuring Immich

Now that your containers are up, you can configure Immich:

1. Access your Immich server's IP address and port as needed.
2. Set up required configurations and parameters.
3. Utilize the services as per your needs.

### Remote Access to Immich

If remote access is necessary, consider setting up a [VPN]() or a [reverse proxy]().

### Conclusion

This guide covered the process of installing Immich on Portainer using NFS shares. Using Portainer and Docker Compose simplifies the setup. Remember to adequately back up volumes, as they contain critical Immich data. If you plan to migrate Immich to a new server, these volumes are essential for data transfer.

Thank you for following this guide on installing Immich on Portainer. If you have any queries, feel free to open a issue on [GitHub](https://github.com/Fletcher-Alderton/Homelab-Guides)