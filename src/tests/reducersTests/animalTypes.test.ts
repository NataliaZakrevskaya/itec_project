import {
  animalTypes,
  removeChosenAnimalTypeId,
  setChosenAnimalTypeId,
} from '../../redux/reducers/animalTypes';
import { AnimalTypesType } from '../../types';

let startState: InitStateType;

beforeEach( () => {
  startState = {
    animalTypes: [],
    chosenAnimalTypeId: null,
  };
} );

describe( 'operation with chosenAnimalTypeId', () => {
  test( 'correct animal type id should be added to chosenAnimalTypeId', () => {
    const endState = animalTypes( startState, setChosenAnimalTypeId( { id: 2 } ) );
    expect( endState.chosenAnimalTypeId ).toBe( 2 );
  } );
  test( 'removeChosenAnimalTypeId should delete animal id successfully', () => {
    const endState = animalTypes( startState, removeChosenAnimalTypeId( {} ) );
    expect( endState.chosenAnimalTypeId ).toBe( null );
  } );
} );

type InitStateType = {
  animalTypes: Array<AnimalTypesType>,
  chosenAnimalTypeId: number | null,
}