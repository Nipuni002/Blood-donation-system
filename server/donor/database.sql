CREATE DATABASE blooddonor;

CREATE TABLE donors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  bloodgroup VARCHAR(5),
  location VARCHAR(100),
  phone VARCHAR(15),
  user_id INTEGER
);

-- If you want a foreign key reference to `users` (from auth-service),
-- run this after both tables exist:
-- ALTER TABLE donors ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);
