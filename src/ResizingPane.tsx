import { useState } from 'react';

import Resizer from './Resizer';
import getPersistedData from './utils/getPersistedData';
import { getPersistedDataType } from './types';
import { ResizingPaneProps } from './interface';

const ResizingPane: React.FC<ResizingPaneProps> = ({
  style,
  storageId,
  storageConfig,
  sides,
  height,
  width,
  children,
  ...props
}) => {
  let persistedData: getPersistedDataType;

  storageId !== undefined &&
    (persistedData = getPersistedData(
      storageConfig?.name,
      storageConfig?.type
    ));

  const [h, setHeight] = useState<number>(
    (storageId !== undefined && persistedData?.[storageId]?.height) ||
      height ||
      250
  );

  const [w, setWidth] = useState<number>(
    (storageId !== undefined && persistedData?.[storageId]?.width) ||
      width ||
      350
  );

  let styleObj: React.CSSProperties = {
    border: '1px solid black',
    maxHeight: '100%',
    maxWidth: '100%',
    ...style,
    height: h,
    width: w,
    position: 'relative',
  };

  return (
    <div style={styleObj} {...props}>
      {sides?.map(side => (
        <Resizer
          key={side}
          side={side}
          setDimension={
            side === 'top' || side === 'bottom'
              ? setHeight
              : side === 'right' || side === 'left'
              ? setWidth
              : console.error(`side={['${side}']} is not a valid prop`)
          }
          height={h}
          width={w}
          storageId={storageId}
          persistedData={persistedData}
          storageConfig={storageConfig}
        />
      ))}

      {children}
    </div>
  );
};

export default ResizingPane;
