import { getQueryString } from "../utils/getQueryString";

import { ApiService } from "./apiService";
import { Artist } from "./artists";
import { Entity, Id, PaginationQueryParams, QueryParams } from "./types";
import { TopHunter, User } from "./users";

export interface Post extends Entity {
  title: string;
  image: string;
  preview_url: string;
  spotify_id: string;
  hunter: User;
  artist: Artist;
  status: "CREATED" | "UPLOADED" | "ONLINE";
  likes: number;
  isLiked: number;
  partialLikes: number;
  playcount?: number;
}

interface isPostLiked {
  isLiked: boolean;
}

type FeedQueryParams = PaginationQueryParams & {
  date?: string;
};

type SearchParams = PaginationQueryParams & {
  query: string;
};

export interface UserLike extends Entity {
  user: TopHunter;
}

export class PostService extends ApiService {
  async read(id: Id) {
    return await this.http.get<Post>(`${this.baseUrl}/post/${id}`);
  }

  async list() {
    return await this.http.get<Post[]>(this.baseUrl);
  }

  async like(postId: Id) {
    return await this.http.post(`${this.baseUrl}/${postId}/like`);
  }

  async getLikes(postId: Id, params: QueryParams = {}) {
    return await this.http.getPaginated<UserLike[]>(
      `${this.baseUrl}/${postId}/likes${getQueryString(params)}`
    );
  }

  async unlike(postId: Id) {
    return await this.http.post(`${this.baseUrl}/${postId}/dislike`);
  }

  async feed(params: FeedQueryParams = {}) {
    return await this.http.getPaginated<Post[]>(
      `${this.baseUrl}/feed${getQueryString(params)}`
    );
  }

  async upload(spotifyId: string) {
    return await this.http.post<{ id: string }>(`${this.baseUrl}/upload`, {
      id: spotifyId,
    });
  }

  async uploadPreview(spotifyId: string) {
    return await this.http.post<{ id: string }, Post>(
      `${this.baseUrl}/upload/preview`,
      {
        id: spotifyId,
      }
    );
  }

  async isPostLiked(postId: Id) {
    return await this.http.get<isPostLiked>(
      `${this.baseUrl}/post/is-liked/${postId}`
    );
  }

  async search(params: SearchParams) {
    return await this.http.getPaginated<Post[]>(
      `${this.baseUrl}/search${getQueryString(params)}`
    );
  }
}
