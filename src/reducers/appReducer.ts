import { Pokemon, AppAction, AppActions } from 'model/AppAction';
import createReducer from './createReducer';

export interface AppState {
  myPokemonData: Pokemon[];
  allPokemonData: { results: Pokemon[] };
  pokemonType: Pokemon[];
  loading: boolean;
}

const initialState: AppState = {
  myPokemonData: [],
  allPokemonData: { results: [] },
  pokemonType: [],
  loading: false,
};

export const appReducer = createReducer<AppState>(initialState, {
  [AppActions.ALL_POKEMON_DATA](state: Pokemon[], action: AppAction) {
    return {
        ...state,
        allPokemonData: action.payload,
      }
  },
  [AppActions.MY_POKEMON_DATA]: (state: AppState, action: AppAction) => {
    return {
      ...state,
      myPokemonData: [...state.myPokemonData, action.payload],
    }
  },
  [AppActions.DELETE_POKEMON_DATA]: (state: AppState, action: AppAction) => {
    const index = (state.myPokemonData || []).findIndex((i: Pokemon) => i.name === action.payload);
    return {
      ...state,
      myPokemonData: [
        ...state.myPokemonData.slice(0, index),
        ...state.myPokemonData.slice(index + 1)
      ]
    }
  },
  [AppActions.SET_POKEMON_TYPE]: (state: AppState, action: AppAction) => {
    return {
      ...state,
      pokemonType: action.payload
    }
  },
  [AppActions.SET_LOADING](state: AppState, action: AppAction) {
    return {
      ...state,
      loading: action.payload,
    }
  }
});

