import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react'
import Login from '../pages/Login'

it("Renders Correctly", () => {
    const wrapper = shallow(<Login />);

    expect(wrapper).toMatchSnapshot();
})

test("should display a blank cpf input", async () => {
    
    const { container } = render(<Login />);

    const cpf_input =  await container.querySelector('input');

    expect(cpf_input?.value).toBe('');

})