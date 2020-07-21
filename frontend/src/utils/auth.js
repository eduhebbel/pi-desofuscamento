const TOKEN_KEY = 'token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const isAuth = () => {
    return getToken() !== null;
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
}