import req from "express/lib/request";
import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Post to Jate database");

  // Create a connection to the database and the version we want to use
  const jateDb = await openDB("jate", 1);

  // Crete a new transaction and specify the database and priveleges
  const tx = jateDb.transaction("jate", "readwrite");

  // Open up the object store
  const store = tx.objectStore("jate");

  // Use .add() on the store to pass in content
  const request = store.add({ id: 1, value: content });

  // Get the request
  const result = await request;

  // Log the result to the console
  console.log("data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Get all content from JATE database");

  // Create a connection to database and version
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify database and priveleges
  const tx = jateDb.transaction("jate", "readonly");

  // Open the object store
  const store = tx.objectStore("jate");

  // Use .getAll to get all the content
  const request = store.getAll();

  //Get the request
  const result = await request;

  // Log the result to the console
  console.log("result.value", result);
};
initdb();
