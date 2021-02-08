import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './css/App.scss';

const searchClient = algoliasearch(
  'testing84XGRQ4I0V',
  '62787d4c518c998497a73013fb8a4180'
);

class App extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <InstantSearch
          indexName="challenge_article_v2_items"
          searchClient={searchClient}
        >
          <header>
            <div class="container">
              <div id="menu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87 64">
                  <path d="M0 54.857h86.857V64H0v-9.143zm0-27.428h86.857v9.143H0v-9.143zM0 0h86.857v9.143H0V0z"></path>
                </svg>
              </div>
              <div id="logo">
                <img src="img/logo-white.svg" alt="Zoom" loading="lazy" />
              </div>
              <div id="search">
                <SearchBox
                  translations={{
                    submitTitle: 'Pesquisar',
                    resetTitle: 'Limpar pesquisa',
                    placeholder: 'Digite sua busca...',
                  }}
                />
              </div>
            </div>
          </header>
          <div id="hero">
            <div class="container">
              <img
                src="img/deumzoom_logo.svg"
                alt="Dê um Zoom, reviews de produtos"
              />
            </div>
          </div>
          <div id="articles">
            <div class="container">
              <div className="left-panel filters">
                <h2>
                  Filtrar por:{' '}
                  <ClearRefinements
                    translations={{
                      reset: 'Limpar',
                    }}
                  />
                </h2>
                <h3>Tags</h3>
                <RefinementList attribute="tags" />
                <h3>Autores</h3>
                <RefinementList attribute="author.name" />
              </div>
              <div className="right-panel article-list">
                <Hits hitComponent={Hit} />
                <Configure hitsPerPage={8} />
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <a href={props.hit.url} class="article">
      <img
        src={props.hit.imageUrl}
        class="article-img"
        alt={props.hit.title}
        loading="lazy"
      />
      <div class="article-text">
        <div class="article-text-top">
          <div className="article-tag">
            <Highlight attribute="tags[0]" hit={props.hit} />
          </div>
          <h3 className="article-title">
            <Highlight attribute="title" hit={props.hit} />
          </h3>
          <p className="article-subtitle">
            <Highlight attribute="subtitle" hit={props.hit} />
          </p>
        </div>
        <div className="article-meta">
          Por <span class="article-meta-author">{props.hit.author.name}</span> -{' '}
          <span class="article-meta-date">
            {parseDate(props.hit.timestamp)}
          </span>
        </div>
      </div>
    </a>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

function parseDate(date) {
  let formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
  });
  return formattedDate;
}

export default App;
