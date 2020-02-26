const {Router} = require('express')
const config = require('config')
const router = Router()

let test_base ={
    "user": "loh",
    "name": "andrei",
    "triger": true    
};


// /api/register

//http://localhost:5000/api/test_send_data

router.get('/test_send_data',function (req, res){
    try{
        res.send(test_base); //твоя задача отловить это дерьмо
        console.log(test_base);
    }
    catch(e){
        res.status(500).json({massage: "ouu shit"})
    }
});



// /api/login

router.post('/login',async (req, res) => {

        res.send("expectation data");
        console.log("start expectation data")
        //const {email, password} = req.body
        console.log(req.body.mail)
        console.log(req.body.password)

        //для теста можеш швырнуть полную ху*ту
        console.log(req.body.json)
        try{      

            res.send("sacsess");

        }catch(e){
            res.status(500).json({massage: "ouu shit"})
            
        }
    
});


module.exports = router