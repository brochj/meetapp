import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { useSelector, useDispatch } from 'react-redux';
import { MdChevronRight, MdAddCircleOutline } from 'react-icons/md';
import history from '~/services/history';

import Button from '~/components/Button';
import { Container, Content, ContentItem, Date } from './styles';

import { getMeetupsRequest } from '~/store/modules/meetup/actions';

export default function Dashboard() {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetup.meetups);

  useEffect(() => {
    dispatch(getMeetupsRequest());
  }, []); // eslint-disable-line

  const data = useMemo(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedMeetups = meetups.map(meetup => {
      const timeZonedDate = utcToZonedTime(meetup.date, timezone);

      return {
        ...meetup,
        timezonedDate: format(timeZonedDate, "d 'de' MMMM ', às ' HH'h'", {
          locale: pt,
        }),
      };
    });
    return formattedMeetups;
  }, [meetups]);

  return (
      <Container>
        <header>
          <h1>Meus meetups</h1>
          <Link to="/new" style={{ textDecoration: 'none' }}>
            <Button>
              <MdAddCircleOutline />
              Novo Meetup
            </Button>
          </Link>
        </header>

        <Content>
          {data.map(meetup => (
            <ContentItem
              past={meetup.past}
              onClick={() => history.push(`${meetup.id}/details`, meetup)}
              key={String(meetup.id)}
            >
              <strong>{meetup.title}</strong>

              <Date>
                <span>{meetup.timezonedDate}</span>
                <MdChevronRight />
              </Date>
            </ContentItem>
          ))}
        </Content>
      </Container>
  );
}
