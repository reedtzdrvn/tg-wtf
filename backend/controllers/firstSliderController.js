import firstSliderSchema from "../models/firstSlider.js";

export default class firstSliderController {
  static getAllImages = async (req, res) => {
    try {
      const images = await firstSliderSchema.find({});

      res.status(200).json(images);
    } catch (error) {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    }
  };

  static addImage = async (req, res) => {
    try {
      const { file } = req;

      // Формируем URL для доступа к загруженному изображению
      const imageUrl = "https://" + req.get("host") + "/" + file.filename;

      // Создаем новый объект в базе данных с ссылкой на загруженное изображение
      const newImage = await firstSliderSchema.create({ imageUrl });

      // Отправляем клиенту успешный ответ с информацией о созданном объекте
      res.status(200).json({
        success: true,
        message: "Изображение успешно добавлено",
        image: newImage,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Произошла ошибка при добавлении изображения",
      });
    }
  };

  static updateImageFirstSlider = async (req, res) => {
    try {
      const { file } = req;
      const { photoIndex } = req.body;

      // Формируем URL для доступа к загруженному изображению
      const imageUrl = "https://" + req.get("host") + "/" + file.filename;

      // Находим изображение по индексу
      const images = await firstSliderSchema.find({});
      const imageToUpdate = images[photoIndex];

      // Проверяем, что изображение существует
      if (!imageToUpdate) {
        return res
          .status(404)
          .json({ success: false, error: "Изображение не найдено" });
      }

      // Обновляем ссылку на изображение
      imageToUpdate.imageUrl = imageUrl;

      // Сохраняем обновленное изображение в базе данных
      await imageToUpdate.save();

      res.status(200).json({
        success: true,
        message: "Изображение успешно обновлено",
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Произошла ошибка при обновлении изображения",
      });
    }
  };

  static deleteImageFromFirstSlider = async (req, res) => {
    try {
      const { photoIndex } = req.body;

      if (!photoIndex) {
        return res.status(404).json({ error: "Невозможно найти" });
      }

      // Находим все изображения в базе данных
      const images = await firstSliderSchema.find({});
      if (!images) {
        return res.status(404).json({ error: "Элементы не найдены" });
      }

      // Проверяем наличие фотографии с указанным индексом
      if (images.length <= photoIndex) {
        return res.status(404).json({ error: "Фотография не найдена" });
      }

      // Удаляем фотографию из базы данных
      await firstSliderSchema.deleteOne({ _id: images[photoIndex]._id });

      return res
        .status(200)
        .json({ success: true, message: "Ссылка на фотографию удалена" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Возникла ошибка" });
    }
  };
}
