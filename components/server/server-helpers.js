import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

export const createToken = (data) => {
    return jwt.sign(data, process.env.NEXT_PUBLIC_JWT_TOKEN, {expiresIn: '1h'});
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_TOKEN);
};

export const setTokenCookie = (token) => {
    Cookies.set("token", token, {
        expires: 1, // 1 hour
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });
};

export const removeTokenCookie = () => {
    Cookies.remove("token");
};

export const getTokenCookie = () => {
    return Cookies.get("token");
};

export const isAuthorized = () => {
    const token = getTokenCookie();
    if (!token) {
        return false;
    }

    try {
        const data = verifyToken(token);
        return true;
    } catch (e) {
        return false;
    }
};

export const logout = () => {
    try {
        const token = getTokenCookie();
        const data = verifyToken(token);
        console.log(data);
        fetch('/api/accounts/setOffline?id=' + data.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(r => r);
    }  catch (e) {
        console.error("Error logging out", e);
    }

    removeTokenCookie();
    window.location.href = '/authentication/sign-in';
};