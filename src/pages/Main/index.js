/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaBan } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Empty } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories, newRepo } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: null });
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      this.setState({ loading: true });

      const { newRepo, repositories } = this.state;

      if (newRepo === '') throw new Error('Digite um repositório');

      repositories.find(repo => {
        if (newRepo === repo.name) throw new Error('Repositório duplicado');
      });

      const response = await api.get(`repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });

      toast.success('✅ Adicionado!', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error(`🚫 ${error}`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      });

      this.setState({
        error: true,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;
    return (
      <Container>
        <ToastContainer />
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error ? 1 : 0}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        {repositories.length > 0 ? (
          <List>
            {repositories.map(repository => (
              <li key={repository.name}>
                <span>{repository.name}</span>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
              </li>
            ))}
          </List>
        ) : (
          <Empty>
            <span>Nada Cadastrado</span>
            <FaBan color="#ff0000" size={16} />
          </Empty>
        )}
      </Container>
    );
  }
}
