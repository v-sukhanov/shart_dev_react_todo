import { TodoList } from './TodoList';
import { Folders } from './Folders';
import { useAppSelector } from '../../app/hooks';

export const Todo = () => {
	return  <div className="flex">
		<Folders/>
		<div className="w-[10px]"></div>
		<TodoList/>
	</div>
}