import toast from 'react-hot-toast'
import React from 'react'
import {getOrder} from '../../services/order.service'
import type { Order } from '../../types/order'
import { useQuery } from '@tanstack/react-query'


const OrderGet = () =>{
    const {data: orders, isLoading} = useQuery<Order[], Error>({
        queryKey: ['orders'],
        queryFn: getOrder
    })
}

export default OrderGet