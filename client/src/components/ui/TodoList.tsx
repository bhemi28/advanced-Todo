import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItems";
import { useTodoContext } from "../../context/todoContext";

const TodoList = () => {
  const { loading, error, todos, refetch, createTodo, deleteTodo } = useTodoContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "archived">("all");
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-desktop">
        <div className="flex flex-col items-center gap-4">
            <span className="w-4 h-4 rounded-sm bg-retro-green animate-pulse"></span>
            <div className="text-xl font-heading text-retro-indigo tracking-widest">BOOTING_SYSTEM...</div>
        </div>
      </div>
    );

  // Filter logic
  const filteredTodos = todos?.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (filter === "completed") matchesFilter = todo.status === "completed";
    if (filter === "archived") matchesFilter = todo.status === "archived";

    return matchesSearch && matchesFilter;
  });

  const handleArchive = (id: number) => {
      console.log('archive', id);
  }

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row p-4 md:p-8 gap-6 z-10 font-mono">
      <main className="flex-1 flex flex-col min-h-0 bg-window border-3 border-retro-black shadow-hard max-w-6xl mx-auto w-full relative">
        {/* Header */}
        <header className="h-10 border-b-3 border-retro-black bg-retro-indigo flex items-center justify-between px-3 select-none">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-retro-pink border-2 border-retro-black shadow-[1px_1px_0px_0px_#000]"></div>
            <div className="w-4 h-4 rounded-sm bg-retro-yellow border-2 border-retro-black shadow-[1px_1px_0px_0px_#000]"></div>
            <div className="w-4 h-4 rounded-sm bg-retro-green border-2 border-retro-black shadow-[1px_1px_0px_0px_#000]"></div>
          </div>
          <div className="text-white font-heading text-xl tracking-wider uppercase">Tasks.exe - Dreamscape OS</div>
          <div className="flex items-center gap-1">
            <button className="w-6 h-6 bg-gray-200 border-2 border-retro-black text-xs font-bold shadow-[1px_1px_0px_0px_#000]">_</button>
            <button className="w-6 h-6 bg-retro-pink border-2 border-retro-black text-xs font-bold shadow-[1px_1px_0px_0px_#000]">X</button>
          </div>
        </header>

        {/* Controls */}
        <div className="p-4 border-b-3 border-retro-black bg-retro-blue/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1 max-w-md">
                <input 
                    className="w-full pl-10 pr-4 py-2 bg-white border-3 border-retro-black focus:ring-0 focus:outline-none shadow-hard-sm placeholder:text-gray-400 font-bold" 
                    placeholder="Search tasks..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
              </div>
              <button 
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="bg-retro-yellow border-3 border-retro-black px-4 py-2 font-bold shadow-hard-sm hover:bg-yellow-200 transition-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#0f0f0f] flex items-center gap-2"
              >
                <span className="material-symbols-outlined">add_box</span>
                {isFormOpen ? 'CLOSE_FORM' : 'CREATE TODO'}
              </button>
            </div>
            <div className="flex gap-2 p-1 bg-white border-3 border-retro-black shadow-hard-sm">
              {(['all', 'completed', 'archived'] as const).map((f) => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1 font-bold text-sm tracking-tighter uppercase transition-none border-2 ${filter === f ? 'bg-retro-indigo text-white border-retro-indigo shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.3)]' : 'bg-transparent border-transparent hover:bg-gray-100'}`}
                  >
                    {f}
                  </button>
              ))}
            </div>
          </div>

          {/* Create Form Area */}
          {isFormOpen && (
              <TodoForm 
                onClose={() => setIsFormOpen(false)}
              />
          )}
        </div>

        {/* Error State */}
        {error && (
            <div className="mx-4 mt-4 border-2 border-retro-black bg-red-100 p-4 shadow-hard-sm flex items-center gap-4">
                 <span className="material-symbols-outlined text-red-600 text-3xl">error</span>
                 <div>
                     <p className="font-bold text-red-800 uppercase text-sm">System Error</p>
                     <p className="text-red-700 text-sm">{error}</p>
                 </div>
                 <button onClick={refetch} className="ml-auto underline font-bold text-xs uppercase">Retry.exe</button>
            </div>
        )}

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white space-y-4">
             {filteredTodos && filteredTodos.length > 0 ? (
                 filteredTodos.map(todo => (
                     <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        // onToggle={() => handleToggle(todo.id)} 
                        onArchive={() => handleArchive(todo.id)}
                    />
                 ))
             ) : (
                 !loading && !error && (
                     <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <span className="material-symbols-outlined text-6xl mb-2">inbox</span>
                        <p className="font-bold">NO_TASKS_FOUND</p>
                     </div>
                 )
             )}
        </div>

        {/* Footer */}
        <footer className="h-8 border-t-3 border-retro-black bg-gray-100 flex items-center px-3 justify-between text-xs font-mono text-gray-500 select-none">
          <div className="flex gap-4">
            <span>{todos?.length || 0} Total Tasks</span>
            <span className="text-retro-indigo font-bold">{todos?.filter(t => t.status === 'completed').length || 0} Completed</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-retro-green animate-pulse"></span>
            <span>SYSTEM ONLINE</span>
          </div>
        </footer>
      </main>

      {/* Sidebar Nav */}
      <nav className="md:w-24 w-full md:h-auto h-20 shrink-0 flex md:flex-col flex-row items-center justify-center gap-4 z-20 pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur border-3 border-retro-black shadow-hard p-3 rounded-xl flex md:flex-col flex-row gap-4">
            <a className="group relative w-12 h-12 md:w-14 md:h-14 bg-white border-2 border-retro-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-all hover:bg-retro-blue btn-press" href="#" title="Home">
                <span className="material-symbols-outlined text-3xl text-retro-black group-hover:scale-110 transition-transform">home</span>
            </a>
            <a className="group relative w-12 h-12 md:w-14 md:h-14 bg-white border-2 border-retro-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-all hover:bg-retro-pink btn-press" href="#" title="Blog">
                <span className="material-symbols-outlined text-3xl text-retro-black group-hover:scale-110 transition-transform">save</span>
            </a>
            <a className="group relative btn-active w-12 h-12 md:w-14 md:h-14 bg-retro-yellow border-2 border-retro-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-all btn-press" href="#" title="Tasks">
                <span className="material-symbols-outlined text-3xl text-retro-black group-hover:scale-110 transition-transform">task_alt</span>
            </a>
            <div className="w-full h-0.5 md:w-8 md:h-0.5 bg-gray-300 md:my-1 hidden md:block"></div>
            <button className="hidden md:flex group relative w-10 h-10 bg-gray-200 border-2 border-retro-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] items-center justify-center transition-all hover:bg-gray-300 btn-press mx-auto" title="Settings">
                <span className="material-symbols-outlined text-xl text-retro-black">settings</span>
            </button>
        </div>
      </nav>
    </div>
  );
};

export default TodoList;
