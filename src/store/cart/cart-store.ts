import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CartProduct } from "@/interfaces";

interface State {
  cart: CartProduct[];

  //Todo: Methods
  getTotalItems: () => number;
  getSummaryInfo: () => {
    subTotal: number;
    tax: number;
    total: number;
    totalItems: number;
  }
  addProductToCart: ( product: CartProduct ) => void;
  updateProductQuantity: ( product: CartProduct, quantity: number ) => void;
  removeProduct: ( product: CartProduct ) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      // Methods
      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce( (total, item) => total + item.quantity, 0 );
      },
      getSummaryInfo: () => {
        const { cart } = get();

        const subTotal = cart.reduce( (subTotal, product) => (product.quantity * product.price) + subTotal
        , 0);

        const tax = subTotal * 0.15;
        const total = subTotal + tax;

        const totalItems = cart.reduce( (total, item) => total + item.quantity, 0 );

        return {
          subTotal,
          tax,
          total,
          totalItems
        }
      },
      addProductToCart: ( product: CartProduct ) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if ( !productInCart ) {
          set({ cart: [ ...cart, product ]})
          return;
        }

        // 2. Sabemos que el producto existe en esa talla, hay que incrementar la cantidad
        const udpatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity }
          }

          return item;
        });

        set({ cart: udpatedCartProducts })
      },
      updateProductQuantity: ( product: CartProduct, quantity: number ) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity }
          }

          return item;
        });

        set({ cart: updatedCartProducts })
      },
      removeProduct: ( product: CartProduct ) => {
        const { cart } = get();

        const removedCartProducts = cart.filter( (item) => !(item.id === product.id && item.size === product.size));

        set({ cart: removedCartProducts });
      },
    }),
    {
      name: 'shopping-cart'
    }
  )
  
  
)