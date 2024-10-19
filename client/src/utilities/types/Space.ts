type ISpace = {
  id: string;
  created_datetime: string;
  updated_datetime: string;
  name: string;
}

type ISpaceRequest = {
  name: string;
}

type ITypeWithSpaceId = {
  spaceId: ISpace['id'];
};

export default ISpace;
export type { ISpaceRequest, ITypeWithSpaceId };