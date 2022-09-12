import {Router} from "express";
import onHeaders from "on-headers";
import axios from "axios";

const router = Router();

router.use((req, res, next) => {
    let start = new Date().getTime();
    onHeaders(res, () => {
        let duration = new Date().getTime() - start;
        console.log("Router-level middleware url: " + req.url + " có duration " + duration + "ms");
    })
    next();
})

router.get('/pokemon/list',async (req,res)=>{
    try{
        const url = 'https://pokeapi.co/api/v2/ability/?limit=100&offset=0';
        const response = await axios.get(url);
        const data = response.data;
        if (data) {
            res.status(200).json({ data: data })
        } else {
            res.end('<h1>Error<h1>')
        }
    }catch (err){
        res.status(500).json({
            message : err.message
        })
    }
})

export default router