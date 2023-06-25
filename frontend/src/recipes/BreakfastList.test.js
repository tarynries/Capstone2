import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BreakfastList from './BreakfastList';

test('renders Breakfast List component correctly', () => {
    render(
        <Router>
            <BreakfastList />
        </Router>
    );
});
