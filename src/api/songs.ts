import { getQueryString } from "../utils/getQueryString";

import { ApiService } from "./apiService";
import { Artist } from "./artists";
import { Entity, Id, PaginationQueryParams, QueryParams } from "./types";
import { TopHunter, User } from "./users";

export interface Song extends Entity {
  title: string;
  image: string;
  preview_url: string | null;
  spotify_id: string;
  hunter: User;
  artist: Artist;
  status: "CREATED" | "UPLOADED" | "ONLINE";
  likes: number;
  isLiked: number;
  partialLikes: number;
  playcount?: number;
}

interface IsSongLiked {
  isLiked: boolean;
}

type FeedQueryParams = PaginationQueryParams & {
  date?: string;
  genres?: string;
};

type SearchParams = PaginationQueryParams & {
  query: string;
};

export interface UserLike extends Entity {
  user: TopHunter;
}

export class SongService extends ApiService {
  async read(id: Id) {
    return await this.http.get<Song>(`${this.baseUrl}/post/${id}`);
  }

  async list() {
    return await this.http.get<Song[]>(this.baseUrl);
  }

  async like(songId: Id) {
    return await this.http.post(`${this.baseUrl}/${songId}/like`);
  }

  async getLikes(songId: Id, params: QueryParams = {}) {
    return await this.http.getPaginated<UserLike[]>(
      `${this.baseUrl}/${songId}/likes${getQueryString(params)}`
    );
  }

  async unlike(songId: Id) {
    return await this.http.post(`${this.baseUrl}/${songId}/dislike`);
  }

  async feed(params: FeedQueryParams = {}) {
    return await this.http.getPaginated<Song[]>(
      `${this.baseUrl}/feed${getQueryString(params)}`
    );
  }

  async upload(spotifyId: string) {
    return await this.http.post<{ id: string }>(`${this.baseUrl}/upload`, {
      id: spotifyId,
    });
  }

  async uploadPreview(spotifyId: string) {
    return await this.http.post<{ id: string }, Song>(
      `${this.baseUrl}/upload/preview`,
      {
        id: spotifyId,
      }
    );
  }

  async isLiked(songId: Id) {
    return await this.http.get<IsSongLiked>(
      `${this.baseUrl}/post/is-liked/${songId}`
    );
  }

  async search(params: SearchParams) {
    return await this.http.getPaginated<Song[]>(
      `${this.baseUrl}/search${getQueryString(params)}`
    );
  }
}
