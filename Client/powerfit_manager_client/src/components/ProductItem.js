import React from 'react'
import '../styles/Sales/productItem.css'
import {useForm} from "react-hook-form"

const ProductItem= (props) =>{
    const { register, formState: { errors }, handleSubmit } = useForm();
    const isOrdered = 
    props.ordered===undefined?
    <button type='submit' className='product-shop bx bxl-shopify'></button>
    :
    <button disabled type='submit' className='product-shop bx bxl-shopify'></button>
        
    return (
        <>
            <form noValidate onSubmit={handleSubmit(props.onQueue)} className='product-item'>
                <input value={props.id} type="hidden" {...register('productId')}/>
                <h4 className='product-name'>{props.name}</h4>
                <p className='product-details'>{props.details}</p>
                <p className='product-stock'>Disponible: {props.stock}</p>
                <p className='product-price'>Precio: ₡{props.price}/u</p>
                <div className='product-check'>
                    <input type="number" {...register("quantityOrder",{required:true,min:1})} defaultValue={props.stock===0?0:1} min={props.stock===0?0:1}max={props.stock}></input>    
                    {isOrdered}
                </div>
                {errors["quantityOrder"] && <p className="mt-1 text-secondary">{"*Cantidad disponible requerida"}</p>}
            </form>
        </>
    );
}

export default ProductItem;