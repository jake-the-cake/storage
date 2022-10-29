var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Express from 'express';
import Mongoose from 'mongoose';
import cors from 'cors';
const APP = Express();
const PORT = process.env.PORT || 4200;
Mongoose
    .connect('mongodb://localhost:27017/server')
    .then(() => {
    console.log('db');
})
    .catch((error) => {
    console.log(error.message);
});
const ItemSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const ItemModel = Mongoose.model('Items', ItemSchema);
APP.use(cors());
APP.use(Express.json());
APP.use(Express.urlencoded({ extended: true }));
APP.get('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ItemModel.find();
    res.status(200).json(data);
}));
APP.post('/add', (req, res) => {
    console.log('this is hit');
    const item = new ItemModel({
        name: req.body.name
    });
    item.save();
    res.status(201).json(item);
});
APP.listen(PORT, () => {
    console.log(`Server live on port ${PORT}.`);
});
