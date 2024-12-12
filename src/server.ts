import Fastify from 'fastify';
import customerTrailers from './routes/customerTrailers';
import customerTrailer from './routes/customerTrailer';
import cors from '@fastify/cors';
import ownerTrailers from './routes/ownerTrailers';

(async () => {
	const fastify = Fastify({
		logger: process.env.NODE_ENV === 'development'
	});
	await fastify.register(cors, {origin: true});

	customerTrailers(fastify);
	customerTrailer(fastify);
	ownerTrailers(fastify);

	fastify.listen({host: '0.0.0.0', port: 3000}, (err, address) => {
		if (err) {
			throw err;
		}

		console.log(`Server started on ${address}`);
	});
})();