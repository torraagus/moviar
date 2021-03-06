export interface IMovie {
	id: number;
	title: string;
	poster_path: string;
	backdrop_path: string;
	release_date: string;
	overview: string;
	tagline: string;
	genres: Array<{ id: number; name: string }>;
	runtime: number;
	vote_average: number;
	rating: number;
	status: string;
	budget: number;
	revenue: number;
	original_language: string;
	popularity: number;
	homepage: string;
}

interface Response {
	movies: IMovie[];
	loading: boolean;
	error: string;
	page: number;
	total_pages: number;
}

export interface IState {
	nowPlaying: Response;
	popular: Response;
	upcoming: Response;
}

export interface IRes {
	page: number;
	total_results: number;
	total_pages: number;
	results: IMovie[];
	success: boolean;
	status_message: string;
}

interface IAction {
	type: string;
	result: IRes;
	error: string;
}

const INITIAL_STATE = {
	nowPlaying: { movies: [], loading: false, error: null, page: 1, total_pages: 1 },
	popular: { movies: [], loading: false, error: null, page: 1, total_pages: 1 },
	upcoming: { movies: [], loading: false, error: null, page: 1, total_pages: 1 },
	error: "",
};

const moviesReducer = (state: IState = INITIAL_STATE, action: IAction) => {
	const { type, result, error } = action;
	switch (type) {
		case "NOW-PLAYING_MOVIES_FETCH_SUCCEEDED":
			return {
				...state,
				nowPlaying: {
					...state.nowPlaying,
					movies: [...result.results],
					loading: false,
					page: result.page,
					total_pages: result.total_pages,
				},
			};
		case "NOW-PLAYING_MOVIES_FETCHING":
			return { ...state, nowPlaying: { ...state.nowPlaying, movies: [], loading: true } };
		case "NOW-PLAYING_MOVIES_FETCH_FAILED":
			return { ...state, nowPlaying: { movies: [], loading: false, error } };

		case "POPULAR_MOVIES_FETCH_SUCCEEDED":
			return {
				...state,
				popular: {
					...state.popular,
					movies: [...result.results],
					loading: false,
					page: result.page,
					total_pages: result.total_pages,
				},
			};
		case "POPULAR_MOVIES_FETCHING":
			return { ...state, popular: { ...state.popular, movies: [], loading: true } };
		case "POPULAR_MOVIES_FETCH_FAILED":
			return { ...state, popular: { movies: [], loading: false, error } };

		case "UPCOMING_MOVIES_FETCH_SUCCEEDED":
			return {
				...state,
				upcoming: {
					...state.upcoming,
					movies: [...result.results],
					loading: false,
					page: result.page,
					total_pages: result.total_pages,
				},
			};
		case "upcoming_MOVIES_FETCHING":
			return { ...state, upcoming: { ...state.upcoming, movies: [], loading: true } };
		case "UPCOMING_MOVIES_FETCH_FAILED":
			return { ...state, upcoming: { movies: [], loading: false, error } };

		default:
			return state;
	}
};

export default moviesReducer;
