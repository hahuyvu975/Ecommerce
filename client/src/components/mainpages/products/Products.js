import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/Loading/Loading'
import ProductItem from '../utils/Product_item/ProductItem'
import './Products.css'

function Products() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products

    return (
        <>
            <div className='products'>
                {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product} />
                    })
                }
            </div>
            {
                products.length === 0 && <Loading />
            }
        </>
    )
}

export default Products