export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'operador' | 'gestor_stock';
  created_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  quantity: number;
  purchase_price: number;
  sale_price: number;
  supplier_id?: string;
  supplier?: Supplier;
  created_at: string;
  updated_at: string;
}

export interface Sale {
  id: string;
  total: number;
  items: SaleItem[];
  user_id: string;
  receipt_url?: string;
  created_at: string;
}

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Report {
  id: string;
  name: string;
  type: 'sales' | 'suppliers' | 'products' | 'abc_analysis';
  data: any;
  created_at: string;
}

export type ABCClassification = 'A' | 'B' | 'C';

export interface ProductABC extends Product {
  classification: ABCClassification;
  value: number;
  stock_turns: number;
}