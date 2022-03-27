import { render } from "react-dom";
import App from "./App.jsx";
import {AuthProvider} from '@context/authContext.js';

import '@styles/main.scss';

render(
    <AuthProvider>
        <App />
    </AuthProvider>,

    document.getElementById("root")
)