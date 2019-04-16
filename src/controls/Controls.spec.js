import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

import Controls from './Controls';

describe('<Controls />', () => {
    it('renders', () => {
        render(<Controls />);
    });

    it('renders "Lock Gate" on default lock button', () => {
        const { getByText, queryByText } = render(<Controls />);

        getByText(/lock gate/i);
        expect(queryByText(/unlock gate/i)).toBeFalsy();
    })
})