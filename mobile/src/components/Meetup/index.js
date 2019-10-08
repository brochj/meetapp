import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

import {
  Container,
  Banner,
  Row,
  Title,
  Location,
  User,
  Time,
  Info,
} from './styles';

export default function Meetup({ data, onSubscription }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  return (
    <Container past={data.past}>
      <Banner source={{ uri: data.File.url }} />

      <Info>
        <Title>{data.id}</Title>
        <Row>
          <Icon name="event" size={20} color="rgba(0,0,0,0.4)" />
          <Time>{dateParsed}s</Time>
        </Row>
        <Row>
          <Icon name="room" size={20} color="rgba(0,0,0,0.4)" />
          <Location>{data.location}</Location>
        </Row>
        <Row>
          <Icon name="person" size={20} color="rgba(0,0,0,0.4)" />
          <User>{data.User.name}</User>
        </Row>

        {!data.past &&
          (!data.subscribed ? (
            <Button onPress={onSubscription}>Fazer Inscrição</Button>
          ) : (
            <Button style={{ opacity: 0.5 }} disabled={data.subscribed}>
              Inscrito
            </Button>
          ))}
      </Info>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    past: PropTypes.bool,
    subscribed: PropTypes.bool,
    id: PropTypes.number,
    location: PropTypes.string,
    User: PropTypes.shape({
      name: PropTypes.string,
    }),
    File: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  onSubscription: PropTypes.func.isRequired,
};
