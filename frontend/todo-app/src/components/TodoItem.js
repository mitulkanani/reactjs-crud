import axios from 'axios';
import React, { useState } from 'react';
import AddEdit from './AddEdit';
const TodoItem = ({ todo }) => {
    const [todos, setTodos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => {
    setIsOpen(true);
  }
  const closePopus = () => {
    setIsOpen(false);
  }
    const handleDelete = async (id) => {
        console.log(id);
        const token = localStorage.getItem('token');
        
        const response = await axios.delete(`http://localhost:3000/todo/`+id, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        window.document.reload();
        }
  
  return (
    <>
    <li>
      <div className="todo-item">
        <span>Title:-{todo.title}</span>
        <span>Description:-{todo.description}</span>
        <button onClick={openPopup}>Edit</button>
        <button onClick={() => handleDelete(todo._id)}>Delete</button>
      </div>
    </li>
    {isOpen ? (
  <div className="popup">
        <AddEdit closePopup={closePopus} addOrEdit="Edit" todo={todo}/>
  </div>
) : null}
    </>
  );
};

export default TodoItem;
