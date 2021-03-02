const fs = require('fs');

fs.readdir("./dist/datacapture/", (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    const bundles = {};
    const prefixes = ["runtime-es5", "polyfills-es5", "scripts" , "main-es5" , "styles"];
    files.forEach(file => {
        prefixes.forEach(prefix => {
            if (file.startsWith(prefix))
                bundles[prefix] = file;
        });
    });
    writeBundles(bundles);
})

writeBundles = function(bundles) {
    const text = JSON.stringify(bundles, null, '\t');
    fs.writeFile("./dist/datacapture/bundles.json", text, (err) => {
        if (err) console.log(err);
        console.log("Successfully written to json file.");
    });
}