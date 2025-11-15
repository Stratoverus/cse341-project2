const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["Users"]
    try {
        const users = await mongodb.getDatabase().db('cse341Project2').collection('users').find().toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=["Users"]
    try {
        const userId = new ObjectId(req.params.id);
        const user = await mongodb.getDatabase().db('cse341Project2').collection('users').findOne({ _id: userId });
        
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    } catch {
        res.status(500).json({ error: err.message });
    }
};

const addUser = async (req, res) => {
    //#swagger.tags=["Users"]
    try {
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            role: req.body.role || "basic"
        };

        const result = await mongodb.getDatabase().db('cse341Project2').collection('users').insertOne(newUser);
        
        if (result.acknowledged) {
            res.status(201).json({ message: "User has been created!" });
        } else {
            res.status(500).json({ error: "An error occured while inserting." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=["Users"]
    /*#swagger.parameters['body'] = {
      in: 'body',
      description: 'Fields to update (any subset)',
      schema: {
        firstName: "any",
        lastName: "any",
        userName: "any",
        role: "any"
      }
    }
    */
    try {
        const userId = new ObjectId(req.params.id);
        const exists = await mongodb.getDatabase().db('cse341Project2').collection('users').findOne({ _id: userId})

        if (!exists) {
            return res.status(404).json({ message: "User not found."})
        }
        
        // Making it so that there can be fields in the future they can't update
        const updates = {};
        const updatableFields = ['firstName', 'lastName', 'userName', 'role']
        updatableFields.forEach((f) => {
            if (Object.prototype.hasOwnProperty.call(req.body, f)) {
                updates[f] = req.body[f];
            }
        });

        const result = await mongodb.getDatabase().db('cse341Project2').collection('users').updateOne({ _id: userId }, { $set: updates } )
        
        if (result.modifiedCount > 0) {
            res.status(204).json({ message: "User was updated." });
        } else {
            res.status(204).json({ message: "User was not updated, maybe nothing changed?" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=["Users"]
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('cse341Project2').collection('users').deleteOne({ _id: userId });

        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAll, getSingle, addUser, updateUser, deleteUser };