const db = require('../model')
const User = db.user;
const jwt = require('jsonwebtoken');
const addUser = async (req, res) => {

    const jane = await User.create({ firstName: "mohan", lastName: "sharma" });

    // to create instance we use build()
    // const jane = User.build({ 	firstName: "kava",lastName:"shyam" });
    console.log(jane instanceof User); // true
    console.log(jane.name); // "Jane"

    // await jane.update({firstName: "mohan",lastName:"cow"})
    // await jane.save()

    // jane.set({
    //     firstName: "mohan", lastName: "dog"
    // });
    // await jane.save();

    await jane.destroy();

    // save this newly created instance to database.
    // await jane.save();
    console.log('Jane was saved to the database!');

    console.log(jane.toJSON());
    res.status(200).send(jane.toJSON());
}
const getUsers = async (req, res) => {

    const users = await User.findAll();

    res.status(200).send(users)
}
const getUser = async (req, res) => {
    const data = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    res.status(200).send(data);
}
const createUser = async (req, res) => {
    try {
        const detail = req.body;
        console.log(detail);
        if (detail.length > 1) {
            const add = await User.bulkCreate(detail);
            res.status(200).send(add);
        }
        else {
            const add = await User.create(detail);
            res.status(200).send(add);
        }
    }
    catch {

    }
}
const updateUser = async (req, res) => {
    try {
        const detail = req.body;
        const update = await User.update(detail, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).send(detail);
    } catch (error) {
        console.log(error);
    }
}
const deleteUser = async (req, res) => {
    // Delete everyone named "Jane"
    await User.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).send("user deleted");
}

const userLogin = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    if (user) {
        const payload = {
            id: user.id,
            firstName: req.body.firstName,
        }
        const token = jwt.sign(payload, "shyam", { expiresIn: "2m" });

        res.status(200).send({
            id: user.id,
            token: "Bearer "+token
        });

    }
    else {
        res.status(404).send("user not found");
    }
}


module.exports = {
    addUser,
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    userLogin
};