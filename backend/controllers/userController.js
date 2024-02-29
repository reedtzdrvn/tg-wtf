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

        try {
            const { firstName, lastName, email, phoneNumber, telegramId } = req.body;

            const user = await UserSchema.findOne({ telegramId });

            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }

            if (firstName) user.firstName = firstName;
            if (lastName) user.lastName = lastName;
            if (email) user.email = email;
            if (phoneNumber) user.phoneNumber = phoneNumber;
    
            await user.save();
    
            return res.status(200).json({ user });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Возникла ошибка" });
        }
    }

    static addItemCartUser = async (req, res) => {

        try {
            const { itemId, count, telegramId, sizeId } = req.body;

            const user = await UserSchema.findOne({ telegramId });

            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }

            user.cart.push({ itemId: itemId, count: count, size: sizeId });
    
            await user.save();
    
            return res.status(200).json({ user });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Возникла ошибка" });
        }
    }

    static getItemCartUser = async (req, res) => {
        try {
            const { telegramId } = req.body;
    
            const user = await UserSchema.findOne({ telegramId });
    
            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }
    
            const itemsInCart = await UserSchema.aggregate([
                { $match: { telegramId } },
                { $unwind: "$cart" },
                {
                    $lookup: {
                        from: "items",
                        localField: "cart.itemId",
                        foreignField: "_id",
                        as: "cartItems"
                    }
                },
                {
                    $lookup: {
                        from: "sizes",
                        localField: "cart.size",
                        foreignField: "_id",
                        as: "sizeInfo"
                    }
                },
                {
                    $addFields: {
                        "cart.name": { $arrayElemAt: ["$cartItems.name", 0] },
                        "cart.price": { $arrayElemAt: ["$cartItems.price", 0] },
                        "cart.sale": { $arrayElemAt: ["$cartItems.sale", 0] },
                        "cart.sizeInfo": { $arrayElemAt: ["$sizeInfo", 0] }
                    }
                },
                {
                    $group: {
                        _id: "$cart.itemId",
                        cart: { $push: "$cart" }
                    }
                },
                {
                    $project: {
                        "_id": 0,
                        "itemsInCart": "$cart"
                    }
                }
            ]);
    
            return res.status(200).json({ itemsInCart });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Возникла ошибка" });
        }
    }
    
}
    


