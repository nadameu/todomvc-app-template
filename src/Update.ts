import { Model } from "./Model";
import { Msg } from "./Msg";
export interface Update<s = Model, m = Msg> {
	(state: s, msg: m): s;
}
