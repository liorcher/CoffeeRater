import { jwtDecode } from "jwt-decode";
const BASE_URL = "http://localhost:9000/api/v1";

const uploadImage = async (image: File) => {
  debugger;
  const response = await fetch(`${BASE_URL}/images/upload`, {
    body: image,
    method: "POST",
    headers: {
      "content-type": "file",
    },
  });
  debugger;

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to upload image");
  }

  return await response.json();
};

export const loginWithGoogle = async () => {
  window.location.href = `${BASE_URL}/auth/google`;
};

interface token {
  id: string;
}
export const login = async (username: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    body: JSON.stringify({ username, password: btoa(password) }),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    console.log(response);

    throw new Error("Failed to login");
  }
  let response_json = await response.json();

  const jwt_decode = jwtDecode<token>(response_json.token);

  return getUserDetails(jwt_decode.id);
};

export const getUserDetails = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/details/${userId}`);
  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to fetch user details");
  }
  let response_json = await response.json();
  console.log(response_json);
  return response_json;
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
  const responseUpload = photo && (await uploadImage(photo));

  const response = await fetch(`${BASE_URL}/auth/signup`, {
    body: JSON.stringify({
      username,
      password: btoa(password),
      email,
      avatarUrl: null,
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to sign up");
  }
};
