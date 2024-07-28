
const BASE_URL = 'http://localhost:9000/api/v1'

const uploadImage = async (image: File) => {
    const response = await fetch(`${BASE_URL}/images/upload`, {
        body: image,
        method: "POST"
    });

    if (!response.ok) {
        console.log(response)
        throw new Error('Failed to upload image');
    }

    return await response.json()
}

export const loginWithGoogle = async () => {
    const response = await fetch(`${BASE_URL}/auth/google`);
    if (!response.ok) {
        console.log(response)
        throw new Error('Failed to logout');
    }
    let response_json = await response.json()
    return response_json;
};

export const login = async (username: string, password: string) => {
    debugger
    const response = await fetch(`${BASE_URL}/auth/login`, {
        body: JSON.stringify({username, password: password}),
        method: "POST",
        headers: {
            "content-type": "application/json"
        }
    });
    if (!response.ok) {
        console.log(response)
        throw new Error('Failed to logout');
    }
    let response_json = await response.json()
    return response_json;
};

export const getUserDetails = async () => {
    const response = await fetch(`${BASE_URL}/users/details`);
    if (!response.ok) {
        console.log(response)
        throw new Error('Failed to fetch user details');
    }
    let response_json = await response.json()
    return response_json;
};

export const logout = async () => {
    const response = await fetch(`${BASE_URL}/auth/logout`);
    if (!response.ok) {
        console.log(response)
        throw new Error('Failed to logout');
    }
    let response_json = await response.json()
    return response_json;
};

export const signUp = async (username: string, avatarUrl: string, password: string, email: string) => {
    // const responseUpload = await uploadImage(image);

    
    const response = await fetch(`${BASE_URL}/auth/signup`, {
        body: JSON.stringify({
            username,
            password,
            email,
            avatarUrl
        }),
        method: "POST",
        headers: {
            "content-type": "application/json"
        }
    });

    if (!response.ok) {
        console.log(response)
        throw new Error('Failed to sign up');
    }
}