import { configureStore } from "@reduxjs/toolkit";
import sliceCities from "./sliceCities";

export const store = configureStore({
    reducer: {
        sliceCities: sliceCities
    }
})