import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamation, FaAngleLeft } from 'react-icons/fa';
import Container from '../../components/Container';
import { Error } from './style';

export default function NotFound() {
  return (
    <Container>
      <Error>
        <h1>
          Página não encontrada <FaExclamation color="#e74c3c" />
        </h1>
        <Link to="/">
          <FaAngleLeft size={16} />
          voltar para o inicio
        </Link>
      </Error>
    </Container>
  );
}
