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

  await db.run("DROP TABLE IF EXISTS timeslots");
  await db.run(
    "CREATE TABLE timeslots (assistantID TEXT, id TEXT PRIMARY KEY, time TEXT, status TEXT, bookedBy TEXT, reservedBy TEXT, FOREIGN KEY(assistantID) REFERENCES assistants(assistantID))"
  );
  // Lägger in en admin redan
  const statement1 = await db.prepare("INSERT INTO assistants VALUES (?,?)");
  statement1.run("vahid", "vahid");
  statement1.run("mikolaj", "mikolaj");
  statement1.finalize();

  const statement2 = await db.prepare(
    "INSERT INTO timeslots VALUES (?,?,?,?,?,?)"
  );
  statement2.run(
    "mikolaj",
    "mikolaj 2022-03-01 14:30",
    "2022-03-01 14:30",
    "available",
    "", 
    ""
  );
  statement2.run(
    "vahid",
    "vahid 2022-03-02 15:00",
    "2022-03-02 15:00",
    "available",
    "",
    ""
  );

  statement2.finalize();

  return db;
})();