import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {config as dotenvConfig} from 'dotenv';
import userController from "./controllers/userController.js"
import categoryController from './controllers/categoryController.js';
import itemController from './controllers/itemController.js';
import {wakeServer} from './utils/ping.js'
import adminController from './controllers/adminController.js';
import espforyouController from './controllers/espforyouController.js';
import orderController from './controllers/orderController.js';
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';

dotenvConfig();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Указываем директорию, куда сохранять файлы
        cb(null, 'media/');
    },
    filename: function (req, file, cb) {
        // Формируем уникальное имя файла
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Добавляем к имени файла оригинальное расширение
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
  
const upload = multer({ storage: storage })

console.log(__dirname)

app.use(express.static('media'));
app.use(express.json());
app.use(cors());
wakeServer();
mongoose.connect(process.env.NODE_DB_URL)
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));



const PORT = process.env.PORT || 4444

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Server is running');
});


//GET

app.get('/')



app.get('/categoryNameFromItemId', categoryController.getCategoryNameByItemId)

app.get('/user', userController.getUser)

app.get('/item', itemController.getItem)

app.get('/category-items', itemController.getItemsByCategory)

app.get('/category', categoryController.getCategory)

app.get('/categories', categoryController.getCategories)

app.get('/notifications', userController.getNotifications)

app.get('/size', itemController.getSize)

app.get('/especiallyforyouadmin', espforyouController.getAllEsp)

app.get('/sizes', itemController.getAllSizes)

app.get('/especiallyforyou', espforyouController.getEspeciallyForYou)

app.get('/getitemcart', userController.getItemCartUser)

app.get('/getuserwithfavorites', userController.getUserWithFavourites)

app.get('/getorders', orderController.getOrders)

app.get('/orders', orderController.getAllOrders)

app.get('/getOrderAccountInfo', orderController.getOrderAccountInfo)

app.get('/users', userController.getAllUsers)

app.get('/items', itemController.getAllItems)

//POST

app.post('/updateitemcart', itemController.updateItemCart)

app.post('/category', categoryController.addCategory)

app.post('/size', itemController.addSize)

app.post('/item', itemController.addItem)

app.post('/notification', adminController.addUserNotification)

app.post('/seenNotification', userController.seenNotification)

app.post('/updateuser', userController.updateUser)

app.post('/especiallyforyou', espforyouController.addEspeciallyForYou)

app.post('/additemcart', userController.addItemCartUser)

app.post('/itemreview', userController.addItemReview)

app.post('/additemtofavorites', itemController.addToFavorites)

app.post('/addorder', orderController.addOrder)

app.post('/deleteFromFavorites', itemController.deleteFromFavorites)

app.post('/updateItemPhoto', upload.single('file'), itemController.updatePhotoOfItem)

app.post('/deleteImageOfItem', itemController.deleteImageOfItem)

app.post('/addImageOfItem', itemController.addPhotoOfItem)

// DELETE

app.post('/deleteItemFromCart', itemController.deleteItemFromCart)

app.post('/updatestatusorder', orderController.updateStatusOrder)

app.put('/updateItemDetails', itemController.updateItem)
