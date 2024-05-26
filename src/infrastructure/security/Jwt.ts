import jwt from 'jsonwebtoken';

export type JwtSignPayload = {
  id: string
  nama: string
  email: string
  is_super: boolean
}

export class Jwt {
  async createAccessToken(payload: JwtSignPayload) {
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_KEY as string,
        {expiresIn: process.env.ACCESS_TOKEN_AGE as string},
    );
  }

  async verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string);
  }

  async createRefreshToken(payload: JwtSignPayload) {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_KEY as string,
        {expiresIn: process.env.REFRESH_TOKEN_AGE as string},
    );
  }

  async verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_KEY as string);
  }

  async decode(token: string) {
    return jwt.decode(token);
  }

  mapJwtSignPayload(payload: JwtSignPayload) {
    return {
      id: payload.id,
      nama: payload.nama,
      email: payload.email,
      is_super: payload.is_super,
    };
  }
}
