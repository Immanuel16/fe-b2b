type CircleProps = {
  style: React.CSSProperties;
  color: string;
};

const Circle = ({ style, color }: CircleProps) => {
  return (
    <div
      className={`absolute h-[60px] w-[60px] rounded-full bg-[${color}] circle z-[5]`}
      style={{ ...style, backgroundColor: color, filter: 'blur(150px)' }}
    />
  );
};

export { Circle };
