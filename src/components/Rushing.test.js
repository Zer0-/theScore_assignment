import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { RushingTable } from './Rushing';

it('renders blank table', () => {
    const tree = renderer
        .create(<RushingTable records={[]}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
