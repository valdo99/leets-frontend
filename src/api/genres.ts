import { ApiService } from "./apiService";
import { Entity } from "./types";

export interface Genre extends Entity {
  name: string;
  slug: string;
}

export class GenreService extends ApiService {
  async list() {
    return await this.http.get<Genre[]>(`${this.baseUrl}/list`);
  }
}
