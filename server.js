const app = require('./app');
const {connectDatabase} = require('./config/database');

connectDatabase();

app.listen(3000,()=>{
    console.log(`Server is running on port : 3000`);
})

