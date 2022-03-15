const jwt = require("jsonwebtoken");


const authenticationUser=function(req,res,next)
{
  try {
    let token = req.headers["x-api-key"];
    if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

 let decodedToken = jwt.verify(token, "functionup-thorium-group5");//verifying token with secret key
 //console.log(decodedToken)

  if (!decodedToken)
    return res.status(400).send({ status: false, msg: "token is invalid" });//validating token value inside decodedToken

  next();
  
}
catch(error)
{
  res.send({msg:error.message})
}
}

const authorisationUser=function(req,res,next)
{
  try {
  let token = req.headers["x-api-key"];

  let decodedToken = jwt.verify(token, "functionup-thorium-group5");
console.log(decodedToken)
  let authorisedUser=decodedToken.authorId;
  let logedInUser=req.params.authorId;
  console.log(authorisedUser,logedInUser)
  if(authorisedUser!==logedInUser) return res.status(401).send({status:false,msg:"You are not an authorized person to make these changes"})
  next();  
}
catch(error)
{
  return res.send({msg:error.message})
}
}
module.exports.authenticationUser = authenticationUser;

module.exports.authorisationUser = authorisationUser;
