import { hash, compare } from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log("Password hashing error", error)
    }
};

export const comparePassword = async (password, hashedPassword) => {
    return compare(password, hashedPassword);
};