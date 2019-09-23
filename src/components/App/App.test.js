import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './';

describe('Main app component', () => {
    it('Renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <App
                pin={'1111'}
                authorised={false}
                balance={null}
                withdrawAmount={''}
                error={''}
            />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
