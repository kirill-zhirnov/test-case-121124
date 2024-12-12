import {IDataProvider, IHeaderPagination, TFilterType, TFilterValue} from '../@types/dataProvider';

export default class DataProvider<DT extends {[key: string]: any}> implements IDataProvider<DT> {
	protected perPage: number = 10;
	protected page: number = 1;
	protected filters: {field: string, value: TFilterValue, type: TFilterType|null}[] = [];

	protected totalRows: number|undefined;
	protected totalPages: number|undefined;

	constructor(
		protected data: DT[]
	) {
	}

	async getData() {
		this.applyFilters();
		this.applyPagination();

		return this.data;
	}

	addFilter(field: string, value: TFilterValue, type: TFilterType|null = null) {
		this.filters.push({field, value, type});

		return this;
	}

	setPerPage(perPage: number) {
		this.perPage = perPage;
		return this;
	}

	setPage(page: number) {
		this.page = page;
		return this;
	}

	getPagingAsHeaders(): IHeaderPagination|null {
		if (!this.perPage || this.totalRows === undefined) {
			return null;
		}

		return {
			'X-Paging-Total-Rows': this.totalRows!,
			'X-Paging-Total-Pages': this.totalPages!,
			'X-Paging-Per-Page': this.perPage,
			'X-Paging-Page': this.page
		};
	}

	protected applyPagination() {
		if (!this.perPage) {
			return;
		}

		this.totalRows = this.data.length;
		this.totalPages = Math.ceil(this.data.length / this.perPage);

		if (this.page < 1 || this.page > this.totalPages) {
			this.page = 1;
		}

		const start = (this.page - 1) * this.perPage;
		const end = (this.page) * this.perPage;

		this.data = this.data.slice(start, end);
	}

	protected applyFilters() {
		this.data = this.data.filter(this.filterRow.bind(this));
	}

	protected filterRow(value: DT, index: number): boolean {
		for (const filter of this.filters) {
			const fieldValue = (filter.field in value) ? value[filter.field] : null;

			if (typeof filter.value === 'function') {
				if (!filter.value.call(null, fieldValue, value, index)) {
					return false;
				}
			} else if (filter.value !== undefined) {
				if (filter.type === TFilterType.like) {
					if (!fieldValue || !String(fieldValue).toLowerCase().includes(String(filter.value).toLowerCase())) {
						return false;
					}
				} else {
					if (fieldValue != filter.value) {
						return false;
					}
				}
			}
		}

		return true;
	}
}