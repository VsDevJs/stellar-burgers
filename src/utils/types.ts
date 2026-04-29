export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

// Не очень понимаю зачем это ? 
export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TNewOrderResponse = TServerResponse<{
  order: TNewOrder;
  name: string;
}>;

export type TNewOrder = {
  _id: string;
  status: string;
  name: string;
  owner: TOwner;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
};

export type TOwner = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  success:boolean,
  totalToday: number;
}>;

export type TTabMode = 'bun' | 'sauce' | 'main';
export type TStatusFeed = 'done' | 'pending';