const client = require('./client');

const { createTodo } = require('./');

// drop all tables if any exist
async function dropTables() {
    try {
        console.log("Starting to drop tables...");
        await client.query(`
            DROP TABLE IF EXISTS todos;
            `);
        console.log("Finished dropping tables!");
    } catch (error) {
        throw error;
    }
}

// async function to create artists, songs, and artists_songs tables
async function createTables() {
    try {
        console.log("Starting to build tables...");

        await client.query(`
        CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            todo VARCHAR(255) NOT NULL,
            completed BOOLEAN DEFAULT false,
            CONSTRAINT todos_todo_unique UNIQUE (todo)
        );
            `);

        console.log("Finished building tables!");
    } catch (error) {
        throw error;
    }
}

// async function to create initial users
async function createInitialTodos() {
    console.log("Starting to create initial todos...");

    try {
        const todosToCreate = [
            {todo: "Learn SQL"},
            {todo: "Learn Express"},
            {todo: "Learn React"},
        ];

        const todos = await Promise.all(todosToCreate.map(createTodo));
    }
    catch (error) {
        throw error;
    }
    console.log("Finished creating initial todos!");
}


// rebuild function to drop tables, create tables, and create initial users
async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialTodos();


    } catch (error) {
        throw error;
    }
}

// export rebuildDB function
module.exports = {
    rebuildDB
}