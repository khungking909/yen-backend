import userRoute from './user.js'
import productRoute from './product.js'
import cartRoute from './cart.js'
import couponRoute from './coupon.js'

function route(app)
{
    app.use('/api/users', userRoute)
    app.use('/api/products', productRoute)
    app.use('/api/carts', cartRoute)
    app.use('/api/coupons', couponRoute)
}

export default route