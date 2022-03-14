const express = require('express');
const fileUL = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3001;

//const cloudinary = require('cloudinary').v2;
const cloudinary = require('cloudinary');
//cloudinary.config({
//  cloud_name: process.env.CLOUD_NAME,
//  api_key: process.env.API_KEY,
//  api_secret: process.env.API_SECRET
//});

cloudinary.config({
    cloud_name: 'dy1qjuhnr',
    api_key: '288367858446519',
    api_secret: 'bS2OBx0yWyA8KhBKv4-aExvq5zQ'
});


app.use(fileUL({
    useTempFiles : true,
    tempFileDir : '/images'
}));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/post', (req, res) => {

    console.log(req.files.sampleFile);
    let data = {
        image: req.files.sampleFile
    }

    /*
    const delay = (n) => {
        return new Promise(resolve => {
            setTimeout(resolve, n*1000);
        });
    }
    const myDelay = async () => {
        await delay(10);
    }

    */

    let fileName = req.files.sampleFile;
    let path = __dirname + '/images/' + fileName.name;
    /*
        const moveFile = async () => {
            await fileName.mv(path, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        }
        
     moveFile();
    
     */


    fileName.mv(path, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    }); 

    
    //myDelay();
    // upload image here
    console.log(data.image);
    //cloudinary.uploader.upload(path)
    //cloudinary.uploader.upload(path, function(error, result) {console.log(result, error)})
    cloudinary.uploader.upload(path, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        return (result)
    })

        .then((result) => {
            res.status(200).send({
                message: "success",
                result,
            })
            var data = res.json();
            
            fs.unlink(path, (err, result) => {
                if (err) {
                    throw err;
                }
                console.log("File: " + path + " removed");
                //return (result);
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "failure",
                error,
            });
        });
});


app.listen(port, () => console.log("Application on port: " + port));

