import { ActionReducerMap } from "@ngrx/store";
import { UserStoreState, currentUserFeatureKey, userReducer } from "./reducers/user.reducer";

export interface PizzaStoreState {
    [currentUserFeatureKey]: UserStoreState
}
export const reducers: ActionReducerMap<PizzaStoreState> = {
    [currentUserFeatureKey]: userReducer
}