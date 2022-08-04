import ApiService from "./api-service";

const nonUpdatableFields = ["_id", "createdAt", "updatedAt", "email"];

export const getUpdatableFields = (user) => {
  const updatableUser = { ...user };

  for (const key of Object.keys(updatableUser)) {
    if (nonUpdatableFields.includes(key)) {
      delete updatableUser[key];
    }
  }

  return updatableUser;
};

class UserService extends ApiService {
  async create(data) {
    return await this.http.post(this.baseUrl, data);
  }

  async me() {
    return await this.http.get(`${this.baseUrl}/me`);
  }

  async update(data) {
    return await this.http.put(`${this.baseUrl}/me`, data);
  }

  async changePassword(data) {
    return await this.http.post(`${this.baseUrl}/change-password`, data);
  }
}

export default UserService;
