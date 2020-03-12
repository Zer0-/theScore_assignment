import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from '../network';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

const { ExportCSVButton } = CSVExport;

const schema = [{
        dataField: 'Player',
        text: 'Player',
        filter: textFilter()

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

function BtnCsvExport({ products, onExport }) {
    function onClick() {
        onExport();
    }

    return (
        <button
            className="btn btn-secondary mb-4"
            onClick={onClick}
        >
            Export CSV
        </button>
    );
}

function Rushing() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        get('/rushing.json')
             // add integer index column
            .then(xs => xs.map((x, i) => Object.assign(x, {id: i})))
            .then(setRecords);
    }, [])

    return (
        <RushingTable records={records}/>
    );
}

export const RushingTable = ({ records }) => {
    return (
        <ToolkitProvider
            bootstrap4
            keyField="id"
            data={ records }
            columns={ schema }
            exportCSV={ { exportAll: false } }
        >
            {
                props =>
                    <div>
                        <ExportCSVButton
                            { ...props.csvProps }
                            className="btn-secondary mb-4"
                        >
                            Export CSV
                        </ExportCSVButton>
                        <BootstrapTable
                            { ...props.baseProps }
                            pagination={ paginationFactory() }
                            filter={ filterFactory() }
                        />
                    </div>
            }
        </ToolkitProvider>
    );
}

RushingTable.propTypes = {
    records: PropTypes.array
}

export default Rushing;
