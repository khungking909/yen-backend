import jwt from "jsonwebtoken";
import { userService } from "../services/index.js";

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
        process.env.SECRET_KEY,
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
    console.log(error);
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
        process.env.SECRET_KEY,
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
  res.status(200).json({
    message: "Success",
    user: {
      id: req.user.dataValues.id,
      username: req.user.dataValues.username,
      email: req.user.dataValues.email,
      avatar: req.user.dataValues.avatar,
      role: 'admin',
    }
  });
}

export default {
  login,
  register,
  getMe,
};
