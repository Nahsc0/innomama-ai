import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const f of ['index.html','styles.css','app.js','engine.js','data.js','feed.js'])await copyFile(f,'dist/'+f);
await cp('assets','dist/assets',{recursive:true});
await mkdir('dist/pipeline',{recursive:true});
for(const f of ['schema.js','snapshot.json'])await copyFile('pipeline/'+f,'dist/pipeline/'+f);
await mkdir('dist/research',{recursive:true});
await copyFile('research/NOTES.md','dist/research/NOTES.md');
console.log('Static app built in dist');
