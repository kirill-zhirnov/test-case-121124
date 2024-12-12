
export enum TFilterType {
	eq = 'eq',
	like = 'like'
}

export type TFilterValue = string|number|((fieldValue: any, rowValue: any, index: number) => boolean)|undefined;

export interface IHeaderPagination {
	'X-Paging-Total-Rows': number;
	'X-Paging-Total-Pages': number;
	'X-Paging-Per-Page': number;
	'X-Paging-Page': number;
}

export interface IDataProvider<DT extends {[key: string]: any}> {
	setPerPage: (size: number) => IDataProvider<DT>,
	setPage: (page: number) => IDataProvider<DT>,
	addFilter: (field: string, value: TFilterValue, type?: TFilterType|null) => IDataProvider<DT>,
	getData: () => Promise<DT[]>;
	getPagingAsHeaders: () => IHeaderPagination|null;
}