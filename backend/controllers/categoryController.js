import CategorySchema from "../models/category.js";
import ItemSchema from "../models/item.js";

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

  static updateImageCategory = async (req, res) => {
    try {
      const { file } = req;
      const { categoryId } = req.body;

      // Проверяем, существует ли категория с указанным categoryId
      const category = await CategorySchema.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Категория не найдена" });
      }

      // Обновляем ссылку на изображение
      const imageUrl = "https://" + req.get("host") + "/" + file.filename;
      category.image = imageUrl;

      // Сохраняем изменения в базе данных
      await category.save();

      res
        .status(200)
        .json({
          success: true,
          message: "Изображение успешно обновлено",
          imageUrl,
        });
    } catch (error) {
      // Если произошла ошибка, отправляем соответствующий статус и сообщение об ошибке
      console.error(error);
      res.status(500).json({
        error: "Возникла ошибка при обновлении изображения категории",
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

  static deleteCategory = async (req, res) => {
    const { categoryId } = req.body;

    try {
        // Удаление категории по categoryId
        await CategorySchema.findByIdAndDelete(categoryId);
        
        // Удаление всех айтемов из этой категории
        await ItemSchema.deleteMany({ category: categoryId });

        res.status(200).json({ success: true, message: "Категория и все ее айтемы успешно удалены" });
    } catch (error) {
        console.error("Ошибка при удалении категории и айтемов:", error);
        res.status(500).json({ error: "Ошибка при удалении категории и айтемов" });
    }
  };

  static addCategory = async (req, res) => {
    try {
      console.log(req.body);
      const { file } = req;
      const { title } = req.body;

      const categoryData = await CategorySchema.find({ name: title });

      if (categoryData.length !== 0) {
        return res
          .status(500)
          .json({ message: "Невозможно добавить категорию" });
      }

      const imageUrl = "https://" + req.get("host") + "/" + file.filename;

      const category = await new CategorySchema({
        title: title,
        image: imageUrl,
      });

      await category.save();

      return res.status(200).json(category);
    } catch (err) {
      res.status(500).json({
        error: "Возникла ошибка",
      });
    }
  };
}
