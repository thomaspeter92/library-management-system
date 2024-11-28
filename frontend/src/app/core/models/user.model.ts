export class User {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public roleId: string,
    private accessToken: string,
    private refreshToken: string
  ) {}

  get token() {
    if (!this.accessToken) {
      return null;
    }
    return this.accessToken;
  }
}
