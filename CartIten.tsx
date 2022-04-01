import Button from '@material-ui/core/Button';
//types
import { CartItemType } from '../App';
//styles
import { Wrapper } from './CartItem.styles';
type Props = {
    item: CartItemType;
    addToCart: (clickeditem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}
const CartItem : React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
    <Wrapper>
        <div>
        <h3>{item.title}</h3>    
        <div className ="information">
            <p>PRICE: ${item.price}</p>
            <p>TOTAL: ${item.amount * item.price}</p>
        </div>
        <div className= "Buttons">
            <Button
               size="small"
               disableElevation
               variant="contained"
               onClick={() => removeFromCart(item.id)}
               >
               -
               </Button>
               <p>{item.amount}</p>
               <Button
               size="small"
               disableElevation
               variant="contained"
               onClick={() => addToCart(item)}
               >
               +
               </Button>
        </div>
        </div>
        <img src={item.image} alt={item.title}/>
    </Wrapper>
); 
export default CartItem;
