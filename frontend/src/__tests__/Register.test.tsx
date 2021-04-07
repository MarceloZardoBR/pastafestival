import React from 'react';
import { shallow } from 'enzyme';
import Register from '../pages/Register';

it('<Register /> Render Correctly', () => {
    const wrapper = shallow(<Register />);

    expect(wrapper).toMatchSnapshot();
})