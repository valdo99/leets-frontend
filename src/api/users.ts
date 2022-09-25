import { ApiService } from "./apiService";
import { Post } from "./posts";
import { Entity } from "./types";

export interface User extends Entity {
  name: string;
  surname: string;
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

interface UserCreateBody
  extends Pick<User, "name" | "surname" | "email" | "username"> {
  terms: boolean;
  password: string;
  repeatPassword: string;
}

const nonUpdatableFields = [
  "_id",
  "createdAt",
  "updatedAt",
  "isAdmin",
  "email",
] as const;

type UserUpdateBody = Omit<User, typeof nonUpdatableFields[number]>;

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
    return await this.http.get(`${this.baseUrl}/${username}`);
  }

  async me() {
    return await this.http.get<User>(`${this.baseUrl}/me`);
  }

  async uploads(username: string) {
    return await this.http.get<Post[]>(`${this.baseUrl}/${username}/uploads`);
  }

  async likes(username: string) {
    return await this.http.get<Post[]>(`${this.baseUrl}/${username}/likes`);
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
}
