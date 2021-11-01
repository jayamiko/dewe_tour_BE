const { trip, country } = require("../../models");

exports.getTrips = async (req, res) => {
    try {
        const dataCountry = await trip.findAll({
            include: {
                model: country,
                as: "country",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "id"],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "idCountry"],
            },
        });

        res.send({
            status: "success",
            dataCountry,
        });
    } catch (error) {
        console.log(error),
            res.status(500).send({
                status: "failed",
                message: "server error",
            });
    }
};

exports.getTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const dataCountry = await trip.findOne({
            where: { id },
            include: {
                model: country,
                as: "country",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "id"],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "idCountry"],
            },
        });

        res.send({
            status: "success",
            dataCountry,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error",
        });
    }
};

exports.addTrip = async (req, res) => {
    try {
        const dataCountry = req.body
        const data = await trip.create(dataCountry);
        console.log(dataCountry);
        res.send({
            status: "Success",
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            satus: "Failed",
            message: "Server Error",
        });
    }
};

exports.updateTrip = async (req, res) => {
    const { id } = req.params;
    try {
        await trip.update(req.body, {
            where: {
                id
            }
        })
        res.send({
            status: "Success",
            message: "Update Trip is Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Add Trip Failed"
        })
    }
}

exports.deleteTrip = async (req, res) => {
    const { id } = req.params;
    try {
        await trip.destroy({
            where: {
                id
            }
        })
        res.send({
            status: "Success",
            message: "Delete Trip is Succesfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Delete Trip Failed"
        })
    }
}