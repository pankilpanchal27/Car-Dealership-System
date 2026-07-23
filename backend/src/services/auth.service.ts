import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}
interface LoginUserInput {
  email: string;
  password: string;
}

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterUserInput): Promise<IUser> => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
}; export const loginUser = async ({
  email,
  password,
}: LoginUserInput) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  //console.log("JWT_SECRET:", process.env.JWT_SECRET);

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      name: user.name,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user,
  };
};