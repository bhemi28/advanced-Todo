import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import TodoList from "./components/ui/TodoList";
import { TodoProvider } from "./context/todoContext";

function App() {
  return (
    <>
      <TodoProvider >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <TodoList />

      </TodoProvider>
    </>
  );
}

export default App;
