import { call, put, all, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { format } from 'date-fns';

import api from '~/services/api';
import appConfig from '~/config/appConfig';

import {
  getSubscriptionSuccess,
  subscriptionFailure,
  getMeetupsSuccess,
  meetupFailure,
} from './actions';

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

export function* getMeetups({ payload }) {
  try {
    const { date, page } = payload;
    const formattedDate = format(date, 'yyyy-MM-dd');
    console.tron.log(formattedDate);
    const response = yield call(
      api.get,
      `meetups?page=${page}&date=${formattedDate}`
    );
    console.tron.log(response.data);

    if (response.data.length !== 0) {
      const hostChanged = response.data.map(meetup => ({
        ...meetup,
        File: {
          ...meetup.File,
          url: meetup.File.url.replace('localhost', appConfig.imagesHost),
        },
      }));

      yield put(getMeetupsSuccess(hostChanged));
    } else {
      yield put(getMeetupsSuccess(response.data));
    }
  } catch (err) {
    Alert.alert(
      'Erro 2',
      `Não foi possível carregar os Meetups ${err.response.data.error}`
    );
    yield put(meetupFailure());
  }
}

export default all([
  takeLatest('@meetup/GET_SUBSCRIPTION_REQUEST', getSubscription),
  takeLatest('@meetup/GET_MEETUPS_REQUEST', getMeetups),
]);
