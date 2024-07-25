import { createClient } from "redis";

const redisUrl = process.env.REDIS_CONNECTION_STRING;

if (!redisUrl) {
  throw new Error("REDIS_CONNECTION_STRING is not defined");
}

const redisClient = createClient({
  url: redisUrl,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  await redisClient.connect();
})();

export default redisClient;
