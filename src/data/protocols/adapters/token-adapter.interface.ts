export interface ITokenAdapter {
  generateToken(payload: object, expiresIn?: string | number): string;
  verifyToken(token: string): object | null;
}
