/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../src/lib/catalog-route.ts');
const loaded = new Module(filename, module);
loaded._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, filename);
const {categoryPath, categorySlug, catalogPageHref, catalogPageNumber} = loaded.exports;
test('category names produce stable landing URLs',()=>{
 assert.equal(categoryPath('Nike'),'/sneakers/nike');
 assert.equal(categoryPath('New Balance'),'/sneakers/new-balance');
 assert.equal(decodeURIComponent(categoryPath('❄️Зима❄️')),'/sneakers/зима');
 assert.equal(categorySlug('  The North Face  '),'the-north-face');
});
test('pagination preserves category path and active filters',()=>{
 const href=catalogPageHref('/sneakers/nike','size=42&search=Air+Max&page=7',2);
 const url=new URL(href,'https://example.com');
 assert.equal(url.pathname,'/sneakers/nike');
 assert.equal(url.searchParams.get('size'),'42');
 assert.equal(url.searchParams.get('search'),'Air Max');
 assert.equal(url.searchParams.get('page'),'2');
 assert.equal(catalogPageHref('/sneakers/nike','page=2',1),'/sneakers/nike');
});
test('invalid page numbers do not reach API as NaN or negative values',()=>{
 for(const value of ['-1','abc','0','1.5','Infinity']) assert.equal(catalogPageNumber(value),1);
 assert.equal(catalogPageNumber('2'),2);
});
test('sitemap includes category pages and every cursor page of products',async()=>{
 const sitemapFile=path.resolve(__dirname,'../app/sitemap.ts');
 const sitemapModule=new Module(sitemapFile,module);
 const seen=[];
 sitemapModule.require=(name)=>{
  if(name==='@/src/lib/catalog-route') return loaded.exports;
  if(name==='@/src/lib/product-route') return {productPath:p=>`/sneakers/${p.name.toLowerCase()}-${p.id}`};
  if(name==='@/src/lib/api') return {
   fetchCategories:async()=>['Nike','New Balance'],
   api:{get:async(_url,options)=>{seen.push(options.params);return {data: options.params.after
    ? {products:[{id:'2',name:'Second'}],nextCursor:null}
    : {products:[{id:'1',name:'First'}],nextCursor:'1'}};}},
  };
  throw new Error(`Unexpected import: ${name}`);
 };
 sitemapModule._compile(ts.transpileModule(fs.readFileSync(sitemapFile,'utf8'),{
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020},
 }).outputText,sitemapFile);
 const result=await sitemapModule.exports.default();
 const urls=result.map(row=>row.url);
 for(const suffix of ['/sneakers/nike','/sneakers/new-balance','/sneakers/first-1','/sneakers/second-2']) {
  assert.ok(urls.includes('https://krossava.com.ua'+suffix));
 }
 assert.deepEqual(seen,[{},{after:'1'}]);
});
