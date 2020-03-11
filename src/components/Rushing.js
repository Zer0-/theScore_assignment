import React, { useState, useEffect } from 'react';
import { get } from '../network';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const schema = [{
        dataField: 'Player',
        text: 'Player'
    }, {
        dataField: 'Team',
        text: 'Team',
    }, {
        dataField: 'Pos',
        text: 'Pos'
    }, {
        dataField: 'Att',
        text: 'Att'
    }, {
        dataField: 'Att/G',
        text: 'Att/G'
    }, {
        dataField: 'Yds',
        text: 'Yds',
        sort: true
    }, {
        dataField: 'Avg',
        text: 'Avg'
    }, {
        dataField: 'Yds/G',
        text: 'Yds/G'
    }, {
        dataField: 'TD',
        text: 'TD',
        sort: true
    }, {
        dataField: 'Lng',
        text: 'Lng',
        sort: true
    }, {
        dataField: '1st',
        text: '1st'
    }, {
        dataField: '1st%',
        text: '1st%'
    }, {
        dataField: '20+',
        text: '20+ Yards'
    }, {
        dataField: '40+',
        text: '40+ Yards'
    }, {
        dataField: 'FUM',
        text: 'Fumbles'
    }];

function Rushing() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        get('/rushing.json')
             // add integer index column
            .then(xs => xs.map((x, i) => Object.assign(x, {id: i})))
            .then(setRecords);
    }, [])


    return (
        <BootstrapTable
            bootstrap4
            keyField="id"
            data={records}
            columns={schema}
            pagination={paginationFactory()}
        />
    );
}

export default Rushing;
