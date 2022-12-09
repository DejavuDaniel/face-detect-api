import express, { response } from "express";
import handleRegister from "./controllers/handleRegister.js";
import handleSignin from "./controllers/handleSignin.js";
import handleProfile from "./controllers/handleProfile.js";
import images from "./controllers/images.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'danieliuskalinin',
        password: '',
        database: 'smart-brain'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
})

const app = express();

app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt)})


app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })


app.get('/profile/:id', (req, res) => { handleProfile(req, res, db)})


app.put('/image', (req, res) => { images.handleImage(req, res, db)})


app.post('/imageurl', (req, res) => { images.handleApiCall(req, res)})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})

/*
/ --> res = this is working
/signin --> POST = success fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/