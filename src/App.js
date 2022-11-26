import logo from './logo.svg';
import './App.css';
import router from './route/Routes/Routes';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="max-w-[1440px] mx-auto bg-white dark:bg-slate-400">
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
