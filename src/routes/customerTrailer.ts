import {FastifyInstance} from 'fastify';
import {IRental} from '../@types/rentals';
import {getRentals, getTrailers} from '../components/dataSource';
import {isRentalActive} from '../helpers/rental';

export default function (fastify: FastifyInstance) {
	fastify.get<{
		Params: { customerId: string, trailerId: string },
	}>('/customers/:customerId/trailers/:trailerId', {
		schema: {
			params: {
				properties: {
					customerId: {type: 'string', pattern: '^[0-9]+$'},
					trailerId: {type: 'string', pattern: '^[0-9]+$'},
				}
			}
		}
	}, async (request, reply) => {
		const customerId = parseInt(request.params.customerId);
		const trailerId = parseInt(request.params.trailerId);

		const rentals = getRentals();
		const trailers = getTrailers();
		const trailer = (trailerId in trailers) ? trailers[trailerId] : null;

		if (!trailer) {
			return reply.code(404).send();
		}

		const customerTrailers = Object.values(rentals)
			.filter((rental: IRental) => rental.customer_id == customerId && isRentalActive(rental))
			.map(({trailer_id}) => trailer_id)
		;

		if (!customerTrailers.includes(trailer.asset_id)) {
			return reply.code(404).send();
		}

		reply.send(trailer);
	});
}