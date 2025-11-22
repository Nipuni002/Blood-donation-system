-- Database schema for request-service

CREATE DATABASE IF NOT EXISTS blooddonor;

CREATE TABLE IF NOT EXISTS requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  patient_name VARCHAR(200) NOT NULL,
  required_blood_group VARCHAR(20) NOT NULL,
  hospital VARCHAR(200) NOT NULL,
  location VARCHAR(200),
  contact_number VARCHAR(50),
  urgency VARCHAR(50) DEFAULT 'Normal',
  status VARCHAR(50) DEFAULT 'Pending', -- Pending/Matched/Completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optional FK (if users table exists in same DB):
-- ALTER TABLE requests ADD CONSTRAINT fk_user_requests FOREIGN KEY (user_id) REFERENCES users(id);

-- Example index for faster lookups by status/urgency
-- CREATE INDEX idx_requests_status_urgency ON requests (status, urgency);
