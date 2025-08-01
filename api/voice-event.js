export default function handler(req, res) {
    console.log("EVENT:");
    console.dir(req.body);
    console.log("---");
    res.status(200).send("OK");
}