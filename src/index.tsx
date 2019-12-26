import React from "react";
import { render } from "react-dom";
import Root from "./modules/root";
import "@fortawesome/fontawesome-free/css/all.css";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import registerServiceWorker from "./registerServiceWorker";

// let store = configureStore();

render(<Root />, document.getElementById("root"));
registerServiceWorker();
