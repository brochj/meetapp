import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';

import { Container } from './styles';

import Button from '~/components/Button';

import { updateProfileRequest } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
  name: Yup.string().max(200, 'Máximo 200 caracteres'),
  email: Yup.string().email('E-mail inválido'),
  oldPassword: Yup.string().when('email', (email, field) =>
    field === ''
      ? field.min(6, 'Lembrete: a senha tem pelo menos 6 caracteres').required()
      : field
  ),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field
          .min(6, 'A senha precisa ter pelo menos 6 caracteres')
          .required(
            'Informe sua nova senha, ou apague a senha que digitou no campo anterior (senha atual)'
          )
      : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required()
          .oneOf(
            [Yup.ref('password')],
            'As novas senhas não são iguais, digite-as novamente'
          )
      : field
  ),
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }
  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu email" />

        <hr />
        <Input type="password" name="oldPassword" placeholder="Senha atual" />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação da nova senha"
        />

        <Button type="submit">
          <MdAddCircleOutline />
          Atualizar Perfil
        </Button>
      </Form>
    </Container>
  );
}
