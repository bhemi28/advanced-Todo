import { Sequelize } from 'sequelize';

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './src/config/database.sqlite', // Specify the path to your SQLite database file
});

const connectDatabase = async () => {
    try {
        await database.authenticate();
        console.log('Connection to the SQLite database has been established successfully.');
        await database.sync({ alter: true, force: false }); // Sync models with the database
        console.log('Database synced!');
    } catch (error) {
        console.error('Unable to connect to the SQLite database:', error);
    }
};

export { database, connectDatabase };