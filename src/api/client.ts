import { Locale } from "locales/available-locales";

import { AuthService } from "./auth";
import { ForbiddenError, UnauthorizedError, ValidationError } from "./errors";
import { Http } from "./http";
import { PostService } from "./posts";
import { ApiErrorResponse } from "./types";
import { UserService } from "./users";

interface Options {
  handleBadRequestError?: (error: ValidationError) => void;
  handleUnauthorizedError?: (error: UnauthorizedError) => void;
  handleForbiddenError?: (error: ForbiddenError) => void;
}

export class ApiClient {
  private options: Options;
  http: Http;

  auth: AuthService;
  users: UserService;
  posts: PostService;

  constructor(options: Options = {}) {
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

  handleResponseError(errorRes: ApiErrorResponse) {
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

  setLocaleHeader(locale: Locale) {
    this.http.instance.defaults.headers.common["x-accept-language"] = locale;
  }
}
