import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

//hash pwd
export async function hashPwd(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

//compare pwd
export async function comparePwd(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

//generate jwt
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET as string, { expiresIn: "7d" });
}

//verify token
export function verifyToken(token: string): { userId: string } {
  const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
    userId: string;
  };
  return payload;
}
