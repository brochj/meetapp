export function getSubscriptionRequest() {
  return {
    type: '@meetup/GET_SUBSCRIPTION_REQUEST',
  };
}

export function getSubscriptionSuccess(subscriptions) {
  return {
    type: '@meetup/GET_SUBSCRIPTION_SUCCESS',
    payload: { subscriptions },
  };
}

export function setSubscriptions(subscriptions) {
  return {
    type: '@meetup/SET_SUBSCRIPTIONS_SUCCESS',
    payload: { subscriptions },
  };
}

export function subscriptionFailure() {
  return {
    type: '@meetup/SUBSCRIPTION_FAILURE',
  };
}

export function getMeetupsRequest(date, page) {
  return {
    type: '@meetup/GET_MEETUPS_REQUEST',
    payload: { date, page },
  };
}

export function getMeetupsSuccess(meetups) {
  return {
    type: '@meetup/GET_MEETUPS_SUCCESS',
    payload: { meetups },
  };
}

export function setMeetups(meetups) {
  return {
    type: '@meetup/SET_MEETUPS_SUCCESS',
    payload: { meetups },
  };
}

export function meetupFailure() {
  return {
    type: '@meetup/MEETUP_FAILURE',
  };
}
