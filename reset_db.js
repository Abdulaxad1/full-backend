// Yagona skript: bazani qayta yaratadi va loyihani tekshiradi.
// Ishlatish (loyiha papkasida):  npm run reset-db
// DIQQAT: lid_db dagi barcha ma'lumotlar o'chadi. Avval serverni (npm run dev) to'xtating.
// psql kerak emas.


const path = require("path");
const fs = require("fs");
const net = require("net");
const { Client } = require("pg");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const DB_NAME = process.env.DB_NAME;
const conn = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

// Jadvallar yaratish SQL'i (avval schema.sql fayli edi)
const SCHEMA_SQL = `
-- =========================================
--  Lid CRM: PostgreSQL schema (diagrammadan)
--  DIQQAT: quyidagi jadvallar avval o'chiriladi (DROP), keyin qayta yaratiladi
-- =========================================

DROP TABLE IF EXISTS payment CASCADE;
DROP TABLE IF EXISTS student_lesson CASCADE;
DROP TABLE IF EXISTS lesson CASCADE;
DROP TABLE IF EXISTS student_group CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS lid CASCADE;
DROP TABLE IF EXISTS group_stuff CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS reason_lid CASCADE;
DROP TABLE IF EXISTS lid_status CASCADE;
DROP TABLE IF EXISTS branch CASCADE;
DROP TABLE IF EXISTS stage CASCADE;
DROP TABLE IF EXISTS stuff_role CASCADE;
DROP TABLE IF EXISTS stuff CASCADE;
DROP TABLE IF EXISTS role CASCADE;

-- Rol
CREATE TABLE role (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Xodim
CREATE TABLE stuff (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    phone_number VARCHAR(255),
    login VARCHAR(255) NOT NULL UNIQUE,
    parol VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Xodim roli
CREATE TABLE stuff_role (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    stuff_id BIGINT NOT NULL REFERENCES stuff(id) ON DELETE CASCADE ON UPDATE CASCADE,
    role_id INTEGER NOT NULL REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (stuff_id, role_id)
);
CREATE INDEX idx_stuff_role_stuff_id ON stuff_role(stuff_id);
CREATE INDEX idx_stuff_role_role_id ON stuff_role(role_id);

-- Bosqich
CREATE TABLE stage (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Filial
CREATE TABLE branch (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    call_number VARCHAR(255)
);

-- Lid holati
CREATE TABLE lid_status (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    status VARCHAR(255) NOT NULL
);

-- Sabab
CREATE TABLE reason_lid (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    reason_lid VARCHAR(255) NOT NULL
);

-- Guruh
CREATE TABLE groups (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL,
    lesson_start_time VARCHAR(255),
    lesson_continuous VARCHAR(255),
    lesson_week_day VARCHAR(255),
    group_stage_id INTEGER REFERENCES stage(id) ON DELETE SET NULL ON UPDATE CASCADE,
    room_number VARCHAR(255),
    room_floor INTEGER,
    branch_id INTEGER REFERENCES branch(id) ON DELETE SET NULL ON UPDATE CASCADE,
    lessons_quant INTEGER,
    is_active BOOLEAN DEFAULT TRUE
);
CREATE INDEX idx_groups_group_stage_id ON groups(group_stage_id);
CREATE INDEX idx_groups_branch_id ON groups(branch_id);

-- Guruh xodimi
CREATE TABLE group_stuff (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE,
    stuff_id BIGINT NOT NULL REFERENCES stuff(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (group_id, stuff_id)
);
CREATE INDEX idx_group_stuff_group_id ON group_stuff(group_id);
CREATE INDEX idx_group_stuff_stuff_id ON group_stuff(stuff_id);

-- Lid
CREATE TABLE lid (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    phone_number VARCHAR(255),
    lid_stage_id INTEGER REFERENCES stage(id) ON DELETE SET NULL ON UPDATE CASCADE,
    test_date DATE,
    trial_lesson_date INTEGER,
    trial_lesson_time VARCHAR(255),
    trial_lesson_group_id INTEGER REFERENCES groups(id) ON DELETE SET NULL ON UPDATE CASCADE,
    lid_status_id INTEGER REFERENCES lid_status(id) ON DELETE SET NULL ON UPDATE CASCADE,
    cancel_reson_id INTEGER REFERENCES reason_lid(id) ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX idx_lid_lid_stage_id ON lid(lid_stage_id);
CREATE INDEX idx_lid_trial_lesson_group_id ON lid(trial_lesson_group_id);
CREATE INDEX idx_lid_lid_status_id ON lid(lid_status_id);
CREATE INDEX idx_lid_cancel_reson_id ON lid(cancel_reson_id);

-- O'quvchi
CREATE TABLE students (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lid_id INTEGER REFERENCES lid(id) ON DELETE SET NULL ON UPDATE CASCADE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    phone_number VARCHAR(255),
    birthday DATE,
    gender VARCHAR(255)
);
CREATE INDEX idx_students_lid_id ON students(lid_id);

-- O'quvchi guruhi
CREATE TABLE student_group (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
    group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (student_id, group_id)
);
CREATE INDEX idx_student_group_student_id ON student_group(student_id);
CREATE INDEX idx_student_group_group_id ON student_group(group_id);

-- Dars
CREATE TABLE lesson (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lesson_theme VARCHAR(255),
    lesson_number INTEGER,
    group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE,
    lesson_date DATE
);
CREATE INDEX idx_lesson_group_id ON lesson(group_id);

-- Davomat
CREATE TABLE student_lesson (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lesson_id INTEGER NOT NULL REFERENCES lesson(id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_there BOOLEAN DEFAULT FALSE,
    reason VARCHAR(255),
    be_paid BOOLEAN DEFAULT FALSE,
    UNIQUE (lesson_id, student_id)
);
CREATE INDEX idx_student_lesson_lesson_id ON student_lesson(lesson_id);
CREATE INDEX idx_student_lesson_student_id ON student_lesson(student_id);

-- To'lov
CREATE TABLE payment (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
    payment_last_date DATE,
    payment_date DATE,
    price NUMERIC(12,2),
    is_paid BOOLEAN DEFAULT FALSE,
    total_attent INTEGER
);
CREATE INDEX idx_payment_student_id ON payment(student_id);
`;

