/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { Children, useMemo } from 'react';
import { useColumns } from '../ColumnsContext';
import Container from './Container';
import Column from './Column';

const createEmptyMatrix = (length) =>
  Array.from({ length }, () => []);

function Masonry({ children, columns, gap = 8 }) {
  const columnsFromContext = useColumns();
  const columnsValue = columns ?? columnsFromContext;

  const matrix = useMemo(
    () => {
      const childrenArray = Children.toArray(children);
      const empty = createEmptyMatrix(columnsValue);

      return childrenArray
        .reduce((acc, curr, idx) => {
          const columnIdx = (idx % columnsValue);
          acc[columnIdx].push(curr);
          return acc;
        }, empty);
    },
    [
      columnsValue,
      children,
    ],
  );

  return (
    <Container gap={gap}>
      {matrix.map(
        (items, idx) => (
          <Column
            key={idx}
            gap={gap}
            items={items}
          />
        ),
      )}
    </Container>
  );
}

export default Masonry;
