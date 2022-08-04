import ApiService from "./api-service";

class AuthService extends ApiService {
  // DI REDIRECT
  async login(credentials) {
    // Login and get a token
    const { data } = await this.http.post(`${this.baseUrl}/login`, credentials);
    const { token, isAdmin } = data;

    // Save obtained token
    this.setToken({ token, isAdmin });

    // Set default Auth header
    this.setAuthHeader(token);

    // Get user information
    return await this.client.users.me();
  }

  /**
   * @returns the user that is currently logged in, based on the token stored in lcaolstorage.
   *          null if no user is currently logged in
   */
  async getLoggedUser() {
    // Get the token from local storage
    const storedToken = this.getToken();

    // Check is the token exists
    if (!storedToken) {
      return null;
    }

    const { token } = storedToken;

    // Save the token in the authorization header
    this.setAuthHeader(token);

    // Get user data
    try {
      const { data: user } = await this.client.users.me();
      return user;
    } catch (error) {
      return null;
    }
  }

  async confirmEmail(data) {
    return await this.http.post(`${this.baseUrl}/confirm-email`, data);
  }

  async forgotPassword(data) {
    return await this.http.post(`${this.baseUrl}/forgot-password`, data);
  }

  async resetPassword(data) {
    return await this.http.post(`${this.baseUrl}/reset-password`, data);
  }

  async resendEmailConfirmation(data) {
    return await this.http.post(
      `${this.baseUrl}/resend-confirmation-email`,
      data
    );
  }

  logout() {
    this.removeToken();
  }

  setToken(token) {
    localStorage.setItem("x-auth-token", JSON.stringify(token));
  }

  getToken() {
    try {
      const token = localStorage.getItem("x-auth-token");

      if (!token) {
        return null;
      }

      return JSON.parse(token);
    } catch {
      return null;
    }
  }

  removeToken() {
    localStorage.removeItem("x-auth-token");
  }

  setAuthHeader(token) {
    this.http.http.defaults.headers.common["x-auth-token"] = token;
  }
}

export default AuthService;
