import React from 'react'
import '../styles/ProductItem/productItem.css'

const ProductItem= (props) =>{
    return (
        <>
            <div className='product-item'>
                <input className='product-id' type="hidden">{props.key}</input>
                <h4 className='product-name'>{props.name}</h4>
                <p className='product-details'>{props.details}</p>
                <p className='product-stock'>Disponible: {props.stock}</p>
                <p className='product-price'>Precio: ₡{props.price}/u</p>
                <div className='product-check'>
                <input type="number" min={1}></input>
                <a className='product-shop bx bxl-shopify'></a>
                </div>
            </div>
        </>
    );
}

export default ProductItem;