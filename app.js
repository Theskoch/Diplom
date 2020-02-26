const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use('/api', require('./routes/auth.routes'))



const PORT = config.get('port') || 5000


async function start ()
{    
        return app.listen(PORT, () => console.log(`app has been started ${PORT}....`))
}

start ()




