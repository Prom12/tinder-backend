import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'

import card from './dbCards.js'
const connection_url = "mongodb+srv://dbUser:go95jQCINFHlxcDN@cluster0.pgoba.mongodb.net/Tinder?retryWrites=true&w=majority"

//App config
const app = express();
let port = process.env.PORT || '3000';

//middleware
app.use(express.json());
app.use(Cors());

//listener
app.listen(port,()=>console.log(`listening on localhost: ${port}`));

//DB Config
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
  })
    
app.get('/', (req,res,next)=>{
    res.status(200).send('Romeo')
})

app.post('/card',(req,res)=>{
    const dbCard = req.body;

    card.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.get('/card',(req,res)=>{
    card.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})