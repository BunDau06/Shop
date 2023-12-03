import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    orderItemsSelected: [],
    shippingAddress: {

    },
    paymentMethod: '',  // phương thức thanh toán
    itemsPrice: 0,  // tổng giá sản phẩm
    shippingPrice: 0,
    taxPrice: 0,   // thuế
    totalPrice: 0,  // tổng tiền
    user: 0,
    isPaid: false,  // đã thanh toán chưa
    paidAt: '',   // thanh toán vào lúc nào
    isDelivered: false,  // đã giao hàng chưa
    deliveredAt: '',   // giao hàng vào lúc nào
    // isErrorOrder: false,
    // isSucessOrder: false,
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
            if (itemOrder) {
                // if (itemOrder.amount <= itemOrder.countInStock) {
                itemOrder.amount += orderItem?.amount
                //     state.isSucessOrder = true
                //     // state.isErrorOrder = false
                // }
            } else {
                state.orderItems.push(orderItem)
            }
        },
        // resetOrder: (state) => {
        //     state.isSucessOrder = false
        // },
        increaseAmount: (state, action) => {
            const { idProduct, } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
            itemOrder.amount++;
            if (itemOrderSelected) {
                itemOrderSelected.amount++
            }
        },

        decreaseAmount: (state, action) => {
            const { idProduct, } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
            itemOrder.amount--;
            if (itemOrderSelected) {
                itemOrderSelected.amount--
            }
        },

        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
            const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct)
            state.orderItems = itemOrder;
            state.orderItemsSelected = itemOrderSelected;
        },

        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload
            const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            const itemOrdersSelected = state?.orderItemsSelected?.filter((item) => !listChecked.includes(item.product))
            state.orderItems = itemOrders
            state.orderItemsSelected = itemOrdersSelected
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload
            const orderSelected = []
            state.orderItems.forEach((order) => {
                if (listChecked.includes(order.product)) {
                    orderSelected.push(order)
                }
            })
            state.orderItemsSelected = orderSelected
            // console.log('slec', state, action)
        }




    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, resetOrder } = orderSlide.actions

export default orderSlide.reducer



// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     orderItems: [],
//     orderItemsSlected: [],
//     shippingAddress: {
//     },
//     paymentMethod: '',
//     itemsPrice: 0,
//     shippingPrice: 0,
//     taxPrice: 0,
//     totalPrice: 0,
//     user: '',
//     isPaid: false,
//     paidAt: '',
//     isDelivered: false,
//     deliveredAt: '',
//     isSucessOrder: false,
// }

// export const orderSlide = createSlice({
//     name: 'order',
//     initialState,
//     reducers: {
//         addOrderProduct: (state, action) => {
//             const { orderItem } = action.payload
//             const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
//             if (itemOrder) {
//                 if (itemOrder.amount <= itemOrder.countInstock) {
//                     itemOrder.amount += orderItem?.amount
//                     state.isSucessOrder = true
//                     state.isErrorOrder = false
//                 }
//             } else {
//                 state.orderItems.push(orderItem)
//             }
//         },
//         resetOrder: (state) => {
//             state.isSucessOrder = false
//         },
//         increaseAmount: (state, action) => {
//             const { idProduct } = action.payload
//             const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
//             const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct)
//             itemOrder.amount++;
//             if (itemOrderSelected) {
//                 itemOrderSelected.amount++;
//             }
//         },
//         decreaseAmount: (state, action) => {
//             const { idProduct } = action.payload
//             const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
//             const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct)
//             itemOrder.amount--;
//             if (itemOrderSelected) {
//                 itemOrderSelected.amount--;
//             }
//         },
//         removeOrderProduct: (state, action) => {
//             const { idProduct } = action.payload

//             const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
//             const itemOrderSeleted = state?.orderItemsSlected?.filter((item) => item?.product !== idProduct)

//             state.orderItems = itemOrder;
//             state.orderItemsSlected = itemOrderSeleted;
//         },
//         removeAllOrderProduct: (state, action) => {
//             const { listChecked } = action.payload

//             const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
//             const itemOrdersSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
//             state.orderItems = itemOrders
//             state.orderItemsSlected = itemOrdersSelected

//         },
//         selectedOrder: (state, action) => {
//             const { listChecked } = action.payload
//             const orderSelected = []
//             state.orderItems.forEach((order) => {
//                 if (listChecked.includes(order.product)) {
//                     orderSelected.push(order)
//                 };
//             });
//             state.orderItemsSlected = orderSelected
//         }
//     },
// })

// // Action creators are generated for each case reducer function
// export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, resetOrder } = orderSlide.actions

// export default orderSlide.reducer
