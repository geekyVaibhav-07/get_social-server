const app = require('./app.js');
const { db } = require('./db');

process.on('unhandledRejection', (err) => {
    console.log(err.name);
    console.log(err.message);
    server &&
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.log(err.name);
    console.log(err.message);
    server &&
    server.close(() => {
        process.exit(1);
    });
});

const startServer = () => {
    const port = process.env.PORT || 5000;
    server = app.listen(port, () => {
        console.log(`Server started at ${port} !!!!`);
    });
};

let server;

db.connect(function (error) {
    if (error) {
        console.log(error);
        console.log('unable to connect to  database !!!');
    } else {
        server = startServer();
    }
});
