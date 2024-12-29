// eslint-disable-next-line import/no-extraneous-dependencies
import { createContext, useContext } from 'react';

const ColumnsContext = createContext(4);
export const useColumns = () => useContext(ColumnsContext);
export default ColumnsContext;
