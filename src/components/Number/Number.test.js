import React from 'react';
import ReactDOM from 'react-dom';
import Number from './';

describe('Number component', () => {
    it('Renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Number onClick={() => null} value={10} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
