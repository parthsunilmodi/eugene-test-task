export const getAllPokemonDataSelector = (state: any) => state.appReducer.allPokemonData || [];
export const getLoading = (state: any) => state.appReducer.loading || false;
export const getPokemonTypeSelector = (state: any) => state.appReducer.pokemonType ||[];
export const getMyPokemonSelector = (username) => (state: any) => (state.appReducer.myPokemonData || []).filter(i => i.username === username) || [];
