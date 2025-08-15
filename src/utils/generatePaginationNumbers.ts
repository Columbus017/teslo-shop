
export const generatePaginationNumbers = ( currentPage: number, totalPages: number ) => {
    // Si el número total de páginas es de 7 o menos,
    // vamos a mostrar todas las páginas sin puntos suspensivos
    if ( totalPages <= 7 ) {
        return Array.from({ length: totalPages }, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7]
    }

    // Si la página actual está entre las primeras 3 páginas
    // mostrar las primeras 3, puntos suspensivos, y las últimas 2
    if ( currentPage <= 3 ) {
        return [1, 2, 3, '...', totalPages -1, totalPages]; // [1, 2, 3, '...', 49, 50]
    }

    // Si la página actual esta entre las últimas tres páginas
    // mostrar las primeras 2, puntos suspensivos, lás últimas 3 páginas
    if ( currentPage >= totalPages - 2 ) {
        return [1, 2, '...', totalPages -2, totalPages -1, totalPages]; // [1, 2, '...', 48, 49, 50]
    }

    // Si la página actual esta en otro lugar medio
    // mostrar la primera página, puntos suspensivos, la página actual, puntos suspensivos, página final
    return [
        1,
        '...',
        currentPage -1,
        currentPage,
        currentPage +1,
        '...',
        totalPages
    ]

}