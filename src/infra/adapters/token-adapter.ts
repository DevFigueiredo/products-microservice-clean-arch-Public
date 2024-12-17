// JwtTokenAdapter.ts

import { ITokenAdapter } from '@src/data/protocols/adapters/token-adapter.interface';
import * as jwt from 'jsonwebtoken';

export class JwtTokenAdapter implements ITokenAdapter {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateToken(payload: object, expiresIn: string | number = '1h'): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, this.secretKey) as object;
    } catch (error) {
      console.error('Token inválido:', error);
      return null;
    }
  }
}
