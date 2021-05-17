export class User {
  public readonly id: string;
  public readonly email: string;
  private readonly passwordHash: string;

  constructor(id: string, email: string, passwordHash: string) {
    this.id = id?.toLowerCase();
    this.email = email?.toLowerCase();
    this.passwordHash = passwordHash;

    Object.freeze(this);
  }

  validatePassword(password: string): boolean {
    return this.passwordHash === password;
  }
}
