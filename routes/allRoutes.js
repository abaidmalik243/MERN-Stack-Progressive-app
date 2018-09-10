const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Category = require('../models/categorySchema');
const Province = require('../models/provinceSchema');
const adSubmit = require('../models/adSchema');
const City = require('../models/citySchema');
const Fvt = require('../models/fvtSchema');

const fs = require('fs-extra')
const formidable = require('formidable');

// adSubmit.findOne({catId:'5b8fcfb1fb6f401378288bea'})
// .populate('catId provinceId', 'name')
// .exec(function(err,record){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log('populate',record)
//     }
// })

router.post('/addUser', (req, res) => {
    // console.log('email is : '+ req.body.email + ' password is : '+ req.body.pwd)
    const user = new User({
        email: req.body.email,
        password: req.body.pwd
    });
    user.save().then(users => {
        if (users) {
            res.send(user);
        }
    }).catch(err => res.send(err));

});

router.post('/checkEmail', (req, res) => {
    console.log('on server check email ',req.body.email);
    const user = new User({ email: req.body.email });
    User.findOne({ email: req.body.email }, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.send(result);
        // if (result === null) {
        //     res.send("Email Available")
        // } else {
        //     res.send('This email address is already registered')
        // }

    });
});

router.post('/login', (req, res) => {
    const user = new User({
        email: req.body.email,
        pwd: req.body.pwd
    });
    User.findOne({ email: req.body.email, password: req.body.pwd }, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (!result) {
            res.send("NO")
        } else {
            res.send(result)
        }

    });
});

router.post('/addCategory', (req, res) => {
    const cat = new Category({
        name: req.body.name,
        image: req.body.image
    });
    cat.save().then(categories => {
        if (categories) {
            res.send(cat);
        }
    }).catch(err => res.send(err));

});

router.get('/getAllCategories', (req, res) => {
    Category.find().then(resp => res.json(resp));
});

router.post('/addProvince', (req, res) => {
    const province = new Province({
        name: req.body.name
    });
    province.save().then(province => {
        if (province) {
            res.send(province);
        }
    }).catch(err => res.send(err));
});

router.get('/getAllProvince', (req, res) => {
    Province.find().then(resp => res.json(resp));
});

router.post('/addCity', (req, res) => {
    const city = new City({
        name: req.body.name,
        provinceId: req.body.provinceId
    });
    city.save().then(city => {
        if (city) {
            res.send(city);
        }
    }).catch(err => res.send(err));
});

router.post('/getAllCities', (req, res) => {
    // console.log(req.body);
    City.find({ provinceId: req.body.provinceId }).then(resp => res.json(resp));
});

router.get('/getAllAds', (req, res) => {
    adSubmit.find().then(resp => res.json(resp));
});

router.post('/category/:cat_id', (req, res) => {
    // console.log(req.body);
    adSubmit.find({ catId: req.body.cat_id }).populate('catId provinceId', 'name').then(resp => { res.json(resp) })
        .catch(err => res.send(err));
});

router.post('/loginAds', (req, res) => {
    // console.log(req.body);
    adSubmit.find({ userId : req.body.userId}).populate('catId provinceId', 'name').then(resp => { console.log(resp); res.json(resp) })
        .catch(err => res.send(err));
});


router.post('/adSubmit', (req, res) => {

    var fileManger = new formidable.IncomingForm();
    // console.log('next')
    fileManger.parse(req, function (err, fields, file) {
        console.log('new all fields ', fields);
        if (err) {
            console.log(err.message)
            res.send(err)
            res.end()
        }

        var myFileName = (new Date).getTime() + file.productImage.name;
        // console.log("filename",myFileName)
        fs.copy(file.productImage.path, './public/uploads/' + myFileName);

        // form data

        const adData = new adSubmit({
            userId: fields.userId,
            titleAd: fields.titleAd,
            catId: fields.catId,
            description: fields.description,
            userName: fields.userName,
            provinceId: fields.provinceId,
            cityId: fields.cityId,
            mobile: fields.mobile,
            modal: fields.modal,
            price: fields.price,
            productImage: myFileName
        });
        // console.log(adData);
        adData.save().then(adData => {
            if (adData) {
                res.send(adData);
            }
        }).catch(err => { res.send(err) });

        //End form data
    })
});

router.delete('/deleteProduct', (req, res) => {
    adSubmit.findByIdAndRemove({ _id: req.body.id }, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json(err);
        }
        res.send(result);
    })
});

router.post('/adDetail', (req, res) => {
    // console.log(req.body.adId);
    adSubmit.findById(req.body.adId).populate('catId provinceId cityId')
        .then(resp => { res.json(resp) }).catch(err => { res.send(err) })
});
router.post('/checkFvt', (req, res) => {
    // console.log('fvt id',req.body.adId);
    // console.log('User id',req.body.userId);
    Fvt.findOne({
        adId: req.body.adId,
        userId: req.body.userId
    }, (err, result) => {
        // console.log(result);
        if (err) {
            return res.status(400).json(err);
        }
        if (result == null) {

            // console.log('not found fvt');
            res.send('not found');
        }
        else {
            // console.log('found fvt');
            res.send('found');
        }
    })
})
router.post('/addFvt', (req, res) => {
    // console.log('fvt id',req.body.adId);
    // console.log('User id',req.body.userId);
    const reqData = {
        adId: req.body.adId,
        userId: req.body.userId
    }
    // check the data of fvt from the db
    Fvt.findOne(reqData, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (!result) {
            // if Ad id and user id already exist in the fvt table in db
            const fvtData = new Fvt(reqData);
            fvtData.save().then(fvt => {
                res.send(fvt);
            }).catch(err => res.send(err));
        } else {
            res.send('error');
            // console.log('This ad id and user id is already exist');
        }
    })

})

router.delete('/removeFvt', (req, res) => {
    const reqData = {
        adId: req.body.adId,
        userId: req.body.userId
    }
    // check the record of fvt and remove it from the db
    Fvt.findOneAndRemove(reqData, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.send(result);
    })

})

router.post('/adDetail', (req, res) => {
    // console.log(req.body.adId);
    adSubmit.findById(req.body.adId).populate('catId provinceId cityId')
        .then(resp => { res.json(resp) }).catch(err => { res.send(err) })
});

router.post('/myFvtAds', (req, res) => {
    console.log('User id',req.body.userId);
    Fvt.find({ userId: req.body.userId }).populate('adId')
    .then(resp => { console.log(resp); res.json(resp)}).catch(err => { res.send(err)})
});

module.exports = router;