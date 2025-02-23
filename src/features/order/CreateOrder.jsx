import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant.js';
import Button from '../../ui/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getTotalPrice, selectCart } from '../cart/cartSlice.js';
import EmptyCart from '../cart/EmptyCart.jsx';
import store from '../../store.js';
import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers.js';
import { fetchAddress } from '../user/userSlice.js';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(selectCart);
  const totalCart = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCart * 0.2 : 0;
  const totalPrice = totalCart + priorityPrice;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formError = useActionData();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className={`px-4 py-6`}>
      <h2 className={`mb-8 text-xl font-semibold`}>
        Ready to order? Let's go!
      </h2>

      <Form method="POST">
        <div className={`mb-5 flex flex-col gap-2 sm:flex-row sm:items-center`}>
          <label className={`sm:basis-40`}>First Name</label>
          <input
            type="text"
            name="customer"
            className={`input grow`}
            defaultValue={username}
            required
          />
        </div>

        <div className={`mb-5 flex flex-col gap-2 sm:flex-row sm:items-center`}>
          <label className={`sm:basis-40`}>Phone number</label>
          <div className={`grow`}>
            <input
              type="tel"
              name="phone"
              className={`input w-full`}
              required
            />
            {formError?.phone && (
              <p
                className={`mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700`}
              >
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div
          className={`relative mb-5  flex flex-col gap-2 sm:flex-row sm:items-center`}
        >
          <label className={`sm:basis-40`}>Address</label>
          <div className={`grow`}>
            <input
              type="text"
              name="address"
              className={`input w-full`}
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[5.2px] top-[3px]">
              <Button
                type={`small`}
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className={`mb-12 flex items-center gap-5`}>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className={`h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2`}
          />
          <label htmlFor="priority" className={`font-medium`}>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type={`primary`} disabled={isSubmitting}>
            {isSubmitting
              ? 'Submitting'
              : `Order Now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const error = {};

  if (!isValidPhone(order.phone)) {
    error.phone = 'Invalid phone number';
  }

  if (Object.keys(error).length > 0) return error;

  // if everything is ok, create new order and redirect
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
