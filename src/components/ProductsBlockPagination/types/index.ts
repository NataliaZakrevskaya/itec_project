export type ProductsBlockPaginationType = {
  totalProductsCount: number,
  pageSize: number
  actualPage: number,
  portionSize: number,
  withWords: boolean,
  onPageChanged: ( pageNumber: number ) => void
}