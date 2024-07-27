const API_URL = 'https://fake-coffee-api.vercel.app/api';

export const fetchPosts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    console.log(response)
    throw new Error('Failed to fetch posts');
  }
  let response_s = await response.json()
  console.log(response_s)
  return response_s;
};
