import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import { useDispatch } from 'react-redux';
// import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
// import Intl from 'react-native-intl';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { Container, List, DateInfo, Header, ChevronIcon, Fim } from './styles';

export default function Subscriptions() {
  const dispatch = useDispatch();
  const [meetups, setMeetups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    setMeetups([]);
    async function loadMeetups() {
      setInitialLoading(true);
      const response = await api.get('meetups', {
        params: { date, page },
      });
      setMeetups(response.data);
      if (response.data.length === 0) setInitialLoading(false);

      setCanLoadMore(true);
      // setInitialLoading(false);
    }
    loadMeetups();
  }, [date]); // eslint-disable-line

  async function handleSubscription(id) {
    try {
      const response = await api.post(`meetups/${id}/subscriptions`);
      if (response.data.id) {
        setMeetups(
          meetups.map(meetup => {
            if (meetup.id === response.data.meetup_id) {
              return { ...meetup, subscribed: true };
            }
            return { ...meetup };
          })
        );
      }
    } catch (err) {
      Alert.alert(
        'Erro',
        `Não foi possível se inscrever, tente novamente mais tarde${err}`
      );
    }
  }

  async function handleOnEndReached() {
    if (canLoadMore) {
      const response = await api.get('meetups', {
        params: { page: page + 1, date },
      });

      if (response.data.length === 0) setCanLoadMore(false);

      setMeetups([...meetups, ...response.data]);
      setPage(page + 1);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    const response = await api.get('meetups', {
      params: { date, page: 1 },
    });
    setMeetups(response.data);
    setPage(1);
    setRefreshing(false);
    setCanLoadMore(true);
  }

  return (
    <Background>
      <Container>
        {!initialLoading && <Fim>Nenhum Meetup nesse dia</Fim>}

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
              <Fim>Acabou os Subscriptions</Fim>
            )
          }
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              onSubscription={() => handleSubscription(item.id)}
              data={item}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
