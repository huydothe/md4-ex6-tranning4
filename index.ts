import express from "express";
import bodyParser from "body-parser";
import {responseTime} from "./src/middleware/responseTime";
import axios from "axios";
import router from "./src/router/router";


const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(responseTime);

app.get('/', async (req,res)=>{
    try{
        const url = 'https://pokeapi.co/api/v2/ability/?limit=100&offset=0';
        const response = await axios.get(url);
        const data = response.data
        if(data){
            res.status(200).json({
                data : data
            })
        }else {
            res.end("<h2>Error</h2>");
        }
    }catch (err){
        res.status(500).json({
            message : 'Error'
        })
    }
})

app.use(router)



app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})