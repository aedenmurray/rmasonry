export default function Column({ items, gap }) {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    width: 0,
    flex: 1,
    gap,
  };

  return (
    <div style={style}>
      {items.map((item) => item)}
    </div>
  );
}
