import { ApiService } from "./apiService";

export class GenreService extends ApiService {
  async list() {
    return await this.http.get<string[]>(`${this.baseUrl}/list`);
  }
}
