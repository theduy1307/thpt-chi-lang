export interface ErrorModel {
	message: string;
	code: string;
}

export interface ApiResponseModel {
	status: number;
	data: any;
	page: any;
	error: ErrorModel
}

export interface LoginResponseModel {
	status: number;
	data: any;
	page: any;
	error: any;
	access_token: any;
	roles: any;
}
