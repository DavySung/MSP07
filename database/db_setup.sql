create database if not exists node_development;
create database if not exists node_test;
create database if not exists node_production;
create role root with password 'IcK2Pwftok97k0Hr';
alter role "root" with login;
grant all privileges on database node_development to root;
grant all privile
