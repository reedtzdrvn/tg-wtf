import UserSchema from "../models/user.js";
import OrderSchema from "../models/order.js";

export default class orderController {
  static getOrderAccountInfo = async (req, res) => {
    try {
      const { orderIds } = req.query;
      let orders = [];

      for (const id of orderIds) {
        let order = await OrderSchema.findOne({ _id: id });
        orders.push(order);
      }

      return res.status(200).json(orders);
    } catch (error) {}
  };

  static getOrders = async (req, res) => {
    try {
      const { telegramId } = req.query;

      const user = await UserSchema.findOne({ telegramId }).populate({
        path: "orders",
        populate: {
          path: "items.itemId",
          model: "Item",
          populate: {
            path: "category",
            model: "Category",
          },
        },
      });

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      const orders = user.orders.map((order) => ({
        orderId: order._id,
        items: order.items.map((item) => ({
          _id: item._id,
          itemId: {
            _id: item.itemId._id,
            name: item.itemId.name,
            category: {
              _id: item.itemId.category._id, // Добавляем информацию о категории товара
              title: item.itemId.category.title, // Добавляем информацию о категории товара
            },
            photos: item.itemId.photos,
            price: item.itemId.price,
            sale: item.itemId.sale,
            deliveryTime: item.itemId.deliveryTime,
            description: item.itemId.description,
            reviews: item.itemId.reviews,
          },
          status: item.status,
          track: item.track,
          approximateTime: item.approximateTime,
          count: item.count,
          sizeId: item.sizeId,
          size: item.size,
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
        additionalInformation: order.additionalInformation,
      }));

      return res.status(200).json(orders);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Возникла ошибка" });
    }
  };

  static getOrderById = async (req, res) => {
    try {
      const orderId = req.query.orderId; // Получаем orderId из query string
      // Проверяем, был ли передан orderId
      if (!orderId) {
        return res
          .status(400)
          .json({ error: "Необходимо предоставить orderId в query string" });
      }

      // Ищем ордер в базе данных по orderId
      const order = await OrderSchema.findOne({ _id: orderId });

      // Проверяем, найден ли ордер
      if (!order) {
        return res
          .status(404)
          .json({ error: "Ордер с указанным orderId не найден" });
      }

      // Отправляем найденный ордер в качестве ответа
      res.status(200).json(order);
    } catch (error) {
      // Обрабатываем возможные ошибки
      console.error("Ошибка при получении ордера:", error);
      res.status(500).json({ error: "Произошла ошибка при получении ордера" });
    }
  };

  static getAllOrders = async (req, res) => {
    try {
      const orders = await OrderSchema.find();

      res.status(200).json(orders);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    }
  };

  static getOrder = async (req, res) => {};

  static updateStatusOrder = async (req, res) => {
    try {
      const { orderId, status, itemId } = req.body;

      const order = await OrderSchema.findOne({ _id: orderId });

      if (!order) {
        return res.status(404).json({ error: "Заказ не найден" });
      }

      let itemFound = false;
      for (let i = 0; i < order.items.length; i++) {
        if (order.items[i]._id.toString() === itemId) {
          order.items[i].status = status;
          itemFound = true;
          break;
        }
      }

      if (!itemFound) {
        return res.status(404).json({ error: "Товар в заказе не найден" });
      }

      await order.save();

      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Возникла ошибка" });
    }
  };

  static addOrder = async (req, res) => {
    try {
      const user = await UserSchema.findOne({
        telegramId: req.body.telegramId,
      });

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
      });

      await order.save();

      const orderId = order._id;

      user.orders.push(orderId);

      user.cart = [];

      user.save();

      return res.status(200).json({
        ...order,
      });
    } catch (error) {
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };
}
