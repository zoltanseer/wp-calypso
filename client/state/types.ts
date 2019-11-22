import { Action } from 'redux';

export interface Reducer< S = any, A extends Action = AnyAction > {
	( state: S | undefined, action: A ): S;
}

/**
 * Object whose values correspond to different reducer functions.
 *
 * @template A The type of actions the reducers can potentially respond to.
 */
export type ReducersMapObject< S = any, A extends Action = Action > = {
	[ K in keyof S ]: Reducer< S[ K ], A >;
};
