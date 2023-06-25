import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import JokeList from './JokeList';

test('renders JokeList component correctly', () => {
    render(
        <Router>
            <JokeList />
        </Router>
    );
});
