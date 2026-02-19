// import { useState } from 'react'

// interface TodoFormProps {
//   onClose: () => void;
//   // Update interface to match what the form actually provides, since partial creation is handled by hook/api
//   onCreate: (data: { title: string; description?: string }) => void;
// }

// const TodoForm = ({ onClose, onCreate }: TodoFormProps) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = () => {
//     if (!title.trim()) return;
//     onCreate({ title, description });
//     setTitle("");
//     setDescription("");
//     onClose();
//   };

//   return (
//     <div className="mt-6 p-4 border-3 border-dashed border-retro-black bg-white shadow-hard-sm mb-6">
//       <div className="flex flex-col gap-3">
//         <input
//           className="w-full border-2 border-retro-black p-2 font-bold focus:ring-0 focus:outline-none"
//           placeholder="Task Title..."
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           className="w-full border-2 border-retro-black p-2 text-sm focus:ring-0 focus:outline-none"
//           placeholder="Description (optional)"
//           rows={2}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         ></textarea>
//         <div className="flex justify-end gap-2">
//           <button 
//             onClick={onClose}
//             className="text-xs font-bold underline hover:text-retro-indigo"
//           >
//             Cancel
//           </button>
//           <button 
//             onClick={handleSubmit}
//             className="bg-retro-green border-2 border-retro-black px-4 py-1 text-sm font-bold shadow-hard-sm hover:bg-green-300"
//           >
//             SAVE_TASK.EXE
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TodoForm

// implementing react hook for for understanding it.
import { useForm } from "react-hook-form"
import { useTodoContext } from "../../context/todoContext";
import type { ICreateTodoDTO } from "../../types/todo.type";

interface todoFormProps {
  onClose: () => void;
}

interface ItodoFormDTO {
  title: string;
  description?: string;
}

const TodoForm = ({ onClose }: todoFormProps) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ItodoFormDTO>({ defaultValues: { title: "", description: "default description" } });
  const {createTodo} = useTodoContext()

  const onSubmit = (data: ItodoFormDTO) => {
    createTodo(data as ICreateTodoDTO)
    reset();
    onClose();
  }

  return (
    <div className="mt-6 p-4 border-3 border-dashed border-retro-black bg-white shadow-hard-sm mb-6">
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="w-full border-2 border-retro-black p-2 font-bold focus:ring-0 focus:outline-none"
          placeholder="Task Title..."
          type="text"
          id="t1-form"
          {...register("title", { required: "title is required" })}
        />
        {
          errors?.title && (
            <span className="text-sm text-red-700">
              {errors?.title?.message}
            </span>
          )
        }
        <textarea
          className="w-full border-2 border-retro-black p-2 text-sm focus:ring-0 focus:outline-none"
          placeholder="Description (optional)"
          rows={2}
          id="t1-textarea"
          {...register("description")}
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-xs font-bold underline hover:text-retro-indigo"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-retro-green border-2 border-retro-black px-4 py-1 text-sm font-bold shadow-hard-sm hover:bg-green-300"
          >
            SAVE_TASK.EXE
          </button>
        </div>
      </form>
    </div>
  )
}

export default TodoForm