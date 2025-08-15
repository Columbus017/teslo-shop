export const revalidate = 60;

import { notFound, redirect } from "next/navigation";

// import { Gender } from "@/generated/prisma";
import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@/generated/prisma";

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page: string;
  }
}

export default async function GenderByPage({ params, searchParams }: Props) {

  const { gender } = await params;
  if (!['men', 'women', 'kid', 'unisex'].includes(gender)) {
    notFound();
  }

  const awaitedParams = await searchParams;
  const pageAwait = await awaitedParams.page;
  const page = pageAwait ? parseInt( pageAwait ) : 1;


  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if ( products.length === 0 ) redirect(`/gender/${gender}`);

  const label: Record<string, string> = {
    'men': 'hombres',
    'women': 'mujeres',
    'kid': 'niños',
    'unisex': 'todos'
  }

  const subLabel: Record<string, string> = {
    'men': 'él',
    'women': 'ella',
    'kid': 'los más pequeños',
    'unisex': 'todos'
  }

  // if ( id === 'kids' ) {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={ `Productos para ${ label[gender] }` }
        subTitle={`Lo ideal para ${subLabel[gender]}`}
        className="mb-2"
      />
      <ProductGrid products={products} />

      <Pagination totalPages={ totalPages } />
    </>
  );
}