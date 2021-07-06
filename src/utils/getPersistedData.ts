import { getPersistedDataType } from '../types';

const getPersistedData = (
  name: string = 'dimensions',
  type: Storage = sessionStorage
): getPersistedDataType => JSON.parse(type?.getItem?.(name)!) || undefined;

export default getPersistedData;
