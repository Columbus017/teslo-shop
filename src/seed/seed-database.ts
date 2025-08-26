import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function main() {

    // 1. Borrar registros previos
    // await Promise.all([
    //     prisma.productImage.deleteMany(),
    //     prisma.product.deleteMany(),
    //     prisma.category.deleteMany(),
    // ]);

    await prisma.userAdrres.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const { categories, products, users } = initialData

    await prisma.country.createMany({
        data: countries
    });

    await prisma.user.createMany({
        data: users
    });

    // Categorias
    const categoriesData = categories.map(category => ({
        name: category
    }))
    await prisma.category.createMany({ data: categoriesData });

    const categoriesDB = await prisma.category.findMany();
    
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLocaleLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>);

    // Productos
    products.forEach( async (product) => {
        const { type, images, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryID: categoriesMap[type]
            }
        })

        // Insertar imagenes
        const imagesData = images.map(image => ({
            url: image,
            productID: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        });
    })
    
    
    console.log('Seed ejecutado correctamente')
}

(() => {

    if (process.env.NODE_ENV === 'production') return;

    main();
})();