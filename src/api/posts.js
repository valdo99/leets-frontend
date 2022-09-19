import ApiService from "./api-service";
import getQueryString from "./get-query-string";

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
  async feed(params={}) {
    return await this.http.get(`${this.baseUrl}/feed${getQueryString(params)}`);
  }
}

export default PostService;
