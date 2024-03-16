import ItemSchema from "../models/item.js";
import SizeSchema from "../models/size.js";
import user from "../models/user.js";
import UserSchema from "../models/user.js";
import mongoose from "mongoose";

export default class itemController {
  static getAllItems = async (req, res) => {
    try {
      const items = await ItemSchema.find();

      res.status(200).json(items);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    }
  };

  static getItem = async (req, res) => {
    try {
      const item_id = req.query.itemId;

      if (!item_id) {
        return res.status(404).json({ message: "Ошибка получения информации" });
      }

      console.log(item_id);

      const itemData = await ItemSchema.findById(item_id);

      console.log(itemData);

      if (!itemData) {
        return res.status(404).json({ message: "Ошибка получения информации" });
      }
      res.json(itemData);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    }
  };

  static getItemsByCategory = async (req, res) => {
    try {
      const categoryId = req.query.categoryId;

      if (!categoryId) {
        return res.status(404).json({ message: "Ошибка получения информации" });
      }

      const itemsFromSelectedCategoryData = await ItemSchema.find({
        category: categoryId,
      });

      // if (itemsFromSelectedCategoryData.length === 0) {
      //   return res
      //     .status(404)
      //     .json({ message: "Нет товаров из данной категории" });
      // }

      res.status(200).json(itemsFromSelectedCategoryData);
    } catch (error) {
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };

  static addItem = async (req, res) => {
    try {
      const item = await new ItemSchema({
        name: req.body.name,
        category: req.body.category,
        photos: req.body.photos,
        price: req.body.price,
        sale: req.body.sale,
        deliveryTime: req.body.deliveryTime,
        sizes: req.body.sizes,
        description: req.body.description,
      });

      await item.save();

      return res.status(200).json({
        ...item,
      });
    } catch (err) {
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };

  static deleteItemFromCart = async (req, res) => {
    const { telegramId, itemId, sizeItem } = req.body;
    console.log(telegramId, itemId, sizeItem);
    if (!telegramId || !itemId) {
      return res.status(400).json({ message: "Ошибка получения информации" });
    }

    try {
      const userData = await UserSchema.findOneAndUpdate(
        { telegramId: telegramId },
        { $pull: { cart: { itemId: itemId, size: sizeItem } } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      return res
        .status(200)
        .json({ message: "Товар удален из корзины успешно", userData });
    } catch (error) {
      console.error("Ошибка при удалении товара из корзины:", error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  };

  static addToFavorites = async (req, res) => {
    try {
      const { telegramId, itemId } = req.body;

      if (!telegramId || !itemId) {
        return res.status(400).json({ message: "Ошибка получения информации" });
      }

      const userData = await UserSchema.findOne({ telegramId: telegramId });

      if (!userData) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      userData.favourites.push(itemId);

      await userData.save();

      res.status(200).json({ userData });
    } catch (error) {
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };

  static deleteFromFavorites = async (req, res) => {
    try {
      const { telegramId, itemId } = req.body;

      if (!telegramId || !itemId) {
        return res.status(400).json({ message: "Ошибка получения информации" });
      }

      const userData = await UserSchema.findOne({ telegramId: telegramId });

      if (!userData) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      userData.favourites = userData.favourites.filter(
        (el) => String(el) !== String(itemId)
      );

      await userData.save();

      res.status(200).json({ userData });
    } catch (error) {
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };

  static updateItemCart = async (req, res) => {
    const { telegramId, itemId, count } = req.body;

    if (!telegramId || !itemId || !count) {
      return res.status(400).json({ message: "Ошибка получения информации" });
    }

    console.log(telegramId, itemId, count);

    try {
      const userData = await UserSchema.findOneAndUpdate(
        { telegramId: telegramId, "cart.itemId": itemId },
        { $set: { "cart.$.count": count } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      return res
        .status(200)
        .json({ message: "Корзина обновлена успешно", userData });
    } catch (error) {
      console.error("Ошибка при обновлении корзины:", error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  };

  static getAllSizes = async (req, res) => {
    try {
      const sizes = await SizeSchema.find();

      res.status(200).json(sizes);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    }
  };
  // Импортируем модель товара

  static updateItem = async (req, res) => {
    try {
      const {
        name,
        categoryId,
        description,
        sizesData,
        sale,
        delivery,
        itemId,
      } = req.body;
      console.log(itemId);
      // Обновляем товар по itemId
      const updatedItem = await ItemSchema.findByIdAndUpdate(
        itemId,
        {
          name: name,
          category: categoryId,
          description: description,
          sale: sale,
          deliveryTime: delivery,
          sizes: Object.entries(sizesData).map(([sizeId, count]) => ({
            id: sizeId,
            count: count,
          })),
        },
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ message: "Товар не найден" });
      }

      res.status(200).json(updatedItem);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    }
  };

  static getSize = async (req, res) => {
    try {
      const itemId = req.query.itemId;

      const result = await ItemSchema.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId.createFromHexString(itemId),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryInfo",
          },
        },
        {
          $unwind: "$categoryInfo",
        },
        {
          $unwind: "$sizes",
        },
        {
          $lookup: {
            from: "sizes",
            localField: "sizes.id",
            foreignField: "_id",
            as: "sizeInfo",
          },
        },
        {
          $unwind: "$sizeInfo",
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            category: { $first: "$categoryInfo" },
            photos: { $first: "$photos" },
            price: { $first: "$price" },
            sale: { $first: "$sale" },
            deliveryTime: { $first: "$deliveryTime" },
            description: { $first: "$description" },
            reviews: { $first: "$reviews" },
            sizes: {
              $push: {
                _id: "$sizeInfo._id",
                name: "$sizeInfo.name",
                count: "$sizes.count",
              },
            },
          },
        },
      ]);

      for (const item of result[0].reviews) {
        const tg = item.telegramId;
        const userlol = await UserSchema.findOne({ telegramId: tg });
        const userName = userlol
          ? userlol.firstName + " " + userlol.lastName
          : "Unknown";

        item.telegramId = userName;
      }

      res.status(200).json(result[0]);
    } catch (error) {
      console.error("Error in getSize:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static updatePhotoOfItem = async (req, res) => {
    try {
      const { file } = req;
      const { itemId, photoIndex } = req.body;

      // Формируем URL для доступа к загруженному изображению
      const imageUrl = "https://" + req.get("host") + "/" + file.filename;
      console.log(imageUrl);

      // Найдем и обновим элемент в базе данных
      const item = await ItemSchema.findById(itemId);
      if (!item) {
        return res.status(404).json({ error: "Элемент не найден" });
      }

      // Обновляем ссылку на фотографию
      if (item.photos && item.photos.length > photoIndex) {
        item.photos[photoIndex] = imageUrl;
        await item.save();
        return res
          .status(200)
          .json({ success: true, message: "Ссылка на фотографию обновлена" });
      } else {
        return res.status(400).json({ error: "Неверный индекс фотографии" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Возникла ошибка" });
    }
  };

  static addPhotoOfItem = async (req, res) => {
    try {
      const { file } = req;
      const { itemId } = req.body;

      // Формируем URL для доступа к загруженному изображению
      const imageUrl = "https://" + req.get("host") + "/" + file.filename;
      console.log(imageUrl);

      // Найдем и обновим элемент в базе данных
      const item = await ItemSchema.findById(itemId);
      if (!item) {
        return res.status(404).json({ error: "Элемент не найден" });
      }

      // Добавляем новую ссылку на фотографию в конец массива photos
      item.photos.push(imageUrl);

      // Сохраняем обновленные данные элемента
      await item.save();

      return res
        .status(200)
        .json({
          success: true,
          message: "Ссылка на фотографию добавлена в конец массива",
          imageUrl: imageUrl
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Возникла ошибка" });
    }
  };

  static deleteImageOfItem = async (req, res) => {
    try {
      const { itemId, photoIndex } = req.body;

      if (!itemId || !photoIndex) {
        return res.status(404).json({ error: "Невозможно найти" });
      }

      // Находим элемент в базе данных
      const item = await ItemSchema.findById(itemId);
      if (!item) {
        return res.status(404).json({ error: "Элемент не найден" });
      }

      // Проверяем наличие фотографии с указанным индексом
      if (!item.photos || item.photos.length <= photoIndex) {
        return res.status(404).json({ error: "Фотография не найдена" });
      }

      // Удаляем ссылку из массива photos
      item.photos.splice(photoIndex, 1);

      // Сохраняем обновленные данные элемента
      await item.save();

      return res
        .status(200)
        .json({ success: true, message: "Ссылка на фотографию удалена" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };

  static addSize = async (req, res) => {
    try {
      const sizeData = await SizeSchema.find({ name: req.body.name });

      if (sizeData.length !== 0) {
        return res.status(500).json({ message: "Невозможно добавить размер" });
      }

      const size = await new SizeSchema({
        name: req.body.name,
      });

      await size.save();

      return res.status(200).json({
        ...size,
      });
    } catch (err) {
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };

  static getItemReviews = async (req, res) => {};

  static updateSize = async (req, res) => {};

  static deleteSize = async (req, res) => {};
}
