import UserSchema from "../models/user.js"
import OrderSchema from "../models/order.js"

export default class orderController {

    static getOrders = async (req, res) => {

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