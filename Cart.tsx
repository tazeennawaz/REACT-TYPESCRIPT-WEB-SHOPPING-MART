import CartItem from "../Cartiten/CartIten";
//styles
import { Wrapper } from './Cart.styles';
//types
import { CartItemType } from "../App";
type Props = {
    cartitems: CartItemType[] ;
    addToCart: (clickeditem : CartItemType) => void;
    removeFromCart: (id: number) =>void;
}
const Cart: React.FC<Props>= ({ cartitems, addToCart, removeFromCart }) => (
    <Wrapper>
        <h2>Your shopping cart</h2>
        {cartitems.length === 0 ? <p>No items in cart</p> : null}
        {cartitems.map (item => (
           <CartItem
           key = {item.id}
           item = {item}
           addToCart = {addToCart}
           removeFromCart = {removeFromCart}
           />
        ))}
    </Wrapper>
  );
  export default Cart;