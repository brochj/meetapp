import { call, put, all, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import appConfig from '~/config/appConfig';

import { getSubscriptionSuccess, subscriptionFailure } from './actions';

export function* getSubscription() {
  try {
    const response = yield call(api.get, 'subscriptions');

    const hostChanged = response.data.map(sub => ({
      ...sub,
      Meetup: {
        ...sub.Meetup,
        File: {
          ...sub.Meetup.File,
          url: sub.Meetup.File.url.replace('localhost', appConfig.imagesHost),
        },
      },
    }));

    yield put(getSubscriptionSuccess(hostChanged));
  } catch (err) {
    Alert.alert('Erro', 'Não foi possível carregar suas inscrições');
    yield put(subscriptionFailure());
  }
}

export default all([
  takeLatest('@meetup/GET_SUBSCRIPTION_REQUEST', getSubscription),
]);
