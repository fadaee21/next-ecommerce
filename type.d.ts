export type TabList = "پیتزا" | "برگر" | "پیش غذا و سالاد" | "نوشیدنی";
export interface ImagesProduct {
  id: number
  product_id: number
  image: string
}
export interface TabPanelItem {
  id: number
  name: string
  slug: string
  category: string
  category_id: number
  primary_image: string
  primary_image_blurDataURL: string
  status_value: number
  status: string
  price: number
  quantity: number
  description: string
  is_sale: boolean
  sale_price?: number
  date_on_sale_from: string
  date_on_sale_to: string
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

export interface MenuItem{
  id: number
  parent_id: number
  name: string
  description?: string
}

export interface MenuItemsRoot {
  status: string
  message: any
  data: MenuItem[]
}


export interface Links {
  first: string
  last: string
  prev: any
  next: string
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface Link {
  url?: string
  label: string
  active: boolean
}


export interface ProductType {
  id: number
  name: string
  slug: string
  category: string
  category_id: number
  primary_image: string
  primary_image_blurDataURL: string
  status_value: number
  status: string
  price: number
  quantity: number
  description: string
  is_sale: boolean
  sale_price?: number
  date_on_sale_from: string
  date_on_sale_to: string
  images: Image[]
}

export interface ProductData {
  products: ProductType[]
  links: Links
  meta: Meta
}
export interface ProductRoot {
  status: string
  message: any
  data: Data
}