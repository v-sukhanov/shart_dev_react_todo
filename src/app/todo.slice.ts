import { ITodo } from '../models/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const TODOS_KEY = "TODOS_KEY";

interface ITodoSliceState {
	todos: ITodo[]
}

const initialState: ITodoSliceState = {
	todos: JSON.parse(localStorage.getItem(TODOS_KEY) ?? '[]')
}

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		addTodo(state, payload: PayloadAction<ITodo>) {
			state.todos.unshift(payload.payload);
			localStorage.setItem(TODOS_KEY, JSON.stringify(state.todos))
		},
		toggleTodo(state, payload: PayloadAction<string>) {
			const candidate = state.todos.find(x => x.id === payload.payload);
			if (candidate) {
				candidate.done = !candidate.done;
			}
			localStorage.setItem(TODOS_KEY, JSON.stringify(state.todos))
		},
		removeTodo(state, payload: PayloadAction<string>) {
			state.todos = state.todos.filter(x => x.id !== payload.payload);
			localStorage.setItem(TODOS_KEY, JSON.stringify(state.todos))
		}
	}
})

export const todoActions = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
