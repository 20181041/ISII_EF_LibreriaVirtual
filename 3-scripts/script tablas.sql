use heroku_c167978e2c315c8;
create table categorias (idCategoria int, Descripcion varchar(50));
create table estados (idEstado int, Descripcion varchar(50)); 
create table tipo_transaccion (idEstado int, Descripcion varchar(50)); 
SELECT * FROM libro;
SELECT * FROM usuario; 
SELECT * FROM categorias;
SELECT * FROM estados;
SELECT * FROM tipo_transaccion;
SELECT * FROM transaccion;

insert into usuario
values (1, "Andrea", "AL1234", "andrealf2001@gmail.com", "Andrea Lucia Lira Falcon", 994415244, "Surco", 5);
insert into usuario
values (2, "Clau", "CM1234", "claum@gmail.com", "Claudia Martinez", 994426544, "Cieneguilla", 5);

insert into categorias
values (1, "Terror");
insert into categorias
values (2, "Suspenso");
insert into categorias
values (3, "Romance");
insert into categorias
values (4, "Thriller");
insert into categorias
values (5, "Infantil");
insert into categorias
values (6, "Ficción");
insert into categorias
values (7, "Filosofía");
insert into categorias
values (8, "Tragedia");

insert into estados
values (1, "Nuevo");
insert into estados
values (2, "Casi nuevo");
insert into estados
values (3, "Usado");
insert into estados
values (4, "Desgastado"); 

insert into tipo_transaccion
values (1, "Venta");
insert into tipo_transaccion
values (2, "Intercambio");
insert into tipo_transaccion
values (3, "Préstamo");

insert into libro
values (1, "Prueba titulo", 1000000, "Andrea L", "Venta", "Sin imperfectos", "Terror", "Cerrado", 1, "www.google.com");
insert into libro
values (2, "Prueba titulo 2", 1000000, "Clau M", "Venta", "Sin imperfectos", "Romance", "Abierto", 2, "www.youtube.com");

update libro
set Estado as Nuevo where ID_Libro = 1;
update libro
set Estado = Casi nuevo where ID_Libro = 2;
update libro
set Estado = Usado where ID_Libro = 5;

delete from estados where Descripcion = "Préstamo";

drop table categorias;