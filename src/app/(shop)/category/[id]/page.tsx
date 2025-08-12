import { notFound } from "next/navigation";
import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { Category } from "@/interfaces";

const products = initialData.products;

interface Props {
  params: {
    id: Category;
  }
}

export default async function({ params }: Props) {

  const { id } = await params;
  if (!['men', 'women', 'kid', 'unisex'].includes(id)) {
    notFound();
  }
  const categoryProducts = products.filter(product => product.gender === id);

  const label: Record<Category, string> = {
    'men': 'hombres',
    'women': 'mujeres',
    'kid': 'niños',
    'unisex': 'todos'
  }

  const subLabel: Record<Category, string> = {
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
        title={ `Productos para ${ label[id] }` }
        subTitle={`Lo ideal para ${subLabel[id]}`}
        className="mb-2"
      />
      <ProductGrid products={categoryProducts} />
    </>
  );
}