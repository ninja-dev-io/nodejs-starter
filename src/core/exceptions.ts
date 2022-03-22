export class BaseError extends Error {
  
  public readonly message!: string;
  public readonly status!: number;

  constructor(message: string, status: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.status = status;
    Error.captureStackTrace(this);
  }
}

export class ServerError extends BaseError {

  constructor(message = 'internal server error', status = 500) {
    super(message, status);
  }

}

export class NotAuthorizedError extends BaseError {

  constructor(message = 'not authorized to access the requested resource', status = 401) {
    super(message, status);
  }

}

export class ForbiddenError extends BaseError {

  constructor(message = 'access to the resource has been forbidden by the server', status = 403) {
    super(message, status);
  }

}

export class BadRequestError extends BaseError {

  constructor(message = 'bad request', status = 400) {
    super(message, status);
  }

}