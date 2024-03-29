import { useAppActions, useAppSelector } from '../../app/hooks';
import React, { useEffect, useState } from 'react';
import { Guid } from 'guid-typescript';
import { useSearchParams } from 'react-router-dom';
import { ITodo } from '../../models/models';


export const TodoList = () => {
	const {addTodo, toggleTodo, removeTodo} = useAppActions();
	const {todos} = useAppSelector(state => state.todo)
	const [newTodoName, setNewTodoName] = useState('');
	const [searchParams] = useSearchParams();
	const folderId = searchParams.get('folderId');

	const createTodoHandler = () => {
		if (!newTodoName) {
			return ;
		}
		addTodo({
			id: Guid.create().toString(),
			name: newTodoName,
			done: false,
			folderId: folderId ? folderId : undefined
		})
		setNewTodoName('');
	}
	const removeTodoHandler = (id: string) => {
		removeTodo(id);
	}
	const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);
	useEffect(() => {
		setFilteredTodos(todos.filter(x => {
			if (!folderId) {
				return true;
			}
			return x.folderId === folderId;
		}));
	}, [todos, folderId])


	return <div  className="w-[500px] rounded p-5 bg-gray-100">
		<h2 className="text-lg">
			Todo list
		</h2>
		<div className="mt-5 flex">
			<input onKeyDown={e => e.key === 'Enter' && createTodoHandler()} value={newTodoName} onChange={e => setNewTodoName(e.target.value)} className="h-[40px] border py-2 px-4 w-full h-[42px] mb-2" placeholder="Type the task name" type="text"/>
			<button onClick={ createTodoHandler} className="ml-2 h-[40px] rounded p-2 bg-blue-500 text-white">
				Create
			</button>
		</div>
		<div className="mt-5 h-[400px] overflow-y-scroll">
			{
				filteredTodos.map(todo => {
					return <div key={todo.id} className="flex gap-2 justify-between items-center block border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
						<div className="flex gap-2 items-center">
							<input checked={todo.done} onChange={() => toggleTodo(todo.id)} type="checkbox"/>
							<span className={todo.done ? "line-through" : ""}>
								{todo.name}
							</span>
						</div>
						<button onClick={() => removeTodoHandler(todo.id)} className="h-[40px] rounded p-2 bg-red-500 text-white">
							Remove
						</button>
					</div>
				})
			}
		</div>
	</div>
}