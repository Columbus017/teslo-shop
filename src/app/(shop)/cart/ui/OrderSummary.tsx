'use client';

import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { currencyFormat } from "@/utils";

export const OrderSummary = () => {

  const [loaded, setLoaded] = useState(false);
  const { subTotal, total, totalItems, tax } = useCartStore( useShallow(state => state.getSummaryInfo()) );

  useEffect(() => {
    setLoaded( true );
  }, [])
  
  if ( !loaded ) {
    return <p>Loading...</p>
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{ totalItems === 1 ? '1 artículo' :  `${totalItems} artículos`}</span>

      <span>Subtotal</span>
      <span className="text-right">{ currencyFormat(subTotal)  }</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{ currencyFormat(tax) }</span>

      <span className="text-2xl mt-5">Total</span>
      <span className="text-right text-2xl mt-5">{ currencyFormat(total) }</span>
    </div>
  )
}
