import UserSchema from "../models/user.js";
import AdminSchema from "../models/admin.js";

import jwt from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export default class adminController {
  static addUserNotification = async (req, res) => {
    try {
      const { name, telegramId } = req.body;

      const date = new Date();

      const user = await UserSchema.findOne({ telegramId });

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      const newNotification = {
        name,
        date,
        seen: false,
      };

      user.notifications.push(newNotification);

      await user.save();

      return res.status(200).json({ notification: newNotification });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Возникла ошибка" });
    }
  };

  static deleteNotification = async (req, res) => {};

  static loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await AdminSchema.findOne({
        username: username,
        password: password,
      });

      if (user) {
        // If user found, create and send JWT token
        jwt.sign(
          { id: user.id, username: user.username },
          process.env.SECRET_KEY,
          { expiresIn: "30days" },
          (err, token) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: "Ошибка создания токена" });
            } else {
              res.json({ token });
            }
          }
        );
      } else {
        // If user not found, send error response
        res
          .status(401)
          .json({ error: "Неправильное имя пользователя или пароль" });
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  };

  static getAllAdmins = async (req, res) => {
    try {
      const admins = await AdminSchema.find({});

      return res.status(200).json(admins);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Возникла ошибка" });
    }
  };
}
