import Button from './Button.jsx';
import {useDispatch} from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity
} from '../features/cart/cartSlice.js';

function UpdateButtonQty({pizzaId, currentQuantity}) {
  const dispatch = useDispatch();

  return (
    <div className={`flex items-center gap-1 md:gap-3`}>
      <Button
        type={`round`}
        onClick={() => dispatch(decreaseQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type={`round`}
        onClick={() => dispatch(increaseQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateButtonQty;
