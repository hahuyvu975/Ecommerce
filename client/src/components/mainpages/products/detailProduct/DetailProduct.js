import React, { useContext, useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'
import './DetailProduct.css'
import ProductItem from '../../utils/Product_item/ProductItem'

function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if(params.id) {
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[products, params.id])

    console.log(detailProduct)
    if(detailProduct.length === 0) return 0;
    return (
        <>
        <div className='detail'>
            <img src= {detailProduct.images} alt=''/>
            <div className='box-detail'>
                <div className='row'>
                    <h2>{detailProduct.title}</h2>
                    <h6>{detailProduct.product_id}</h6>
                </div>
                <span>${detailProduct.price}</span>
                <p>{detailProduct.content}</p>
                <p>{detailProduct.description}</p>
                <p>Sold: {detailProduct.sold}</p>
                <Link to="/cart" className='cart'>BUY NOW</Link>
            </div>
           <div>
               <h2>Related Product</h2>
               <div className='products'>
                   {
                       products.map(product => {
                        return product.category === detailProduct.category ? <ProductItem key={product._id} product = {product} /> : null 
                    })
                   }

               </div>
           </div>
        </div>
        </>
    )
}

export default DetailProduct