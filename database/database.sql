CREATE TABLE "members" (
  "id" int,
  "customer_number" varchar(255) PRIMARY KEY,
  "first_name" varchar(255),
  "lastname" varchar(255),
  "email" varchar(255),
  "phone" varchar(255),
  "address_1" varchar(255),
  "address_2" varchar(255),
  "address_suburb" varchar(255),
  "address_state" varchar(3),
  "address_postcode" varchar(5),
  "account_active_ind" bool,
  "created_date" date
);

CREATE TABLE "products" (
  "id" int,
  "product_code" varchar(12) PRIMARY KEY,
  "product_name" varchar(255),
  "product_desc" varchar(255),
  "created_date" date
);

CREATE TABLE "product_price" (
  "id" int PRIMARY KEY,
  "product_code" varchar(12),
  "product_price" decimal,
  "product_price_start_date" date,
  "product_price_end_date" date
);

CREATE TABLE "transactions" (
  "id" int PRIMARY KEY,
  "customer_number" varchar(255),
  "product_code" varchar(12),
  "transaction_date" date,
  "product_price" decimal
);

ALTER TABLE "product_price" ADD FOREIGN KEY ("product_code") REFERENCES "products" ("product_code");

ALTER TABLE "transactions" ADD FOREIGN KEY ("customer_number") REFERENCES "members" ("customer_number");

ALTER TABLE "transactions" ADD FOREIGN KEY ("product_code") REFERENCES "products" ("product_code");
