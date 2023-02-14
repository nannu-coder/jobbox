import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import auth from "./firebase/firebase.config";
import { useDispatch } from "react-redux";
import { getUser, setUser, toggleLoading } from "./features/auth/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.email));
      } else {
        dispatch(toggleLoading());
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
