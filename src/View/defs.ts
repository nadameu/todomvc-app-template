import { Model } from "../Model";
import { Msg } from "../Msg";

export interface Handler<a> {
	(_: a): void;
}

export type Dispatch = Handler<Msg>;

export interface View<a = Model> {
	(dispatch: Dispatch): Handler<a>;
}
