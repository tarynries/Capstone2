import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from './Homepage';

test('renders homepage with correct elements', () => {
    render(
        <Router>
            <Homepage />
        </Router>
    )
});