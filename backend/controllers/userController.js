import UserSchema from "../models/user.js"

export default class userController {

    static getUser = async (req, res) => {
        try {
            
            const telegram = req.query.telegramId;

            if (!telegram) {
                return res.status(404).json({ message: 'Ошибка получения информации' });
            }

            const userData = await UserSchema.find({telegramId: telegram});
                
            if (userData.length===0) {
                return res.status(404).json({ message: 'Ошибка получения информации' });
            }
            res.json(userData);
    
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e, message: e.message });
        }
    }
    
    static getNotifications = async (req, res) => {
        try {
            
            const telegram = req.query.telegramId;

            if (!telegram) {
                return res.status(404).json({ message: 'Ошибка получения информации' });
            }

            const userData = await UserSchema.find({telegramId: telegram});
                
            if (userData.length===0) {
                return res.status(404).json({ message: 'Ошибка получения информации' });
            }
            res.json(userData[0].notifications);
    
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e, message: e.message });
        }
    }

    static seenNotification = async (req, res) => {
        try {
            const { notificationId, telegramId } = req.body;

            console.log(notificationId, telegramId)
    
            const user = await UserSchema.findOne({ telegramId });
    
            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }
    
            const notification = user.notifications.find(notification => notification._id == notificationId);
    
            if (!notification) {
                return res.status(404).json({ error: "Уведомление не найдено" });
            }
    
            notification.seen = true;
    
            await user.save();
    
            return res.status(200).json({ notification });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Возникла ошибка" });
        }
    }
    
    static updateUser = async (req, res) => {
    
    }
    

}