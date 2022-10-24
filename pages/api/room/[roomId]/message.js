import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const id = req.query.roomId;
    const roomIdIDX = rooms.findIndex((x) => x.roomId === id);

    if (roomIdIDX === -1)
      return res.status(404).json({
        ok: false,
        message: "Invalid room id",
      });
    const messages = rooms[roomIdIDX].messages;
    return res.json({
      ok: true,
      messages,
    });
  } else if (req.method === "POST") {
    const rooms = readDB();
    const id = req.query.roomId;
    const roomIdIDX = rooms.findIndex((x) => x.roomId === id);
    //read request body
    const text = req.body.text;
    //create new id
    const newId = uuidv4();
    if (roomIdIDX === -1)
      return res.status(404).json({
        ok: false,
        message: "Invalid room id",
      });
    if (typeof text !== "string") {
      return res.status(400).json({ ok: false, message: "Invalid text input" });
    } else {
      const newtext = {
        messageId: newId,
        text: text,
      };
      writeDB(rooms);
      return res.json({ ok: true, message: newtext });
    }
  }
}
