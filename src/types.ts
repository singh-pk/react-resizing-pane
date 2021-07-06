export type storageDataType = {
  height: number;
  width: number;
};

export type storageIdType = string | number;

export type persistDataType = { [storageId in storageIdType]: storageDataType };

export type getPersistedDataType = persistDataType | undefined;

export type storageConfigType = {
  name?: string;
  type?: Storage;
};
