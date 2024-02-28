import UserSchema from "../models/user.js"

export default class adminController {

    static addUserNotification = async (req, res) => {
        try {
            const { name, telegramId } = req.body;

            const date = new Date()

            const user = await UserSchema.findOne({ telegramId });

            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }

            const newNotification = {
                name,
                date,
                seen: false
            };

            user.notifications.push(newNotification);

            await user.save();

            return res.status(200).json({ notification: newNotification });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Возникла ошибка" });
        }
    }

    static deleteNotification = async (req, res) => {

    }




}
