import { getQueryString } from "@utils/getQueryString";

import { ApiService } from "./apiService";
import { Song } from "./songs";
import { Entity, Id, PaginationQueryParams } from "./types";
import { User } from "./users";

export interface Artist extends Entity {
  name: string;
  image: string;
  followers: number;
  spotify_id: string;
  hunter: User;
  monthly_listeners: number;
  biography?: string;
}

export interface TopArtist
  extends Pick<Artist, "name" | "_id" | "createdAt" | "image"> {
  points: number;
}

export class ArtistService extends ApiService {
  async read(id: Id) {
    return await this.http.get<Artist>(`${this.baseUrl}/${id}`);
  }

  async songs(id: Id) {
    return await this.http.get<Song[]>(`${this.baseUrl}/${id}/posts`);
  }

  async totalLikes(id: Id) {
    return await this.http.get<{ likes: number }>(
      `${this.baseUrl}/${id}/total-likes`
    );
  }

  async topArtists(params?: PaginationQueryParams) {
    return await this.http.getPaginated<TopArtist[]>(
      `${this.baseUrl}/feed/top-artists${getQueryString(params)}`
    );
  }
}
