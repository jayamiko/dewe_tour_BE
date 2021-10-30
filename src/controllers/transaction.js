const { transaction, trip, user } = require('../../models')


exports.getTransacion = async (req, res) => {
    try {
        const dataTransaction = await transaction.findAll({
            include: {
                model: trip,
                as: "trip",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idCountry"]
                },
                model: user,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"]
                }
            },

            attributes: {
                exclude: ["createdAt", "updatedAt", "userId", "tripId"]
            }
        })
        res.send({
            status: "Success",
            dataTransaction
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error"
        })
    }
}

exports.addTransaction = async (req, res) => {
    try {
        const dataTransaction = req.body
        await transaction.create(dataTransaction)
        res.send({
            status: "Success",
            message: "Add Transaction is Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Add Transaction is Failed"
        })
    }
}

