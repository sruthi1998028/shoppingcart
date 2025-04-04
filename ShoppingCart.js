import React from 'react';

function ShoppingCart({cart,products,onUpdateQuantity,onRemoveFromCart,isFreeGiftInCart}){
    return(
        <div>
            <h3>Your Cart</h3>
            {Object.keys(cart).length===0?(
                <p>Your cart is empty</p>
            ):(
                <ul>
                    {Object.keys(cart).map(productId=>{
                        const product=products.find(p=>p.id===productId);
                        if(!product)return null;
                        return(
                            <li key={productId} style={styles.cartItem}>
                                <span>{product.name}</span>
                                <div
                                    style={styles.quantityControl}>
                                        <button onClick={()=>onUpdateQuantity(productId,cart[productId]-1)}>-</button>
                                        <input type="number"
                                        value={cart[productId]}
                                        min="0"
                                        onChange={(e)=>onUpdateQuantity(productId,e.target.value)}
                                    style={styles.quantityInput}/>
                                        <button onClick={()=>onUpdateQuantity(productId,cart[productId]+1)}>+</button>
                                </div>
                                <span>Rs{product.price*cart[productId]}</span>
                                {productId!=='free_gift'&&(
                                    <button onClick={()=>onRemoveFromCart(productId)}
                                    style={styles.removeButton}>Remove</button>
                                )}
                            </li>
                        );
              
                    })}
                </ul>
            )}
        </div>
        );
}

const styles={
    cartItem:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        padding:'10px 0',
        borderBottom:'1px solid #eee',
    },
    quantityControl:{
        display:'flex',
        alignItems:'center',
    },
    quantityInput:{
        width:'50px',
        textAlign:'center',
        margin:'0 10px',
    },
    removeButton:{
        backgroundColor:'#dc3545',
        color:'white',
        border:'none',
        padding:'5px 10px',
        borderradius:'5px',
        cursor:'pointer',
        marginLeft:'10px'
    },
};

export default ShoppingCart
