import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  getMeetupsSuccess,
  meetupFailure,
  createMeetupSuccess,
  deleteMeetupSuccess,
  updateMeetupSuccess,
} from './actions';

export function* getMeetups() {
  try {
    const response = yield call(api.get, 'organizing');

    yield put(getMeetupsSuccess(response.data.reverse()));
  } catch (err) {
    toast.error('Erro ao buscar os meetups, tente novamente mais tarde');

    yield put(meetupFailure());
  }
}

export function* createMeetup({ payload }) {
  try {
    const { meetup } = payload;
    const response = yield call(api.post, 'meetups', meetup);

    yield put(createMeetupSuccess(response.data));
    toast.success('Meetup criado com sucesso');
    history.push('/dashboard');
  } catch (err) {
    toast.error(
      'Erro ao criar o meetup, verifique os campos ou tente novamente mais tarde'
    );

    yield put(meetupFailure());
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { meetup } = payload;
    const response = yield call(api.put, `meetups/${meetup.id}`, meetup);

    yield put(updateMeetupSuccess(response.data));
    toast.success('Meetup atualizado com sucesso');
    history.push('/dashboard');
  } catch (err) {
    toast.error(
      'Erro ao atualizar o meetup, verifique os campos ou tente novamente mais tarde'
    );

    yield put(meetupFailure());
  }
}

export function* deleteMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `meetups/${id}`);

    yield put(deleteMeetupSuccess());
    toast.success('Meetup deletado com sucesso');
    history.push('/dashboard');
  } catch (err) {
    toast.error('Erro ao deletar o meetup, tente novamente mais tarde');

    yield put(meetupFailure());
  }
}

export default all([
  takeLatest('@meetup/GET_MEETUPS_REQUEST', getMeetups),
  takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetup),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
  takeLatest('@meetup/DELETE_MEETUP_REQUEST', deleteMeetup),
]);
