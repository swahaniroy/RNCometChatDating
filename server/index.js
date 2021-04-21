const fastify = require("fastify")({ logger: true });
const fetch = require("node-fetch");
require("dotenv").config();

const COMETCHAT_APP_ID = process.env.COMETCHAT_APP_ID;
const COMETCHAT_API_KEY = process.env.COMETCHAT_API_KEY;

fastify.get("/", async (request, reply) => {
	return { hello: "world" };
});

fastify.post("/create-user", async (request, reply) => {
	const { uid, name, email, gender } = request.body;

	const avatar = encodeURI(`https://robohash.org/${name}`);
	const url = "https://api-us.cometchat.io/v2.0/users";
	const metadata = {
		gender,
	};

	const options = {
		method: "POST",
		body: JSON.stringify({
			uid,
			name,
			email,
			avatar,
			metadata: JSON.stringify(metadata),
		}),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			appId: COMETCHAT_APP_ID,
			apiKey: COMETCHAT_API_KEY,
		},
	};

	fetch(url, options)
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.error("error:" + err));

	return "ok";
});

const start = async () => {
	try {
		await fastify.listen(3000);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
