export const featuredProductsApplyFilters = (payload) => {
  return new Promise((resolve) => {
    const {task, value, filters, source} = payload,
      setFilters = (task, value, filters) => {
        return Object.assign({}, filters, {[task]: value});
      },
      newFilters = setFilters(task, value, filters),
      searchText = newFilters.search;
    let visibleProducts = source;

    if(searchText !== '') {
      visibleProducts = visibleProducts.filter(
        prod => prod.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
    }

    const sort = newFilters.sort;
    if(sort !== '') {
      visibleProducts = sortProductsByName(visibleProducts, sort);
    }
    resolve(visibleProducts);
  });
}

// Sort Products by Name and keep products with the same name in the original order
const sortProductsByName = (products, sort) => {
  let indexed = products.map((product, idx) => {
    return { product: product, idx: idx }
  });

  indexed.sort((a, b) => {
    const nameA = a.product.name.toLowerCase(),
      nameB = b.product.name.toLowerCase();

    if(sort == 'asc') {
      if(nameA < nameB) return -1;
      if(nameA > nameB) return 1;
      return a.idx - b.idx;
    } else {
      if(nameA < nameB) return 1;
      if(nameA > nameB) return -1;
      return b.idx - a.idx;
    }
  });
  return indexed.map((item => item.product));
}
