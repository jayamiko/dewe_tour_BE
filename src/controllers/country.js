const { country } = require('../../models')

exports.getCountries = async (req, res) => {
    try {
        const countries = await country.findAll({
            attributes: ["id", "name"]
        })

        res.send({
            status: "success",
            countries
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "No data found"
        })
    }
}

exports.getCountry = async (req, res) => {
    try {
        const { id } = req.params
        const dataCountry = await country.findOne({
            where: {
                id
            },
            attributes: ["id", "name"]
        })

        res.send({
            status: "success",
            dataCountry
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "No data found"
        })
    }
}

exports.addCountry = async (req, res) => {
    try {
        await country.create(req.body)
        res.send({
            status: "success",
            message: "Add country finished"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.updateCountry = async (req, res) => {
    try {
        const { id } = req.params;
        await country.update(req.body, {
            where: { id },
        });
        res.send({
            status: "success",
            message: `update country id ${id} success`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error",
        });
    }
};

exports.deleteCountry = async (req, res) => {
    try {
        const { id } = req.params
        await country.destroy({
            where: {
                id
            }
        })
        res.send({
            status: "Success",
            message: "Deleted Country is Succesfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Deleted Country is Failed"
        })
    }
}