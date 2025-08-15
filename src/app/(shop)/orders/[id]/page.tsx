
import Link from "next/link";
import Image from "next/image";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  params: {
    id: string;
  }
}

export default function OrdersByIdPage({ params }: Props) {

  const { id } = params;
  //Todo: Verificar
  //! redirect()


  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${ id }`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div className={clsx(
              "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
              {
                'bg-red-500': false,
                'bg-green-700': true
              }
            )}>
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Orden pagada</span>
            </div>
          

            {/* Items */}
            {
              productsInCart.map(product => (
                <div key={product.slug} className="flex mb-5">
                  <Image
                    src={`/products/${product.images[0]}`}
                    alt={ product.title }
                    width={ 100 }
                    height={ 100 }
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    className="mr-5 rounded"
                  />
                  <div>
                    <p>{ product.title }</p>
                    <p>${ product.price } x 3</p>
                    <p className="font-bold">Subtotal: ${ product.price * 3 }</p>

                  </div>
                </div>
              ))
            }
          </div>
          {/* Checkout - resumen de la compra */}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Marlon Veliz</p>
              <p>Avenida siempre viva</p>
              <p>Col. Centro</p>
              <p>Alcaldia Cuahtemoc</p>
              <p>Ciudad de Mexico</p>
              <p>CP 123123132</p>
              <p>123123123</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2 font-bold">Resumen de Orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 articulos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100.00</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$15.00</span>

              <span className="text-2xl mt-5">Total</span>
              <span className="text-right text-2xl mt-5">$115.00</span>
            </div>

            <div className="mt-5 mb-5 w-full">
              <div className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': false,
                  'bg-green-700': true
                }
              )}>
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">Orden pagada</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}