/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { Children, useLayoutEffect, useRef, useState } from 'react';
import { useColumns } from '../ColumnsContext';
import Container from './Container';
import Column from './Column';

const createEmptyMatrix = (length) =>
  Array.from({ length }, () => []);

const createSeqMatrix = (columns, children) => {
  const childrenArray = Children.toArray(children);
  const empty = createEmptyMatrix(columns);

  return childrenArray
    .reduce((acc, curr, idx) => {
      const columnIdx = (idx % columns);
      acc[columnIdx].push({ element: curr, idx });
      return acc;
    }, empty);
};

const createRefMatrix = (columns, children, refs) => {
  const columnHeights = Array.from({ length: columns }, () => 0);
  const childrenArray = Children.toArray(children);
  const empty = createEmptyMatrix(columns);

  return childrenArray
    .reduce((acc, curr, idx) => {
      if (!refs.current[idx]) return acc;
      const shortestColumnHeight = Math.min(...columnHeights);
      const shortestColumnIdx = columnHeights.indexOf(shortestColumnHeight);
      const elementHeight = refs.current[idx].getBoundingClientRect().height;
      columnHeights[shortestColumnIdx] = elementHeight + shortestColumnHeight;

      acc[shortestColumnIdx].push({ element: curr, idx });
      return acc;
    }, empty);
};

function Masonry({ children, columns, sequential, gap = 8 }) {
  const refs = useRef([]);
  const columnsFromContext = useColumns();
  const columnsValue = columns ?? columnsFromContext;
  const [refMatrix, setRefMatrix] = useState(undefined);
  const [seqMatrix, setSeqMatrix] = useState(
    () => createSeqMatrix(
      columnsValue,
      children,
    ),
  );

  useLayoutEffect(
    () => {
      setSeqMatrix(
        createSeqMatrix(
          columnsValue,
          children,
        ),
      );

      if (!sequential) {
        requestAnimationFrame(
          () => {
            setRefMatrix(
              createRefMatrix(
                columnsValue,
                children,
                refs,
              ),
            );
          },
        );
      }
    },
    [
      columnsValue,
      children,
    ],
  );

  return (
    <Container gap={gap}>
      {(refMatrix ?? seqMatrix).map(
        (items, idx) => (
          <Column
            key={idx}
            gap={gap}
            refs={refs}
            items={items}
          />
        ),
      )}
    </Container>
  );
}

export default Masonry;
