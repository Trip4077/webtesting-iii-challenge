import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

import palm from 'react-test-renderer';
import Controls from './Controls';

import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('<Controls />', () => {
    it('renders', () => {
        render(<Controls />);
    });

    it('renders "Lock Gate" on default lock button', () => {
        const { getByText, queryByText } = render(<Controls />);

        getByText(/lock gate/i);
        expect(queryByText(/unlock gate/i)).toBeFalsy();
    });

    it('renders "Unlock Gate" on locked = true', () => {
        const { getByText, queryByText } = render(<Controls locked={true} />);

        getByText(/unlock gate/i);
        expect(queryByText(/^lock gate/i)).toBeFalsy();
    });

    it('renders "Close Gate" on default', () => {
        const { getByText,queryByText } = render(<Controls />);

        getByText(/close gate/i);
        expect(queryByText(/open gate/i)).toBeFalsy();
    });

    it('renders "Open Gate" on closed = true', () => {
        const { getByText, queryByText } = render(<Controls closed={true}/>);

        getByText(/open gate/i);
        expect(queryByText(/close gate/i)).toBeFalsy();
    });

    it('should disable the close toggle button when gate is locked', () => {
        const { getByText } = render(<Controls locked={true} closed={true} />);

        expect(getByText(/open gate/i)).toBeDisabled();
    });

    it('should disable the lock toggle button when get is open',() => {
        const { getByText } = render(<Controls />);
        
        expect(getByText(/lock gate/i)).toBeDisabled();
    });

    it('should fire toggleClosed() when toggle close button clicked', () => {
        const mock = jest.fn();
        const { getByText } = render(<Controls toggleClosed={mock} />);

        const closeButton = getByText(/close gate/i);

        fireEvent.click(closeButton);

        expect(mock).toHaveBeenCalled();
    });

    it('should fire toggleLocked() when toggle lock button clicked', () => {
        const mock = jest.fn();
        const { getByText } = render(<Controls toggleLocked={mock} closed={true}/>);

        const lockButton = getByText(/lock gate/i);

        fireEvent.click(lockButton);

        expect(mock).toHaveBeenCalled();
    });

    it('matches snapshot: L - false, C - false', () => {
        const tree = palm.create(<Controls />);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('matches snapshot: L - true, C - false', () => {
        const tree = palm.create(<Controls locked={true} />);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('matches snapshot: L - false, C - true', () => {
        const tree = palm.create(<Controls closed={true} />);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('matches snapshot: L - true, C - true', () => {
        const tree = palm.create(<Controls loked={true} closed={true}/>);

        expect(tree.toJSON()).toMatchSnapshot();
    });
});