const { transaction, trip, user, country } = require('../../models')

exports.getTransactions = async (req, res) => {
    try {
        const dataTransaction = await transaction.findAll({
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: [
                            "updatedAt",
                            "createdAt",
                            "profilePicture",
                            "password",
                            "status",
                            "id",
                        ],
                    },
                },
                {
                    model: trip,
                    as: "trip",

                    attributes: {
                        exclude: [
                            "updatedAt",
                            "createdAt",
                            "id",
                            "idCountry",
                        ],
                    },
                    include: {
                        model: country,
                        as: "country",
                        attributes: {
                            exclude: ["updatedAt", "createdAt", "id"],
                        },
                    },
                },
            ],
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "userId",
                    "tripId"
                ]
            }
        });
        res.send({
            status: "success",
            dataTransaction,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "server error",
        });
    }
};

exports.getTransaction = async (req, res) => {
    const { id } = req.params
    try {
        const dataTransaction = await transaction.findOne({
            where: {
                id
            },
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: [
                            "updatedAt",
                            "createdAt",
                            "profilePicture",
                            "password",
                            "status",
                            "id",
                        ],
                    },
                },
                {
                    model: trip,
                    as: "trip",
                    attributes: {
                        exclude: [
                            "updatedAt",
                            "createdAt",
                            "id",
                            "idCountry",
                        ],
                    },
                    include: {
                        model: country,
                        as: "country",
                        attributes: {
                            exclude: ["updatedAt", "createdAt", "id"],
                        },
                    },
                },
            ],
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "userId",
                    "tripId"
                ]
            }
        });
        res.send({
            status: "success",
            dataTransaction,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "server error",
        });
    }
};

exports.addTransaction = async (req, res) => {
    try {
        const dataTransaction = { ...req.body };
        let data = await transaction.create(dataTransaction)
        res.send({
            status: "Success",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Add Transaction is Failed"
        })
    }
}

exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        await transaction.update(req.body, {
            where: {
                id
            }
        })
        res.send({
            status: "Success",
            message: "Update Transaction is Succesfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Update Failed"
        })
    }
}

exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        await transaction.destroy({
            where: {
                id
            }
        })
        res.send({
            status: "Success",
            message: "Deleted is Succesfully"
        })
    } catch (error) {
        res.status(500).send({
            status: "Success",
            message: "Deleted Failed"
        })
    }
}