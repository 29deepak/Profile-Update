const UserModel = require('../models/register');
const JWT = require('jsonwebtoken');
const { query } = require('../utils/database');
const otpGenerator = require('otp-generator')

function findToken(id, name) {
    return JWT.sign({ username: name, userId: id }, "secretkey", { expiresIn: "24h" })
}
/** middleware for verify user */
exports.verifyUser = async (req, res, next) => {
    try {

        const { username } = req.method == "GET" ? req.query : req.body;
        // check the user existance
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}

exports.register = async (req, res) => {

    try {
        console.log(req.body)
        const { email, username, password, profile } = req.body
        console.log(email, username, password)
        const exitsUsername = await new Promise(async (resolve, reject) => {
            const usernameExist = await UserModel.findAll({ where: { username } })
            if (usernameExist.length > 0) {
                reject({ error: "please use unique username" })
            }
            resolve()
        })
        console.log("----------------------------------")
        const exitsEmail = await new Promise(async (resolve, reject) => {
            const emailExist = await UserModel.findAll({ where: { email } })
            console.log(emailExist)
            if (emailExist.length > 0) {
                reject({ error: "please use unique Email" })
            }
            resolve()
        })
        Promise.all([exitsUsername, exitsEmail])
            .then(() => {
                if (password) {
                    UserModel.create({ username: username, email: email, password: password, profile: profile })
                    return res.status(201).json({ msg: "user registartion succesfullly" })
                }
            }).catch(error => {
                return res.status(500).json({
                    error: { error }
                })
            })
    } catch (err) {
        return res.status(500).json({ err: err })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingEmail = await UserModel.findAll({ where: { username } })
        if (existingEmail.length <= 0) {
            return res.status(500).json({ message: "user's doesn't exist" })
        }
        else {
            if (existingEmail[0].password !== password) {
                return res.status(500).json({ message: "incorrect password" })
            }
            else if (existingEmail[0].password === password) {
                return res.status(200).json({ message: "user login succesfully", token: findToken(existingEmail[0].id, existingEmail[0].username) })
            }
        }
    }
    catch (err) {
        return res.status(500).json({ err: err })
    }
}


/** get */
exports.getUser = async (req, res) => {

    try {
        const { username } = req.params;

        if (!username) return res.status(501).send({ error: "Invalid Username" });
        const existingUsername = await UserModel.findAll({ where: { username } });
        console.log(existingUsername)
        if (!existingUsername) {
            return res.status(501).send({ error: "Couldn't Find the User" })
        }
        else {
            console.log("-----------------------------")
            const { password, ...rest } = Object.assign({}, existingUsername[0].dataValues)
            console.log(rest, password)
            return res.status(201).json(rest)
        }


    } catch (error) {
        return res.status(404).send({ error: "Cannot Find User Data" });
    }
}




/**update */

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log(userId)
        if (userId) {
            const body = req.body;
            UserModel.update(body, { where: { id: userId } }).then(() => {
                return res.status(201).send({ msg: "Record Updated...!" });
            })

        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}

/**generate otp */

exports.generateOtp = async (req, res) => {
    //6 is length
    console.log("-------------------------------------------------------------------------")
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).json({ code: req.app.locals.OTP })
}
exports.verifyOtp = async (req, res) => {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true
        return res.status(201).json({ msg: "verify successful" })
    }
    return res.status(400).json({ error: "invalid otp" })
}

exports.createResetSession = async (req, res) => {
    if (req.app.locals.resetSession) {
        console.log("rfvhjcdf nnm")
        return res.status(201).json({ flag: req.app.locals.resetSession })
    }
    return res.status(440).json({ error: "Session expired!" })
}

exports.resetPassword = async (req, res) => {
    console.log('--------------verifyuser--------')
    // console.log(req.app.locals.resetSession)

    // if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });

    const { username, password } = req.body;
    console.log(username, password)

    try {
        console.log("---------------------------abcccc--------------------------")
        UserModel.findAll({ where: { username } }).then((user) => {
            UserModel.update({ password: password }, { where: { username: user[0].username } }).then((res) => {
                // req.app.locals.resetSession = false
                // console.log("---------------------fvfdsx-----", req.app.locals.resetSession)
                return res.status(201).json({ msg: "password reset successfully" })

            }).catch((err) => {
                return res.status(400).json({ err: err, msg: "someyhing wrong" })
            })
        }).catch((error) => {
            return res.status(404).send({ error: "Username not Found" });
        })
    } catch (error) {
        return res.status(401).json({ error })
    }
}


