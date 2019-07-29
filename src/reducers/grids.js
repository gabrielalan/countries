import set from 'lodash/fp/set';

export const gridActionTypes = {
  setPage: 'GRID_SET_PAGE',
  setColumns: 'GRID_SET_COLUMNS',
};

export const createSetPageAction = (name, page) => ({ type: gridActionTypes.setPage, page, name });

export const createSetColumnsAction = (name, columns) => ({ type: gridActionTypes.setColumns, columns, name });

export default function gridsReducer(state = {}, action) {
  switch(action.type) {
    case gridActionTypes.setPage:
      return set(`${action.name}.currentPage`, action.page, state);

    case gridActionTypes.setColumns:
      return set(`${action.name}.columns`, action.columns, state);

    default:
      return state;
  }
}