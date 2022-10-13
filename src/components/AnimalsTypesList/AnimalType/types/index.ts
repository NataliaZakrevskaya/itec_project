export type AnimalTypePropsType = {
  id: number,
  name: string,
  image: string,
  isActive: boolean,
  checked: boolean
  chooseActiveAnimalType: ( id: number ) => void
  sixTypes: boolean
}