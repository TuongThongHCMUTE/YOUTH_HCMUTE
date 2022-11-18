const API_LOCAL = 'localhost:5000/api/v1';

const API_DEV = 'https://dev-youthhcmute-be.herokuapp.com/api/v1';

const API_PROD = 'https://prod-youthhcmute-be.herokuapp.com/api/v1';

export const getServer = () => {
  switch(process.env.NODE_ENV) {
    case 'local':
      return API_LOCAL;
    case 'development':
      return API_DEV;
    case 'production':
      return API_PROD;
    default:
      return API_LOCAL;
  }
}