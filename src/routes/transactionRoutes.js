const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { add, getAll, summary, update, remove } = require("../controllers/transactionController");
router.get("/summary", auth, summary);

router.post("/", auth, role("create"), add);
router.get("/", auth, role("read"), getAll);
router.get("/summary", auth, role("summary"), summary);

router.put("/:id", auth, role("update"), update);
router.delete("/:id", auth, role("delete"), remove);

module.exports = router;