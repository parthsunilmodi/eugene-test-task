export interface Pokemon {
	name: string;
	url: string;
	username?: string;
}

export enum AppActions {
	ALL_POKEMON_DATA = 'ALL_POKEMON_DATA',
	MY_POKEMON_DATA = 'MY_POKEMON_DATA',
	DELETE_POKEMON_DATA = 'DELETE_POKEMON_DATA',
	SET_POKEMON_TYPE = 'SET_POKEMON_TYPE',
	SET_LOADING = 'SET_LOADING'
}

interface AppActionType<T, P> {
	type: T;
	payload: P;
}

export type AppAction =
	| AppActionType<typeof AppActions.ALL_POKEMON_DATA, Pokemon[] | []>
	| AppActionType<typeof AppActions.MY_POKEMON_DATA, Pokemon>
	| AppActionType<typeof AppActions.DELETE_POKEMON_DATA, string>
	| AppActionType<typeof AppActions.SET_POKEMON_TYPE, Pokemon[]>
	| AppActionType<typeof AppActions.SET_LOADING, boolean>;
