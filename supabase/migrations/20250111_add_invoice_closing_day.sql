-- Add invoice_closing_day column to users table

ALTER TABLE users ADD COLUMN IF NOT EXISTS
invoice_closing_day INTEGER;

-- Add check constraint to ensure valid day range
ALTER TABLE users ADD CONSTRAINT
check_invoice_closing_day_range
CHECK (invoice_closing_day IS NULL OR (invoice_closing_day >= 1 AND invoice_closing_day <= 31));

-- Add comment for documentation
COMMENT ON COLUMN users.invoice_closing_day IS 'Day of the month when credit card invoice closes (1-31). Used to determine which invoice cycle a transaction belongs to.';