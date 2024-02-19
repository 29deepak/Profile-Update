exports.localVariables = async (req, res, next) => {
    console.log("-----------------------------------")
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next()
}