import TextLabel from './text-label';

export default function NameLabel({ children, x, y }) {
  return (
    <TextLabel
      x={x}
      y={y}
      backgroundColor="#009557"
      color="#fff"
      fontSize={20}
      fontFamily="Krungthep"
      paddingTop={8}
      paddingBottom={8}
      paddingLeft={12}
      paddingRight={12}
      radius={16}
      borderColor="#fff"
      borderWidth={4}
      minWidth={60}
      maxWidth={100}
      originX={-0.5}
    >
      {children}
    </TextLabel>
  )
}