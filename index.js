"use strict";

const subdomain = "vonagepoc";
const vonageNumber = "12012750661";

const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/voice/answer", (req, res) => {
    if(req.query.endpoint_type == "app") {
        console.log("NCCO request:");
    console.log(`  - callee: ${req.query.to}`);
    console.log("---");
    console.dir(req);
    // console.dir(req.query);
    res.json([
        {
            action: "talk",
            text: "Please wait while we connect you.",
        },
        {
            action: "connect",
            from: vonageNumber,
            endpoint: [{ type: "phone", number: req.query.to }],
        },
    ]);
    }
    else {
        console.log("NCCO request:");
    console.log(`  - caller: ${req.query.from}`);
    console.dir(req.query);
    console.log("---");
    res.json([
        {
            action: "talk",
            text: "Please wait while we connect you.",
        },
        {
            action: "connect",
            from: req.query.from,
            endpoint: [{ type: "app", user: "alice" }],
        },
    ]);
    }
}

app.all("/voice/event", (req, res) => {
    console.log("EVENT:");
    console.dir(req.body);
    console.log("---");
    res.sendStatus(200);
});

app.get("/clear", (req, res) => {
    console.clear();
    res.send("Console cleared!");
});

if (vonageNumber == "NUMBER") {
    console.log("\n\t🚨🚨🚨 Please change the NUMBER value");
    return false;
}

if (subdomain == "SUBDOMAIN") {
    console.log("\n\t🚨🚨🚨 Please change the SUBDOMAIN value");
    return false;
}
// Add console clear functionality
process.on("SIGINT", () => {
    console.clear();
    console.log("\nConsole cleared. Press Ctrl+C again to exit.");
    setTimeout(() => {
        process.exit(0);
    }, 1000);
});

app.listen(3000);

const localtunnel = require("localtunnel");
(async () => {
    const tunnel = await localtunnel({
        subdomain: subdomain,
        port: 3000,
    });
    console.log(`App available at: ${tunnel.url}`);
})();
