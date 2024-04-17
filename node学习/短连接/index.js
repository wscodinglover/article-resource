import express from "express";
import knex from "knex";
import shortid from "shortid";

const db = knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "test",
  },
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/create_short_url", async (req, res) => {
  const { url } = req.body;
  const short_id = shortid.generate();
  // 生成短连接
  db("short")
    .insert({
      short_id,
      url,
    })
    .then(() => {
      res.send(`http://localhost:3000/${short_id}`);
    });
});

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/:short_id", async (req, res) => {
  const { short_id } = req.params;
  db("short")
    .select("url")
    .where({ short_id })
    .then((result) => {
      if (result && result.length > 0) {
        res.redirect(result[0].url);
      }
    });
});
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
