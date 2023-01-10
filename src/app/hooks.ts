import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { bindActionCreators } from '@reduxjs/toolkit';
import { todoActions } from './todos.slice';
import { folderActions } from './folders.slice';

const actions = {
	...todoActions,
	...folderActions
}

export const useAppActions = () => {
	const dispatch =  useDispatch<AppDispatch>();
	return bindActionCreators(actions, dispatch)
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
