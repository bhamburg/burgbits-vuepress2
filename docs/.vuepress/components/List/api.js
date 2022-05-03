import Parse from 'parse/dist/parse.min.js';

Parse.initialize(import.meta.env.VITE_APP_ID, import.meta.env.VITE_JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";

export default async function parseList(listType) {
  const List = Parse.Object.extend(listType);
  const query = new Parse.Query(List);
  query.limit(9999);
  return await query.find();
};
