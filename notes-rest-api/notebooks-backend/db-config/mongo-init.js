const notebooksDb = process.env.NOTEBOOKS_DB;
const notebooksUser = process.env.NOTEBOOKS_USER;
const notebooksPassword = process.env.NOTEBOOKS_PASSWORD;
console.log('initializing the notebooks db');
db = db.getSiblingDB(notebooksDb);
db.createUser({
  user: notebooksUser,
  pwd: notebooksPassword,
  roles: [
    {
      role: 'readWrite',
      db: notebooksDb,
    },
  ],
});
