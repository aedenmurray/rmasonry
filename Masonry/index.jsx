/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState, Children } from 'react';
import { useColumns } from './ColumnsContext';
import Container from './Container';
import Column from './Column';

const createEmptyColumns = (length) =>
  Array.from({ length }, () => []);

const distribute = (children, columns) => {
  const childrenArray = Children.toArray(children);
  const empty = createEmptyColumns(columns);

  return childrenArray
    .reduce((acc, curr, idx) => {
      const columnIdx = (idx % columns);
      acc[columnIdx].push(curr);
      return acc;
    }, empty);
};

function Masonry({ children, columns, gap = 8 }) {
  const columnsFromContext = useColumns();
  const columnsValue = columns ?? columnsFromContext;

  const [columnMatrix, setColumnMatrix] = useState(
    () => distribute(children, columnsValue),
  );

  useEffect(
    () => {
      const distributed = distribute(children, columnsValue);
      setColumnMatrix(distributed);
    },
    [children, columnsValue],
  );

  return (
    <Container gap={gap}>
      {columnMatrix.map(
        (column, idx) => (
          <Column
            key={idx}
            gap={gap}
            items={column}
          />
        ),
      )}
    </Container>
  );
}

export default Masonry;
