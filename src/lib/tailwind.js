import { useMedia } from "react-use";
// see https://twitter.com/silvenon/status/1375149895645036549
import * as screens from "@/styles/screens.module.css";

const remapKey = { "2xl": "xxl" };

export const useScreen = screen => {
    screen = remapKey[screen] || screen;
    return useMedia(`(min-width: ${screens[screen]})`);
};
