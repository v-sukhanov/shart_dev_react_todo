import React from 'react';
import './App.css';
import { Todo } from './features/todo';

function App() {
	return (
		<div className="bg-blue-200 h-screen flex justify-center items-center">
			<Todo/>
		</div>
	);
}

export default App;
