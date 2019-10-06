import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import {
  Container,
  Title,
  Form,
  SubmitButton,
  Separator,
  FormInput,
  SignOutButton,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const profile = useSelector(state => state.user.profile);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleUpdate() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  const emailRef = useRef();
  const passwordRef = useRef();
  const oldPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <Background>
      <Container>
        <Title>Meu Perfil</Title>
      </Container>

      <Form>
        <FormInput
          icon="person-outline"
          autoCorrect={false}
          autoFocus
          blurOnSubmit={false}
          placeholder="Nome Completo"
          returnKeyType="next"
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => emailRef.current.focus()}
        />
        <FormInput
          ref={emailRef}
          icon="mail-outline"
          autoCorrect={false}
          autoCapitalize="none"
          blurOnSubmit={false}
          placeholder="Digite seu email"
          returnKeyType="next"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          onSubmitEditing={() => oldPasswordRef.current.focus()}
        />

        <Separator />

        <FormInput
          ref={oldPasswordRef}
          icon="lock-outline"
          secureTextEntry
          maxLength={30}
          blurOnSubmit={false}
          placeholder="Sua senha atual"
          value={oldPassword}
          returnKeyType="next"
          onChangeText={text => setOldPassword(text)}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <FormInput
          ref={passwordRef}
          icon="lock-outline"
          secureTextEntry
          maxLength={30}
          blurOnSubmit={false}
          placeholder="Sua nova senha"
          value={password}
          returnKeyType="next"
          onChangeText={text => setPassword(text)}
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
        />
        <FormInput
          ref={confirmPasswordRef}
          icon="lock-outline"
          secureTextEntry
          maxLength={30}
          placeholder="Confirmação de senha"
          value={confirmPassword}
          returnKeyType="send"
          onChangeText={text => setConfirmPassword(text)}
          onSubmitEditing={handleUpdate}
        />
        <SubmitButton loading={loading} onPress={handleUpdate}>
          Atualizar Perfil
        </SubmitButton>
        <SignOutButton onPress={handleSignOut}>Sair</SignOutButton>
      </Form>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
