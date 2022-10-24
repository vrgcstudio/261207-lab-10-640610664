import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();

    const { roomId } = req.query;
    const room = rooms.find((room) => room.roomId === roomId);
    if (room == undefined) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      return res.json({ ok: true, message: room.messages });
    }
  } else if (req.method === "POST") {
    const rooms = readDB();

    //read request body
    const text = req.body.text;

    const { roomId } = req.query;
    const room = rooms.find((room) => room.roomId === roomId);

    if (room == undefined) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else if (typeof text != "string") {
      return res.status(404).json({ ok: false, message: "Invalid text input" });
    } else {
      //create new id
      const newId = uuidv4();
      const message = {
        messageId: newId,
        text: text,
      };
      room.messages.push(message);
      writeDB(rooms);

      return res.json({ ok: true, message });
    }
  }
}
