/**
 * Configuration constants for the CultureSwap backend application.
 * 
 * Author: Gurshiv Singh Dabb
 */

export const PORT = process.env.PORT || 3000;
export const BCRYPT_SALT_ROUNDS = 10;
export const JWT_EXPIRATION = '1h';
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};