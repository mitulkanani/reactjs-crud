const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Todo = require('../models/todo');

// POST /api/todos
// Add new todo
router.post('/add-todo', auth, async (req, res) => {
    const { title, description } = req.body;
    const { userId } = req;

    try {
        const todo = new Todo({ title, description, user: userId });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', auth, async (req, res) => {
    const { title, description } = req.body;
    const { userId } = req;
    const { id } = req.params;

    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: id, user: userId },
            { title, description },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    const { userId } = req;
    const { id } = req.params;

    try {
        const todo = await Todo.findOneAndDelete({ _id: id, user: userId });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Fetch all todos
router.get('/all-todo', auth, async (req, res) => {
    console.log(req, "req");
  try {
    const { userId } = req;
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


module.exports = router;
