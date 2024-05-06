interface SuccessResponse<T> {
	code: string;
	message: string;
	data: T[];
}

interface ErrorResponse {
	code: string;
	message: string;
	data: [];
}

export type ExResponseBody<T> = SuccessResponse<T> | ErrorResponse;
