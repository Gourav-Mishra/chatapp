var express = require('express');
var router = express.Router();
var app = express();
var jwt = require('jsonwebtoken');
var users=require('../controller/userController')
const secret = "sdsfzfdgxfhgjijok3456768990";
const { check, validationResult } = require('express-validator/check');
var usermod = require('../model/user')

var authroute=require('./authroute')
router.use('/auth',authroute);
router.get('/users/messageHistory',users.messageHistory);
router.get('/users/singlemessageDisplay/:recieverId/and/:senderId',users.singlemessageDisplay)
//router.post('/messages',users.message);



/**-----------------   Express login  validations ------------------ */
router.post('/login', [
    check('email').isEmail(),
    check('password').isLength({ min: 2 }),

], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var mail = req.body.email;
    var pass = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
    usermod.find({ 'email': mail, password: pass }, function (err, result) {


        if (err) {
            response = {
                "Success": false,
                "message": "Data not found in database"

            };

            return res.status(400).send(err);


        } else {
            if (result.length > 0) {

                var token = jwt.sign({ email: mail, password: pass }, secret, {
                    // expiresIn: 60 * 60 * 2   // expires in 2 hrs
                });
              var  userId=result[0].id
                var uname=result[0].fname+' '+result[0].lname;
                response = {
                    "Success": true,
                    "message": "Login Sucessfully",
                    "token": token,
                    "userId":userId,
                    "username":uname

                };
                return res.status(200).send(response);
            }
            else {
                response = {
                    "Success": false,
                    "message": "Invalid username/ password"
                };
                return res.status(400).send(response);
            }
        }
    })

})

/**------------------ Express registeration validation ------------------------*/

router.post('/register', [
    check('fname').isAlpha(),
    check('lname').isAlpha(),
    check('email').isEmail(),
    check('password').isLength({ min: 2 }),
    check('phone').isNumeric({ min: 10, max: 10 })
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var db = new usermod(); // object creation
    db.fname = req.body.fname;
    db.lname = req.body.lname;
    db.email = req.body.email;
    db.phone = req.body.phone;

    db.password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');

    var email = req.body.email;
    usermod.find({
        "email": email
    }, function (err, data) {

        if (err) {
            response = {
                "Success": false,
                "message": "Error fetching data"
            };
            return res.status(404).send(response);
        } else {
            if (data.length > 0) {

                var response = {
                    "Success": false,
                    "message": "Credentials already Exist!!",
                };
                return res.status(404).send(response);
            } else {
                console.log(db.fname)
                console.log(db.lname)
                db.save(function (err) {
                    // save() will run insert() command of MongoDB.
                    // it will add new data in collection.
                   
                    if (err) {
                        response = {
                            "Success": false,
                            "message": "Error adding data",
                            "err": err
                        };
                    } else {
                        response = {
                            "Success": true,
                            "message": "Successfully Registed"
                        };
                    }
                    return res.status(200).send(response);
                });
            }
        }
    })

});
app.use('/', router);
module.exports = router;