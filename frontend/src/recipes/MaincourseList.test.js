import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MaincourseList from './MaincourseList';

test('renders Main Course Recipe List component correctly', () => {
    render(
        <Router>
            <MaincourseList />
        </Router>
    );
});
