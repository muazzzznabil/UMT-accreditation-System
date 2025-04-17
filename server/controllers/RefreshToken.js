import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401); // Unauthorized

    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user[0]) return res.sendStatus(403); // Forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          console.error("Token verification failed:", err.message);
          return res.sendStatus(403); // Forbidden
        }

        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const role = user[0].role;
        const phone_number = user[0].phone_number;
        const user_status = user[0].user_status;

        const accessToken = jwt.sign(
          { userId, username, email, role, phone_number, user_status },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "20s" }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error("Error in refreshToken:", error);
    res.sendStatus(500); // Internal Server Error
  }
};
