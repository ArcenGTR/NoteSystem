INSERT INTO customers (first_name, last_name, email, phone, address1, address2, city, state, zip, notes, active, created_at, updated_at) VALUES
('John', 'Doe', 'john.doe@example.com', '123-456-7890', '123 Main St', NULL, 'New York', 'NY', '10001', 'VIP customer', true, NOW(), NOW()),
('Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', '456 Elm St', 'Apt 2', 'Los Angeles', 'CA', '90001', NULL, true, NOW(), NOW()),
('Bob', 'Johnson', 'bob.johnson@example.com', '555-123-4567', '789 Oak St', NULL, 'Chicago', 'IL', '60601', 'Long-term customer', true, NOW(), NOW()),
('Alice', 'Brown', 'alice.brown@example.com', '222-333-4444', '321 Pine St', NULL, 'Houston', 'TX', '77001', 'Frequent repairs', true, NOW(), NOW()),
('Charlie', 'Miller', 'charlie.miller@example.com', '666-777-8888', '654 Cedar St', 'Suite 5B', 'Miami', 'FL', '33101', NULL, true, NOW(), NOW()),
('Emily', 'Davis', 'emily.davis@example.com', '999-888-7777', '987 Birch St', NULL, 'Seattle', 'WA', '98101', 'Preferred customer', true, NOW(), NOW());