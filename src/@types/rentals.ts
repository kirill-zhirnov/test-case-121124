import {Dayjs} from 'dayjs';

export interface IRentalRaw {
	rental_id: number,
	trailer_id: number,
	customer_id: number,
	start_time: string,
	end_time: string
}

export interface IRental extends Omit<IRentalRaw, 'start_time' | 'end_time'> {
	start_time: Dayjs,
	end_time: Dayjs
}

export interface IRentalById {
	[rental_id: number]: IRental
}
