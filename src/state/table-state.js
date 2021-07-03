import { atom } from "recoil";

const tableState = atom({
    key: 'tableState', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
});