create database cine1;

use cine1;

drop database cine1;

create table formato(
formato_id int(1) primary key,
tipo varchar(6) NOT NULL
);

insert into formato values(1,"2D"),(2,"3D"),(3,"4D");


create table horario(
hora_id int(10) primary key NOT NULL,
hora_peli time NOT NULL
);

insert into horario values (1,'12:00'),(2,'13:00'),(3,'14:00'),(4,'15:00'),(5,'16:00'),(6,'17:00');

create table usuarios(
id_usu int(8) AUTO_INCREMENT,
nombre varchar(30) NOT NULL,
apellido varchar(30) NOT NULL,
dni int(8) UNIQUE NOT NULL,
pass varchar(20) NOT NULL,
fec_nac date NOT NULL,
primary key (id_usu)
);



create table pelicula(
peli_id int(8) primary key AUTO_INCREMENT,
titulo varchar(50) NOT NULL
);

insert into pelicula values(NOT NULL,"Spider-man"),(NOT NULL,"Harry Potter"),(NOT NULL,"Dragon Ball"),(NOT NULL,"Venom");


CREATE TABLE salas (
    sala_id int(2) NOT NULL AUTO_INCREMENT,
    num_sala int(1) NOT NULL,
    peli_id int(8) NOT NULL,
    formato_id int(1) NOT NULL,
    hora_id int(10) NOT NULL,
    PRIMARY KEY (sala_id),
    FOREIGN KEY (hora_id) REFERENCES horario(hora_id),
    FOREIGN KEY (formato_id) REFERENCES formato(formato_id),
    FOREIGN KEY (peli_id) REFERENCES pelicula(peli_id)
);

INSERT INTO salas (num_sala, peli_id, formato_id, hora_id) VALUES(1,1,3,2);

INSERT INTO salas (num_sala, peli_id, formato_id, hora_id)
VALUES (1, 1, 1, 1),
       (1, 2, 2, 3),
       (2, 2, 1, 4),
       (2, 2, 1, 1),
       (3, 3, 3, 6),
       (3, 3, 1, 4),
       (4, 4, 3, 2),
       (4, 4, 1, 5);


create table asiento(
asi_id int(2) primary key AUTO_INCREMENT,
fila VARCHAR(5) NOT NULL,
numero INT NOT NULL,
disponible boolean default true NOT NULL,
sala_id int(2) NOT NULL, 
foreign key (sala_id) references salas(sala_id)
);


INSERT INTO asiento (fila, numero, disponible, sala_id)
VALUES
('A', 1, true, 1),('A', 2, true, 1),('A', 3, true, 1),('A', 4, true, 1),('A', 5, true, 1),
('B', 1, true, 2),('B', 2, true, 2),('B', 3, true, 2),('B', 4, true, 2),('B', 5, true, 2),
('A', 1, true, 3),('A', 2, true, 3),('A', 3, true, 3),('A', 4, true, 3),('A', 5, true, 3),
('A', 1, true, 4),('A', 2, true, 4),('A', 3, true, 4),('A', 4, true, 4),('A', 5, true, 4),
('A', 1, true, 5),('A', 2, true, 5),('A', 3, true, 5),('A', 4, true, 5),('A', 5, true, 5),
('A', 1, true, 6),('A', 2, true, 6),('A', 3, true, 6),('A', 4, true, 6),('A', 5, true, 6),
('A', 1, true, 7),('A', 2, true, 7),('A', 3, true, 7),('A', 4, true, 7),('A', 5, true, 7),
('A', 1, true, 8),('A', 2, true, 8),('A', 3, true, 8),('A', 4, true, 8),('A', 5, true, 8);
                          
                          

create table entradas(
ent_id int(8)primary key AUTO_INCREMENT,
id_usu int(8) NOT NULL,
sala_id int(2) NOT NULL,
asi_id int(2) NOT NULL,
fecha date NOT NULL,
hora time NOT NULL,
monto float(7,2) NOT NULL,
foreign key (asi_id) references asiento(asi_id),
foreign key (id_usu) references usuarios(id_usu),
foreign key (sala_id) references salas(sala_id)
);




