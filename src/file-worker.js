

onmessage = function(event) {
    // the file is expected to be the one and only thing in the payload
    let file = event.data;

    if (file != null && file instanceof Blob) {
        const readFile = f => {
            return new Promise((resolve) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result);
                fileReader.readAsDataURL(f);
            });
        };

        try {
            readFile(file).then(result => {
                postMessage(result);
            });
            
        }
        catch (error) {
            postMessage({ error: 'There was an error reading the file' });
        }
    }
};