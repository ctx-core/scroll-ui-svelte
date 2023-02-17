import type { SvelteComponentTyped } from 'svelte'
export class Sticky_Scroll extends SvelteComponentTyped<{
	class?:string
	terminal?:HTMLElement|null
}, {
	active__add:Sticky_Scroll__event_T
	active__remove:Sticky_Scroll__event_T
	visible__add:Sticky_Scroll__event_T
	visible__remove:Sticky_Scroll__event_T
}> {}
export interface Sticky_Scroll__event_T {
	root:HTMLElement
	target:HTMLElement
	currentTarget:HTMLElement
}
