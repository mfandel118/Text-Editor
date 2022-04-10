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
export const putDB = async (content) => {
	console.log("PUT to database");

	const jateDB = await openDB("jate", 1);
	const tx = jateDB.transaction("jate", "readwrite");
	const store = tx.objectStore("jate");
	const req = store.put({ value: content });
	const res = await req;

	console.log("🚀 - data saved to the database", res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDB = async () => {
	console.log("GET from database");

	const jateDB = await openDB("jate", 1);
	const tx = jateDB.transaction("jate", "readonly");
	const store = tx.objectStore("jate");
	const req = store.getAll();
	const res = await req;

	console.log("res.value", res);

	return res;
};

initdb();
