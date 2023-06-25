import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DairyFreeRecipeList from './DairyFreeRecipeList';

test('renders Dairy Free Recipe List component correctly', () => {
    render(
        <Router>
            <DairyFreeRecipeList />
        </Router>
    );
});
