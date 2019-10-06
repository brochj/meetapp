import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import { MdAddAPhoto } from 'react-icons/md';
import api from '~/services/api';
import { Container } from './styles';

export default function AvartInput() {
  const { defaultValue, registerField } = useField('banner'); // Pega os valores de 'file_id'  que esta dalvo no redux

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    // Passando os dados pro unform
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, []); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);

    const { id, url } = response.data;
    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <div>
            <MdAddAPhoto color="#666" size={55} />
            <span>Selecionar imagem</span>
          </div>
        )}

        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
