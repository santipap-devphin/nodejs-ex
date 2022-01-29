const {logEvents} = require('./logEvents');
const errHandler = (err ,req ,res ,next) =>{

     logEvents(`${err.nane} : ${err.message}` , 'errLog.txt');
    console.error(err.stack);
    res.status(500).send(err.message);

}

module.exports = errHandler;