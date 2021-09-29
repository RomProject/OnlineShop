-- create database project4; 
-- use project4;

-- create table users(
-- id int auto_increment,
-- fname varchar(255),
-- lname varchar(255),
-- email text,
-- id_num int,
-- password text,
-- city text,
-- street text,
-- is_admin bool default 0,
-- primary key(id)


 -- select * from users




-- create table category(
-- id int auto_increment,
-- primary key(id),
-- cat_num int,
-- cat_name text

-- );




-- create table products(
-- id int auto_increment,
-- primary key(id),
-- prod_name text,
-- category_id int,
-- price int,
-- img text,
-- foreign key(category_id) references category(id)
-- );





 -- create table cart(
  -- id int auto_increment,
--  primary key(id),
-- user_id int ,
  -- created datetime default now(),
  -- foreign key(user_id) references users(id)

 -- );

-- select * from cart inner join users where users.id = user_id

-- create table cartitem(
-- id int auto_increment,
-- primary key(id),
-- prod_id int,
-- cart_id int,
-- amount int,
-- foreign key(prod_id) references products(id),
-- foreign key(cart_id) references cart(id)



-- );
