const { sequelize } = require("../db");

const { Role } = require("./role");
const { Stuff } = require("./stuff");
const { StuffRole } = require("./stuff_role");
const { Stage } = require("./stage");
const { Branch } = require("./branch");
const { LidStatus } = require("./lid_status");
const { ReasonLid } = require("./reason_lid");
const { Group } = require("./group");
const { GroupStuff } = require("./group_stuff");
const { Lid } = require("./lid");
const { Student } = require("./student");
const { StudentGroup } = require("./student_group");
const { Lesson } = require("./lesson");
const { StudentLesson } = require("./student_lesson");
const { Payment } = require("./payment");

const db = {
  sequelize,
  Role,
  Stuff,
  StuffRole,
  Stage,
  Branch,
  LidStatus,
  ReasonLid,
  Group,
  GroupStuff,
  Lid,
  Student,
  StudentGroup,
  Lesson,
  StudentLesson,
  Payment,
};

// Assotsiatsiyalar har bir model faylining ichida (associate) aniqlangan.
Object.values(db).forEach((model) => {
  if (model && typeof model.associate === "function") {
    model.associate(db);
  }
});

module.exports = db;
