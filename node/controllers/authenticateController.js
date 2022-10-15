var jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

exports.login = async (req, res) => {
    try {
        if (req.body.username.toLowerCase() == 'admin' && req.body.password == "password123") {
            var token = jwt.sign({ id: req.body.username }, authConfig.secret, {
                expiresIn: 1800, // 30 minites
            });
            return res.status(200).send({
                expiresIn: 1800,
                token,
            });
        } else {
            return res.status(401).send({
                status: false,
                errors: {
                    error: "incorrect email or password",
                },
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            errors: {
                error: "internal server error",
            },
        });
    }
};
