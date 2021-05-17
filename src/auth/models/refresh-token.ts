export class RefreshToken {
  constructor(
    public readonly userId: string,
    public readonly token: string,
    public readonly issuedAt: number,
    public readonly expiryAt: number | null,
  ) {}

  isValid(): boolean {
    return this.expiryAt >= Date.now();
  }
}
