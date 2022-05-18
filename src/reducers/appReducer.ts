import { handleActions, Action } from 'redux-actions';

import * as AppActions from 'actions/AppAction';

export type State = {
  readonly myPokemonData: any;
  readonly allPokemonData: any;
  readonly pokemonType: any;
  readonly loading: boolean;
};


const initialState: State = {
  myPokemonData: [],
  allPokemonData: { results: [] },
  pokemonType: [],
  loading: false,
};

export const appReducer = handleActions<State, Action<any>>(
  {
    [AppActions.Type.ALL_POKEMON_DATA]: (state: State, action: Action<any>) => {
      return {
        ...state,
        allPokemonData: action.payload,
      }
    },
    [AppActions.Type.MY_POKEMON_DATA]: (state: State, action: Action<any>) => {
      return {
        ...state,
        myPokemonData: [...state.myPokemonData, action.payload],
      }
    },
    [AppActions.Type.DELETE_POKEMON_DATA]: (state: State, action: Action<any>) => {
      const index = (state.myPokemonData || []).findIndex(i => i.name === action.payload.name && i.url === action.payload.url);
      return {
        ...state,
        myPokemonData: [
          ...state.myPokemonData.slice(0, index),
          ...state.myPokemonData.slice(index+1)
      ]
      }
    },
    [AppActions.Type.SET_POKEMON_TYPE]: (state: State, action: Action<any>) => {
      return {
        ...state,
        pokemonType: action.payload
      }
    },
    [AppActions.Type.SET_LOADING]: (state: State, action: Action<any>) => {
      return {
        ...state,
        loading: action.payload,
      }
    },
  },
  initialState
);
