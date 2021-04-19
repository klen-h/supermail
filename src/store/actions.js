import { ADD_COUNTER, ADD_TO_CART } from './mutations-types'

export default {
    addCart(context, payload) {
        return new Promise((resolve) => {
            //payload新添加的商品
            // let oldProduct = null
            // for (let item of state.cartList) {
            //     if (item.iid === payload.iid) {
            //         oldProduct = item
            //     }
            // }
            //find方法
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                //判断oldProduct
            if (oldProduct) {
                context.commit(ADD_COUNTER, oldProduct)
                resolve('该商品数量加1')
            } else {
                payload.count = 1
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新的商品')
            }
        })
    }
}