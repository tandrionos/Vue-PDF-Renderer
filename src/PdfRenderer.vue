<template>
    <object class="full-width full-height" v-if="fileUrl !== null" :data="fileUrl" type="application/pdf">
        <embed v-if="pdfRenderingSupported" :src="fileUrl" type="application/pdf"/>
        <p v-else>
            <slot :saveOrOpenMs="saveOrOpenMs" :fileName="file.name">
                The PDF could not be displayed in your browser.&nbsp;
                Click <a @click="saveOrOpenMs" title="file.name">here</a> to save or open the document.
            </slot>
        </p>
    </object>
</template>

<script>
    import Bowser from 'bowser';
    import FileWorker from 'web-worker:./file-worker';

    export default {
        name: 'PdfRenderer',

        props: {
            // Client uploaded Files should validate along with blobs constructed from data
            // passed back from whatever API you use.
            // Ex: You get binary data from an API call and create a new Blob. This SHOULD render that
            file: {
                type: Object
            }
        },

        data() {
            return {
                fileUrl: null,
                pdfRenderingSupported: false,
                fileWorker: null
            };
        },

        mounted() {
            this.checkBrowserCapabilities();
            this.setUpWebWorker();
        },

        methods: {
            checkBrowserCapabilities() {
                const browser = Bowser.getParser(window.navigator.userAgent);
                const isUnsupportedBrowser = browser.satisfies({
                    windows: {
                        ie: '>10',
                        edge: '>=40'
                    }
                });
                this.pdfRenderingSupported = !isUnsupportedBrowser;
            },

            updateFileUrl(fileUrl) {
                this.fileUrl = fileUrl;
            },

            setUpWebWorker() {
                if (window.Worker) {
                    this.fileWorker = new FileWorker();
                    const updateUrl = this.updateFileUrl;

                    this.fileWorker.onmessage = function(event) {
                        if (event.data.error != null) {
                            throw new Error(event.data);
                        }
                        else {
                            updateUrl(event.data);
                        }
                    };
                }
            },

            readFileAsDataURL(file) {
                if (this.fileWorker != null) {
                    this.fileWorker.postMessage(file);
                }
                else if (file !== null) {
                    const readFile = f => {
                        return new Promise((resolve) => {
                            const fileReader = new FileReader();
                            fileReader.onload = () => resolve(fileReader.result);
                            fileReader.readAsDataURL(f);
                        });
                    };

                    readFile.then(result => {
                        this.fileUrl = result;
                    });
                }
            },

            saveOrOpenMs() {
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(this.file, this.file.name);
                }
            }
        },

        watch: {
            file: {
                handler(newFile) {
                    if (this.pdfRenderingSupported && newFile != null) {
                        this.$emit('beginRender');
                        this.readFileAsDataURL(newFile);
                    }
                },
                immediate: true
            },
            fileUrl() {
                this.$emit('urlChange');
            }
        }
    };
</script>

<style scoped>
    .full-width {
        width:100%;
    }
    .full-height {
        height:100%;
    }
</style>