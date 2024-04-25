export { getPaginatedProductsWithImages } from './product/product-pagination';
export { getStuckBySlug } from './product/get-stock-by-slug';
export { getProductBySlug } from './product/get-product-by-slug';
export { getProductCategories } from './product/get-product-category';
export { createUdpateProduct } from './product/create-update-product';
export { deleteProductImage } from './product/delete-product-image';

export { authenticate, login } from './auth/login';
export { logout } from './auth/logout';
export { registerUser } from './auth/register';

export { getCountries } from './country/get-countries';

export { setUserAddress } from './address/set-user-address';
export { deleteUserAddress } from './address/delete-user-address';
export { getUserAddress } from './address/get-user-address';

export { placeOrder } from './order/place-order';
export { getOrderById } from './order/get-order-by-id';
export { getOrdersByUser } from './order/get-oders-by-user';
export { getPaginatedOrders } from './order/get-paginated-orders';

export { setTransactionId } from './payment/set-transaction-id';
export { paypalCheckPayment } from './payment/paypal-payment';

export { getPaginatedUsers } from './user/get-paginated-users';
export { changeUserRole } from './user/change-user-role';
