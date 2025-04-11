import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Usar en lugar de useDispatch para tipar correctamente el dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Usar en lugar de useSelector para tipar correctamente el selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
