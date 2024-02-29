import CategorySchema from "../models/category.js";
import ItemSchema from '../models/item.js'

export default class categoryController {
  static getCategories = async (req, res) => {
    try {
      const categoriesData = await CategorySchema.find();

      if (!categoriesData) {
        return res.status(404).json({ message: "Ошибка получения информации" });
      }

      res.status(200).json(categoriesData);
    } catch (error) {
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };

  static getCategoryNameByItemId = async (req, res) => {
    try {
      const itemId = req.query.itemId;

      if (!itemId) {
        return res.status(400).json({ message: "Ошибка получения информации" });
      }
      

      const item = await ItemSchema.findOne({ _id: itemId });
      if (!item) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      const category = await CategorySchema.findOne({ _id: item.category });

      if (!category) {
        return res.status(404).json({ message: "Категория не найдена" });
      }

      return res.status(200).json({ categoryName: category.title });
    } catch (error) {
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };

  static getCategory = async (req, res) => {
    try {
      const categoryName = req.query.categoryName;

      if (!categoryName) {
        return res.status(404).json({ message: "Ошибка получения категории" });
      }

      const categoryData = await CategorySchema.findOne({
        title: categoryName,
      });

      if (categoryData.length === 0) {
        return res
          .status(404)
          .json({ message: "Не удалось найти необходимую категорию" });
      }
      res.status(200).json(categoryData);
    } catch (error) {
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };

  static getCategoryItems = async (req, res) => {};

  static deleteCategory = async (req, res) => {};

  static addCategory = async (req, res) => {
    try {
      console.log(req.body);

      const categoryData = await CategorySchema.find({ name: req.body.name });

      if (categoryData.length !== 0) {
        return res
          .status(500)
          .json({ message: "Невозможно добавить категорию" });
      }

      const category = await new CategorySchema({
        title: req.body.name,
        image: req.body.link,
      });

      await category.save();

      return res.status(200).json({
        ...category,
      });
    } catch (err) {
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };
}
