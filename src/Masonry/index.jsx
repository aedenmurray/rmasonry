/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState, Children } from 'react';
import { useColumns } from 'ColumnsContext';
import Container from './Container';
import Column from './Column';

const createEmptyColumns = (length) =>
  Array.from({ length }, () => []);

function Masonry({ children, columns, gap = 8 }) {
  const columnsFromContext = useColumns();
  const columnsValue = columns ?? columnsFromContext;

  const distribute = () => {
    const childrenArray = Children.toArray(children);
    const empty = createEmptyColumns(columnsValue);

    return childrenArray
      .reduce((acc, curr, idx) => {
        const columnIdx = (idx % columnsValue);
        acc[columnIdx].push(curr);
        return acc;
      }, empty);
  };

  const [matrix, setMatrix] = useState(distribute);

  useEffect(
    () => { setMatrix(distribute); },
    [children, columnsValue],
  );

  return (
    <Container gap={gap}>
      {matrix.map(
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
