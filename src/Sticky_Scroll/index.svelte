<script>
import { out_is_active_, out_is_visible_ } from '@ctx-core/scroll'
import { createEventDispatcher, onDestroy, onMount } from 'svelte'
const dispatch = createEventDispatcher()
/** @type {HTMLElement|null} */
export let terminal = null
let getBoundingClientRect = default_getBoundingClientRect
/** @type {HTMLDivElement|null} */
let root = null
/** @type {boolean} */
let active
/** @type {boolean} */
let visible
onMount(()=>{
	reset()
	if (terminal) {
		terminal.addEventListener('scroll', reset)
	}
})
onDestroy(()=>{
	if (terminal) {
		terminal.removeEventListener('scroll', reset)
	}
	if (contains_visible()) {
		visible__remove()
	}
	if (contains_active()) {
		active__remove()
	}
})
function reset() {
	const { top, bottom } = getBoundingClientRect()
	const { innerHeight } = window
	const out_is_active = out_is_active_(top, bottom)
	const out_is_visible = out_is_visible_(top, bottom, innerHeight)
	if (out_is_visible) {
		if (!visible) {
			visible__add()
		}
	} else {
		if (visible) {
			visible__remove()
		}
	}
	if (out_is_active) {
		if (!active) {
			active__add()
		}
	} else {
		if (active) {
			active__remove()
		}
	}
}
function active__add() {
	active = true
	dispatch(/** @type {any} */'active__add', event_())
}
function active__remove() {
	active = false
	dispatch(/** @type {any} */'active__remove', event_())
}
function visible__add() {
	visible = true
	dispatch(/** @type {any} */'visible__add', event_())
}
function visible__remove() {
	visible = false
	dispatch(/** @type {any} */'visible__remove', event_())
}
function default_getBoundingClientRect():DOMRect {
	return root.getBoundingClientRect()
}
function contains_visible() {
	return root.classList.contains('visible')
}
function contains_active() {
	return root.classList.contains('active')
}
function event_() {
	return {
		root,
		target: root,
		currentTarget: root,
	}
}
</script>

<svelte:window
	on:scroll={reset}
	on:resize={reset}
/>

<div bind:this={root} class="Sticky_Scroll {$$props.class||''}" class:active>
	<slot></slot>
</div>
