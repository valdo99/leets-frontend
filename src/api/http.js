import axios from "axios";

class Http {
  constructor(config) {
    this.http = axios.create(config);

    this.http.interceptors.response.use(this.handleResponse, (error) =>
      this.handleError(error, config.handleResponseError)
    );
  }

  instance() {
    return this.http;
  }

  handleResponse(res) {
    return res.data;
  }

  handleError(error, handleResponseError) {
    // If there is no response, then just throw the error
    if (!error.response) throw error;

    // If there is a response, pass it to the handler
    handleResponseError(error.response);
  }

  get(url) {
    return this.http.get(url);
  }

  getPaginated(url) {
    return this.http.get(url);
  }

  post(url, data) {
    return this.http.post(url, data);
  }

  put(url, data) {
    return this.http.put(url, data);
  }

  delete(url) {
    return this.http.delete(url);
  }
}

export default Http;
