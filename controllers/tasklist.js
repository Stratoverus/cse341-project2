const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["Tasklist"]
    try {
        const tasks = await mongodb.getDatabase().db('cse341Project2').collection('tasklist').find().toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=["Tasklist"]
    try {
        const taskId = new ObjectId(req.params.id);
        const task = await mongodb.getDatabase().db('cse341Project2').collection('tasklist').findOne({ _id: taskId });
        
        if (!task) {
            return res.status(404).json({ message: "Task not found!" })
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(task);
    } catch {
        res.status(500).json({ error: err.message });
    }
};

const addTask = async (req, res) => {
    //#swagger.tags=["Tasklist"]
    try {
        const now = new Date();
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority || "low",
            completed: req.body.completed || false,
            category: req.body.category,
            createdAt: now,
            updatedAt: now
        };

        const result = await mongodb.getDatabase().db('cse341Project2').collection('tasklist').insertOne(newTask);
        
        if (result.acknowledged) {
            res.status(201).json({ message: "Task has been created!" });
        } else {
            res.status(500).json({ error: "An error occured while inserting." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTask = async (req, res) => {
    //#swagger.tags=["Tasklist"]
    /*#swagger.parameters['body'] = {
      in: 'body',
      description: 'Fields to update (any subset)',
      schema: {
        title: "any",
        description: "any",
        dueDate: "any",
        priority: "any",
        completed: "any",
        category: "any"
      }
    }
    */
    try {
        const taskId = new ObjectId(req.params.id);
        const exists = await mongodb.getDatabase().db('cse341Project2').collection('tasklist').findOne({ _id: taskId})

        if (!exists) {
            return res.status(404).json({ message: "Task not found."})
        }
        
        // Making it so that they can't updated the createdAt field
        const updates = {};
        const updatableFields = ['title', 'description', 'dueDate', 'priority', 'completed', 'category']
        updatableFields.forEach((f) => {
            if (Object.prototype.hasOwnProperty.call(req.body, f)) {
                updates[f] = req.body[f];
            }
        });

        updates.updatedAt = new Date();

        const result = await mongodb.getDatabase().db('cse341Project2').collection('tasklist').updateOne({ _id: taskId }, { $set: updates } )
        
        if (result.modifiedCount > 0) {
            res.status(204).json({ message: "Task was updated." });
        } else {
            res.status(204).json({ message: "Task was not updated, maybe nothing changed?" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteTask = async (req, res) => {
    //#swagger.tags=["Tasklist"]
    try {
        const taskId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('cse341Project2').collection('tasklist').deleteOne({ _id: taskId });

        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAll, getSingle, addTask, updateTask, deleteTask };