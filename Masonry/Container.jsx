export default function Container({ children, gap }) {
  const style = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'stretch',
    boxSizing: 'border-box',
    width: '100%',
    gap,
  };

  return (
    <div style={style}>
      {children}
    </div>
  );
}
