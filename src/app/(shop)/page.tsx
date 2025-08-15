export const revalidate = 60;

import { redirect } from "next/navigation";

import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
interface Props {
  searchParams: {
    page: string;
  }
}

export default async function Home({ searchParams }: Props) {

  const awaitedParams = await searchParams;
  const pageAwait = await awaitedParams.page;
  const page = pageAwait ? parseInt( pageAwait ) : 1;


  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if ( products.length === 0 ) redirect('/');

  return (
    <>
      <Title
        title="Tienda"
        subTitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={ totalPages } />
    </>
  );
}
