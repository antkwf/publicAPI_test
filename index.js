import express from "express";
import axios from "axios";
import path from "path";
import {fileURLToPath} from "url";
import {json} from "stream/consumers";

const port = 2000;
const sPath = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const APIkey = "3222cc6774365d540bd6fc0cfd548eef";
const API_base = "https://api.openweathermap.org/data/2.5/";

app.set("view engine", "ejs");
app.set("views", path.join(sPath, "resources"));

app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.render("index", {
    content: "site testing",
  });
});

app.post("/weather", async (req, res) => {
  try {
    const response = await axios.get(`${API_base}weather`, {
      params: {
        lat: req.body.userLat,
        lon: req.body.userLon,
        appid: APIkey,
        units: "metric",
      },
    });

    console.log(response);
    res.render("index", {
      content: response.data.main.temp,
    });
  } catch (err) {
    res.render("index", {
      content: err.message,
    });
  }
});

app.listen(port, (res, req) => {
  console.log("port 2000 connected...");
});
