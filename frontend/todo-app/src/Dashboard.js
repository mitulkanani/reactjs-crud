import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './components/TodoItem';
import "./App.css";
import AddEdit from './components/AddEdit';
const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => {
    setIsOpen(true);
  }
  const closePopus = () => {
    setIsOpen(false);
  }
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:3000/todo/all-todo', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTodos(response.data);
    }

    fetchTodos();
  }, showPopup);

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Dashboard</h1>
        <button onClick={openPopup}>Add todo</button>
      </div>
      <div className="todo-list">
        <h2>All Todos</h2>
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </ul>
      </div>
      {isOpen ? (
  <div className="popup">
        <AddEdit closePopup={closePopus} setTodos={setTodos} todos={todos}/>
  </div>
) : null}
    </div>
  );
};

export default Dashboard;
