import CategorySchema from "../models/category.js"

export default class categoryController {

    static getCategories = async (req, res) => {
        const categoriesData = await CategorySchema.find()

        if (!categoriesData) {
            return res.status(404).json({ message: 'Ошибка получения информации' });
        }

        res.status(200).json(categoriesData);
    }

    static getCategory = async (req, res) => {

    }

    static getCategoryItems = async (req, res) => {

    }

    static deleteCategory = async (req, res) => {

    }

    static addCategory = async (req, res) => {
        try {

            console.log(req.body)

            const categoryData = await CategorySchema.find({name: req.body.name});

            if (categoryData.length!==0) {
                return res.status(500).json({ message: 'Невозможно добавить категорию' });
            }

            const category = await new CategorySchema({
                title: req.body.name,
                image: req.body.link,
            })

            await category.save();
    
            return (res.status(200).json({
                ...category
            }))

        } catch (err) {
            res.status(500).json({
                error: "Возникла ошибка"
            })
        }
    }

    
}
