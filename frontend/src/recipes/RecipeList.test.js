import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipeList from './RecipeList';

test('renders Recipe List component correctly', () => {
    render(
        <Router>
            <RecipeList />
        </Router>
    );
});
