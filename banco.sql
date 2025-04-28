create database everyDay;
use everyDay;

create table usuarios (
	id int primary key not null auto_increment,
    nome varchar(255) not null,
    email varchar(255) not null, 
    senha varchar(255) not null, 
    status enum ('ativo', 'inativo') default ('ativo'),
    created_at timestamp default current_timestamp
);

create table lembretes (
	id int primary key not null auto_increment,
    titulo varchar(255) not null,
    dia date
);

create table checklist (
	id int primary key not null auto_increment,
    conteudo varchar(255) not null
);

create table habitos(
	id int primary key auto_increment not null,
    habito varchar(255),
    periodo varchar(255)
);