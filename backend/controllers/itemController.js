import ItemSchema from "../models/item.js";
import SizeSchema from "../models/size.js";

export default class itemController {
  static getItems = async (req, res) => {};

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

      if (itemsFromSelectedCategoryData.length === 0) {
        return res
          .status(404)
          .json({ message: "Нет товаров из данной категории" });
      }

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

  static updateItem = async (req, res) => {};

  static getSize = async (req, res) => {
    try {
      const sizeId = req.query.sizeId;

      if (!sizeId) {
        return res.status(404).json({ message: "Ошибка получения информации" });
      }

      const sizeData = await SizeSchema.findOne({ _id: sizeId });

      if (sizeData.length === 0) {
        return res.status(404).json({ message: "Ошибка получения информации" });
      }

      return res.status(200).json(sizeData);
    } catch (error) {
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };

  static addSize = async (req, res) => {
    try {
      console.log(req.body);

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

  static updateSize = async (req, res) => {};

  static deleteSize = async (req, res) => {};
}
