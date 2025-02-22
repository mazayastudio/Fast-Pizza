import { removeItem } from '../features/cart/cartSlice.js';
import Button from './Button.jsx';
import { useDispatch } from 'react-redux';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type={`small`} onClick={() => dispatch(removeItem(pizzaId))}>
      Remove
    </Button>
  );
}

export default DeleteItem;
