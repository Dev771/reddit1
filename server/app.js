import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import postRoutes from './router/postRoutes.js';
import tagRoutes from './router/tagRoutes.js';
import userRoutes from './router/userRoutes.js';

const app = express();

app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/tag', tagRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 8080;
const ConnectionURL = "mongodb+srv://Dev771:763200%40De@cluster0.3i0ib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(ConnectionURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {console.log("Connection Successful At PORT ", PORT)}))
    .catch((error) => console.log(error.message));