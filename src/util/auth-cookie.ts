import {AuthenticationError} from '../common/error/AuthenticationError';

export function createAuthCookieOpts(exp?: number) {
  return {
    httpOnly: true,
    sameSite: process.env.ENV === 'prod' ?
      'none' as 'none' :
      'strict' as 'strict',
    maxAge: exp,
    secure: process.env.ENV === 'prod' ? true : false,
  };
}

export function verifyAuthorizationCookie(auth?: any) {
  const errMessage = new AuthenticationError();

  if (!auth) throw errMessage;

  const {access, refresh} = auth;
  if (!access || !refresh) throw errMessage;

  const [accessBearer, accessToken] = access.split(' ');
  if (accessBearer !== 'Bearer') throw errMessage;

  const [refreshBearer, refreshToken] = refresh.split(' ');
  if (refreshBearer !== 'Bearer') throw errMessage;

  return {access: accessToken, refresh: refreshToken};
}

export function verifyRefreshCookie(auth?: any) {
  const errMessage = new AuthenticationError();

  if (!auth) throw errMessage;

  const {refresh} = auth;
  if (!refresh) throw errMessage;

  const [refreshBearer, refreshToken] = refresh.split(' ');
  if (refreshBearer !== 'Bearer') throw errMessage;

  return {refresh: refreshToken};
}
