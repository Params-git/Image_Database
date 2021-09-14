const express = require("express");
const app = express();
const path = require("path");
require("../db/conn");
const imageUpload = require("../image/image");
var multer = require('multer');

const port = process.env.PORT || 8000;
const static_path = path.join();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(static_path));
app.set('view engine', 'hbs');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });


app.get('/', (req, res) => {
    imageUpload.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('index', { items: items });
        }
    });
});

app.post('/', upload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imageUpload.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});


app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});