import {FastifyInstance} from 'fastify';
import DataProvider from '../components/dataProvider';
import {getTrailers} from '../components/dataSource';
import {ITrailer} from '../@types/trailers';
import {TFilterType} from '../@types/dataProvider';

export default function (fastify: FastifyInstance) {
	fastify.get<{
		Params: { ownerId: string },
		Querystring: {page: number, vin?: string}
	}>('/owners/:ownerId/trailers', {
		schema: {
			params: {
				properties: {
					ownerId: {type: 'string', pattern: '^[0-9]+$'}
				}
			},
			querystring: {
				type: 'object',
				properties: {
					page: {
						type: 'integer',
						default: 1
					},
					vin: {
						type: 'string'
					}
				},
			}
		}
	}, async (request, reply) => {
		const ownerId = parseInt(request.params.ownerId);

		const dp = new DataProvider<ITrailer>(Object.values(getTrailers()));
		const data = await dp
			.setPage(request.query.page)
			.addFilter('owner_id', ownerId)
			.addFilter('vin', request.query.vin, TFilterType.like)
			.getData()
		;

		//@ts-ignore
		reply.headers(dp.getPagingAsHeaders() || {})
			.send(data)
		;
	});
}