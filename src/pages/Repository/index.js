import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner, FaAngleLeft, FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssuesList,
  Error,
  FilterButton,
  PaginateButton,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    error: false,
    filters: [
      {
        state: 'all',
        label: 'Todas',
        active: true,
      },

      {
        state: 'open',
        label: 'Abertas',
        active: false,
      },
      {
        state: 'closed',
        label: 'Fechadas',
        active: false,
      },
    ],
    filterIndex: 0,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    try {
      const [repository, issues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: filters.find(filter => filter.active).state,
            per_page: 5,
          },
        }),
      ]);

      this.setState({
        repository: repository.data,
        issues: issues.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  }

  handleFilterClick = async filterIndex => {
    await this.setState({ filterIndex, page: 1 });
    this.loadIssues();
  };

  loadIssues = async () => {
    try {
      const { match } = this.props;
      const { filters, filterIndex, page } = this.state;

      const repoName = decodeURIComponent(match.params.repository);

      const response = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters[filterIndex].state,
          per_page: 5,
          page,
        },
      });

      this.setState({ issues: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  handlePage = async action => {
    const { page } = this.state;

    await this.setState({
      page: action === 'next' ? page + 1 : page - 1,
    });

    this.loadIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      error,
      filters,
      filterIndex,
      page,
    } = this.state;

    if (loading) {
      return (
        <Container>
          <Loading>
            Carregando <FaSpinner />
          </Loading>
        </Container>
      );
    }

    if (error) {
      return (
        <Container>
          <Error>
            <div>
              <FaAngleLeft color="#7159c1" size={16} />
              <Link to="/">voltar aos repositórios</Link>
            </div>
            <p>
              Aconteceu um erro ao carregar as informações
              <FaExclamationCircle size={30} color="#FB4539" />
            </p>
          </Error>
        </Container>
      );
    }
    return (
      <Container>
        <Owner>
          <div>
            <FaAngleLeft color="#7159c1" size={16} />
            <Link to="/">voltar aos repositórios</Link>
          </div>
          <img src={repository.owner.avatar_url} alt={repository.owner.name} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <FilterButton active={filterIndex}>
          {filters.map((filter, index) => (
            <button
              type="button"
              key={filter.label}
              onClick={() => this.handleFilterClick(index)}
            >
              {filter.label}
            </button>
          ))}
        </FilterButton>

        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <a href={issue.user.html_url} target="_blank">
                <img
                  src={issue.user.avatar_url}
                  alt={issue.user.login}
                  title={issue.user.login}
                />
              </a>
              <div>
                <strong>
                  <a href={issue.html_url} target="_blank">
                    {issue.title}
                  </a>

                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>

        <PaginateButton>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePage('back')}
          >
            Anterior
          </button>
          <p>Página atual: {page}</p>
          <button type="button" onClick={() => this.handlePage('next')}>
            Próxima
          </button>
        </PaginateButton>
      </Container>
    );
  }
}
