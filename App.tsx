import { useState } from "react";
import { useQuery } from "react-query";
//Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import CircularProgress  from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';
import AddSAhoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
//styles
import { Wrapper, Styledbutton } from './App.styles';
//types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};
const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();
const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error} = useQuery<CartItemType[]>(
    'products' , 
    getProducts
  );
  console.log(data);
  const getTotalItems = (items: CartItemType[]) => {
  return(
    items.reduce ((ack: number, item) => ack + item.amount , 0)
  )
  }
  const handleAddToCart = (clickedIten : CartItemType) => {
    setCartItems(prev => {
      const IsItemInCart = prev.find( item => item.id === clickedIten.id)
      if (IsItemInCart) {
        return prev.map (item =>(
          item.id === clickedIten.id
          ?{...item, amount: item.amount + 1}  
          : item
        ))
      }
      return [...prev, {...clickedIten, amount: 1}];
    })
  }
  const handleRemoveFromCart = (id: number) =>{
    setCartItems(prev=>
      prev.reduce((ack, item) => {
         if(item.id === id){
             if(item.amount === 1) return ack;
             return [...ack, {...item, amount: item.amount - 1}]
         }else{
           return [...ack, item]
         }
      } ,[] as CartItemType[])
      )
  };
  if (isLoading) return <CircularProgress />;
  if (error) return <div>Something went wrong......</div>;
  return (
  <Wrapper>
    <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
      <Cart cartitems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
    </Drawer>
    <Styledbutton onClick={() => setCartOpen(true)}>
    <Badge badgeContent={getTotalItems}color='error'>
      <AddSAhoppingCartIcon />
    </Badge>
    </Styledbutton>
      <Grid container spacing={3}>
    {data?.map(item => (
      <Grid item key ={item.id} xs={12} sm={4}>
     <Item item ={item} handleAddToCart ={handleAddToCart} />
     </Grid>
    ))}
      </Grid>
  </Wrapper>
  );
}
export default App
