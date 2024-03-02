import UserSchema from "../models/user.js"
import OrderSchema from "../models/order.js"

export default class orderController {

    static getOrders = async (req, res) => {
    try {
        const { telegramId } = req.query;

        const user = await UserSchema.findOne({ telegramId }).populate({
            path: 'orders',
            populate: {
                path: 'items.itemId',
                model: 'Item'
            }
        });

        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        const orders = user.orders.map(order => ({
            orderId: order._id,
            items: order.items.map(item => ({
                _id: item._id,
                itemId: {
                    _id: item.itemId._id,
                    name: item.itemId.name,
                    category: item.itemId.category,
                    photos: item.itemId.photos,
                    price: item.itemId.price,
                    sale: item.itemId.sale,
                    deliveryTime: item.itemId.deliveryTime,
                    description: item.itemId.description,
                    reviews: item.itemId.reviews
                },
                status: item.status,
                track: item.track,
                approximateTime: item.approximateTime,
                count: item.count,
                sizeId: item.sizeId,
                size: item.size
            })),
            name: order.name,
            email: order.email,
            phoneNumber: order.phoneNumber,
            telegramLink: order.telegramLink,
            dateOrder: order.dateOrder,
            totalPrice: order.totalPrice,
            country: order.country,
            city: order.city,
            reservePhoneNumber: order.reservePhoneNumber,
            presentAdress: order.presentAdress,
            apartmentNumber: order.apartmentNumber,
            postalCode: order.postalCode,
            postalCodeReserve: order.postalCodeReserve,
            additionalInformation: order.additionalInformation
        }));

        return res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Возникла ошибка" });
    }
}

    static getOrder = async (req, res) => {

    }

    static updateStatusOrder = async (req, res) => {

    }

    static addOrder = async (req, res) => {

        try{

            const user = await UserSchema.findOne({telegramId: req.body.telegramId})

            if (!user) {
                return res.status(404).json({ message: "Ошибка получения информации" });
              }

            const order = await new OrderSchema({
                reserveNumber: req.body.reserveNumber,
                email: req.body.email,
                country: req.body.country,
                city: req.body.city,
                presentAdress: req.body.presentAdress,
                apartmentNumber: req.body.apartmentNumber,
                postalCode: req.body.postalCode,
                postalCodeReserve: req.body.postalCodeReserve,
                additionalInformation: req.body.additionalInformation,
                dateOrder: req.body.dateOrder,
                totalPrice: req.body.totalPrice,
                items: req.body.items,
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                telegramLink: req.body.telegramLink,
            })
    
            await order.save();

            const orderId = order._id;

            user.orders.push(orderId);

            user.cart = []

            user.save()
    
            return res.status(200).json({
                ...order,
              });

        } catch(error){
            res.status(500).json({
            error: "Возникла ошибка",
        })}
    }
    

}