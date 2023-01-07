import { User } from "@api/users";
import { getQueryString } from "@utils/getQueryString";

import { ApiService } from "./apiService";
import { Entity, QueryParams } from "./types";

export interface AssetCommentSong extends Entity {
  title: string;
  image: string;
}

export interface AssetComment extends Entity {
  post: AssetCommentSong;
  comment?: string;
}

export interface Notification extends Entity {
  user_from: User;
  asset: AssetComment;
  asset_type: string;
  status: number;
}

export class NotificationsServies extends ApiService {
  async list(params?: QueryParams) {
    return await this.http.getPaginated<Notification[]>(
      `${this.baseUrl}/users/me/notifications${getQueryString(params)}`
    );
  }
  async hasNotifications() {
    return await this.http.get<number>(
      `${this.baseUrl}/users/me/notifications/new`
    );
  }
}
