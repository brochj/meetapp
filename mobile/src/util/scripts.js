import appConfig from '~/config/appConfig';

export function changeHostSub(data) {
  return data.map(sub => ({
    ...sub,
    Meetup: {
      ...sub.Meetup,
      File: {
        ...sub.Meetup.File,
        url: sub.Meetup.File.url.replace('localhost', appConfig.imagesHost),
      },
    },
  }));
}

export function changeHost(data) {
  return data.map(meetup => ({
    ...meetup,
    File: {
      ...meetup.File,
      url: meetup.File.url.replace('localhost', appConfig.imagesHost),
    },
  }));
}
