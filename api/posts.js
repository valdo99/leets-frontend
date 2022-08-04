import ApiService from "./api-service";

class PostService extends ApiService {
  async list(data) {
    return await this.http.get(this.baseUrl, data);
  }
  async like(post) {
    return await this.http.post(`${this.baseUrl}/${post}/like`);
  }
  async unlike(post) {
    return await this.http.post(`${this.baseUrl}/${post}/dislike`);
  }
  async feed() {
    return await this.http.get(`${this.baseUrl}/feed`);
  }
}

export default PostService;
