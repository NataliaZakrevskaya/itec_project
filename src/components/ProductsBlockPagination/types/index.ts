export type ProductsBlockPaginationType = {
  totalProductsCount: number,
  pageSize: number
  actualPage: number,
  withWords: boolean,
  onPageChanged: ( pageNumber: number ) => void
}