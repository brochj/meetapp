import produce from 'immer';

const INITIAL_STATE = {
  subscriptions: [],
  meetups: [],
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/GET_SUBSCRIPTION_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/GET_SUBSCRIPTION_SUCCESS': {
        draft.subscriptions = action.payload.subscriptions;
        draft.loading = false;
        break;
      }
      case '@meetup/SET_SUBSCRIPTIONS_SUCCESS': {
        draft.subscriptions = action.payload.subscriptions;
        break;
      }
      case '@meetup/SUBSCRIPTION_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@meetup/GET_MEETUPS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/GET_MEETUPS_SUCCESS': {
        draft.meetups = action.payload.meetups;
        draft.loading = false;
        break;
      }
      case '@meetup/SET_MEETUPS_SUCCESS': {
        draft.meetups = action.payload.meetups;
        break;
      }
      case '@meetup/MEETUP_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
