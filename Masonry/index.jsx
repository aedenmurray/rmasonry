/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState, Children } from 'react';
import Container from './Container';
import Column from './Column';

const createEmptyColumns = (length) =>
  Array.from({ length }, () => []);

const distributeSequentially = (children, columns) => {
  const childrenArray = Children.toArray(children);
  const empty = createEmptyColumns(columns);

  return childrenArray
    .reduce((acc, curr, idx) => {
      const columnIdx = (idx % columns);
      acc[columnIdx].push(curr);
      return acc;
    }, empty);
};

function Masonry({ children, columns = 4, gap = 8 }) {
  const [columnMatrix, setColumnMatrix] = useState(
    () => distributeSequentially(children, columns),
  );

  useEffect(
    () => {
      const distributed = distributeSequentially(children, columns);
      setColumnMatrix(distributed);
    },
    [children, columns],
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
