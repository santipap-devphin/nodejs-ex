const userDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout =  async (req , res ) => {

    // on client , also delete the accessToken 
    const cookies = req.cookies;
  
    if(!cookies?.jwt) return res.sendStatus(204); // no content
    
    const refreshToken = cookies.jwt;

    // Is refreshToken in db ? 
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) 
    {
        res.clearCookie('jwt', {httpOnly :true , sameSite :'None' ,secure : true});
        return res.sendStatus(204); 
    }
    // Delete refreshToken in db
    const otherusers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser , refreshToken : ''}
    userDB.setUsers([...otherusers , currentUser]);

    await fsPromises.writeFile(
        path.join(__dirname , '..' , 'model' , 'users.json') ,
        JSON.stringify(userDB.users)
    )

    res.clearCookie('jwt' , {httpOnly :true}); // secure : true - only serves on https
    res.sendStatus(204);
}



module.exports = {handleLogout };