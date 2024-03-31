export const options = {
	"Access-Control-Allow-Origin": "http://localhost:3000",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

// NGリストを base64String にペーストして使用してください。
export function getNgList() {
	const base64String = `44K744OD44Kv44K5LOOCqOODrSzjg5Tjg7Pjgq/jg5Pjg4fjgqos44OM44O844OJ
	LOODkeODs+ODhCzkubPpppYs44Ki44OK44OrLOm7kuS6uizjgqLjgrjjgqLns7ss
	44OS44K544OR44OL44OD44KvLOOCuOOCp+ODs+ODgOODvCzjgrLjgqQs44Os44K6
	44OT44Ki44OzLOODiOODqeODs+OCueOCuOOCp+ODs+ODgOODvCzogbTopprpmpzl
	rrPogIUs57K+56We6Zqc5a6z6ICFLOiCpea6gCzmrrrjgZks5q665Lq6LOaatOWK
	myzjg6zjgqTjg5cs6Ieq5q66LOiHquWCtyzoh6rmrrrjgZnjgovmlrnms5Us54iG
	5by+LOODhuODreODquOCueODiCzjg5Djgqss6aas6bm/LOODhuODoeOCpyzjgq/j
	gros5q2744GtLOatuyzjgY/jgZ0s44GP44Gd44Gj44Gf44KMLOOCreODgeOCrOOC
	pCzjgq/jgr3jgqzjgq0s44K044OfLOOBhuOCk+OBkyzjgYrjgZfjgaPjgZMs44G1
	44KT44Gp44GXLOOBj+OBleOBhCzjgq/jgr0s44OQ44Kr44G/44Gf44GELOOChOOB
	oOOBqizjgq/jgr3jgb/jgZ/jgYQs44GG44GW44GELOODgOODoeOBoOOBqizjg57j
	grnjgr/jg7zjg5njg7zjgrfjg6fjg7Ms44Ki44OA44Or44OILOODjOODvOODieWG
	meecnyzjg53jg6vjg44s44OV44Kn44Op44OB44KqLOOCquODvOODqeODq+OCu+OD
	g+OCr+OCuSzmgKflmags5oCn6KGM54K6LOS4jeWAqyzlo7LmmKUs5oCn55qE5pq0
	6KGMLOeXtOa8oizmgKfnmoTmjIflkJEs5oCn55qELOOCr+ODquODiOODquOCuSzk
	ubHkuqQs44K744OD44Kv44K544GX44Gf44GELOaAp+eahOassuaxgizlsITnsr4s
	57K+5rayLOiEseihoyzoo7gs5oCn5Zmo6Zyy5Ye6LOaAp+S6pCzjg53jg6vjg47j
	grDjg6njg5XjgqPjg7ws5oCn5Lqk5riJLOauuuS6ug==
	`;

	const decodedData = Buffer.from(base64String, "base64").toString("utf8");
	return decodedData;
}
