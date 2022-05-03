import Parse from 'parse/dist/parse.min.js';

Parse.initialize('nXKjWFWz0noFDDV5kX101uKB4nImJyIDSjqoVPFG', 'TyfKd1IfKTYN6UZrQx9nDOU97maRlaNmt0ClVE85');
Parse.serverURL = "https://parseapi.back4app.com/";

export default async function parseList(listType) {
  const List = Parse.Object.extend(listType);
  const query = new Parse.Query(List);
  query.limit(9999);
  return await query.find();
};