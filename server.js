const app = require('./app');
const {connectDatabase} = require('./config/database');

connectDatabase();
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})

