import React from 'react';
import About from '../../components/About';
import renderer from 'react-test-renderer';

it('renders a <About/> snapshot', () => {
    const component = renderer.create(<About/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});