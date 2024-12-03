import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';



// AWS Cognito region and User Pool ID
const region = 'eu-west-1'; // Replace with your AWS Cognito region
const userPoolId = 'eu-west-1_Xm6tfpkuo'; // Replace with your User Pool ID

// Create a JWKS client to get public keys from Cognito
const client = jwksClient({
  jwksUri: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`,
});

// Get the key to verify the JWT token's signature
const getKey = (header: any, callback: any) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error('Error fetching JWKS:', err);
      return callback(err);
    }
    if(key !== undefined) { 
        const signingKey = key?.getPublicKey ||  key.getPublicKey();
        callback(null, signingKey);
    }
  });
};

// Function to verify the token
export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        reject('Token verification failed');
      } else {
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        //@ts-ignore
        const expired = typeof decoded === "object" && decoded?.exp < currentTime; // true if token has expired
        resolve(!expired); // Return the decoded JWT payload (claims)
      }
    });
  });
};


