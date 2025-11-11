 -- Add credit card payment fields to expenses table
  ALTER TABLE expenses ADD COLUMN IF NOT EXISTS
  payment_method TEXT DEFAULT 'cash';
  ALTER TABLE expenses ADD COLUMN IF NOT EXISTS
  installments_total INTEGER;
  ALTER TABLE expenses ADD COLUMN IF NOT EXISTS
  installment_number INTEGER;
  ALTER TABLE expenses ADD COLUMN IF NOT EXISTS
  parent_expense_id INTEGER REFERENCES expenses(id) ON
  DELETE CASCADE;
  ALTER TABLE expenses ADD COLUMN IF NOT EXISTS
  purchase_date DATE;

  -- Add index for querying installments
  CREATE INDEX IF NOT EXISTS idx_expenses_parent_id ON
  expenses(parent_expense_id);

  -- Add invoice payment day to users table
  ALTER TABLE users ADD COLUMN IF NOT EXISTS
  invoice_payment_day INTEGER DEFAULT 5;

  -- Add constraint for valid installment numbers
  ALTER TABLE expenses ADD CONSTRAINT
  check_installment_valid CHECK (
    installment_number IS NULL OR
    (installments_total IS NULL OR installment_number <= installments_total)
  );