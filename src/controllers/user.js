import jwt from "jsonwebtoken";

const login = (req, res) => {
  const { username, password } = req.body;
  
  if (username === "test@gmail.com" && password === "Khungking123@") {
    const token = jwt.sign(
      {
        id: 1,
        username,
        password: "Not Show",
        email: 'khungking909@gmail.com',
        role: 'admin',
        avatar: 'https://preview.redd.it/wang-lin-vs-satoru-gojo-v0-c6wv8aspqw2d1.jpg?width=640&crop=smart&auto=webp&s=f399f6b264f539887bf5e9ba46d8f5c804bf8971',
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
    message: "User not found",
  });
};

const register = (req, res) => {};

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
