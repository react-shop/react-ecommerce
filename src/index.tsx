import React from "react";
import { render } from "react-dom";
import Home from "./modules/views/home";
import "@fortawesome/fontawesome-free/css/all.css";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import registerServiceWorker from "./registerServiceWorker";

// let store = configureStore();

render(<Home />, document.getElementById("root"));
registerServiceWorker();
