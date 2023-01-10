import { IFolder } from '../models/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todosSlice } from './todos.slice';


const FOLDERS_KEY = "FOLDERS_KEY";

interface IFolderSliceState {
	folders: IFolder[]
}

const initialState: IFolderSliceState = {
	folders: JSON.parse(localStorage.getItem(FOLDERS_KEY) ?? '[]')
}

export const foldersSlice = createSlice({
	name: 'folders',
	initialState,
	reducers: {
		addFolder(state, payload: PayloadAction<IFolder>) {
			state.folders.unshift(payload.payload);
			localStorage.setItem(FOLDERS_KEY, JSON.stringify(state.folders))
		},
		removeFolder(state, payload: PayloadAction<string>) {
			state.folders = state.folders.filter(x => x.id !== payload.payload);
			localStorage.setItem(FOLDERS_KEY, JSON.stringify(state.folders))
		}
	}
})

export const folderActions = foldersSlice.actions;
export const folderReducer = foldersSlice.reducer;