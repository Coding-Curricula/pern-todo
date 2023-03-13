const express = require('express');
const router = express.Router();

const { getAllTodos, getTodoById, createTodo, updateTodoById, toggleTodoById, deleteTodoById } = require('../db');

// GET - /api/todos - get all todos
router.get('/', async (req, res, next) => {
    try {
        const todos = await getAllTodos();
        res.send(todos);
    } catch (error) {
        next(error);
    }
});

// GET - /api/todos/:id - get a single todo by id
router.get('/:id', async (req, res, next) => {
    try {
        const todo = await getTodoById(req.params.id);
        res.send(todo);
    } catch (error) {
        next(error);
    }
});

// POST - /api/todos - create a new todo
router.post('/', async (req, res, next) => {
    try {
        // destructuring the todo and completed properties from the request body
        const { todo, completed } = req.body;

        // create a new todo
        const newTodo = await createTodo({
            todo,
            completed
        });

        // send the new todo back to the client
        res.send(newTodo);
    } catch (error) {
        next(error);
    }
});

// PATCH - /api/todos/:id - update a todo
router.patch('/:id', async (req, res, next) => {
    try {
        const todo = await updateTodoById(req.params.id, req.body);
        res.send(todo);
    } catch (error) {
        next(error);
    }
});

// PATCH - /api/todos/:id/toggle - toggle a todo
router.patch('/:id/toggle', async (req, res, next) => {
    try {
        const todo = await toggleTodoById(req.params.id);
        res.send(todo);
    } catch (error) {
        next(error);
    }
});


// DELETE - /api/todos/:id - delete a todo
router.delete('/:id', async (req, res, next) => {
    try {
        const todo = await deleteTodoById(req.params.id);
        res.send(todo);
    } catch (error) {
        next(error);
    }
});

module.exports = router;