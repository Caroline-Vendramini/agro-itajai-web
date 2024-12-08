import React from 'react';
import Table from './Table';
import Button from '../button/Button';

// Exemplo de uso da tabela
const TableExample = () => {
  const data = [
    { id: 1, name: 'John Doe', age: 28, occupation: 'Engenheiro', action: <Button onClick={() => console.log(1)}>Editar</Button> },
    { id: 2, name: 'Jane Smith', age: 34, occupation: 'Designer', action: <Button onClick={() => console.log(2)}>Editar</Button> },
    { id: 3, name: 'Sam Johnson', age: 45, occupation: 'Gerente', action: <Button onClick={() => console.log(3)}>Editar</Button> },
  ];

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Nome', accessor: 'name' },
    { Header: 'Idade', accessor: 'age' },
    { Header: 'Ocupação', accessor: 'occupation' },
    { Header: 'Ação', accessor: 'action' },
  ];

  return (
    <Table>
      <Table.Head>
        {columns.map((column, index) => (
          <Table.Cell key={index}>{column.Header}</Table.Cell>
        ))}
      </Table.Head>
      <Table.Body>
        {data.map((row, index) => (
          <Table.Row key={index}>
            {columns.map((column, index) => (
              <Table.Cell key={index}>{row[column.accessor]}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableExample;