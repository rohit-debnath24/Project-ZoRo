import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"Access Denied bcz token doesnt exists" })
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){

            return res.json({success:false,message:"Access Denied bcz token mismatched" })
        }
        next()
    } catch (error) {
          console.log(error);
        res.json({success:false,message:error.message})
      
    }
}

export default adminAuth;