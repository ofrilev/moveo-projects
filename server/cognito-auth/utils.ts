import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

// Configure your Cognito User Pool
const poolData = {
  UserPoolId: 'eu-west-1_Xm6tfpkuo', // Replace with your User Pool ID
  ClientId: '1s1co4etco73vb2ur0hudlc0fa', // Replace with your App Client ID
};

const userPool = new CognitoUserPool(poolData);

// Define the Response type
type Response = {
  succeed: boolean;
  message: string;
  userSub?: string;
  role?: string;
};

// Sign-up function using async/await
export const signUpUser = async (username: string, password: string, email: string): Promise<Response> => {
  const attributeList = [
    new CognitoUserAttribute({ Name: 'email', Value: email }), // Attribute for email
  ];


  // Use async/await with the sign-up operation
  try {
    const result = await new Promise<any>((resolve, reject) => {
      userPool.signUp(username, password, attributeList, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = new CognitoUser({ Username: username, Pool: userPool });
          resolve(result);
        }
      });
    });

    // Successful sign-up
    console.log('Sign-up successful! User Sub:', result?.userSub);
    console.log('Check your email for a confirmation code.');

    return {
      succeed: true,
      message: 'Sign-up successful! Please check your email for the confirmation code.',
    };
  } catch (err: any) {
    console.error('Sign-up error:', err.message || JSON.stringify(err));

    return {
      succeed: false,
      message: err.message || 'Unknown error during sign-up',
    };
  }
};


// Login function using async/await
export const loginUser = async (username: string, password: string): Promise<Response> => {
  // Use async/await for the authentication process
  const user = new CognitoUser({ Username: username, Pool: userPool });

  try {
    const result = await new Promise<any>((resolve, reject) => {
      user.authenticateUser(
        new AuthenticationDetails({ Username: username, Password: password }),
        {
          onSuccess: (result) => {
            resolve(result); // Authentication successful
          },
          onFailure: (err) => {
            reject(err); // Authentication failed
          },
        }
      );
    });
    
    return {
      userSub: result.idToken?.payload?.sub,
      role: result.idToken?.payload?.["custom:role"],
      succeed: true,
      message: 'Login successful!',
    };
  } catch (err: any) {
    console.error('Login error:', err.message || JSON.stringify(err));

    return {
      succeed: false,
      message: err.message || 'Unknown error during login',
    };
  }
};