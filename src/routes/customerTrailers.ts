import {FastifyInstance} from 'fastify';
import DataProvider from '../components/dataProvider';
import {IRental} from '../@types/rentals';
import {getRentals, getTrailers} from '../components/dataSource';
import {ITrailer} from '../@types/trailers';
import {isRentalActive} from '../helpers/rental';

export default function (fastify: FastifyInstance) {
	fastify.get<{
		Params: { customerId: string },
		Querystring: {page: number, type?: string}
	}>('/customers/:customerId/trailers', {
		schema: {
			params: {
				properties: {
					customerId: {type: 'string', pattern: '^[0-9]+$'}
				}
			},
			querystring: {
				type: 'object',
				properties: {
					page: {
						type: 'integer',
						default: 1
					},
					type: {
						type: 'string'
					}
				},
			}
		}
	}, async (request, reply) => {
		const customerId = parseInt(request.params.customerId);

		const filteredAssetIds = Object.values(getRentals())
			.filter((rental: IRental) => rental.customer_id == customerId && isRentalActive(rental))
			.map(({trailer_id}: IRental) => trailer_id)
		;

		const dp = new DataProvider<ITrailer>(Object.values(getTrailers()));
		const data = await dp
			.setPage(request.query.page)
			.addFilter('asset_id', (fieldValue: number) => filteredAssetIds.includes(fieldValue))
			.addFilter('model', request.query.type)
			.getData()
		;

		//@ts-ignore
		reply.headers(dp.getPagingAsHeaders() || {})
			.send(data)
		;
	});
}