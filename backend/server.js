import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {config as dotenvConfig} from 'dotenv';
import userController from "./controllers/userController.js"
import categoryController from './controllers/categoryController.js';
import itemController from './controllers/itemController.js';
import {wakeServer} from './utils/ping.js'
import adminController from './controllers/adminController.js';

dotenvConfig();

const app = express();

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



app.get('/user', userController.getUser)

app.get('/item', itemController.getItem)

app.get('/categories', categoryController.getCategories)

app.get('/notifications', userController.getNotifications)

//POST

app.post('/category', categoryController.addCategory)

app.post('/size', itemController.addSize)

app.post('/item', itemController.addItem)

app.post('/notification', adminController.addUserNotification)