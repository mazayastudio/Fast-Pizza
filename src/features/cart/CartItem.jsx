import { formatCurrency } from '../../utils/helpers.js';
import DeleteItem from '../../ui/DeleteItem.jsx';
import { useSelector } from 'react-redux';
import { getCurrentQuantityById } from './cartSlice.js';
import UpdateButtonQty from '../../ui/UpdateButtonQty.jsx';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  const isInCart = currentQuantity > 0;

  return (
    <li className={`py-3 sm:flex sm:items-center sm:justify-between`}>
      <p className={`mb-1 sm:mb-0`}>
        {quantity}&times; {name}
      </p>
      <div className={`flex items-center justify-between sm:gap-6`}>
        <p className={`text-sm font-bold`}>{formatCurrency(totalPrice)}</p>
        <UpdateButtonQty pizzaId={pizzaId} currentQuantity={currentQuantity} />
        {isInCart && <DeleteItem pizzaId={pizzaId} />}
      </div>
    </li>
  );
}

export default CartItem;
