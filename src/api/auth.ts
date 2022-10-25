import { ApiService } from "./apiService";

interface Credentials {
  email: string;
  password: string;
}

interface TokenResponse {
  token: string;
  isAdmin: boolean;
}

interface ResetPasswordBody {
  password: string;
  repeatPassword: string;
  email: string;
  otp: string;
}

interface ConfirmEmailBody {
  email: string;
  otp: string;
}

interface EmailBody {
  email: string;
}

export class AuthService extends ApiService {
  async login(credentials: Credentials) {
    // Login and get a token
    const { data } = await this.http.post<Credentials, TokenResponse>(
      `${this.baseUrl}/login`,
      credentials
    );
    const { token, isAdmin } = data;

    // Save obtained token
    this.setToken({ token, isAdmin });

    // Set default Auth header
    this.setAuthHeader(token);

    // Get user information
    return await this.client.users.me();
  }

  async googleLogin() {
    const res = await this.http.get(`${this.baseUrl}/login/google`);
    if (res.data) {
      window.location.href = res.data;
    }
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

  async confirmEmail(data: ConfirmEmailBody) {
    return await this.http.post(`${this.baseUrl}/confirm-email`, data);
  }

  async forgotPassword(data: EmailBody) {
    return await this.http.post(`${this.baseUrl}/forgot-password`, data);
  }

  async resetPassword(data: ResetPasswordBody) {
    return await this.http.post(`${this.baseUrl}/reset-password`, data);
  }

  async resendEmailConfirmation(data: EmailBody) {
    return await this.http.post(
      `${this.baseUrl}/resend-confirmation-email`,
      data
    );
  }

  logout() {
    this.removeToken();
    this.removeAuthHeader();
  }

  setToken(token: TokenResponse) {
    localStorage.setItem("x-auth-token", JSON.stringify(token));
  }

  getToken(): TokenResponse | null {
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

  setAuthHeader(token: string) {
    this.http.instance.defaults.headers.common["x-auth-token"] = token;
  }

  removeAuthHeader() {
    delete this.http.instance.defaults.headers.common["x-auth-token"];
  }
}
