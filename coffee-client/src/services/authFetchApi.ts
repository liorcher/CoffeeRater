import axios from "axios";
axios.defaults.withCredentials = true;

const BASE_URL = "http://localhost:9000/api/v1";

const uploadImage = async (image: File) => {
  const response = await fetch(`${BASE_URL}/images/upload`, {
    body: image,
    method: "POST",
    headers: {
      "content-type": "file",
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to upload image");
  }

  return await response.json();
};

export const loginWithGoogle = async () => {
  window.location.href = `${BASE_URL}/auth/google`;
};

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    username: username,
    password: btoa(password),
  });

  if (!res.status) {
    console.log(res);
    throw new Error("Failed to login");
  }
};

export const logout = async () => {
  const response = await fetch(`${BASE_URL}/auth/logout`);
  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to logout");
  }
  let response_json = await response.json();
  return response_json;
};

export const signUp = async (
  username: string,
  photo: File | null,
  password: string,
  email: string
) => {
  // const responseUpload = photo && (await uploadImage(photo));

  const response = await axios.post(`${BASE_URL}/auth/signup`, {
    username,
    password: btoa(password),
    email,
    avatarUrl: null,
  });

  await login(username, password);

  if (!response.status) {
    console.log(response);
    throw new Error("Failed to sign up");
  }
};
