import { Locale } from "locales/available-locales";

import { ArtistService } from "./artists";
import { AuthService } from "./auth";
import { CommentService } from "./comments";
import { ForbiddenError, UnauthorizedError, ValidationError } from "./errors";
import { GenreService } from "./genres";
import { Http } from "./http";
import { NotificationService } from "./notifications";
import { SongService } from "./songs";
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
  songs: SongService;
  artists: ArtistService;
  comments: CommentService;
  notifications: NotificationService;
  genres: GenreService;

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
    this.songs = new SongService(this, "/posts");
    this.artists = new ArtistService(this, "/artists");
    this.comments = new CommentService(this, "/comments");
    this.notifications = new NotificationService(this, "");
    this.genres = new GenreService(this, "/genres");
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
