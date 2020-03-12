import assert from 'assert';
import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import { RushingTable } from './Rushing';
import FileSaver from 'file-saver';

jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
global.Blob = function(content, opts) {
    return { content, opts };
}

const mockrecords = [
  {
    "Player":"A",
    "Team":"JAX",
    "Pos":"RB",
    "Att":2,
    "Att/G":2,
    "Yds":1,
    "Avg":3.5,
    "Yds/G":7,
    "TD":0,
    "Lng":"1",
    "1st":0,
    "1st%":0,
    "20+":0,
    "40+":0,
    "FUM":0
  },
  {
    "Player":"B",
    "Team":"MIN",
    "Pos":"QB",
    "Att":2,
    "Att/G":2,
    "Yds":2,
    "Avg":3.5,
    "Yds/G":7,
    "TD":0,
    "Lng":"2",
    "1st":0,
    "1st%":0,
    "20+":0,
    "40+":0,
    "FUM":0
  },
  {
    "Player":"C",
    "Team":"BAL",
    "Pos":"WR",
    "Att":2,
    "Att/G":2,
    "Yds":3,
    "Avg":3.5,
    "Yds/G":7,
    "TD":0,
    "Lng":"3",
    "1st":0,
    "1st%":0,
    "20+":0,
    "40+":0,
    "FUM":0
  },
].map((x, i) => Object.assign(x, { id: i }));

beforeEach(FileSaver.saveAs.mockClear);

it('exports blank csv', () => {
    const { getByText } = render(<RushingTable records={[]}/>);
    const btn_export = getByText('Export CSV');
    expect(btn_export).toBeInTheDocument();
    fireEvent.click(btn_export);
    const csv = FileSaver.saveAs.mock.calls[0][0].content[0];
    const sans_head = csv.split('\n')[1];
    assert(sans_head === '');
});

it('export content', () => {
    const { getByText } = render(
        <RushingTable records={mockrecords}/>
    );
    const btn_export = getByText('Export CSV');
    fireEvent.click(btn_export);
    const csv = FileSaver.saveAs.mock.calls[0][0].content[0];
    assert.equal(csv.split('\n').length, 4);
});

function rowData(csv) {
    const data_rows = csv.split('\n').slice(1);
    return data_rows.map(x => x.split(','));
}

function getYds(csv) {
    return rowData(csv).map(x => Number(x[5].replace(/["]/g, '')));
}

it('export ordered content', () => {
    const { getByText } = render(
        <RushingTable records={mockrecords}/>
    );
    const btn_export = getByText('Export CSV');
    const header = getByText('Yds');
    expect(header).toBeInTheDocument();
    fireEvent.click(header);
    fireEvent.click(btn_export);
    const csv = FileSaver.saveAs.mock.calls[0][0].content[0];
    assert.deepEqual(getYds(csv), [3, 2, 1]);
    fireEvent.click(header);
    fireEvent.click(btn_export);
    const csv2 = FileSaver.saveAs.mock.calls[1][0].content[0];
    assert.deepEqual(getYds(csv2), [1, 2, 3]);
});

it('export searched content', () => {
    const { container, getByText, getByPlaceholderText } = render(
        <RushingTable records={mockrecords}/>
    );
    const btn_export = getByText('Export CSV');
    const search_input = getByPlaceholderText('Enter Player...');
    expect(search_input).toBeInTheDocument();

    jest.useFakeTimers();

    fireEvent.change(search_input, { target: { value: 'B' } });
    setTimeout(() => {
        fireEvent.click(btn_export);
        const csv = FileSaver.saveAs.mock.calls[0][0].content[0];
        console.log(csv);
        assert.deepEqual(getYds(csv), [2]);
    }, 1000);
});
