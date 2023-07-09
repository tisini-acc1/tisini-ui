import { HttpStatus, HttpStatusCodes } from './http-status.types';
interface TisiniServerExceptionInterface extends Error {
	statusCode: HttpStatusCodes;
	errors: string[];
	metaData: any;
	message: string;
}

export class TisiniServerException {
	statusCode: HttpStatusCodes;
	errors: string[];
	metaData: any;
	message: string;

	constructor(
		statusCode: HttpStatusCodes = HttpStatus.INTERNAL_SERVER_ERROR,
		errors: string[] = [],
		metaData: any = {},
		message = ''
	) {
		this.statusCode = statusCode;
		this.errors = errors;
		this.metaData = metaData;
		this.message = message;
	}

	static fromError(error: Error) {
		return new TisiniServerException(
			HttpStatus.INTERNAL_SERVER_ERROR,
			[error.message],
			{},
			error.message
		);
	}

	static fromTisiniServerException(
		tisiniServerException: TisiniServerExceptionInterface
	) {
		return new TisiniServerException(
			tisiniServerException.statusCode,
			tisiniServerException.errors,
			tisiniServerException.metaData,
			tisiniServerException.message
		);
	}

	static fromTisiniServerExceptionWithMessage(
		tisiniServerException: TisiniServerExceptionInterface,
		message: string
	) {
		return new TisiniServerException(
			tisiniServerException.statusCode,
			tisiniServerException.errors,
			tisiniServerException.metaData,
			message
		);
	}

	static fromTisiniServerExceptionWithErrors(
		tisiniServerException: TisiniServerExceptionInterface,
		errors: string[]
	) {
		return new TisiniServerException(
			tisiniServerException.statusCode,
			errors,
			tisiniServerException.metaData,
			tisiniServerException.message
		);
	}

	static fromTisiniServerExceptionWithMetaData(
		tisiniServerException: TisiniServerExceptionInterface,
		metaData: any
	) {
		return new TisiniServerException(
			tisiniServerException.statusCode,
			tisiniServerException.errors,
			metaData,
			tisiniServerException.message
		);
	}

	static fromTisiniServerExceptionWithStatus(
		tisiniServerException: TisiniServerExceptionInterface,
		status: HttpStatusCodes
	) {
		return new TisiniServerException(
			status,
			tisiniServerException.errors,
			tisiniServerException.metaData,
			tisiniServerException.message
		);
	}

	static fromTisiniServerExceptionWithStatusAndMessage(
		tisiniServerException: TisiniServerExceptionInterface,
		status: HttpStatusCodes,
		message: string
	) {
		return new TisiniServerException(
			status,
			tisiniServerException.errors,
			tisiniServerException.metaData,
			message
		);
	}

	static fromTisiniServerExceptionWithStatusAndErrors(
		tisiniServerException: TisiniServerExceptionInterface,
		status: HttpStatusCodes,
		errors: string[]
	) {
		return new TisiniServerException(
			status,
			errors,
			tisiniServerException.metaData,
			tisiniServerException.message
		);
	}

	static fromTisiniServerExceptionWithStatusAndMetaData(
		tisiniServerException: TisiniServerExceptionInterface,
		status: HttpStatusCodes,
		metaData: any
	) {
		return new TisiniServerException(
			status,
			tisiniServerException.errors,
			metaData,
			tisiniServerException.message
		);
	}

	static fromTisiniServerExceptionWithStatusAndErrorsAndMessage(
		tisiniServerException: TisiniServerExceptionInterface,
		status: HttpStatusCodes,
		errors: string[],
		message: string
	) {
		return new TisiniServerException(
			status,
			errors,
			tisiniServerException.metaData,
			message
		);
	}

	static fromTisiniServerExceptionWithStatusAndErrorsAndMetaData(
		tisiniServerException: TisiniServerExceptionInterface,
		status: HttpStatusCodes,
		errors: string[],
		metaData: any
	) {
		return new TisiniServerException(
			status,
			errors,
			metaData,
			tisiniServerException.message
		);
	}
}