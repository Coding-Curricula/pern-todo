import React, { useState, useEffect } from 'react'

// CRUD todo component at localhost:8080/api
export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState();
    const [updatedTodo, setUpdatedTodo] = useState();
    const [isChecked, setIsChecked] = useState();

    // useEffect is used to run side effects in React
    // In this case, we want to get our todos from the server when the component mounts
    useEffect(() => {
        getTodos();
    }, []);

    // Function to get the todos from server
    const getTodos = async () => {
        const res = await fetch('http://localhost:8080/api/todos');
        const data = await res.json();
        console.log(data);
        setTodos(data);
    };

    // Function to toggle a todo as complete or incomplete
    const toggleTodo = async (id) => {
        await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: updatedTodo }),
        });
        // Get all the todos after toggling one
        getTodos();
    };

    // Function to delete a todo
    const deleteTodo = async (id) => {
        await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'DELETE',
        });
        // Get all the todos after deleting one
        getTodos();
    };

    // Function to update a todo
    const updateTodo = async (id) => {
        await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: updatedTodo }),
        });
        // Get all the todos after updating one
        getTodos();
        // Set isEditing state to false
        setIsEditing(false);
    };

    // Function to create a todos
    const createTodo = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8080/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: currentTodo }),
        });
        // Get all the todos after creating one
        getTodos();
    };

    // Function to check if a todo is completed to load initial state using isChecked
    const checkIfCompleted = (id) => {
        const todo = todos.find((todo) => todo.id === id);
        return todo.completed;
    };

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={createTodo}>
                <input
                    type="text"
                    placeholder="Add a todo"
                    onChange={(e) => setCurrentTodo(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={checkIfCompleted(todo.id)}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        {isEditing ? (
                            <input
                                type="text"
                                defaultValue={todo.todo}
                                onChange={(e) => setUpdatedTodo(e.target.value)}
                            />
                        ) : (
                            <span>{todo.todo}</span>
                        )}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        {isEditing ? (
                            <button onClick={() => updateTodo(todo.id)}>Update</button>
                        ) : (
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
