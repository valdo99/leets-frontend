class ApiService {
  client;

  http;

  baseUrl;

  constructor(client, baseUrl) {
    this.client = client;
    this.http = this.client.http;
    this.baseUrl = baseUrl;
  }
}

export default ApiService;
