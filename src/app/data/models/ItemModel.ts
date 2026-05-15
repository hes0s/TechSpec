export interface ItemSpec {
  key: string;
  value: string;
}

export interface ItemModel {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  specs: ItemSpec[];
}
