// Illustrative state reference points, not surveyed facility coordinates.
export const regions=[
['Adamawa','North East',9.21,12.48],['Bauchi','North East',10.31,9.84],['Benue','North Central',7.73,8.54],['Borno','North East',11.83,13.15],['Gombe','North East',10.28,11.17],['Jigawa','North West',11.76,9.34],['Kaduna','North West',10.52,7.44],['Kano','North West',12.00,8.52],['Katsina','North West',12.99,7.60],['Kebbi','North West',12.45,4.20],['Kogi','North Central',7.80,6.74],['Kwara','North Central',8.50,4.55],['Nasarawa','North Central',8.49,8.52],['Niger','North Central',9.61,6.56],['Plateau','North Central',9.90,8.86],['Sokoto','North West',13.06,5.24],['Taraba','North East',8.89,11.36],['Yobe','North East',11.75,11.96],['Zamfara','North West',12.16,6.66],['FCT','North Central',9.06,7.49]
].map(([name,zone,lat,lon])=>({name,zone,lat,lon}));
export const regionNames=regions.map(r=>r.name);
export const regionFor=f=>f.state||'Gombe';
