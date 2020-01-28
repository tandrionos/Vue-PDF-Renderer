# Vue Pdf Renderer

<p align="center">
    <a href="https://www.npmjs.com/package/vue-pdf-renderer"><img src="https://img.shields.io/npm/v/vue-pdf-renderer.svg" /></a>
    <a href="https://www.npmjs.com/package/vue-pdf-renderer"><img src="https://img.shields.io/npm/dt/vue-pdf-renderer.svg" /></a>
    <a href="https://github.com/tandrionos/vue-pdf-renderer/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/vue-pdf-renderer.svg" /></a>
</p>

> Vue Pdf Renderer is a component that allows you to render PDFs from file uploads in most modern browsers

## Getting started

First of all you'll need [Vue.js](https://vuejs.org/)

You'll then need to install the package via npm

```bash
npm install vue-pdf-renderer
```

Import the component wherever you need it

```javascript
import PdfRenderer from 'vue-pdf-renderer';

export default {
  name: "HelloFile",

  components: {
    PdfRenderer
  },
  ...
```

The component only has one ```file``` prop. The following component uses a file input to update the pdf we're rendering on change. I'm not doing any validation but this will only work with PDFs. 

```js
<template>
  <div>
    <input type="file" @change="fileChange" />
    <div class="fifty">
      <pdf-renderer :file="file" />
    </div>
  </div>
</template>

<script>
import PdfRenderer from "vue-pdf-renderer";

export default {
  name: "HelloFile",

  components: {
    PdfRenderer
  },

  data() {
    return {
      file: null
    };
  },

  methods: {
    fileChange(event) {
      this.file = event.target.files[0];
    }
  }
};
</script>

<style scoped>
.fifty {
  height: 50vh;
}
</style>
```

## Caveats

- I haven't tested this with massive files.
- Not all PDFs may have the proper format to be displayed in the renderer.
- A web worker is inlined and handles the parsing of the file off of the main thread. I haven't encountered any issues but I imagine some could come up. Please open an issue if you do have a problem!
