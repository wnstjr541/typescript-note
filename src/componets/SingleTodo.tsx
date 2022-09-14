import React , {useState , useRef , useEffect} from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd';

interface Props {
    todo: Todo;
    todos: Todo[];
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number
}

const SingleTodo = ({ index , todo , todos , setTodos}:Props) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    
    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    };
    
    useEffect(()=>{
        inputRef.current?.focus();
    },[edit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                <form className="todos__single" 
                onSubmit={(e)=> handleEdit(e, todo.id)} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef} 
                >
                {edit ? (
                    <input
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                        className="todos__single--text"
                        ref={inputRef}
                        />
                    ) : todo.isDone ? (
                        <s className="todos__single--text">{todo.todo}</s>
                    ) : (
                        <span className="todos__single--text">{todo.todo}</span>
                )}
                <span className="todos__single--text">
                    <div>
                        <span
                            className="icon"
                            onClick={ () => {
                                    if(!edit && !todo.isDone){
                                        setEdit(!edit)
                                    }
                                }}>
                            <AiFillEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete />
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </span>
            </form>
            )}
        </Draggable>
    );
};

export default SingleTodo;