const constants = {};

constants.DATA_DIR = "../data";
constants.RAW_DIR = constants.DATA_DIR + "/raw";
constants.DATASET_DIR = constants.DATA_DIR + "/dataset";
constants.JSON_DIR = constants.DATASET_DIR + "/json";
constants.IMG_DIR = constants.DATASET_DIR + "/img";
constants.SAMPLES = constants.DATASET_DIR + "/samples.json";

    // This line imports the Node.js core module fs, which provides functions for interacting with the file system.
    const fs = require("fs");
    // The readdirSync() function is used to synchronously read the contents of a directory specified by constants.RAW_DIR. It returns an array of file names present in the directory.
    const fileNames = fs.readdirSync(constants.RAW_DIR);
    const samples = [];
    let id = 1;
    // the code inside the loop reads the contents of the file and The readFileSync() function is used to synchronously read the contents of the file specified by constants.RAW_DIR + "/" + fn. It returns the content of the file as a Buffer or string, depending on the encoding.
    //  asynchronous alternatives like fs.readdir() and fs.readFile() are often preferred for better performance, especially in production environments.
    fileNames.forEach(fn=>{
        const content = fs.readFileSync(constants.RAW_DIR+"/"+fn) ;
    });
