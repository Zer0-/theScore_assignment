import React from 'react';

import { get } from '../network';

function Rushing() {
    get('/rushing.json')
        .then(x => console.log(x));

    return (
        <h1>Hello Rushing</h1>
    );
}

export default Rushing;
