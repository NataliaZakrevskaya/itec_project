export type BrandPropsType = {
  id: number
  name: string
  image: string
  chooseBrand: ( id: number ) => void
  forBlock: boolean
}