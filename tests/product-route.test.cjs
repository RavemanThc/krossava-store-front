/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../src/lib/product-route.ts');
const loaded = new Module(filename, module);
loaded._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, filename);
const {productPath,productIdFromSlug}=loaded.exports;
const id='6ac593666831bfc4f4187181';
test('canonical product URL includes name and stable id',()=>{
 assert.equal(productPath({id,name:'Nike Air Max / 90!'}),`/sneakers/nike-air-max-90-${id}`);
 assert.equal(productPath({id,title:'Nike Air Max'}),`/sneakers/nike-air-max-${id}`);
 assert.equal(productIdFromSlug([`nike-air-max-${id}`]),id);
 assert.equal(productIdFromSlug([id]),id);
});
test('Unicode names round-trip and renaming preserves identity',()=>{
 const first=productPath({id,name:'Кросівки білі'});
 assert.equal(productIdFromSlug([decodeURIComponent(first.split('/').at(-1))]),id);
 assert.notEqual(first,productPath({id,name:'Кросівки чорні'}));
 assert.equal(productPath({id,name:'!!!'}),`/sneakers/product-${id}`);
});
test('invalid or extra path segments are rejected',()=>{
 for(const slug of [[],['unknown'],[id,'extra'],['nike',id],['not-an-id-123']]) {
  assert.equal(productIdFromSlug(slug),null);
 }
});
