/**
 * auth.js
 * Authentication middleware and token generation
 * 
 * Author: Gurshiv Singh Dabb
 */

import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION, HTTP_STATUS } from '../config/constants.js';

// Middleware to protect routes
// - reads Authorization header
// - verifies JWT
export function authMiddleware(req, res, next) {
    // Read Authorization Header
    // Format: "Bearer <token>"
    const authHeader = req.headers.authorization; // Bearer <token>
    // if no header, return 401
    if (!authHeader) { 
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Missing Token' }); 
    }

    // Split header into type and token
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) // validate type and token
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Bad auth header' });

    // validate token
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = {_id: decoded.id, email: decoded.email}; // attach user info to request
        next(); // token valid, proceed to next middleware/route handler
    } catch(err) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json( {message: 'Invalid or expired token'} );
    }
}

export function generateAccessToken(user) {
    return jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: JWT_EXPIRATION });
}