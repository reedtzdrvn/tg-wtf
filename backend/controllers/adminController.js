import NotificationSchema from "../models/notification.js"

export default class adminController {

    addNotification = async (req, res) => {
        try {
            console.log(req.body)

            const notificationData = await NotificationSchema.find({name: req.body.name});

            if (notificationData.length!==0) {
                return res.status(500).json({ message: 'Невозможно добавить уведомление' });
            }

            const notification = await new NotificationSchema({
                name: req.body.name,
                date: req.body.date,
            })

            await notification.save();
    
            return (res.status(200).json({
                ...notification
            }))

        } catch (err) {
            res.status(500).json({
                error: "Возникла ошибка"
            })
        }
    }

    deleteNotification = async (req, res) => {

    }




}
