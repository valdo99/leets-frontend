import { getQueryString } from "../utils/getQueryString";

import { ApiService } from "./apiService";
import { Entity, Id } from "./types";
import { User } from "./users";

export interface Artist extends Entity {
  name: string;
  image: string;
  followers: number;
  spotify_id: string;
  hunter: Id;
}

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
}

export class PostService extends ApiService {
  async list() {
    return await this.http.get<Post[]>(this.baseUrl);
  }

  async like(postId: Id) {
    return await this.http.post(`${this.baseUrl}/${postId}/like`);
  }

  async unlike(postId: Id) {
    return await this.http.post(`${this.baseUrl}/${postId}/dislike`);
  }

  async feed(params = {}) {
    return await this.http.get<Post[]>(
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
}
