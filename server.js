import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import {} from "dotenv/config"
import card from './dbCards.js'


//App config
const app = express();
let port = process.env.PORT || '5000';

//middleware
app.use(express.json());
app.use(Cors());

//listener
app.listen(port,()=>console.log(`listening on localhost: ${port}`));

//DB Config
mongoose.connect(process.env.DBURL,{
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