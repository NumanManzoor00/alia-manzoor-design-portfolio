import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'assets/data.js'),'utf8'),context);
const data=context.window.PORTFOLIO;
new vm.Script(fs.readFileSync(path.join(root,'assets/app.js'),'utf8'));
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'Duplicate HTML IDs');
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
 const value=match[1];if(value.startsWith('#'))assert.ok(ids.includes(value.slice(1)),`Missing anchor ${value}`);
 else if(!/^(https?:|mailto:)/.test(value))assert.ok(fs.existsSync(path.join(root,value)),`Missing asset ${value}`);
}
assert.equal(data.projects.length,5);assert.equal(data.process.length,5);assert.equal(data.education.length,4);
assert.ok(data.tools.includes('WordPress'));assert.ok(!data.tools.includes('Adobe XD'));
for(const project of data.projects)assert.ok(fs.existsSync(path.join(root,project.image)),`Missing project image ${project.id}`);
assert.ok(fs.readFileSync(path.join(root,'assets/Alia-Manzoor-CV.pdf')).subarray(0,4).toString()==='%PDF');
assert.ok(['email','netlify','endpoint'].includes(data.contact.mode));
assert.ok(html.includes('data-netlify="true"'));
console.log('PASS: JavaScript syntax, local assets, navigation anchors, unique IDs, content counts, CV PDF and contact form configuration.');
console.log('Static site ready in dist/. No dependencies or compilation required.');
