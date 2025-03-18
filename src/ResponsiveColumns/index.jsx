/* eslint-disable import/no-extraneous-dependencies */
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import ColumnsContext from '../ColumnsContext';

const defaultBreakpoints = {
  1536: 5,
  1200: 4,
  900: 3,
  600: 2,
  0: 1,
};

export default function ResponsiveColumns({
  breakpoints = defaultBreakpoints,
  debounce = 0,
  children,
}) {
  const [columns, setColumns] = useState(4);

  const breakpointsSorted = useMemo(
    () => Object.keys(breakpoints)
      .map((key) => Number(key))
      .sort((a, b) => b - a),
    [breakpoints],
  );

  const handleResize = useCallback(() => {
    const key = (
      breakpointsSorted.find((width) => width <= window.innerWidth)
      ?? breakpointsSorted[0]
    );

    setColumns(breakpoints[key]);
  }, [breakpoints, debounce]);

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints, debounce]);

  return (
    <ColumnsContext.Provider
      value={columns}
    >
      {children}
    </ColumnsContext.Provider>
  );
}
