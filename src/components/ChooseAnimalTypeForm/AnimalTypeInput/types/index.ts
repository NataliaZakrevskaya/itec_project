export type AnimalTypeInputPropsType = {
  id: number,
  name: string,
  isActive: boolean,
  chooseAnimalType: ( id: number ) => void
}