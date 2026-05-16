export interface ItemSpec {
  key: string;
  value: string;
}

export interface ItemSection {
  name: string;
  specs: ItemSpec[];
}

export interface ItemModel {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sections: ItemSection[];
}
