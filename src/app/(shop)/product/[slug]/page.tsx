export const revalidate = 604800; // 7 dias
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";

import { titleFont } from "@/config/fonts";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { getProductBySlug } from "@/actions";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  // fetch post information
  const product = await getProductBySlug(slug)
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      // images: [] https://misitioweb.com/products/prod-1.png
      images: [`/products/${product?.images[1]}`]
    }
  }
}

export default async function ProductBySlugPage({ params }: Props) {

  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          images={ product.images }
          title={ product.title  }
          className="block md:hidden"
        />
        
        {/* Desktop Slideshow */}
        <ProductSlideshow
          images={ product.images }
          title={ product.title }
          className="hidden md:block"
        />
      </div>
      {/* Details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={ product.slug } />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          { product.title }
        </h1>
        <p className="text-lg mb-5">${ product.price }</p>

        {/* Selector de tallas */}
        <SizeSelector selectedSize={ product.sizes[0] } availableSizes={ product.sizes }/>

        {/* Selector de cantidad */}
        <QuantitySelector quantity={2}/>

        {/* Button */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/* Description */}
        <h3 className="font-bold">descripción</h3>
        <p className="font-light">
          { product.description }
        </p>
      </div>
    </div>
  );
}