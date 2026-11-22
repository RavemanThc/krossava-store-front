/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
function load(relative) {
 const filename=path.resolve(__dirname,relative);
 const loaded=new Module(filename,module);loaded.paths=module.paths;
 const original=loaded.require.bind(loaded);
 loaded.require=name=>name.startsWith('.')?load(path.relative(__dirname,path.resolve(path.dirname(filename),name+'.ts'))):original(name);
 loaded._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText,filename);
 return loaded.exports;
}
const {merchantFeed}=load('../src/lib/merchant-feed.ts');
const {orderCategories}=load('../src/lib/category-order.ts');
const product={id:'000000000000000000000001',name:'ASICS Test & White',brand:'Asics',category:'Термо',description:'<p>Шкіра &amp; текстиль</p>',price:2800,image:'https://example.com/shoe.jpg?a=1&b=2',sizes:[{size:'42',quantity:2},{size:'43',quantity:0}]};
test('feed keeps separate sizes, precise stock, brand and escaped XML',()=>{
 const xml=merchantFeed([product]);
 assert.equal((xml.match(/<item>/g)||[]).length,2);
 assert.match(xml,/<g:brand>Asics<\/g:brand>/);
 assert.match(xml,/<g:availability>out_of_stock<\/g:availability>/);
 assert.match(xml,/<g:price>2800.00 UAH<\/g:price>/);
 assert.match(xml,/\?size=42/);assert.match(xml,/&amp; White/);assert.match(xml,/a=1&amp;b=2/);
 assert.doesNotMatch(xml,/<g:(gtin|mpn|identifier_exists)>/);
 assert.doesNotMatch(xml,/<p>/);assert.match(xml,/Шкіра &amp; текстиль/);assert.doesNotMatch(xml,/&amp;amp;/);
});
test('feed refuses empty, invalid or duplicate data rather than publishing partial catalogue',()=>{
 assert.throws(()=>merchantFeed([]));
 assert.throws(()=>merchantFeed([{...product,price:0}]));
 assert.throws(()=>merchantFeed([product,product]));
 assert.throws(()=>merchantFeed([{...product,image:'javascript:alert(1)'}]));
});
test('seasonal categories precede brands without changing their actual filter values',()=>{
 const source=['Nike','❄️Зима❄️','Asics','Термо '];
 assert.deepEqual(orderCategories(source),['Термо ','❄️Зима❄️','Nike','Asics']);
 assert.equal(source[0],'Nike');
});