async function resetDatabase() {
  if (!DB_NAME) throw new Error(".env faylida DB_NAME yo'q");

  // 1) "postgres" bazasiga ulanib, lid_db ni qayta yaratamiz
  const admin = new Client({ ...conn, database: "postgres" });
  await admin.connect();
  try {
    await admin.query(
      "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid()",
      [DB_NAME],
    );
    await admin.query(`DROP DATABASE IF EXISTS "${DB_NAME}"`);
    await admin.query(`CREATE DATABASE "${DB_NAME}"`);
    console.log(`"${DB_NAME}" bazasi qayta yaratildi.`);
  } finally {
    await admin.end();
  }

  // 2) Jadvallarni yaratish (SQL shu faylning ichida)
  const db = new Client({ ...conn, database: DB_NAME });
  await db.connect();
  try {
    await db.query(SCHEMA_SQL);
    console.log("Jadvallar yaratildi.");
  } finally {
    await db.end();
  }

  // 3) Natija: jadvallar sonini tekshirish
  const check = new Client({ ...conn, database: DB_NAME });
  await check.connect();
  try {
    const r = await check.query(
      "SELECT count(*)::int AS n FROM information_schema.tables WHERE table_schema = 'public'",
    );
    console.log(`Jadvallar soni: ${r.rows[0].n}`);
  } finally {
    await check.end();
  }
}

// ---------- Tekshiruv ----------



const ROOT = __dirname;
const EXPECTED_TABLES = [
  "role", "stuff", "stuff_role", "stage", "branch", "lid_status", "reason_lid",
  "groups", "group_stuff", "lid", "students", "student_group", "lesson",
  "student_lesson", "payment",
];
const EXPECTED_FK_COUNT = 17;

const summary = { ok: 0, fail: 0, warn: 0, skip: 0 };
const failures = [];
const TAGS = {
  ok: "[OK]            ",
  fail: "[XATO]          ",
  warn: "[OGOHLANTIRISH] ",
  skip: "[O'TKAZILDI]    ",
};

function report(status, title, hint) {
  summary[status]++;
  console.log(`${TAGS[status]}${title}`);
  if (hint) console.log(`                   ${hint}`);
  if (status === "fail") failures.push(title);
}

function checkPort(host, port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port });
    socket.setTimeout(3000);
    socket.on("connect", () => { socket.destroy(); resolve(true); });
    socket.on("timeout", () => { socket.destroy(); resolve(false); });
    socket.on("error", () => resolve(false));
  });
}

async function httpStatus(url, options = {}) {
  try {
    const res = await fetch(url, { ...options, signal: AbortSignal.timeout(3000) });
    return res.status;
  } catch {
    return null;
  }
}

