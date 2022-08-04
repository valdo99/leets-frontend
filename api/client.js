import Http from "./http";
import { ForbiddenError, UnauthorizedError, ValidationError } from "./errors";
import AuthService from "./auth";
import UserService from "./users";
import PostService from "./posts";

class ApiClient {
  options;

  http;

  auth;

  users;

  posts;

  constructor(options = {}) {
    this.options = options;

    this.http = new Http({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      // eslint-disable-next-line comma-dangle
      handleResponseError: this.handleResponseError.bind(this),
      headers: {},
    });

    this.auth = new AuthService(this, "/auth");
    this.users = new UserService(this, "/users");
    this.posts = new PostService(this, "/posts");
  }

  handleResponseError(errorRes) {
    const { status, data } = errorRes;
    let error;

    switch (status) {
      case 400:
        error = new ValidationError(data.data);

        if (this.options.handleBadRequestError) {
          this.options.handleBadRequestError(error);
        }

        throw error;
      case 401:
        error = new UnauthorizedError();

        if (this.options.handleUnauthorizedError) {
          this.options.handleUnauthorizedError(error);
        }

        throw error;
      case 403:
        error = new ForbiddenError(data.message);

        if (this.options.handleForbiddenError) {
          this.options.handleForbiddenError(error);
        }

        throw error;
      default:
        throw errorRes;
    }
  }
}

export default ApiClient;
