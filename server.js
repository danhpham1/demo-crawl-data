const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');



app.get("/", async (req, res) => {
    await mongoose.connect("mongodb+srv://danh:hanhphucao@clusterblog.sbxju.mongodb.net/gamelist?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
        },
    )
    try {
        res.render('index');
    } catch (error) {
        console.log(error);
    }
})

app.get("/data", async (req, res) => {
    const gameListCollection = mongoose.connection.db.collection('gamelist');
    const gameLists = await gameListCollection.find({}).toArray();
    res.json({
        data: gameLists.length > 0 ? gameLists[gameLists.length - 1] : []
    })
})

app.listen(process.env.PORT || 9300, () => {
    console.log("server start")
});