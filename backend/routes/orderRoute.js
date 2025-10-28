import express from 'express'
import  {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import auth from '../middleware/auth.js'
import authUser from '../middleware/auth.js'
const orderRouter = express.Router()

//Admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//Payment features
orderRouter.post('/place',auth,placeOrder)
orderRouter.post('/stripe',auth,placeOrderStripe)
orderRouter.post('/razorpay',auth,placeOrderRazorpay)

//user features

orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter;