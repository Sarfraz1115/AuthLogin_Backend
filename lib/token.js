import jwt from 'jsonwebtoken';

export const generateToken = (userID, res) => {
    const token = jwt.sign({id: userID}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httponly: true, // Prevents client-side access to the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Helps prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000 // Cookie expiration time (30 days)
    })
    return token;
}