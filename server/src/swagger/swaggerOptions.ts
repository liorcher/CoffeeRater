import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coffee Rater Api',
      version: '1.0.0',
      description: 'Coffee Rater Api',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // files containing annotations as above
};

export default options;
