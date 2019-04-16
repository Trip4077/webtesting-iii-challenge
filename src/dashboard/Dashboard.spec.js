import React from 'react';
import { render, cleanup } from 'react-testing-library';

import Dashboard from './Dashboard';

afterEach(cleanup);

describe('<Dashboard />', () => {
    it('should render', () => {
        render(<Dashboard />);
    });

    it('should render a <Display /> component with open display as default', () => {
        const { getByText } = render(<Dashboard />);

        getByText(/open/i);
    });

    it('should render a <Control /> component with close button as default', () => {
        const { getByText } = render(<Dashboard />)

        getByText(/close gate/i)
    }); 
})

