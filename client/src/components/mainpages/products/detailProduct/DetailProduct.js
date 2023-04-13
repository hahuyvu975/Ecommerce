import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if(params) {
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[products, params])

    console.log(detailProduct)
    return (
        <div>
            DetailProdut
        </div>
    )
}

export default DetailProduct