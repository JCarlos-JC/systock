-- Supabase Database Schema for SyStock

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL DEFAULT 'operador' CHECK (role IN ('admin', 'operador', 'gestor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Suppliers table
CREATE TABLE suppliers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact VARCHAR(255),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(100),
  quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  purchase_price DECIMAL(10,2) NOT NULL CHECK (purchase_price >= 0),
  sale_price DECIMAL(10,2) NOT NULL CHECK (sale_price >= 0),
  supplier_id UUID REFERENCES suppliers(id) ON DELETE RESTRICT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sales table
CREATE TABLE sales (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE RESTRICT NOT NULL,
  sale_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  receipt_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sale items table
CREATE TABLE sale_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sale_id UUID REFERENCES sales(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE RESTRICT NOT NULL,
  quantity_sold INTEGER NOT NULL CHECK (quantity_sold > 0),
  price_per_unit DECIMAL(10,2) NOT NULL CHECK (price_per_unit >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cash register table
CREATE TABLE cash_register (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  opening_amount DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (opening_amount >= 0),
  closing_amount DECIMAL(10,2),
  opened_by UUID REFERENCES users(id) ON DELETE RESTRICT NOT NULL,
  closed_by UUID REFERENCES users(id) ON DELETE RESTRICT,
  opened_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_closing_logic CHECK (
    (closed_at IS NULL AND closing_amount IS NULL AND closed_by IS NULL) OR
    (closed_at IS NOT NULL AND closing_amount IS NOT NULL AND closed_by IS NOT NULL)
  )
);

-- Create indexes for performance
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_quantity ON products(quantity);
CREATE INDEX idx_sales_user ON sales(user_id);
CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_sale_items_sale ON sale_items(sale_id);
CREATE INDEX idx_sale_items_product ON sale_items(product_id);
CREATE INDEX idx_cash_register_opened_by ON cash_register(opened_by);
CREATE INDEX idx_cash_register_date ON cash_register(opened_at);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_register ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert users" ON users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update users" ON users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Suppliers policies (Admins and Gestores can manage)
CREATE POLICY "Users can view suppliers" ON suppliers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'gestor', 'operador')
    )
  );

CREATE POLICY "Admins and gestores can manage suppliers" ON suppliers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'gestor')
    )
  );

-- Products policies (Similar to suppliers)
CREATE POLICY "Users can view products" ON products
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'gestor', 'operador')
    )
  );

CREATE POLICY "Admins and gestores can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'gestor')
    )
  );

-- Sales policies (All authenticated users can view and create)
CREATE POLICY "Users can view sales" ON sales
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'gestor', 'operador')
    )
  );

CREATE POLICY "Users can create sales" ON sales
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'gestor', 'operador')
    )
  );

-- Sale items policies
CREATE POLICY "Users can view sale items" ON sale_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'gestor', 'operador')
    )
  );

CREATE POLICY "Users can create sale items" ON sale_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'gestor', 'operador')
    )
  );

-- Cash register policies
CREATE POLICY "Users can view cash register" ON cash_register
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'gestor', 'operador')
    )
  );

CREATE POLICY "Users can manage cash register" ON cash_register
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'gestor', 'operador')
    )
  );

-- Functions to automatically update stock
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
  -- Update product quantity when a sale is made
  UPDATE products 
  SET quantity = quantity - NEW.quantity_sold 
  WHERE id = NEW.product_id;
  
  -- Check if stock becomes negative
  IF (SELECT quantity FROM products WHERE id = NEW.product_id) < 0 THEN
    RAISE EXCEPTION 'Stock insuficiente para o produto';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update stock on sale
CREATE TRIGGER trigger_update_stock
  AFTER INSERT ON sale_items
  FOR EACH ROW
  EXECUTE FUNCTION update_product_stock();

-- Sample data for testing (optional)
INSERT INTO suppliers (name, contact, address) VALUES
  ('Fornecedor ABC', 'contato@abc.com', 'Rua ABC, 123'),
  ('Fornecedor XYZ', 'contato@xyz.com', 'Rua XYZ, 456');

-- Note: Users will be created through Supabase Auth + the users table trigger
-- Products will be added through the application interface