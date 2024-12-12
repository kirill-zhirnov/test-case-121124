import path from 'path';
import {IRentalById, IRentalRaw} from '../@types/rentals';
import {ITrailer, ITrailerById} from '../@types/trailers';
import dayjs from 'dayjs';

const rentals = require(process.env.RENTALS_PATH || path.resolve(__dirname, '../../data/rentals.json'));
const trailers = require(process.env.TRAILERS_PATH || path.resolve(__dirname, '../../data/trailers.json'));

let rentalsProcessed: IRentalById|null = null;
let trailersProcessed: ITrailerById|null = null;

export const getRentals = (): IRentalById => {
	if (!rentalsProcessed) {
		rentalsProcessed = rentals.reduce((out: IRentalById, rental: IRentalRaw) => ({
			...out,
			[rental.rental_id]: {
				...rental,
				start_time: dayjs(rental.start_time, 'YYYY-MM-DD'),
				end_time: dayjs(rental.end_time, 'YYYY-MM-DD'),
			}
		}), {});
	}

	return rentalsProcessed as unknown as IRentalById;
};

export const getTrailers = (): ITrailerById => {
	if (!trailersProcessed) {
		trailersProcessed = trailers.reduce((out: ITrailerById, trailer: ITrailer) => ({
			...out,
			[trailer.asset_id]: trailer
		}), {});
	}

	return trailersProcessed as unknown as ITrailerById;
};
