import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import configureStore from 'redux-mock-store'; // Smart components

// Setup Store
const mockStore = configureStore();
const initialState = {current_user: { user_id: 1 }}
const store = mockStore(initialState);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
