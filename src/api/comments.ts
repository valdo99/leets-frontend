import { User } from "@api/users";
import { getQueryString } from "@utils/getQueryString";

import { ApiService } from "./apiService";
import { Entity, Id, QueryParams } from "./types";

export interface Comment extends Entity {
  user: User;
  comment: string;
}

export interface NewCommentBody {
  comment: string;
}

export class CommentService extends ApiService {
  async list(song: Id, params?: QueryParams) {
    return await this.http.getPaginated<Comment[]>(
      `${this.baseUrl}/song/${song}${getQueryString(params)}`
    );
  }

  async save(id: Id, body: NewCommentBody) {
    return await this.http.post(`${this.baseUrl}/song/${id}`, body);
  }
}
