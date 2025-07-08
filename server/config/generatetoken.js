import jwt from "jsonwebtoken";
export const generatetoken=(userId)=>{
const token=jwt.sign(userId,process.env.SECRET_KEY);
return token ;
}
