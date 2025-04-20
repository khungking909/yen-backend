import User from "../models/user.js";
import bcrypt from "bcrypt";

const login = async ({ username, password }) => {
  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatch) {
      return null;
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

const register = async ({ username, password }) => {
  try {
    const existingUser  = await User.findOne({
      where: { username },
    });

    if (existingUser) {
      return null;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      hashedPassword,
      username,
      email: username,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    
    throw error;
  }
};

export default { register, login };
