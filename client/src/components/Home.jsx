import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

function Home(props) {
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      name: 'Nshuti',
      email: 'nshutij7@gmial.com',
      phone: 78888888,
    },
    {
      id: 2,
      name: 'Christian',
      email: 'chris@gmial.com',
      phone: 799999999,
    },
    {
      id: 3,
      name: 'Aderline',
      email: 'ads@gmial.com',
      phone: 7666666666,
    },
    {
      id: 4,
      name: 'Nshuti',
      email: 'nshutij7@gmial.com',
      phone: 78888888,
    },
    {
      id: 5,
      name: 'Christian',
      email: 'chris@gmial.com',
      phone: 799999999,
    },
    {
      id: 6,
      name: 'Aderline',
      email: 'ads@gmial.com',
      phone: 7666666666,
    },
    {
      id: 7,
      name: 'Nshuti',
      email: 'nshutij7@gmial.com',
      phone: 78888888,
    },
    {
      id: 8,
      name: 'Christian',
      email: 'chris@gmial.com',
      phone: 799999999,
    },
    {
      id: 9,
      name: 'Aderline',
      email: 'ads@gmial.com',
      phone: 7666666666,
    },
    {
      id: 10,
      name: 'Nshuti',
      email: 'nshutij7@gmial.com',
      phone: 78888888,
    },
    {
      id: 11,
      name: 'Christian',
      email: 'chris@gmial.com',
      phone: 799999999,
    },
    {
      id: 12,
      name: 'Aderline',
      email: 'ads@gmial.com',
      phone: 7666666666,
    },
    {
      id: 13,
      name: 'Nshuti',
      email: 'nshutij7@gmial.com',
      phone: 78888888,
    },
    {
      id: 14,
      name: 'Christian',
      email: 'chris@gmial.com',
      phone: 799999999,
    },
    {
      id: 15,
      name: 'Aderline',
      email: 'ads@gmial.com',
      phone: 7666666666,
    },
    {
      id: 16,
      name: 'Nshuti',
      email: 'nshutij7@gmial.com',
      phone: 78888888,
    },
    {
      id: 17,
      name: 'Christian',
      email: 'chris@gmial.com',
      phone: 799999999,
    },
    {
      id: 1,
      name: 'Aderline',
      email: 'ads@gmial.com',
      phone: 7666666666,
    },
  ];

  const [records, setRecords] = useState(data);

  const handleFilter = (e) => {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setRecords(newData);
  };

  return (
    <div>
      <h1>List of all users</h1>
      <div className="text-end">
        <input type="text" onChange={handleFilter} />
      </div>
      <DataTable
        columns={columns}
        data={records}
        selectableRows
        fixedHeader
        pagination
      ></DataTable>
    </div>
  );
}

export default Home;
