import React from 'react';
import About from '../../src/components/About';
import renderer from 'react-test-renderer';

test('About page matches snapshot', () => {
    const component = renderer.create(<About/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});