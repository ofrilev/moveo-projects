import jwt from 'jsonwebtoken';
import { Roles } from './types';
export type  userData = {
  role: string,
  userid: string
}
const decodeJWT = (token: string) => {
    try {
      const decodedToken = jwt.decode(token);
      if (!decodedToken) {
        throw new Error('Token decoding failed');
      }
      return decodedToken;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  };
  export const getUserDataFromJWT = (token: string): userData => {
    const decodedToken = decodeJWT(token);
    if (decodedToken?.sub) {
      //@ts-ignore
    let role = Roles[decodedToken["role"].toUpperCase()]
      return {userid: decodedToken.sub, role: role } as userData; // The 'sub' field contains the unique user ID in Cognito.
    }
    return {
      role: "",
      userid: ""
    };
  };