async function runChecks() {
  console.log("=== lid_postgres tekshiruvi ===\n");

  // 1) Node.js versiyasi
  const nodeMajor = Number(process.versions.node.split(".")[0]);
  if (nodeMajor >= 18) {
    report("ok", `Node.js versiyasi: ${process.versions.node}`);
  } else {
    report("fail", `Node.js versiyasi eski: ${process.versions.node}`,
      "Node.js 18 yoki undan yuqorisini o'rnating (nodejs.org).");
  }

  // 2) Fayl va papkalar
  const requiredPaths = [
    "package.json", "index.js", "db.js", ".env",
    "middlewares/ValidateSchema.js", "models/index.js", "models", "controllers", "routes", "validations",
  ];
  const missingPaths = requiredPaths.filter((p) => !fs.existsSync(path.join(ROOT, p)));
  if (missingPaths.length === 0) {
    report("ok", "Asosiy fayl va papkalar joyida");
  } else {
    report("fail", `Topilmadi: ${missingPaths.join(", ")}`,
      "Zip to'liq ochilganini va loyiha papkasida turganini tekshiring.");
  }

  const modelFiles = fs.existsSync(path.join(ROOT, "models"))
    ? fs.readdirSync(path.join(ROOT, "models")).filter((f) => f.endsWith(".js") && f !== "index.js")
    : [];
  if (modelFiles.length === 15) {
    report("ok", "15 ta model fayli bor");
  } else {
    report("fail", `Model fayllari ${modelFiles.length} ta (15 ta bo'lishi kerak)`);
  }

  // 3) Paketlar
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
  const hasNodeModules = fs.existsSync(path.join(ROOT, "node_modules"));
  if (!hasNodeModules) {
    report("fail", "node_modules papkasi yo'q", "Loyiha papkasida 'npm install' ni ishga tushiring.");
  } else {
    const notInstalled = deps.filter((d) => !fs.existsSync(path.join(ROOT, "node_modules", d, "package.json")));
    if (notInstalled.length === 0) {
      report("ok", `Paketlar o'rnatilgan (${deps.length} ta)`);
    } else {
      report("fail", `O'rnatilmagan paketlar: ${notInstalled.join(", ")}`, "'npm install' ni qayta ishga tushiring.");
    }
    try {
      require("bcrypt");
      report("ok", "bcrypt moduli yuklanadi (parol xeshlash ishlaydi)");
    } catch (e) {
      report("fail", "bcrypt moduli yuklanmadi",
        `Xato: ${e.message.split("\n")[0]}. 'npm install' ni qayta ishga tushiring.`);
    }
  }

  // 4) .env
  const envKeys = ["PORT", "DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD", "JWT_SECRET", "DB_FORCE_SYNC"];
  const emptyKeys = envKeys.filter((k) => !process.env[k]);
  if (emptyKeys.length === 0) {
    report("ok", ".env dagi barcha kalitlar to'ldirilgan");
  } else {
    report("fail", `.env da bo'sh yoki yo'q kalitlar: ${emptyKeys.join(", ")}`);
  }
  if (process.env.DB_FORCE_SYNC === "true") {
    report("warn", "DB_FORCE_SYNC=true: har ishga tushirishda jadvallar o'chib qayta yaratiladi",
      ".env da DB_FORCE_SYNC=false qiling.");
  }
  if (process.env.JWT_SECRET === "supersecretkey") {
    report("warn", "JWT_SECRET standart qiymatda", "Mahalliy ish uchun shart emas, lekin o'zgartirish tavsiya etiladi.");
  }

  // 5) PostgreSQL porti
  const dbHost = process.env.DB_HOST;
  const dbPort = Number(process.env.DB_PORT);
  const portOpen = await checkPort(dbHost, dbPort);
  if (portOpen) {
    report("ok", `PostgreSQL porti ochiq: ${dbHost}:${dbPort}`);
  } else {
    report("fail", `PostgreSQL ga ulanib bo'lmadi: ${dbHost}:${dbPort}`,
      "PostgreSQL xizmati ishlamayapti yoki port boshqa. Win+R -> services.msc -> 'postgresql' ni Start qiling.");
  }

  // 6) Ulanish va autentifikatsiya
  let client = null;
  if (portOpen) {
    const { Client } = require("pg");
    client = new Client({
      host: dbHost,
      port: dbPort,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    try {
      await client.connect();
      report("ok", `Ulanish muvaffaqiyatli: foydalanuvchi "${process.env.DB_USER}", baza "${process.env.DB_NAME}"`);
    } catch (e) {
      client = null;
      if (e.code === "28P01") {
        report("fail", "Parol noto'g'ri", ".env dagi DB_PASSWORD ni PostgreSQL parolingiz bilan bir xil qiling.");
      } else if (e.code === "3D000") {
        report("fail", `Baza topilmadi: ${process.env.DB_NAME}`,
          `Yarating: psql -U postgres -c "CREATE DATABASE ${process.env.DB_NAME};"  yoki pgAdmin orqali.`);
      } else if (e.code === "28000") {
        report("fail", `Foydalanuvchi topilmadi: ${process.env.DB_USER}`, ".env dagi DB_USER ni tekshiring.");
      } else {
        report("fail", "Bazaga ulanishda noma'lum xato", `${e.code || ""} ${e.message}`);
      }
    }
  } else {
    report("skip", "Ulanish, jadvallar va yozish tekshiruvi", "PostgreSQL ishlamagani uchun o'tkazib yuborildi.");
  }

  // 7-9) Jadvallar, bog'lanishlar, yozish huquqi
  if (client) {
    const tables = await client.query(
      "select table_name from information_schema.tables where table_schema = 'public'");
    const present = tables.rows.map((r) => r.table_name);
    const missingTables = EXPECTED_TABLES.filter((t) => !present.includes(t));
    if (missingTables.length === 0) {
      report("ok", "15 ta jadval bor");
    } else if (present.length === 0) {
      report("fail", "Bazada jadvallar yo'q",
        "Yechim: 'npm run reset-db' ni yuring.");
    } else {
      report("fail", `Yetishmayotgan jadvallar: ${missingTables.join(", ")}`,
        "'npm run reset-db' ni yuring.");
    }

    const fk = await client.query(
      "select count(*)::int as n from information_schema.table_constraints " +
      "where constraint_type = 'FOREIGN KEY' and table_schema = 'public'");
    if (fk.rows[0].n === EXPECTED_FK_COUNT) {
      report("ok", `Bog'lanishlar (FOREIGN KEY): ${fk.rows[0].n} ta`);
    } else {
      report("warn", `Bog'lanishlar soni ${fk.rows[0].n} (kutilgan: ${EXPECTED_FK_COUNT})`,
        "Jadvallar to'liq yaratilmagan bo'lishi mumkin.");
    }

    if (missingTables.length === 0) {
      try {
        await client.query("BEGIN");
        await client.query("UPDATE role SET name = name WHERE false");
        await client.query("ROLLBACK");
        report("ok", "Yozish huquqi bor (sinov: hech narsa o'zgartirilmadi)");
      } catch (e) {
        await client.query("ROLLBACK").catch(() => {});
        report("fail", "Yozishda xato", e.message);
      }
    } else {
      report("skip", "Yozish tekshiruvi", "Jadvallar to'liq emas.");
    }
    await client.end();
  } else if (portOpen) {
    report("skip", "Jadvallar, bog'lanishlar va yozish tekshiruvi", "Ulanish muvaffaqiyatsiz bo'lgani uchun o'tkazildi.");
  }

  // 10) Server (npm run dev ishlab turishi kerak)
  const port = process.env.PORT || 3000;
  const base = `http://localhost:${port}`;
  const rootStatus = await httpStatus(base + "/");
  if (rootStatus === 200) {
    report("ok", `Server ishlayapti: ${base}`);

    const docs = await httpStatus(base + "/api-docs/");
    if (docs === 200) {
      report("ok", `Swagger hujjatlari ochiladi: ${base}/api-docs`);
    } else {
      report("fail", `Swagger javobi: ${docs}`);
    }

    const reg = await httpStatus(base + "/stuff/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    if (reg === 400) {
      report("ok", "Validatsiya ishlayapti (bo'sh so'rov 400 qaytardi)");
    } else {
      report("fail", `Validatsiya kutilmagan javob berdi: ${reg}`);
    }

    const role = await httpStatus(base + "/role");
    if (role === 200) {
      report("ok", "API bazadan o'qiydi (GET /role)");
    } else {
      report("fail", `GET /role javobi: ${role}`, "Server bazaga ulanmagan bo'lishi mumkin.");
    }
  } else {
    report("skip", `Server ishlamayapti: ${base}`,
      "Server tekshiruvi uchun avval 'npm run dev' ni yoqing, so'ng 'npm run reset-db' ni yuring.");
  }

  // Natija
  console.log("\n=== Natija ===");
  console.log(`OK: ${summary.ok} | XATO: ${summary.fail} | OGOHLANTIRISH: ${summary.warn} | O'TKAZILDI: ${summary.skip}`);
  if (summary.fail === 0) {
    console.log("Tekshiruv muvaffaqiyatli yakunlandi.");
  } else {
    console.log("Avval quyidagi xatolarni tuzating:");
    failures.forEach((f) => console.log(`  - ${f}`));
  }
  return summary.fail ? 1 : 0;
}

async function main() {
  await resetDatabase();
  console.log("\n--- Tekshiruv ---\n");
  process.exitCode = await runChecks();
}

main().catch((e) => {
  console.error("XATO:", e.message);
  process.exitCode = 1;
});
