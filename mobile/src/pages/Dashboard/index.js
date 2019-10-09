import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import { useIsFocused } from 'react-navigation-hooks';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';

import { store } from '~/store';
import appConfig from '~/config/appConfig';
import { changeHost } from '~/util/scripts';
import api from '~/services/api';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { getMeetupsRequest } from '~/store/modules/meetup/actions';
import {
  Container,
  List,
  DateInfo,
  Header,
  ChevronIcon,
  Fim,
  Loading,
} from './styles';

export default function Meetups() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const subscriptions = useSelector(state => state.meetup.subscriptions);
  const [meetups, setMeetups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    // dispatch(getMeetupsRequest(date, page));

    setMeetups([]);
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

  async function handleSubscription(item, index) {
    const response = await api.post(`meetups/${item.id}/subscriptions`);
    if (response.data.id) {
      setMeetups(
        meetups.map(meetup => {
          if (meetup.id === response.data.meetup_id) {
            return {
              ...meetup,
              subscribed: true,
              File: {
                ...meetup.File,
                url: meetup.File.url.replace('localhost', appConfig.imagesHost),
              },
            };
          }

          return {
            ...meetup,
            File: {
              ...meetup.File,
              url: meetup.File.url.replace('localhost', appConfig.imagesHost),
            },
          };
        })
      );
    }
  }

  async function handleOnEndReached() {
    if (canLoadMore) {
      const response = await api.get('meetups', {
        params: { page: page + 1, date },
      });

      if (response.data.length === 0) setCanLoadMore(false);

      setMeetups([...meetups, ...changeImageUrl(response.data)]);
      setPage(page + 1);
    }
  }

  function changeImageUrl(data) {
    return data.map(meetup => ({
      ...meetup,
      File: {
        ...meetup.File,
        url: meetup.File.url.replace('localhost', appConfig.imagesHost),
      },
    }));
  }

  async function handleRefresh() {
    setRefreshing(true);
    const response = await api.get('meetups', {
      params: { date, page: 1 },
    });
    setMeetups(changeImageUrl(response.data));
    setPage(1);
    setRefreshing(false);
    setCanLoadMore(true);
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
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
        {loading ? (
          <Loading>
            <ActivityIndicator size="large" color="#f94d6a" />
          </Loading>
        ) : (
          <>
            {/* {meetups.length === 0 && <Fim>Nenhum Meetup nesse dia</Fim>} */}

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
              renderItem={({ item, index }) => (
                <Meetup
                  onSubscription={() => handleSubscription(item, index)}
                  data={item}
                />
              )}
            />
          </>
        )}
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
