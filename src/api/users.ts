import { getQueryString } from "@utils/getQueryString";

import { ApiService } from "./apiService";
import { Artist } from "./artists";
import { Song } from "./songs";
import { Entity, PaginationQueryParams } from "./types";

export interface User extends Entity {
  email: string;
  username: string;
  isAdmin: boolean;
  emailConfirmation: boolean;
}

interface ChangePasswordBody {
  password: string;
  newPassword: string;
  repeatPassword: string;
}

interface UserCreateBody extends Pick<User, "email" | "username"> {
  terms: boolean;
  password: string;
  repeatPassword: string;
  referral?: string;
}

export interface TopHunter
  extends Pick<User, "_id" | "username" | "createdAt"> {
  points: number;
}

type TopHunterQueryParams = PaginationQueryParams & {
  genres?: string;
};

const nonUpdatableFields = [
  "_id",
  "createdAt",
  "updatedAt",
  "isAdmin",
  "email",
] as const;

type UserUpdateBody = Partial<Omit<User, typeof nonUpdatableFields[number]>>;

export const getUpdatableFields = (user: User) => {
  const updatableUser = { ...user };

  for (const key of Object.keys(updatableUser)) {
    if ((nonUpdatableFields as ReadonlyArray<string>).includes(key)) {
      delete updatableUser[key as keyof UserUpdateBody];
    }
  }

  return updatableUser;
};

export class UserService extends ApiService {
  async create(data: UserCreateBody) {
    return await this.http.post(this.baseUrl, data);
  }

  async read(username: string) {
    return await this.http.get<User>(`${this.baseUrl}/${username}`);
  }

  async me() {
    return await this.http.get<User>(`${this.baseUrl}/me`);
  }

  async uploads(username: string, params?: PaginationQueryParams) {
    return await this.http.getPaginated<Song[]>(
      `${this.baseUrl}/${username}/uploads${getQueryString(params)}`
    );
  }

  async huntedArtists(username: string, params?: PaginationQueryParams) {
    return await this.http.getPaginated<Artist[]>(
      `${this.baseUrl}/${username}/hunted-artists${getQueryString(params)}`
    );
  }

  async likes(username: string, params?: PaginationQueryParams) {
    return await this.http.getPaginated<Song[]>(
      `${this.baseUrl}/${username}/likes${getQueryString(params)}`
    );
  }

  async update(data: UserUpdateBody) {
    return await this.http.put<UserUpdateBody, User>(
      `${this.baseUrl}/me`,
      data
    );
  }

  async changePassword(data: ChangePasswordBody) {
    return await this.http.post(`${this.baseUrl}/change-password`, data);
  }

  async topHunters(params?: TopHunterQueryParams) {
    return await this.http.getPaginated<TopHunter[]>(
      `${this.baseUrl}/feed/top-hunters${getQueryString(params)}`
    );
  }
}
