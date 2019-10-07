import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from 'react-navigation-hooks';

import api from '~/services/api';

import {
  getSubscriptionRequest,
  setSubscriptions,
} from '~/store/modules/meetup/actions';

import Background from '~/components/Background';
import Subscription from '~/components/Subscription';

import { Container, List, Title, Fim } from './styles';

export default function Subscriptions() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const subscriptions = useSelector(state => state.meetup.subscriptions);
  const [meetups, setMeetups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    setMeetups([]);
    dispatch(getSubscriptionRequest());
    async function loadSubscriptions() {
      setInitialLoading(true);
      const response = await api.get('subscriptions');
      setMeetups(response.data);
      if (response.data.length === 0) setInitialLoading(false);

      setCanLoadMore(true);
      // setInitialLoading(false);
    }
    loadSubscriptions();
  }, [date, isFocused]); // eslint-disable-line

  async function handleCancel(id) {
    try {
      await api.delete(`subscriptions/${id}`);
      ToastAndroid.show('Você se desiscreveu do meetup', ToastAndroid.SHORT);
    } catch (err) {
      Alert.alert(
        'Erro',
        `Não foi possível se desinscrever, tente novamente mais tarde${err}`
      );
    }
    dispatch(getSubscriptionRequest());
  }

  async function handleOnEndReached() {
    if (canLoadMore) {
      const response = await api.get('subscriptions', {
        params: { page: page + 1, date },
      });

      if (response.data.length === 0) setCanLoadMore(false);

      setSubscriptions([...subscriptions, ...response.data]);
      setPage(page + 1);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    dispatch(getSubscriptionRequest());
    setPage(1);
    setRefreshing(false);
    setCanLoadMore(true);
  }

  return (
    <Background>
      <Container>
        {subscriptions.length === 0 && <Fim>Nenhuma Inscrição feita</Fim>}

        <List
          data={subscriptions}
          refreshing={refreshing}
          onRefresh={() => handleRefresh()}
          onEndReachedThreshold={0.15}
          onEndReached={() => handleOnEndReached()}
          ListFooterComponent={
            canLoadMore ? (
              initialLoading && <ActivityIndicator color="#f94d6a" />
            ) : (
              <Fim>Acabou suas inscrições</Fim>
            )
          }
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Subscription
              onCancel={() => handleCancel(item.id)}
              data={item.Meetup}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Suas Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
