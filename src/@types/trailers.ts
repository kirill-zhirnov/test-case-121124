export interface ITrailer {
	asset_id: number,
	owner_id: number,
	model: string,
	vin: string
}

export interface ITrailerById {
	[asset_id: number]: ITrailer
}