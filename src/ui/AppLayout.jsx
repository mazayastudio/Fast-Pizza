import CartOverview from '../features/cart/CartOverview.jsx';
import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header.jsx';
import Loader from './Loader.jsx';

function AppLayout() {
  const navigation = useNavigation();
  const isLoader = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoader && <Loader />}

      <Header />

      <div className="overflow-auto">
        <main className={`mx-auto max-w-5xl py-3`}>
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
