import express from 'express';
import { config } from 'dotenv';
import axios from 'axios';
import { createClient } from 'redis';

// config .env file
config();
const { PORT, REDIS_PORT } = process.env;
// initiate the express app
const app = express();

// handle buffer
app.use(express.json());
const redisPort = REDIS_PORT || 6379;
// create redis client
const redisClient = await createClient(redisPort)
	.on('error', (err) => console.log('Redis Client Error', err))
	.connect();

const api = 'https://swapi.dev/api/';

// middleware to check data from cache first
const checkCache = async (req, res, next) => {
	const key = req.query.key || 'data';
	const data = await redisClient.get(key); // get data from redis
	if (!data) return next(); // continue to next middlware
	console.log('used data from cache :)');
	return res.status(200).json({ data: JSON.parse(data) });
};

// get route
app.get('/data', checkCache, async (req, res) => {
	const key = req.query.key || 'data';
	const { data } = await axios.get(api);
	await redisClient.set(key, JSON.stringify(data));
	return res.status(200).json({ status: 'success', data });
});

// setting port
const port = PORT || 3000;

// make server listen on port
app.listen(port, () => {
	console.log(`⚡ - Server listening on port ${port}`);
});
