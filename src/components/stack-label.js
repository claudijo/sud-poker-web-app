import TextLabel from './text-label';

export default function StackLabel({ children, x, y, stack}) {
  return (
    <TextLabel
      x={x}
      y={y}
      backgroundColor="#e16057"
      color="#fff"
      fontSize={24}
      fontFamily="Krungthep"
      paddingTop={8}
      paddingBottom={8}
      paddingLeft={12}
      paddingRight={12}
      radius={16}
      borderColor="#fff"
      borderWidth={4}
      originX={-0.5}
    >
      {children}
    </TextLabel>
  )
}