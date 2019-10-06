export function getMeetupsRequest() {
  return {
    type: '@meetup/GET_MEETUPS_REQUEST',
  };
}

export function getMeetupsSuccess(meetups) {
  return {
    type: '@meetup/GET_MEETUPS_SUCCESS',
    payload: { meetups },
  };
}
export function createMeetupRequest(meetup) {
  return {
    type: '@meetup/CREATE_MEETUP_REQUEST',
    payload: { meetup },
  };
}

export function createMeetupSuccess() {
  return {
    type: '@meetup/CREATE_MEETUP_SUCCESS',
  };
}

export function deleteMeetupRequest(id) {
  return {
    type: '@meetup/DELETE_MEETUP_REQUEST',
    payload: { id },
  };
}

export function deleteMeetupSuccess() {
  return {
    type: '@meetup/DELETE_MEETUP_SUCCESS',
  };
}
export function updateMeetupRequest(meetup) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: { meetup },
  };
}

export function updateMeetupSuccess() {
  return {
    type: '@meetup/UPDATE_MEETUP_SUCCESS',
  };
}

export function meetupFailure() {
  return {
    type: '@meetup/MEETUP_FAILURE',
  };
}
