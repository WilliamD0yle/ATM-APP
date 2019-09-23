import React from 'react';

const Number = props => (
    <div
        className={`num ${props.value === 0 ? 'zero' : ''}`}
        data-value={props.value}
        onClick={props.onClick}
    >
        {props.value}
    </div>
);

export default Number;
