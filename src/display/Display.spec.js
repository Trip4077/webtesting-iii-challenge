import React from 'react';
import { render, cleanup } from 'react-testing-library';

import pine from 'react-test-renderer';
import Display from './Display';

afterEach(cleanup);

describe('<Display />', () => {
    it('renders', () => {
        render(<Display />);
    });

    it('displays "Closed" if gate is closed', () => {
        const { getByText } = render(<Display closed={true} />);

        getByText(/closed/i);
    });

    it('displays "Open" if gate is not closed', () => {
        const { getByText } = render(<Display closed={false} />);

        getByText(/open/i);
    });

    it('displays "Locked" if gate is locked', () => {
        const { getByText } = render(<Display locked={true} />);

        getByText(/locked/i);
    });

    it('displays "Unlocked" if gate is not locked', () => {
        const { getByText } = render(<Display locked={false} />);

        getByText(/unlocked/i);
    });

    it('should have "red-led" class if gate is locked', () => {
        const { getByText } = render(<Display locked={true} />);

        const container = getByText(/locked/i);

        expect(container.classList.contains('red-led')).toBe(true);
    });

    it('should have "green-led" class if gate is unlocked', () => {
        const { getByText } = render(<Display locked={false} />);

        const container = getByText(/unlocked/i);

        expect(container.classList.contains('green-led')).toBe(true);
    });

    it('should have "red-led" class if gate is closed', () => {
        const { getByText } = render(<Display closed={true} />);

        const container = getByText(/closed/i);

        expect(container.classList.contains('red-led')).toBe(true);
    });

    it('matches snapshot: L - false, C - false', () => {
        const tree = pine.create(<Display />);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('matches snapshot: L - true, C - false', () => {
        const tree = pine.create(<Display locked={true}/>);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('matches snapshot: L - false, C - true', () => {
        const tree = pine.create(<Display closed={true} />);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('matches snapshot: L - true, C - true', () => {
        const tree = pine.create(<Display locked={true} closed={true}/>);

        expect(tree.toJSON()).toMatchSnapshot();
    });
});