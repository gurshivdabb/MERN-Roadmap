import jwt from 'jsonwebtoken';

/**
 * Middleware to protect routes
 * - reads Authorization header
 * - verifies JWT
 */
export function authMiddleware(req, res, next) {
    // Read Authorization Header
    // Format: "Bearer <token>"
    const authHeader = req.headers.authorization; // Bearer <token>
    // if no header, return 401
    if (!authHeader) return res.status(401).json({ message: 'Missing Token' });

    // Split header into type and token
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) // validate type and token
        return res.status(401).json({ message: 'Bad auth header' });

    // validate token
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // attach user info to request
        next(); // token valid, proceed to next middleware/route handler
    } catch(err) {
        return res.status(401).json( {message: 'Invalid or expired token'} );
    }
}

export function generateAccessToken(user) {
    return jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}