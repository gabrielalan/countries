import { takeLatest, put } from "@redux-saga/core/effects";
import { createSetColumnsAction, gridActionTypes, createLoadDataFailedAction, createLoadDataSucceededAction } from "../reducers/grids";
import TextCell from "../components/presentational/grid/cells/TextCell";
import CurrencyRate from "../components/containers/CurrencyRate";
import client from "../api/client";
import { getAllCountries } from '../api/queries/countries';
import { withCellType } from "../components/presentational/grid/cells/PrimitiveListCell";

const colSpecsForCountries = {
  emoji: {
    Type: TextCell,
    isHidable: true,
    width: 30,
    label: '#'
  },
  code: {
    Type: TextCell,
    isHidable: true,
    width: 30,
    label: '#',
    isOrdarable: true,
  },
  name: {
    Type: TextCell,
    isHidable: true,
    width: 430,
    label: 'Name (Native name)',
    order: 'ASC',
    isOrdarable: true,
  },
  phone: {
    Type: TextCell,
    isHidable: true,
    width: 70,
    label: 'Phone',
    isOrdarable: true,
  },
  currency: {
    Type: withCellType(CurrencyRate),
    isHidable: true,
    width: 120,
    label: 'Currency',
    isOrdarable: true,
  },
  continent: {
    Type: TextCell,
    isHidable: true,
    width: 120,
    label: 'Continent',
    isOrdarable: true,
  },
  languages: {
    Type: TextCell,
    isHidable: true,
    width: 200,
    label: 'Languages'
  },
};

const dataMapper = (country) => ({
  code: country.code,
  emoji: country.emoji,
  name: `${country.name} (${country.native})`,
  phone: country.phone,
  currency: country.currency.split(','),
  continent: country.continent.name,
  languages: country.languages.map(lang => lang.name).join(', '),
});

function* setGridSpecs(action) {
  if (action.name !== 'countries') {
    return null;
  }

  try {
    const result = yield client.query({ query: getAllCountries });
    
    yield put(createSetColumnsAction('countries', colSpecsForCountries));
    yield put(createLoadDataSucceededAction('countries', result.data.countries.map(dataMapper)));
  } catch(e) {
    yield put(createLoadDataFailedAction('countries', e.message));
  }
}

export default [
  takeLatest(gridActionTypes.loadData, setGridSpecs),
];