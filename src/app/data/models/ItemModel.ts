export interface ItemSpec {
  key: string;
  value: string;
}

export interface ItemSection {
  name: string;
  specs: ItemSpec[];
}

export interface Category {
  id: string;
  name: string;
}

export interface ItemModel {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sections: ItemSection[];
}
