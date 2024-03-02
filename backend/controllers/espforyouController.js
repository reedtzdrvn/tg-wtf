import EspeciallyForYouSchema from "../models/especiallyforyou.js";
import UserSchema from "../models/user.js";

export default class espforyouController {

    static getEspeciallyForYou = async (req, res) => {
        try {
            const esp_id = req.query.espId;
      
            if (!esp_id) {
              return res.status(404).json({ message: "Ошибка получения информации" });
            }
      
            const espData = await EspeciallyForYouSchema.findById(esp_id);
         
            if (!espData) {
              return res.status(404).json({ message: "Ошибка получения информации" });
            }
            res.json(espData);
          } catch (e) {
            console.log(e);
            res.status(500).json({ error: e, message: e.message });
          }
    }

    static deleteCartItem = async (req, res) => {

    }

    static addEspeciallyForYou = async (req, res) => {
        try {
    
            const esp = await new EspeciallyForYouSchema({
                address: req.body.address,
                information: req.body.information,
                date: new Date(),
            });
    
            await esp.save();

            const esp_id = esp._id
            const tg_id = req.body.telegramId

            const userData =  await UserSchema.findOneAndUpdate({telegramId: tg_id}, { $push: { especiallyForYou: esp_id } }, {new: true});
            
            return res.status(200).json({
            ...esp,
            });
        } 
        catch (err) {
            res.status(500).json({
            error: "Возникла ошибка",
            });
        }
    }
}