INSERT INTO users(email, name, token, logged, rol)
VALUES 
  ('jonathan@gmail.com', 'jonathan', '5619161961616156156', false, 'admin'),
  ('laura@example.com', 'laura', '987654321abcdef', false, 'user'),
  ('carlos@correo.com', 'carlos', 'abc123tokenxyz', false, 'user');

INSERT INTO ofertas(title, salary, country, description, id_user)
VALUES
  ('Backend Developer', '50000', 'Spain', 'Python and Django experience required.', 1),
  ('Frontend Developer', '45000', 'Germany', 'React and TypeScript needed.', 2),
  ('Full Stack Engineer', '60000', 'Netherlands', 'Work on both frontend and backend systems.', 3);


