import {store} from "../store";
import {useDispatch} from "react-redux";

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()