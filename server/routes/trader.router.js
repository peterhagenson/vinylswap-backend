const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const query1 = `SELECT * FROM "album" WHERE "album".user_id = $1;`;

  pool.query(query1, [req.params.id]).then((result) => {
    // console.log(result.rows[0].array_agg)
    console.log(result.rows);
    let albums = result.rows;

    const query2 = `SELECT * from "user" WHERE id = $1;`;
    pool
      .query(query2, [req.params.id])
      .then((result) => {
        // console.log(result.rows[0].array_agg)
        console.log(result.rows);
        let profile = result.rows;
        let traderInfo = {
          albums: albums,
          profile: profile[0],
        };
        res.send(traderInfo);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  });
  // GET route code here
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
