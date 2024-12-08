import React from 'react';
import './Table.css';

const Container = ({ children }) => {
  return (
    <table className="table">
      {children}
    </table>
  );
};

const TableHead = ({ children }) => {
  return (
    <thead className="table-head">
      <tr>
        {children}
      </tr>
    </thead>
  );
};

const TableBody = ({ children }) => {
  return (
    <tbody className="table-body">
      {children}
    </tbody>
  );
};

const TableRow = ({ children }) => {
  return (
    <tr className="table-row">
      {children}
    </tr>
  );
};

const TableCell = ({ children }) => {
  return (
    <td className="table-cell">
      {children}
    </td>
  );
};

const Table = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
}

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;