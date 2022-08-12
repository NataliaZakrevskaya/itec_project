import { AnimalTypesType } from '../../mocks';
import {
  animalTypesReducer,
  removeChosenAnimalTypeId,
  setChosenAnimalTypeId,
} from '../../redux/reducers/animalTypes-reducer';

let startState: InitStateType;

beforeEach( () => {
  startState = {
    animalTypes: [],
    chosenAnimalTypeId: null,
  };
} );

describe( 'operation with chosenAnimalTypeId', () => {
  test( 'correct animal type id should be added to chosenAnimalTypeId', () => {
    const endState = animalTypesReducer( startState, setChosenAnimalTypeId( { id: 2 } ) );
    expect( endState.chosenAnimalTypeId ).toBe( 2 );
  } );
  test( 'removeChosenAnimalTypeId should delete animal id successfully', () => {
    const endState = animalTypesReducer( startState, removeChosenAnimalTypeId( {} ) );
    expect( endState.chosenAnimalTypeId ).toBe( null );
  } );
} );

type InitStateType = {
  animalTypes: Array<AnimalTypesType>,
  chosenAnimalTypeId: number | null,
}