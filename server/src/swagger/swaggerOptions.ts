import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coffee Rater Api',
      version: '1.0.0',
      description: 'Coffee Rater Api',
    },
    tags: [
      { name: 'Auth', description: 'Authentication related endpoints' },
      { name: 'User', description: 'User related endpoints' },
      { name: 'Comment', description: 'Comment related endpoints' },
      { name: 'Image', description: 'Image related endpoints' },
    ],
    servers: [
      {
        url: 'https://node24.cs.colman.ac.il/api/v1',
      },
    ],
  },
  apis: ['./src/controllers/*.ts'], // files containing annotations as above
};

export default options;
