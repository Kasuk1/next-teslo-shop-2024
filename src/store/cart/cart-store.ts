import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  udateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart, getTotalItems } = get();

        const subTotal = cart.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );

        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = getTotalItems();

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        // 1. Check if a product exist in the cart with the size selected
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({
            cart: [...cart, product],
          });
          return;
        }

        // 2. I know the product exist per size, thus we need to update it
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },
      udateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartQuantity = cart.map((item) => {
          if (item.id === product.id) {
            if (item.size === product.size) {
              return {
                ...item,
                quantity,
              };
            }
          }

          return item;
        });

        set({
          cart: updatedCartQuantity,
        });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        set({
          cart: cart.filter(
            (item) => item.id !== product.id || item.size !== product.size
          ),
        });
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
);
