import { useState, useEffect } from 'react';

import persistData from './utils/persistData';
import { ResizerProps } from './interface';

const Resizer: React.FC<ResizerProps> = ({
  side,
  height,
  width,
  storageId,
  storageConfig,
  persistedData,
  setDimension,
}) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [initialPos, setInitialPos] = useState<number>(0);

  let selectedClient: 'clientY' | 'clientX';

  if (side === 'top' || side === 'bottom') {
    selectedClient = 'clientY';
  } else {
    selectedClient = 'clientX';
  }

  const removeEventListeners = (): void => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('touchend', onMouseUp);
  };

  const onMouseDown = (e: React.MouseEvent): void => {
    return onStart(e[selectedClient]);
  };

  const onMouseMove = (e: MouseEvent): void => {
    e.preventDefault();
    return onMove(e[selectedClient]);
  };

  const onMouseUp = (): void => {
    setDragging(false);

    storageId !== undefined &&
      persistData(storageConfig?.name, storageConfig?.type, {
        ...persistedData,
        [storageId]: { height, width },
      });

    return removeEventListeners();
  };

  const onTouchStart = (e: React.TouchEvent): void => {
    return onStart(e?.touches[0]?.[selectedClient]!);
  };

  const onTouchMove = (e: TouchEvent): void => {
    return onMove(e?.touches[0]?.[selectedClient]!);
  };

  const onStart = (clientPos: number): void => {
    setInitialPos(clientPos);
    return setDragging(true);
  };

  const onMove = (clientPos: number): void => {
    if (dragging) {
      let newPos: number = clientPos - initialPos;

      setInitialPos(clientPos);

      setDimension?.(prevDim => prevDim + newPos);
    }
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchend', onMouseUp);
    }

    return () => {
      removeEventListeners();
    };

    // eslint-disable-next-line
  }, [onMouseDown, onTouchStart]);

  let styleObj: React.CSSProperties = {
    position: 'absolute',
    [side]: '-6px',
    zIndex: 1000,
  };

  if (side === 'top' || side === 'bottom') {
    let horizontalStyles = {
      width: '100%',
      height: '12px',
      cursor: 'row-resize',
    };

    styleObj = { ...styleObj, ...horizontalStyles };
  } else if (side === 'left' || side === 'right') {
    let verticalStyles = {
      height: '100%',
      width: '12px',
      cursor: 'col-resize',
    };

    styleObj = { ...styleObj, ...verticalStyles };
  }

  return (
    <div
      style={styleObj}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    />
  );
};

export default Resizer;
