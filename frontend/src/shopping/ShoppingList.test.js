import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShoppingList from './ShoppingList';

test('renders ShoppingList component correctly', () => {
    render(
        <Router>
            <ShoppingList />
        </Router>
    );
});
