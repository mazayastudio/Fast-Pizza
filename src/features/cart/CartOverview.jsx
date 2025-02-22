import { Link } from 'react-router-dom';
import { getTotalPizza, getTotalPrice } from './cartSlice.js';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers.js';

function CartOverview() {
  const totalPizzas = useSelector(getTotalPizza);
  const totalPrice = useSelector(getTotalPrice);
  return (
    <div
      className={`flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base`}
    >
      {totalPizzas > 0 ? (
        <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
          <span>{totalPizzas} pizzas</span>
          <span>{formatCurrency(totalPrice)}</span>
        </p>
      ) : (
        <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
          You cart is empty
        </p>
      )}
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
