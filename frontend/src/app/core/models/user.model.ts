export class User {
  constructor(
    private id: string,
    private email: string,
    private firstName: string,
    private lastName: string,
    private roleId: string,
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
