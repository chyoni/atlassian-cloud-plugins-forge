import React from 'react';
import DynamicTable from '@atlaskit/dynamic-table';
import { useNavigate } from 'react-router';

const createKey = (input) => {
  return input ? input.replace(/^(the|a|an)/, '').replace(/\s/g, '') : input;
};

const presidents = [
  {
    id: 1,
    name: 'George Washington',
    party: 'None, Federalist',
    term: '1789-1797',
  },
  {
    id: 2,
    name: 'John Adams',
    party: 'Federalist',
    term: '1697-1701',
  },
  {
    id: 3,
    name: 'Thomas Jefferson',
    party: 'Democratic-Republican',
    term: '1801-1809',
  },
  {
    id: 4,
    name: 'James Madison',
    party: 'Democratic-Republican',
    term: '1809-1817',
  },
  {
    id: 5,
    name: 'James Monroe',
    party: 'Democratic-Republican',
    term: '1817-1825',
  },
  {
    id: 6,
    name: 'John Quincy Adams',
    party: 'Democratic-Republican',
    term: '1825-1829',
  },
  {
    id: 7,
    name: 'Andrew Jackson',
    party: 'Democrat',
    term: '1829-1837',
  },
  {
    id: 8,
    name: 'Martin van Buren',
    party: 'Democrat',
    term: '1837-1841',
  },
  {
    id: 9,
    name: 'William H. Harrison',
    party: 'Whig',
    term: '1841',
  },
  {
    id: 10,
    name: 'John Tyler',
    party: 'Whig',
    term: '1841-1845',
  },
  {
    id: 11,
    name: 'James K. Polk',
    party: 'Democrat',
    term: '1845-1849',
  },
];

function Link({ to, children }) {
  const navigate = useNavigate();
  return (
    <a
      href={to}
      onClick={(event) => {
        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

// applied as rows in the form
const rows = presidents.map((president, index) => ({
  key: `row-${index}-${president.name}`,
  cells: [
    {
      key: createKey(president.name),
      content: <Link to="">{president.name}</Link>,
    },
    {
      key: createKey(president.party),
      content: president.party,
    },
    {
      key: president.id,
      content: president.term,
    },
  ],
}));

const head = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: true,
      width: 40,
    },
    {
      key: 'party',
      content: 'Party',
      shouldTruncate: true,
      isSortable: true,
      width: 40,
    },
    {
      key: 'term',
      content: 'Term',
      shouldTruncate: true,
      isSortable: true,
      width: 40,
    },
  ],
};

export default function Boards() {
  return (
    <div style={{ margin: '20px' }}>
      <h2>List of US Presidents</h2>
      <DynamicTable
        head={head}
        rows={rows}
        rowsPerPage={100}
        defaultPage={1}
        loadingSpinnerSize="large"
        isLoading={false}
        isFixedSize
        defaultSortKey="name"
        defaultSortOrder="ASC"
      />
    </div>
  );
}
