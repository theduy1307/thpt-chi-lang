export class QueryResultsModel {
	// fields
	data: any[];
	items: any[];
	page: any;
	totalCount: number;
	errorMessage: string;
	error: any;
	status: number;

	constructor(_items: any[] = [], _totalCount: number = 0, _errorMessage: string = '') {
		this.items = this.data = _items;
		this.totalCount = _totalCount;
	}
}

