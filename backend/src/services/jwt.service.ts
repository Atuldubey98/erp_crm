import { JWT_AUDIENCE, JWT_EXPIRE, JWT_ISSUER, privateKey, publicKey } from "../config";
import { UserPayload } from "../features/user/types";
import jwt from 'jsonwebtoken';
export function getJwtToken(userPayload: UserPayload) {
    return jwt.sign(userPayload, privateKey, {
        expiresIn: JWT_EXPIRE || "1h",
        issuer: JWT_ISSUER || "",
        audience: JWT_AUDIENCE || "",
        algorithm: "RS256"
    })
}

export function getUserPayloadFromToken(token: string) {
    return jwt.verify(token, publicKey);
}