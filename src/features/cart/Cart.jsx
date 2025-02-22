import LinkButton from '../../ui/LinkButton.jsx';
import CartItem from './CartItem.jsx';
import Button from '../../ui/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getTotalPizza, selectCart } from './cartSlice.js';
import EmptyCart from './EmptyCart.jsx';

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(selectCart);
  const totalPizzas = useSelector(getTotalPizza);
  const dispatch = useDispatch();

  return (
    <div className={`px-4 py-3`}>
      {totalPizzas > 0 ? (
        <>
          <LinkButton to="/menu">&larr; Back to menu</LinkButton>

          <h2 className={`mt-7 text-xl font-semibold`}>
            Your cart, {username}
          </h2>

          <ul className={`mt-3 divide-y divide-stone-200 border-b`}>
            {cart.map((item) => (
              <CartItem item={item} key={item.key} />
            ))}
          </ul>

          <div className={`mt-6 space-x-2`}>
            <Button to="/order/new">Order pizzas</Button>
            <Button type={`secondary`} onClick={() => dispatch(clearCart())}>
              Clear cart
            </Button>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

export default Cart;
