import Users from "../models/UserModel.js"; // Ensure the correct relative path and file extension
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "username", "email", "role", "phone_number"],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const Register = async (req, res) => {
  const { username, password, email, role, phone_number } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    await Users.create({
      username: username,
      password: hashPassword,
      email: email,
      role: role,
      phone_number: phone_number,
      user_status: "pending",
    });
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findAll({
      where: { username: username },
    });
    const match = await bcrypt.compare(password, user[0].password);

    if (!match) return res.status(400).json({ message: "Invalid Password" });

    const userId = user[0].id;
    const name = user[0].username;
    const email = user[0].email;
    const role = user[0].role;
    const phone_number = user[0].phone_number;
    const user_status = user[0].user_status;
    const accessToken = jwt.sign(
      {
        userId,
        name,
        email,
        role,
        phone_number,
        user_status,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    const refreshToken = jwt.sign(
      {
        userId,
        name,
        email,
        role,
        phone_number,
        user_status,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      //   secure : true,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    {
      refresh_token: null,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
