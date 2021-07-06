import {
  getPersistedDataType,
  storageConfigType,
  storageIdType,
} from './types';

export interface ResizingPaneProps {
  storageId?: storageIdType;
  storageConfig?: storageConfigType;
  style?: React.CSSProperties;
  sides?: string[];
  height?: number;
  width?: number;
  [props: string]: any;
}

export interface ResizerProps {
  side: string;
  setDimension: void | React.Dispatch<(a: number) => number>;
  height: number;
  width: number;
  storageId?: storageIdType;
  persistedData: getPersistedDataType;
  storageConfig?: storageConfigType;
}
