import UserSchema from "../models/user.js"

export default class userController {

    static getNotification = async (req, res) => {

    }

    static getUser = async (req, res) => {
        try {
    
            const telegram = req.body.telegramId;

    
            if (!telegram) {
                return res.status(404).json({ message: 'Ошибка получения информации' });
            }

            const userData = await UserSchema.find({telegramId: telegram});
            
            console.log(userData)
    
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
        
    }
    
    static updateUser = async (req, res) => {
    
    }
    

}