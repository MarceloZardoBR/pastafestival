import knex from "knex";

const connection = knex({
  client: 'postgresql',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'pastafestival',
  },
  
});

export default connection;