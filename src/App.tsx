import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Upload from "./views/Upload";
import Layout from "./views/Layout";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Notification from "./views/Notification";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Post from "./views/Post";
import UserDetailPage from "./components/UserDetailPage";
import MediaDetailPage from "./components/MediaDetailPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import {NotificationProvider} from "./contexts/NotificationContext";


const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <NotificationProvider>
          <ThemeProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route  path="/notification" element={<ProtectedRoute><Notification /></ProtectedRoute>}/>
                <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
                <Route path="/post" element={<Post />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/user/:username" element={<UserDetailPage />} />
                <Route path="/media/:title" element={<MediaDetailPage />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </NotificationProvider>
      </UserProvider>
    </Router>
  );
};

export default App;

