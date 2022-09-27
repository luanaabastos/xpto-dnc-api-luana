## Antes de Rodar pela primeira vez
* rodar ```npm install``` na pasta do projeto

## Toda vez que iniciar os trabalhos no projeto
* rodar ```docker-compose up db``` ou ```docker-compose up db -d``` para ter um banco MYSQL
* espere o banco subir senão o projeto vai falhar
* rodar ```npm start```
* Criando duas  tabelas 'usuarios' e 'presencas' em um banco de dados
'shifts', onde foi criado no 'Sequelize' ele é um ORM, ele que cuida de toda comunicação com o banco.
* 'Repository Pattern' é um padrão pra saber qualidade do projeto, na pasta 'repositories'
* 'API' foi feita utilizando 'Express'
* A segurança foi feita com 'JWT (Json Web Token)'
* A pasta 'database' está a configuração do 'Sequelize'
* A pasta 'repositories' está a configuração do 'Repository Pattern'
* A pasta 'routes' está os endpoints da 'Express'
* A pasta 'services' esta a 'regra do negócio'
* 'docker-compose up --build' ele vai jogar a API dentro do docker





