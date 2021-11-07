const express  = require('express');
const cors = require('cors');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: '*'
}));




app.listen(port, (error) => {
    if(error) {
        console.log(error);
        return;
    }
    console.log(`listening on port ${port}`);
});