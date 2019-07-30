import "babel-polyfill";

import {binder, fwa} from "./libs/binder";
import {p5training} from "./modules/module";




binder({
    bounds: {
        "html": [p5training]
    },
    runTests: false
});
