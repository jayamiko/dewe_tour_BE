const { trip, country } = require("../../models");
const joi = require("joi");

exports.getTrips = async (req, res) => {
    try {
        const data = await trip.findAll({
            include: {
                model: country,
                as: "country",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "id"],
                },
            },
            attributes: {
                exclude: ["idCountry"],
            },
        });

        res.send({
            status: "success",
            data,
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
        const { id } = req.params
        const data = await trip.findOne({
            where: {
                id
            }
        })

        res.send({
            status: "success",
            data
        })
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.addTrip = async (req, res) => {
    try {
        const allTrip = await trip.findAll()
        const isAlreadyExist = allTrip.find(field => req.body.title === field.title)

        const { image } = req.files
        const allImage = []
        for (let img of image) {
            allImage.push("http://localhost:5000/uploads/" + img.filename)
        }

        const imageFileToString = JSON.stringify(allImage)

        if (isAlreadyExist) {
            return res.status(400).send({
                status: "failed",
                message: "Trip name already exist"
            })
        }

        const data = await trip.create({
            ...req.body,
            image: imageFileToString
        })

        res.send({
            status: "success",
            message: "Add trip finished",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.deleteTrip = async (req, res) => {
    try {
        const { id } = req.params;
        await trip.destroy({
            where: { id },
        });
        res.send({
            status: "success",
            message: `delete trip id ${id} success`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error",
        });
    }
};