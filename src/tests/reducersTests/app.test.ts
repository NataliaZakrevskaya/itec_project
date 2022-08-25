import { RequestStatus } from '../../redux/reducers/enums';
import { RequestStatusType } from '../../redux/reducers/types';
import {
  app, setCallbackRequest,
  setLatestProductRequestStatus, setOneClickOrderRequestStatus, setOrderRequestStatus,
  setPopularProductRequestStatus, setProductRequest,
  setSearchProductRequest, setSendingReviewRequestStatus, setWeightSetIsShowed,
} from '../../redux/reducers/app';

let startState: InitStateType;

beforeEach( () => {
  startState = {
    searchProductStatus: RequestStatus.IDLE,
    latestProductStatus: RequestStatus.IDLE,
    accompanyingProductStatus: RequestStatus.IDLE,
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
    const endState = app( startState, setSearchProductRequest( { status: RequestStatus.FAILED } ) );
    expect( endState.searchProductStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for latestProductStatus', () => {
    const endState = app( startState, setLatestProductRequestStatus( { status: RequestStatus.FAILED } ) );
    expect( endState.latestProductStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for popularProductStatus', () => {
    const endState = app( startState, setPopularProductRequestStatus( { status: RequestStatus.FAILED } ) );
    expect( endState.popularProductStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for productRequestStatus', () => {
    const endState = app( startState, setProductRequest( { status: RequestStatus.FAILED } ) );
    expect( endState.productRequestStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for callbackRequestStatus', () => {
    const endState = app( startState, setCallbackRequest( { status: RequestStatus.FAILED } ) );
    expect( endState.callbackRequestStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for orderRequestStatus', () => {
    const endState = app( startState, setOrderRequestStatus( { status: RequestStatus.FAILED } ) );
    expect( endState.orderRequestStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for oneClickOrderRequestStatus', () => {
    const endState = app( startState, setOneClickOrderRequestStatus( { status: RequestStatus.FAILED } ) );
    expect( endState.oneClickOrderRequestStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct status should be set for sendingReviewRequestStatus', () => {
    const endState = app( startState, setSendingReviewRequestStatus( { status: RequestStatus.FAILED } ) );
    expect( endState.sendingReviewRequestStatus ).toBe( RequestStatus.FAILED );
  } );
  test( 'correct mode should be set for weightSetIsShowed', () => {
    const endState = app( startState, setWeightSetIsShowed( { status: true } ) );
    expect( endState.weightSetIsShowed ).toBe( true );
  } );
} );

type InitStateType = {
  searchProductStatus: RequestStatusType,
  latestProductStatus: RequestStatusType,
  accompanyingProductStatus: RequestStatusType,
  popularProductStatus: RequestStatusType,
  productRequestStatus: RequestStatusType,
  callbackRequestStatus: RequestStatusType,
  orderRequestStatus: RequestStatusType,
  oneClickOrderRequestStatus: RequestStatusType,
  sendingReviewRequestStatus: RequestStatusType,
  weightSetIsShowed: boolean
}