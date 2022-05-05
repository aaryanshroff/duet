import * as express from "express";

import routes from "./routes";

import { configurePassport } from "./middlewares/passport-strategies.mw";
import * as path from "path";

const app = express();

const port = process.env.PORT || 4001;

// Middleware
configurePassport(app);

app.use(express.json());

app.use(routes);
app.use(express.static("public"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
