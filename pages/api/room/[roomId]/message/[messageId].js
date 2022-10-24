import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const rooms = readDB();
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  if (req.method === "DELETE") {
    const roomIdIDX = rooms.findIndex((x) => x.roomId === roomId);
    if (roomIdIDX === -1)
      return res.status(404).json({
        ok: false,
        message: "Invalid room id",
      });
    const mess = rooms[roomIdIDX].messages;
    const messageIdIDX = mess.findIndex((x) => x.messageId === messageId);
    if (messageIdIDX === -1) {
      return res.status(404).json({
        ok: false,
        message: "Invalid message id",
      });
    } else {
      mess.splice(messageIdIDX, 1);
      writeDB(rooms);
      return res.json({ ok: true });
    }
  }
}
