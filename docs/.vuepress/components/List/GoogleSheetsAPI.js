//  Google Sheets API v4

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEETS_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;

export default async function parseSheet(sheet) {
    const query = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/${sheet}?key=${API_KEY}`;
    const response = await fetch(query);
    //  Use first row of sheet as keys for array of objects
    const data = await response.json();
    const reducedData = data.values.map(row => (
        row.reduce((obj, cur, i) => ({
            ...obj, [data.values[0][i]]: cur
        }), {})
    ));
    //  Remove header row
    reducedData.shift();
    return reducedData;
};
