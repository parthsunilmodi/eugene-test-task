import axiosI from './index';

export const Type = {
  ALL_POKEMON_DATA: 'ALL_POKEMON_DATA',
  MY_POKEMON_DATA: 'MY_POKEMON_DATA',
  DELETE_POKEMON_DATA: 'DELETE_POKEMON_DATA',
  SET_POKEMON_TYPE: 'SET_POKEMON_TYPE',
  SET_LOADING: 'SET_LOADING'
};

export const getPokemonData = (offset: number, limit: number) => async (dispatch: any) => {
  try {
    dispatch({ type: Type.SET_LOADING, payload: true });
    const response = await axiosI.get(`/pokemon?offset=${offset}&limit=${limit}`);
    if(response?.status === 200) {
      dispatch({ type: Type.ALL_POKEMON_DATA, payload: response?.data || [] });
    }
    return ;
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ type: Type.SET_LOADING, payload: false });
  }
};

export const addPokemon = (pokemon: any, cb: (res: boolean) => void) => async (dispatch: any) => {
  try {
    dispatch({ type: Type.SET_LOADING, payload: true });
    await dispatch({ type: Type.MY_POKEMON_DATA, payload: pokemon || {} });
    cb(true);
  } catch (err) {
    console.error(err);
    cb(false);
  } finally {
    dispatch({ type: Type.SET_LOADING, payload: false });
  }
};

export const deletePokemon = (pokemon: any) => async (dispatch: any) => {
  try {
    dispatch({ type: Type.SET_LOADING, payload: true });
    await dispatch({ type: Type.DELETE_POKEMON_DATA, payload: pokemon || {} });
    return true;
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ type: Type.SET_LOADING, payload: false });
  }
};

export const getPokemonTypes = () => async (dispatch: any) => {
  try {
    dispatch({ type: Type.SET_LOADING, payload: true });
    const response = await axiosI.get('/type');
    if(response?.status === 200) {
      dispatch({ type: Type.SET_POKEMON_TYPE, payload: response?.data?.results || [] });
    }
    return ;
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ type: Type.SET_LOADING, payload: false });
  }
};

export const getPokemonTypeData = (name: string) => async (dispatch: any) => {
  try {
    dispatch({ type: Type.SET_LOADING, payload: true });
    return await axiosI.get(`/type/${name}`);
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    dispatch({ type: Type.SET_LOADING, payload: false });
  }
};

