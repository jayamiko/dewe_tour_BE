const { user } = require('../../models');


exports.getUsers = async (req, res) => {
    try {
        let dataUser = await user.findAll({
            attributes: {
                exclude: ["updatedAt", "createdAt"]
            }
        })
        res.send({
            status: "success",
            dataUser,
        })
    } catch (error) {
        console.log(error);
        res.status(500), send({
            status: "failed",
            message: "Server Error"
        })
    }
}

exports.getUser = async (req, res) => {
    const { id } = req.params
    try {
        let dataUser = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["updatedAt", "createdAt"]
            }
        })
        res.send({
            status: "success",
            dataUser
        })
    } catch (error) {
        console.log(error);
        res.status(500), send({
            status: "failed",
            message: "Server Error"
        })
    }
}

exports.addUsers = async (req, res) => {
    try {
        await user.create(req.body)
        res.send({
            status: "success",
            message: "Add User Succesfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500), send({
            status: "failed",
            message: "Server Error"
        })
    }
}
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        await user.update(req.body, {
            where: {
                id
            }
        })
        res.send({
            status: "Success",
            message: "Update is Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500), send({
            status: "failed",
            message: "Server Error"
        })
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        await user.destroy({
            where: {
                id
            }
        })
        res.send({
            status: "success",
            message: "Deleted Succesfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500), send({
            status: "failed",
            message: "Deleted is Failed"
        })
    }
}