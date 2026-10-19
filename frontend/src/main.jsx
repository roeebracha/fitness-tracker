import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './auth/AuthContext.jsx';
import{ToastContainer} from "react-toastify"

createRoot(document.getElementById('root')).render(
<>
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
    <App/>
</AuthProvider>
</GoogleOAuthProvider>

<ToastContainer
position="bottom-right"
autoClose={3000}
/>
</>,

);
