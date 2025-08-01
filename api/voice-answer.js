export default function handler(req, res) {
    const query = req.query;
    const vonageNumber = "12012750661";

    // if (query.endpoint_type === "app") {
    //     console.log("NCCO request:");
    //     console.log(`  - callee: ${query.to}`);
    //     console.log("---");

    //     res.status(200).json([
    //         {
    //             action: "talk",
    //             text: "Please wait while we connect you.",
    //         },
    //         {
    //             action: "connect",
    //             from: vonageNumber,
    //             endpoint: [{ type: "phone", number: query.to }],
    //         },
    //     ]);
    // } else {
        console.log("NCCO request:");
        console.log(`  - caller: ${query.from}`);
        console.dir(query);
        console.log("---");

        res.status(200).json([
            {
                action: "talk",
                text: "Please wait while we connect you.",
            },
            {
                action: "connect",
                from: query.from,
                endpoint: [{ type: "app", user: "alice" }],
            },
        ]);
    // }
}