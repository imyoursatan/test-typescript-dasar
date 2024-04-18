import React, { useState } from 'react';

interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

const TodoComponent: React.FC<{
	todo: Todo;
	onDelete: (id: number) => void;
}> = ({ todo, onDelete }) => {
	return (
		<div>
			<p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
				{todo.text}
			</p>
			<button onClick={() => onDelete(todo.id)}>Delete</button>
		</div>
	);
};

const App: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [input, setInput] = useState<string>('');

	const handleAddTodo = () => {
		if (input.trim() !== '') {
			setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
			setInput('');
		}
	};

	const handleDeleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<div>
			<h1>to do list</h1>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="to do?"
			/>
			<button onClick={handleAddTodo}>tambah to-do</button>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						<TodoComponent todo={todo} onDelete={handleDeleteTodo} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
