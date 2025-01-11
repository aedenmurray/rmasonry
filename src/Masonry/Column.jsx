/* eslint-disable react/no-array-index-key */
export default function Column({ items, gap, refs }) {
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
      {items.map((item, idx) => (
        // eslint-disable-next-line no-param-reassign
        <div key={idx} ref={(el) => { refs.current[item.idx] = el; }}>
          {item.element}
        </div>
      ))}
    </div>
  );
}
