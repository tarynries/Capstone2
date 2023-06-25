import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlutenFreeRecipeList from './GlutenFreeRecipeList';

test('renders Gluten Free Recipe List component correctly', () => {
    render(
        <Router>
            <GlutenFreeRecipeList />
        </Router>
    );
});
