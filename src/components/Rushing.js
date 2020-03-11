import React, { useState } from 'react';
import { get } from '../network';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const schema = [{
        dataField: 'Player',
        text: 'Player'
    }, {
        dataField: 'Team',
        text: 'Team'
    }, {
        dataField: 'Pos',
        text: 'Position'
    }, {
        dataField: 'Att',
        text: 'Rushing Attempts'
    }, {
        dataField: 'Att/G',
        text: 'Rushing Attempts Per Game Average'
    }, {
        dataField: 'Yds',
        text: 'Total Yards'
    }, {
        dataField: 'Avg',
        text: 'Average Yards Per Attempt'
    }, {
        dataField: 'Yds/G',
        text: 'Yards Per Game'
    }, {
        dataField: 'TD',
        text: 'Total Touchdowns'
    }, {
        dataField: 'Lng',
        text: 'Longest Rush'
    }, {
        dataField: '1st',
        text: 'First Downs'
    }, {
        dataField: '1st%',
        text: 'First Down Percentage'
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

    get('/rushing.json')
         // add integer index column
        .then(xs => xs.map((x, i) => Object.assign(x, {id: i})))
        .then(setRecords);

    return (
        <BootstrapTable
            keyField="id"
            data={records}
            columns={schema}
            pagination={paginationFactory()}
        />
    );
}

export default Rushing;
