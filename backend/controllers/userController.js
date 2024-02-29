import UserSchema from "../models/user.js"
import ItemSchema from "../models/item.js"
import SizeSchema from "../models/size.js"

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
            const { telegramId } = req.query;
    
            const user = await UserSchema.findOne({ telegramId: telegramId }).populate({
                path: 'cart.itemId',
                populate: {
                    path: 'category sizes.id',
                    populate: {
                        path: 'ref',
                        options: { strictPopulate: false }
                    }
                }
            });
    
            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }
    
            
            
            const itemsInCartPromises = user.cart.map(async (item) => {
                const size = await SizeSchema.findById(item.size);
                return {
                    itemId: item.itemId._id,
                    name: item.itemId.name,
                    category: item.itemId.category.name,
                    price: item.itemId.price,
                    sale: item.itemId.sale,
                    chosenCount: item.count,
                    chosenSize: size.name,
                    chosenId: size._id,
                    sizes: item.itemId.sizes.map(size => ({
                        id: size.id._id,
                        name: size.id.name,
                        count: size.count
                    }))
                };
            });
            
            const itemsInCart = await Promise.all(itemsInCartPromises);
            
            return res.status(200).json(itemsInCart);
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Возникла ошибка" });
        }
    }
    
    static addItemReview = async (req, res) => {

        try {
            const { telegramId, itemId, ratingsCount, textReview } = req.body;

            const item = await ItemSchema.findOne({ _id: itemId });

            if (!item) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }

            item.reviews.push({ telegramId: telegramId, ratingsCount: ratingsCount, textReview: textReview });
    
            await item.save();
    
            return res.status(200).json({ item });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Возникла ошибка" });
        }
    }
}
    


