import React, {useState} from 'react';

function ProductList({products,onAddToCart}) {
    const[quantities,setQuantities]=useState({});
    const handleQuantityChange=(productId,quantity)=>{
        setQuantities(prevQuantities=>({...prevQuantities,[productId]:Math.max(0,parseInt(quantity,10)),}));
    };

    const handleAddToCart=(product)=>{
        const quantityToAdd=quantities[product.id]||1;
        if(quantityToAdd>0){
            for(let i=0;i<quantityToAdd;i++){
                onAddToCart(product);
            }
            setQuantities(prevQuantities=>({...prevQuantities,[product.id]:0}));
        }
    };

    return(
        <div style={styles.productList}>
            <h2>Available Products</h2>
            {products.map(product=>(
                <div key={product.id}
                style={styles.productCard}>
                    <h3>{product.name}</h3>
                    <p>Price:Rs{product.price}</p>
                    <div
                        style={styles.quantitySelector}>
                            <button onClick={()=>
                                handleQuantityChange(product.id,(quantities[product.id]||0)-1)}
                            >-</button>
                            <input
                                type="number"
                                value={quantities[product.id]||0}
                                min="0"
                                onChange={(e)=>handleQuantityChange(product.id,e.target.value)}
                        style={styles.quantityInput}/>
                                <button onClick={()=>
                                    handleQuantityChange(product.id,(quantities[product.id]||0)+1)}
                                >+</button>
                    </div>
                                <button onClick={()=>handleAddToCart(product)}
                                style={styles.addButton}>Add to Cart</button>
                        </div>
            ))}
        </div>
    );
}

const styles={
    productList:{
        display:'flex',
        flexWrap:'wrap',
        gap:'20px',
        marginBottom:'20px',
    },
    productCard:{
        border:'1px solid #ddd',
        padding:'15px',
        borderRadius:'8px',
        width:'calc(33%-20px)',
    },
    quantitySelector:{
        display:'flex',
        alignItems:'center',
        margin:'0px 10px',
    },
    quantityInput:{
        width:'50px',
        textAlign:'center',
        margin:'0 10px'
    },
    addButton:{
        backgroundColor:'#007bff',
        color:'white',
        border:'none',
        padding:'10px 15px',
        borderRadius:'5px',
        cursor:'pointer',
    },
};

export default ProductList;



