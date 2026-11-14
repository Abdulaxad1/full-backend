const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./db");
require("./models");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "<h1>Lid CRM backend ishlayapti! (PostgreSQL)</h1><p>Swagger hujjatlari uchun <a href='/api-docs'>/api-docs</a> ga o'ting.</p>",
  );
});

app.use("/role", require("./routes/roleRoute"));
app.use("/stuff", require("./routes/stuffRoute"));
app.use("/stuff-role", require("./routes/stuff_roleRoute"));
app.use("/stage", require("./routes/stageRoute"));
app.use("/branch", require("./routes/branchRoute"));
app.use("/lid-status", require("./routes/lid_statusRoute"));
app.use("/reason-lid", require("./routes/reason_lidRoute"));
app.use("/group", require("./routes/groupRoute"));
app.use("/group-stuff", require("./routes/group_stuffRoute"));
app.use("/lid", require("./routes/lidRoute"));
app.use("/student", require("./routes/studentRoute"));
app.use("/student-group", require("./routes/student_groupRoute"));
app.use("/lesson", require("./routes/lessonRoute"));
app.use("/student-lesson", require("./routes/student_lessonRoute"));
app.use("/payment", require("./routes/paymentRoute"));

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDocs = swaggerJsdoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: { title: "Lid CRM API (PostgreSQL)", version: "1.0.0" },
    servers: [{ url: "http://localhost:" + (process.env.PORT || 3000) }],
  },
  apis: ["./routes/*.js"],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL ulandi!");


    await sequelize.sync({ force: process.env.DB_FORCE_SYNC === "false" });
    console.log("Jadvallar sinxronlandi.");

    app.listen(PORT, () => {
      console.log(`Server http://localhost:${PORT} da ishlayapti`);
    });
  } catch (error) {
    console.error("Bazaga ulanishda xato:", error.message);
  }
}

start();

module.exports = app;
