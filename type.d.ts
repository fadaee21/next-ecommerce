export type Children = {
  children: ReactNode;
};

export interface AuthContextValue {
  login: (string) => Promise<void>;
  checkOtp: (otp: string) => Promise<void>;
  loginLoading: boolean;
  user: User | null;
  resendOtp: () => Promise<void>;
  logout: () => Promise<void>;
}

export type TabList = "پیتزا" | "برگر" | "پیش غذا و سالاد" | "نوشیدنی";
export interface ImagesProduct {
  id: number;
  product_id: number;
  image: string;
}
export interface TabPanelItem {
  id: number;
  name: string;
  slug: string;
  category: string;
  category_id: number;
  primary_image: string;
  primary_image_blurDataURL: string;
  status_value: number;
  status: string;
  price: number;
  quantity: number;
  description: string;
  is_sale: boolean;
  sale_price?: number;
  date_on_sale_from: string;
  date_on_sale_to: string;
  images: ImagesProduct[];
}

export interface ProductsTabs {
  tabList: TabList[];
  tabPanel: TabPanelItem[][];
}
export interface ProductsTabsComplete {
  status: "success";
  message: string | null;
  data: ProductsTabs;
}
export interface ErrorResponse {
  message: {
    [key: string]: string[];
  };
}

export interface MenuItem {
  id: number;
  parent_id: number;
  name: string;
  description?: string;
}

export interface MenuItemsRoot {
  status: string;
  message: any;
  data: MenuItem[];
}

export interface Links {
  first: string;
  last: string;
  prev: any;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface ProductType {
  id: number;
  name: string;
  slug: string;
  category: string;
  category_id: number;
  primary_image: string;
  primary_image_blurDataURL: string;
  status_value: number;
  status: string;
  price: number;
  quantity: number;
  description: string;
  is_sale: boolean;
  sale_price?: number;
  date_on_sale_from: string;
  date_on_sale_to: string;
  images: Image[];
}

export interface ProductData {
  products: ProductType[];
  links: Links;
  meta: Meta;
}
export interface ProductRoot {
  status: string;
  message: any;
  data: Data;
}

export interface User {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  cellphone: string;
  created_at: string; // Assuming the created_at field is a string representing a date/time
}

export interface AllAddressRoot {
  status: string;
  message: any;
  data: Data;
}

export interface AllAddress {
  addresses: Address[];
  provinces: Province[];
  cities: City[];
}

export interface Address {
  id: number;
  title: string;
  address: string;
  cellphone: string;
  postal_code: string;
  user_id: number;
  province_id: number;
  city_id: number;
  deleted_at: any;
  created_at: any;
  updated_at: any;
}

export interface Province {
  id: number;
  name: string;
  deleted_at: any;
  created_at: any;
  updated_at: any;
}

export interface City {
  id: number;
  name: string;
  province_id: number;
  deleted_at: any;
  created_at: any;
  updated_at: any;
}

export interface OrderItem {
  id: number;
  product_primary_image: string;
  product_name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  address_title: string;
  status: string;
  payment_status: string;
  paying_amount: number;
  created_at: string;
  order_items: OrderItem[];
}

export interface OrderData {
  orders: Order[];
  links: Links;
  meta: Meta;
}

export interface OrderRoot {
  status: string;
  message: any;
  data: Data;
}

export interface TransactionData {
  transactions: Transaction[];
  links: Links;
  meta: Meta;
}

export interface Transaction {
  id: number;
  order_id: number;
  amount: number;
  status: string;
  trans_id?: string;
  created_at: string;
}
