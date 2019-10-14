import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import { useIsFocused } from 'react-navigation-hooks';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';

import { changeHost } from '~/util/scripts';
import api from '~/services/api';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { Container, List, DateInfo, Header, ChevronIcon, Fim } from './styles';

export default function Meetups() {
  const isFocused = useIsFocused();
  const subscriptions = useSelector(state => state.meetup.subscriptions);
  const [meetups, setMeetups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    setPage(1);
    setCanLoadMore(true);
    setMeetups([]);
    setInitialLoading(false);
    async function loadMeetups() {
      setInitialLoading(true);
      const response = await api.get('meetups', {
        params: { date, page },
      });
      if (response.data.length === 0) {
        setInitialLoading(false);
      }

      const changedHost = changeHost(response.data);
      setMeetups(
        changedHost.map(meetup => {
          const isSubscribed = subscriptions.find(
            sub => sub.Meetup.id === meetup.id
          );
          if (isSubscribed) {
            return { ...meetup, subscribed: true };
          }
          return meetup;
        })
      );
    }
    loadMeetups();
  }, [date, isFocused]); // eslint-disable-line

  async function handleSubscription(item) {
    try {
      setLoading(true);
      const response = await api.post(`meetups/${item.id}/subscriptions`);
      setMeetups(
        meetups.map(meetup => {
          if (meetup.id === response.data.meetup_id) {
            return { ...meetup, subscribed: true };
          }
          return meetup;
        })
      );
    } catch (err) {
      Alert.alert(
        'Erro',
        'Não pode se inscrever em meetups com horários próximos'
      );
    }
    setLoading(false);
  }

  async function handleOnEndReached() {
    if (canLoadMore) {
      const response = await api.get('meetups', {
        params: { page: page + 1, date },
      });

      if (response.data.length === 0) setCanLoadMore(false);

      setMeetups([...meetups, ...changeHost(response.data)]);
      setPage(page + 1);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    const response = await api.get('meetups', {
      params: { date },
    });
    setMeetups(changeHost(response.data));
    setPage(1);
    setRefreshing(false);
    setCanLoadMore(true);
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
    setPage(1);
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
    setPage(1);
  }
  return (
    <Background>
      <Container>
        <Header>
          <ChevronIcon onPress={handlePrevDay}>
            <Icon name="chevron-left" size={36} color="#fff" />
          </ChevronIcon>
          <DateInfo>{dateFormatted}</DateInfo>
          <ChevronIcon onPress={handleNextDay}>
            <Icon name="chevron-right" size={36} color="#fff" />
          </ChevronIcon>
        </Header>

        {meetups.length === 0 && !initialLoading ? (
          <Fim>Nenhum Meetup nesse dia</Fim>
        ) : null}

        <List
          data={meetups}
          refreshing={refreshing}
          onRefresh={() => handleRefresh()}
          onEndReachedThreshold={0.15}
          onEndReached={() => handleOnEndReached()}
          ListFooterComponent={
            canLoadMore ? (
              initialLoading && <ActivityIndicator color="#f94d6a" />
            ) : (
              <Fim>Acabou os Meetups</Fim>
            )
          }
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              onSubscription={() => handleSubscription(item)}
              data={item}
              loading={loading}
            />
          )}
        />
      </Container>
    </Background>
  );
}

function tabBarIcon({ tintColor }) {
  return <Icon name="event" size={20} color={tintColor} />;
}

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Meetups.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};
