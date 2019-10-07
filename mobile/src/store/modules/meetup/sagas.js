import { call, put, all, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { getSubscriptionSuccess, subscriptionFailure } from './actions';

export function* getSubscription() {
  try {
    const response = yield call(api.get, 'subscriptions');

    yield put(getSubscriptionSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro', 'Não foi possível carregar suas inscrições');
    yield put(subscriptionFailure());
  }
}

export default all([
  takeLatest('@meetup/GET_SUBSCRIPTION_REQUEST', getSubscription),
]);
