import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

sqlite3.verbose();

const databasePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "db.sqlite"
);

// Open and initialize the database
export default await (async () => {
  const db = await open({
    filename: databasePath,
    driver: sqlite3.Database,
  });
  // Skapar upp datan som ska visas sen i tasks

  await db.run("DROP TABLE IF EXISTS assistants");
  await db.run("CREATE TABLE assistants (assistantID TEXT PRIMARY KEY, password TEXT NOT NULL)");

  await db.run("DROP TABLE IF EXISTS timeSlots");
  await db.run(
    "CREATE TABLE timeSlots (assistantID TEXT, id TEXT PRIMARY KEY, time TEXT, status TEXT, bookedBy TEXT, reservedBy TEXT, FOREIGN KEY(assistantID) REFERENCES assistants(assistantID))"
  );
  // Lägger in en admin redan
  const statement1 = await db.prepare("INSERT INTO assistants VALUES (?,?)");
  statement1.run("vahid", "vahid");
  statement1.run("mikolaj", "mikolaj");
  statement1.finalize();

  const statement2 = await db.prepare(
    "INSERT INTO timeSlots VALUES (?,?,?,?,?,?)"
  );
  statement2.run(
    "mikolaj",
    "mikolaj 1a mars 14:30",
    "1a mars 14:30",
    "available",
    "", 
    ""
  );
  statement2.run(
    "vahid",
    "vahid 2a mars 15:00",
    "2a mars 15:00",
    "available",
    "",
    ""
  );

  statement2.finalize();

  return db;
})();