import React, {useState,useEffect} from 'react'
import ProductList from './components/ProductList';
import  ShoppingCart from './components/ShoppingCart';
import ProgressBar from './components/ProgressBar';

const PRODUCTS=[
  {id:1,name:"Laptop",price:500},
  {id:2,name:"SmartPhone",price:300},
  {id:3,name:"HeadPhones",price:200},
  {id:4,name:"SmartWatch",price:150}
];

const FREE_GIFT={id:99,name:"Wireless Mouse",price:0};
const THRESHOLD=1000;

function App(){
  const[cart,setCart]=useState({});
  const[showGiftMessage,setShowGiftMessage]=useState(false);

  const addToCart=(product)=>{
    setCart(prevCart=>({
      ...prevCart,
      [product.id]:
    (prevCart[product.id]||0)+1,
    }));
  };


  const updateQuantity=(productId,quantity)=>{
    const newQuantity=Math.max(0,parseInt(quantity,10));
    setCart(prevCart=>{
      const updatedCart={...prevCart};
      if(newQuantity>0){
        updatedCart[productId]=newQuantity;
      }else{
        delete updatedCart[productId];
      }
      return updatedCart;
    });
  };

  const removeFromCart=(productId)=>{
    setCart(prevCart=>{
      const updatedCart={...prevCart};
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  const calculateSubtotal=(currentCart)=>{
    return Object.keys(currentCart).reduce((total,productId)=>{
      const product=PRODUCTS.find(p=>p.id===parseInt(productId,10));
      const freeGiftInCart=currentCart[FREE_GIFT.id];
      if(product){
        total+=product.price*currentCart[productId];
      }
      return total;
    },0);
  };

  const subtotal=calculateSubtotal(cart);
  const remainingAmount=Math.max(0,THRESHOLD-subtotal);
  const isEligibleForGift=subtotal>=THRESHOLD;
  const isGiftInCart=cart[FREE_GIFT.id];

  useEffect(()=>{
    if(isEligibleForGift&&!isGiftInCart){
      setCart(prevCart=>({...prevCart,[FREE_GIFT.id]:1}));
      setShowGiftMessage(true);
      setTimeout(()=>setShowGiftMessage(false),3000);
    }else if(!isEligibleForGift,isGiftInCart,cart){
      const newCart={...cart};
      delete newCart[FREE_GIFT.id];
      setCart(newCart);
    }
  },[isEligibleForGift,isGiftInCart,cart]);
  
  return(
    <div style={StyleSheet.container}>
      <h1>MyOnline Store</h1>
      <ProductList products={PRODUCTS} onAddToCart={addToCart}/>
      <h2>Shopping Cart</h2>
      <ProgressBar threshold={THRESHOLD} current={subtotal}/>
      {showGiftMessage&&(
        <div
          style={styles.giftMessage}>You received a free gift! </div>
      )}
      <ShoppingCart
        cart={cart}
        products={PRODUCTS.concat(FREE_GIFT)}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        isFreeGiftInCart={isGiftInCart}/>
        <div style={styles.summary}><strong>Subtotal:Rs{subtotal}</strong></div>
    </div>
  );
}

const styles={
  container:{
    fontFamily:'Arial,sans-serif',
    maxWidth:'800px',
    margin:'20px auto',
    padding:'20px',
    border:'1px solid #ccc',
    borderRadius:'8px',
  },
  giftMessage:{
    backgroundColor:'#d4edda',
    color:'#155724',
    padding:'10px',
    borderRadius:'5px',
    marginBottom:'10px',
    textAlign:'center',
  },
  summary:{
    marginTop:'20px',
    textAlign:'right',
  },
};

export default App;
