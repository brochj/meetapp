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
