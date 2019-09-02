/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaBan } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton, List, Empty } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;
    const response = await api.get(`repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    console.log(response.data);

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  render() {
    const { newRepo, repositories, loading } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
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
                <a href="http://google.com" target="_blank">
                  Detalhes
                </a>
              </li>
            ))}
          </List>
        ) : (
          <Empty>
            <span>Nada Cadastrado</span>
            <FaBan color="#ff0000" size={14} />
          </Empty>
        )}
      </Container>
    );
  }
}
