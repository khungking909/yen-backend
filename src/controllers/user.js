import jwt from "jsonwebtoken";
import { userService } from "../services/index.js";

const secretKey = 'truonghuynh'

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userService.login({
      username,
      password,
    });

    if (user) {
      const token = jwt.sign(
        {
          ...user,
          password: undefined,
        },
        secretKey,
        {
          expiresIn: "7d",
        }
      );
      
      return res.status(200).json({
        message: "Success",
        token,
      });
    }
    
    return res.status(404).json({
      message: "Username or password is incorrect",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
  
  
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userService.register({
      username,
      password,
    });

    if (user) {
      const token = jwt.sign(
        {
          ...user,
          password: undefined,
        },
        secretKey,
        {
          expiresIn: "7d",
        }
      );

      return res.status(201).json({
        message: "Success",
        token
      });
    }
    
    return res.status(409).json({
      message: "User already exists",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getMe = (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  res.status(200).json({
    message: "Success",
    user
  });
}

export default {
  login,
  register,
  getMe,
};
