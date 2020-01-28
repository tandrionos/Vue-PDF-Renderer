import PdfRenderer from './PdfRenderer.vue';

export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('html5-pdf', PdfRenderer);
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	// eslint-disable-next-line no-undef
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default PdfRenderer;