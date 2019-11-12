import { Actions } from '../Action';
import { dispatch } from '../dispatch';
import { listen } from '../listen';
import { Model } from '../Model';
import { contramap, Existing } from '../View';

export const ToggleAll = contramap(
	({ toggleAll }: Model) => toggleAll,
	Existing('.toggle-all', (toggleAll: HTMLInputElement) => {
		listen(toggleAll, 'change', () =>
			dispatch(Actions.ToggleAll, toggleAll.checked)
		);
		return state => (toggleAll.checked = state);
	})
);
