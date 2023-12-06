# redis-expressjs
test redis client

**install dependencies**
yarn install

**start**
yarn run dev --> dev environment
yarn start --> production environment

**.ENV**
add .env file in the project root and insert in it
1. PORT ==> port to run the server on (default = 3000)
2. REDIS_PORT ==> redis client port to work on (default = 6379)

**apis**
add key to store in redis cache (default ==> key="data")
http://localhost:3000/data?key=
