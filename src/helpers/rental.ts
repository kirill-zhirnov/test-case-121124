import {IRental} from '../@types/rentals';
import dayjs from 'dayjs';

export const isRentalActive = (rental: IRental): boolean => {
	const now = dayjs();

	return (now.isSame(rental.start_time) || rental.start_time.isBefore(now))
		&& (now.isSame(rental.end_time) || rental.end_time.isAfter(now))
	;
};