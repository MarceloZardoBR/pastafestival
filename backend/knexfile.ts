import path from 'path';

module.exports = {
    client: 'postgresql',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'root',
        database : 'pastafestival',
    },
    migrations:{
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
}