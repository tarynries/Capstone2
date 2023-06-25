import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';

test('renders Recipe Details component correctly', () => {
    render(
        <Router>
            <RecipeDetails />
        </Router>
    );
});
