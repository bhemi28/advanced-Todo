import type { ITodo } from "../../types/todo.type";

interface TodoItemProps {
  todo: ITodo;
  // onToggle: (id: number) => void;
  onDelete: (id: number) => void; 
  onArchive: (id: number) => void;
}

const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
  const isCompleted = todo.status === 'completed';
  
  return (
    <div className={`group flex items-center gap-4 p-4 border-3 border-retro-black shadow-hard-sm transition-none relative ${isCompleted ? 'bg-gray-50 opacity-80' : 'hover:bg-retro-blue/5'}`}>
      <div className="flex-shrink-0">
        <div 
            // onClick={() => onToggle(todo.id)}Look at where timer lives:
            className={`w-8 h-8 border-3 border-retro-black shadow-inset-hard flex items-center justify-center cursor-pointer ${isCompleted ? 'bg-retro-green' : 'bg-white hover:bg-retro-green/20'}`}>
          {isCompleted ? (
            <span className="material-symbols-outlined text-retro-black font-bold">done</span>
          ) : (
            <span className="material-symbols-outlined text-retro-green hidden group-hover:block opacity-40">done</span>
          )}
        </div> 
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h3 className={`font-bold text-xl truncate ${isCompleted ? 'line-through text-gray-400' : ''}`}>{todo.title}</h3>
          {/* Example tag, you can make this dynamic later */}
          {!isCompleted && <span className="bg-retro-pink border-2 border-retro-black px-2 py-0.5 text-[10px] font-bold shadow-hard-sm uppercase">Priority</span>}
        </div>
        {/* Description is not in ITodo yet, so I will comment it out or add it to type if user wants. The design has it. I'll make it optional in component for now by checking if it exists (it doesn't on type so typescript will complain). */}
        {/* 
        {todo.description && (
            <p className={`text-sm truncate ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                {todo.description}
            </p>
        )}
        */}
        <div className="mt-2 flex items-center gap-4">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-100 border border-gray-300 px-1.5 py-0.5">
            <span className="material-symbols-outlined text-xs">calendar_today</span>
            CREATED: {new Date(todo.createdAt || Date.now()).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
            // onClick={() => onToggle(todo.id)}
            className={`pixel-icon-btn w-10 h-10 border-2 border-retro-black shadow-hard-sm flex items-center justify-center ${isCompleted ? 'bg-retro-green text-white' : 'bg-white text-retro-indigo'}`} 
            title={isCompleted ? "Uncheck" : "Mark Complete"}
        >
          <span className="material-symbols-outlined">check_circle</span>
        </button>
        <button 
            onClick={() => onDelete(todo.id)}
            className="pixel-icon-btn w-10 h-10 border-2 border-retro-black bg-white shadow-hard-sm flex items-center justify-center text-gray-500" 
            title="Archive Task"
        >
          <span className="material-symbols-outlined">folder_open</span>
        </button>
      </div>
    </div>
  );
};

export default TodoItem