import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { format, parseISO } from 'date-fns';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import Banner from './Banner';
import Button from '~/components/Button';
import history from '~/services/history';
import { Container, ButtonView } from './styles';

import { updateMeetupRequest } from '~/store/modules/meetup/actions';

const schema = Yup.object().shape({
  file_id: Yup.string(),
  title: Yup.string().required('O título do Meetup é obrigatório'),
  description: Yup.string().required('A descrição do Meetup é obrigatório'),
  date: Yup.string()
    .min(
      19,
      'Tente algo como: "12/12/2019 , às  15 h", "15/05/2019 , às 03 horas" '
    )
    .max(
      25,
      'Tente algo como: "12/12/2019 , às  15 h", "15/05/2019 , às 03 horas" '
    )
    .required(
      'A data do Meetup é obrigatório. Exemplo "12/12/2019 , às  15 h"'
    ),
  location: Yup.string().required('O local do Meetup é obrigatório'),
});

export default function Edit({ location }) {
  const dispatch = useDispatch();
  const meetup = location.state;
  const date = format(parseISO(meetup.date), "dd/MM/yyyy ', às ' HH 'horas'");
  const initialData = { ...meetup, date };

  function handleSubmit(data) {
    const day = data.date.slice(0, 2);
    const month = data.date.slice(3, 5);
    const year = data.date.slice(6, 10);
    const hour = data.date.slice(17, 19);
    const zonedDate = `${year}-${month}-${day}T${hour}:00:00-02:00`;

    const formattedData = { ...data, date: zonedDate, id: meetup.id };
    dispatch(updateMeetupRequest(formattedData));
  }

  return (
    <Container>
      <Form schema={schema} initialData={initialData} onSubmit={handleSubmit}>
        <Banner name="file_id" fileUrl={meetup.File.url} />
        <Input name="title" placeholder="Título do Meetup" />
        <Input multiline name="description" placeholder="Descrição completa" />

        <Input name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />

        <ButtonView>
          <Button
            className="cancelBtn"
            type="button"
            background="rgba(0,0,0,.01)"
            onClick={() => history.push('/dashboard')}
          >
            Cancelar
          </Button>

          <Button type="submit">
            <MdAddCircleOutline />
            Salvar meetup
          </Button>
        </ButtonView>
      </Form>
    </Container>
  );
}

Edit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object.isRequired,
  }).isRequired,
};
