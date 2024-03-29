import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const name = 'food';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

export const foodActions = { ...slice.actions, ...extraActions };
export const foodReducer = slice.reducer;

function createInitialState() {
	return {
		isLoading: false,
		isAdded: false,
		foods: [],
	};
}

function createReducers() {
	return {};
}

function createExtraActions() {
	return {
		get: get(),
	};

	function get() {
		return createAsyncThunk(`${name}/get`, async () => {
			return await axios.get(name);
		});
	}
}

function createExtraReducers() {
	return {
		...get(),
	};

	function get() {
		var { pending, fulfilled, rejected } = extraActions.get;
		return {
			[pending]: (state) => {
				state.isAdded = false;
				state.isLoading = true;
			},
			[fulfilled]: (state, action) => {
				state.isAdded = true;
				state.isLoading = false;
				state.foods = action.payload.data;
			},
			[rejected]: (state, action) => {
				state.isAdded = false;
				state.isLoading = false;
			},
		};
	}
}

export default foodReducer;
