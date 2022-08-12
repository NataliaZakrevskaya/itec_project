import { RequestStatus } from '../../redux/reducers/enums';
import { RequestStatusType } from '../../redux/reducers/types';
import {
  appReducer, setCallbackRequest,
  setLatestProductRequestStatus, setOneClickOrderRequestStatus, setOrderRequestStatus,
  setPopularProductRequestStatus, setProductRequest,
  setSearchProductRequest, setSendingReviewRequestStatus, setWeightSetIsShowed,
} from '../../redux/reducers/app-reducer';

let startState: InitStateType;

beforeEach( () => {
  startState = {
    searchProductStatus: RequestStatus.IDLE,
    latestProductStatus: RequestStatus.IDLE,
    popularProductStatus: RequestStatus.IDLE,
    productRequestStatus: RequestStatus.IDLE,
    callbackRequestStatus: RequestStatus.IDLE,
    orderRequestStatus: RequestStatus.IDLE,
    oneClickOrderRequestStatus: RequestStatus.IDLE,
    sendingReviewRequestStatus: RequestStatus.IDLE,
    weightSetIsShowed: false,
  };
} );

describe( 'setting correct request statuses', () => {
  test( 'correct status should be set for searchProductStatus', () => {
    const endState = appReducer( startState, setSearchProductRequest( { status: RequestStatus.FAILED } ) );
    expect( endState.searchProductStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for latestProductStatus', () => {
    const endState = appReducer( startState, setLatestProductRequestStatus( { status: RequestStatus.FAILED } ) );
    expect( endState.latestProductStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for popularProductStatus', () => {
    const endState = appReducer( startState, setPopularProductRequestStatus( { status: RequestStatus.FAILED } ) );
    expect( endState.popularProductStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for productRequestStatus', () => {
    const endState = appReducer( startState, setProductRequest( { status: RequestStatus.FAILED } ) );
    expect( endState.productRequestStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for callbackRequestStatus', () => {
    const endState = appReducer( startState, setCallbackRequest( { status: RequestStatus.FAILED } ) );
    expect( endState.callbackRequestStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for orderRequestStatus', () => {
    const endState = appReducer( startState, setOrderRequestStatus( { status: RequestStatus.FAILED } ) );
    expect( endState.orderRequestStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for oneClickOrderRequestStatus', () => {
    const endState = appReducer( startState, setOneClickOrderRequestStatus( { status: RequestStatus.FAILED } ) );
    expect( endState.oneClickOrderRequestStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for sendingReviewRequestStatus', () => {
    const endState = appReducer( startState, setSendingReviewRequestStatus( { status: RequestStatus.FAILED } ) );
    expect( endState.sendingReviewRequestStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct mode should be set for weightSetIsShowed', () => {
    const endState = appReducer( startState, setWeightSetIsShowed( { status: true } ) );
    expect( endState.weightSetIsShowed ).toBe( true );
  } );
} );

type InitStateType = {
  searchProductStatus: RequestStatusType,
  latestProductStatus: RequestStatusType,
  popularProductStatus: RequestStatusType,
  productRequestStatus: RequestStatusType,
  callbackRequestStatus: RequestStatusType,
  orderRequestStatus: RequestStatusType,
  oneClickOrderRequestStatus: RequestStatusType,
  sendingReviewRequestStatus: RequestStatusType,
  weightSetIsShowed: boolean
}