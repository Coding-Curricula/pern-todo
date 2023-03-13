const client = require('./client');
const util = require('util');

// async function to create a new todo
async function createTodo({ todo, completed = false }) {
    try {
        const { rows: [newTodo] } = await client.query(`
            INSERT INTO todos(todo, completed)
            VALUES($1, $2)
            ON CONFLICT (todo) DO NOTHING
            RETURNING *;
        `, [todo, completed]);

        return newTodo;
    } catch (error) {
        throw error;
    }
}

// async function to get all todos
async function getAllTodos() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM todos;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
}

// async function to get a single todo by id
async function getTodoById(id) {
    try {
        const { rows: [todo] } = await client.query(`
            SELECT * FROM todos
            WHERE id=$1;
        `, [id]);

        return todo;
    } catch (error) {
        throw error;
    }
}

// async function to update a todo
async function updateTodoById(id, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [updatedTodo] } = await client.query(`
            UPDATE todos
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(fields));
    
        return updatedTodo;
    } catch (error) {
        throw error;
    }
}


// async function to delete a todo
async function deleteTodoById(id) {
    try {
        const { rows: [deletedTodo] } = await client.query(`
            DELETE FROM todos
            WHERE id=$1
            RETURNING *;
        `, [id]);

        return deletedTodo;
    } catch (error) {
        throw error;
    }
}

// export functions
module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodoById,
    deleteTodoById
};