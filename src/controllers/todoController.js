const todoModel = require("../models/todo.js");

const createTodo = async (req, res) => {
    const { title, description, schedule } = req.body;

    const newTodo = new todoModel({
        title: title,
        description: description,
        schedule: schedule,
        userId: req.userId
    });

    try {
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updateTodo = async (req, res) => {
    const id = req.params.id;

    const { title, description, schedule } = req.body;
    const newTodo = {
        title: title,
        description: description,
        schedule: schedule,
        userId: req.userId
    }

    try {
        const updatedTodo = await todoModel.findByIdAndUpdate(id, newTodo, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json(updatedTodo);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const deleteTodo = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedTodo = await todoModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(202).json(deletedTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getTodo = async (req, res) => {
    try {
        const todos = await todoModel.find({ userId: req.userId });
        res.status(200).json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodo
}