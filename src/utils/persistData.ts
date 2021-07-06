import { persistDataType } from '../types';

const persistData = (
  name: string = 'dimensions',
  type: Storage = sessionStorage,
  data: persistDataType
): void => type?.setItem(`${name}`, JSON.stringify(data));

export default persistData;
