import Stage, { ScaleMode } from '../components/stage';
import Canvas from '../components/canvas';
import Table from '../components/table';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentTableIdState, tableState } from '../recoil/table';
import JoinButton from '../components/join-button';

export default function GameOfPoker({ size, tableId }) {
  const { width, height } = size;

  const setTableId = useSetRecoilState(currentTableIdState);
  const table = useRecoilValue(tableState);

  useEffect(() => {
    setTableId(tableId);
  }, [setTableId, tableId]);

  const onJoinButtonClick = index => event => {
    console.log('click', index);
  };

  return (
    <Stage width={width} height={height} scaleMode={ScaleMode.SCALE_TO_FIT}>
      {/*Background layer*/}
      <Canvas>
        <Table
          x={width / 2 - 600 / 2}
          y={120}
          width={600}
          height={300}
          borderWidth={16}
        />
      </Canvas>
      {/*Ui layer*/}
      <Canvas interactive={true}>
        {table && table.reservations.map((reservation, index) => (
          <JoinButton
            key={index}
            x={50 * index}
            y={100}
            onClick={onJoinButtonClick(index)}
          />
        ))}
      </Canvas>
    </Stage>
  );
}