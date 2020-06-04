import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firbase.utils';


export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.fetchCollectionsFailure,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => (dispatch) => {
  const collectionRef = firestore.collection('collections');

  dispatch(fetchCollectionsStart());

  collectionRef.get().then((snapshot) => {
    const collectionMap = convertCollectionsSnapshotToMap(snapshot);
    dispatch(fetchCollectionsSuccess(collectionMap));
  }).catch((error) => dispatch(fetchCollectionsFailure(`Error ${error.message}`)));
};
