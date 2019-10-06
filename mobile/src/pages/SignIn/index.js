import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { signInRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import Logo from '~/components/Logo';
// import logo from '~/assets/logo.png';
import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('brochj@gmail.com');
  const [password, setPassword] = useState('123456');

  const loading = useSelector(state => state.auth.loading);

  function handleSignIn() {
    dispatch(signInRequest(email, password));
  }

  const passwordRef = useRef();

  return (
    <Background>
      <Container>
        <Logo />
        <Form>
          <FormInput
            icon="mail-outline"
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus
            blurOnSubmit={false}
            placeholder="Digite seu email"
            returnKeyType="next"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            ref={passwordRef}
            icon="lock-outline"
            secureTextEntry
            maxLength={20}
            placeholder="Digite uma senha"
            value={password}
            returnKeyType="send"
            onChangeText={text => setPassword(text)}
            onSubmitEditing={handleSignIn}
          />
          <SubmitButton loading={loading} onPress={handleSignIn}>
            Entrar
          </SubmitButton>
          <View style={styles.loginView}>
            <Text
              style={styles.loginTxt}
              onPress={() => navigation.navigate('SignUp')}
            >
              Criar conta grátis
            </Text>
          </View>
        </Form>
      </Container>
    </Background>
  );
}

const styles = StyleSheet.create({
  loginView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginTxt: {
    color: 'white',
    fontSize: 16,
  },
  loginWordTxt: {
    marginLeft: 5,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
