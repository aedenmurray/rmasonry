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
      const shortestColumnHeight = Math.min(...columnHeights);
      const shortestColumnIdx = columnHeights.indexOf(shortestColumnHeight);
      const elementHeight = refs.current[idx].getBoundingClientRect().height;
      columnHeights[shortestColumnIdx] = elementHeight + shortestColumnHeight;

      acc[shortestColumnIdx].push({ element: curr, idx });
      return acc;
    }, empty);
};

function Masonry({ children, columns, gap = 8 }) {
  const refs = useRef([]);
  const columnsFromContext = useColumns();
  const columnsValue = columns ?? columnsFromContext;
  const [refMatrix, setRefMatrix] = useState(null);
  const [seqMatrix, setSeqMatrix] = useState(null);

  const initSeqMatrix = (
    () => {
      if (refMatrix) {
        setRefMatrix(null);
      }

      setSeqMatrix(
        createSeqMatrix(
          columnsValue,
          children,
        ),
      );
    }
  );

  const initRefMatrix = (
    () => {
      if (
        !seqMatrix ||
        !refs.current.length
      ) {
        return;
      }

      setRefMatrix(
        createRefMatrix(
          columnsValue,
          children,
          refs,
        ),
      );
    }
  );

  useLayoutEffect(
    initSeqMatrix,
    [
      columnsValue,
      children,
    ],
  );

  useLayoutEffect(
    initRefMatrix,
    [
      seqMatrix,
    ],
  );

  return (
    <Container gap={gap}>
      {(refMatrix ?? seqMatrix ?? [])
        .map((items, idx) => (
          <Column
            items={items}
            refs={refs}
            gap={gap}
            key={idx}
          />
        ))}
    </Container>
  );
}

export default Masonry;
