import React , {useState} from 'react';
import './App.css';
import InputFeild from './componets/InputFeild';
import TodoList from './componets/TodoList';
import { Todo } from './model';

const App  = () => {
  const [todo , setTodo] = useState<string>("");
  const [todos , setTodos] = useState<Todo[]>([]);
  const [completed , setCompleted] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  }

  return (
    <div className="App">
        <h1>hello world </h1>
        <span className="heading">Taskify</span>
        <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}></InputFeild>
        <TodoList todos = {todos} setTodos = {setTodos} completed={completed} setCompleted={setCompleted}></TodoList>
    </div>
  );
}

export default App;
