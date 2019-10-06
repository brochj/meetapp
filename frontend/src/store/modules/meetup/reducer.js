import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  meetups: [],
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/GET_MEETUPS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/GET_MEETUPS_SUCCESS': {
        draft.meetups = action.payload.meetups;
        draft.loading = false;
        break;
      }
      case '@meetup/CREATE_MEETUP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/CREATE_MEETUP_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meetup/DELETE_MEETUP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/DELETE_MEETUP_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meetup/UPDATE_MEETUP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/UPDATE_MEETUP_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meetup/MEETUP_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.meetups = [];
        break;
      }

      default:
    }
  });
}
