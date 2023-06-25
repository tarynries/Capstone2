import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./ShoppingList.css"
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ShoppingList() {
    const [groceryList, setGroceryList] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        fetchGroceryList();
    }, []);

    async function fetchGroceryList() {
        try {
            const response = await axios.get('http://localhost:3001/api/shopping-list'); // Change the API endpoint to match your backend route
            setGroceryList(response.data);
        } catch (error) {
            console.error('Error fetching grocery list:', error);
        }
    }

    async function addItem() {
        if (newItem.trim() !== '') {
            try {
                const response = await axios.post('http://localhost:3001/api/shopping-list', { name: newItem }); // Change the API endpoint to match your backend route
                setGroceryList([...groceryList, response.data]);
                setNewItem('');
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
    }

    async function removeItem(itemId) {
        try {
            await axios.delete(`http://localhost:3001/api/shopping-list/${itemId}`); // Change the API endpoint to match your backend route
            const updatedList = groceryList.filter((item) => item.id !== itemId);
            setGroceryList(updatedList);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    }

    return (
        <div className="shopping-list-container">
            <div className="shopping-list-background"></div>
            <div className="shopping-list">
                <h2><FontAwesomeIcon icon={faShoppingBasket} /> Shopping List</h2>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter new item"
                />
                <button onClick={addItem}>Add</button>
                <ul>
                    {groceryList.map((item) => (
                        <li key={item.id}>
                            <span>{item.name}</span>
                            <button onClick={() => removeItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <Link to="/">Homepage</Link>
            </div>
        </div>
    );
}

export default ShoppingList;
