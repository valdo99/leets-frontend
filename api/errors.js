export class ValidationError extends Error {
  data;

  constructor(data) {
    super();
    this.name = "ValidationError";
    this.data = data;
  }
}

export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.message = message;
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super();
    this.name = "UnauthorizedError";
  }
}
