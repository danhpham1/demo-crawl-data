const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.get("/",async (req,res)=>{
    try {
        await mongoose.connect("mongodb+srv://danh:hanhphucao@clusterblog.sbxju.mongodb.net/gamelist?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
            },
        )
        const gameListCollection = mongoose.connection.db.collection('gamelist');
        const gameLists = await gameListCollection.find({}).toArray();
        console.log(gameLists[1].data)
        res.render('index',{gameLists: gameLists.length > 0 ? gameLists[gameLists.length -1].data : []});
    } catch (error) {
        console.log(error);
    }
})

app.listen(9300,() => {
    console.log("server start")
});