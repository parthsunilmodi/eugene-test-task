import axiosI from './axiosI';
import { AppActions, Pokemon } from 'model';

export const getPokemonData = (offset: number, limit: number) => {
  return async (dispatch: Function) => {
    try {
      dispatch({ type: AppActions.SET_LOADING, payload: true });
      const response = await axiosI.get(`/pokemon?offset=${offset}&limit=${limit}`);
      if (response?.status === 200) {
        dispatch({ type: AppActions.ALL_POKEMON_DATA, payload: response?.data || [] });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({type: AppActions.SET_LOADING, payload: false});
    }
  };
}

export const addPokemon = (pokemon: Pokemon, cb: (res: boolean) => void) => {
  return async (dispatch: Function) => {
    try {
      dispatch({ type: AppActions.SET_LOADING, payload: true });
      await dispatch({ type: AppActions.MY_POKEMON_DATA, payload: pokemon || {} });
      cb(true);
    } catch (err) {
      console.error(err);
      cb(false);
    } finally {
      dispatch({ type: AppActions.SET_LOADING, payload: false });
    }
  };
};

export const deletePokemon = (pokemon: Pokemon) => {
  return async (dispatch: Function) => {
    try {
      dispatch({ type: AppActions.SET_LOADING, payload: true });
      await dispatch({ type: AppActions.DELETE_POKEMON_DATA, payload: pokemon.name || "" });
      return true;
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: AppActions.SET_LOADING, payload: false });
    }
  };
};

export const getPokemonTypes = () => {
  return async (dispatch: Function) => {
    try {
      dispatch({ type: AppActions.SET_LOADING, payload: true });
      const response = await axiosI.get('/type');
      if(response?.status === 200) {
        dispatch({ type: AppActions.SET_POKEMON_TYPE, payload: response?.data?.results || [] });
      }
      return ;
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: AppActions.SET_LOADING, payload: false });
    }
  };
};

export const getPokemonTypeData = (name: string) => {
  return async (dispatch: Function) => {
    try {
      dispatch({ type: AppActions.SET_LOADING, payload: true });
      return await axiosI.get(`/type/${name}`);
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      dispatch({ type: AppActions.SET_LOADING, payload: false });
    }
  };
};

