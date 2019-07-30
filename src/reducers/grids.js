import omitBy from 'lodash/fp/omitBy';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import get from 'lodash/fp/get';

export const gridActionTypes = {
  setPage: 'GRID_SET_PAGE',
  setFilter: 'GRID_SET_FILTER',
  setOrder: 'GRID_SET_ORDER',
  setColumns: 'GRID_SET_COLUMNS',
  hideColumn: 'GRID_HIDE_COLUMN',
  loadData: 'GRID_LOAD_DATA',
  loadDataSucceeded: 'GRID_LOAD_DATA_SUCCEEDED',
  loadDataFailed: 'GRID_LOAD_DATA_FAILED',
};

export const createHideColumnAction = (name, id) => ({ type: gridActionTypes.hideColumn, name, id });
export const createSetPageAction = (name, page) => ({ type: gridActionTypes.setPage, page, name });
export const createSetOrderAction = (name, id, order = 'ASC') => ({ type: gridActionTypes.setOrder, id, order, name });
export const createSetColumnsAction = (name, columns) => ({ type: gridActionTypes.setColumns, columns, name });
export const createSetFilterAction = (name, filter) => ({ type: gridActionTypes.setFilter, filter, name });

export const createLoadDataAction = (name) => ({ type: gridActionTypes.loadData, name });
export const createLoadDataSucceededAction = (name, data) => ({ type: gridActionTypes.loadDataSucceeded, name, data });
export const createLoadDataFailedAction = (name, error) => ({ type: gridActionTypes.loadDataFailed, name, error });

const hide = keyToRemove => (_, key) => key === keyToRemove;

const orderers = {
  ASC: column => (a, b) => a[column] === b[column]
    ? 0
    : a[column] > b[column] ? 1 : -1,

  DESC: column => (a, b) => a[column] === b[column]
    ? 0
    : a[column] < b[column] ? 1 : -1,
};

export default function gridsReducer(state = {}, action) {
  let data, columns, currentColumnOrder;

  switch(action.type) {
    case gridActionTypes.loadData:
      return set(`${action.name}.isLoading`, true, state);

    case gridActionTypes.loadDataSucceeded:
      return flow([
        set(`${action.name}.data`, action.data),
        set(`${action.name}.isLoading`, false),
      ])(state);

    case gridActionTypes.loadDataFailed:
      return flow([
        set(`${action.name}.error`, action.error),
        set(`${action.name}.isLoading`, false),
      ])(state);

    case gridActionTypes.setFilter:
      return set(`${action.name}.filter`, action.filter, state);

    case gridActionTypes.setPage:
      return set(`${action.name}.currentPage`, action.page, state);

    case gridActionTypes.setColumns:
      return set(`${action.name}.columns`, action.columns, state);

    case gridActionTypes.hideColumn:
      columns = get(`${action.name}.columns`, state);

      return set(`${action.name}.columns`, omitBy(hide(action.id), columns), state);

    case gridActionTypes.setOrder:
      data = get(`${action.name}.data`, state);
      columns = get(`${action.name}.columns`, state);
      currentColumnOrder = Object.keys(columns).filter(key => !!columns[key].order);

      return flow([
        set(`${action.name}.columns.${currentColumnOrder}.order`, undefined),
        set(`${action.name}.columns.${action.id}.order`, action.order),
        set(`${action.name}.data`, data.sort(orderers[action.order](action.id))),
      ])(state);

    default:
      return state;
  }
}