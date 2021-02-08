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
                <img src="logo-white.svg" alt="Zoom" loading="lazy" />
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
          <div className="left-panel">
            <ClearRefinements
              translations={{
                reset: 'Limpar filtos',
              }}
            />
            <h2>Tags</h2>
            <RefinementList attribute="tags" />
            <Configure hitsPerPage={8} />
          </div>
          <div className="right-panel">
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <div>
      <img
        src={props.hit.imageUrl}
        width="300"
        alt={props.hit.title}
        loading="lazy"
      />
      <div className="hit-name">
        <Highlight attribute="title" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={props.hit} />
      </div>
      <div className="hit-price">${props.hit.price}</div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
