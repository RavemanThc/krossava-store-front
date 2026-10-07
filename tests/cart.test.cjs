/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const sanitizeHtml = require('sanitize-html');
const storage = new Map();
Object.defineProperty(globalThis, 'localStorage', {configurable:true, value:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)}});
globalThis.window = {localStorage:globalThis.localStorage};
const filename = path.resolve(__dirname, '../src/store/cart.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const cartModule = new Module(filename,module);
cartModule.filename=filename;
cartModule.paths=Module._nodeModulePaths(path.dirname(filename));
cartModule._compile(compiled,filename);
const {useCart}=cartModule.exports;
const shoe=id=>({id,name:id,image:'/test.jpg',sizes:[{size:'42',quantity:2},{size:'43',quantity:0}]});
test('different products stay separate and stock limits all increments',()=>{
  const a=shoe('a'),b=shoe('b');
  useCart.getState().clearCart();
  assert.equal(useCart.getState().addToCart({sneaker:a,size:'42',quantity:1}),true);
  useCart.getState().addToCart({sneaker:b,size:'42',quantity:1});
  assert.equal(useCart.getState().items.length,2);
  useCart.getState().addQuantity('a','42');
  useCart.getState().addQuantity('a','42');
  assert.equal(useCart.getState().items[0].quantity,2);
  assert.equal(useCart.getState().addToCart({sneaker:a,size:'42',quantity:1}),false);
  assert.equal(useCart.getState().addToCart({sneaker:a,size:'43',quantity:1}),false);
  assert.equal(useCart.getState().addToCart({sneaker:shoe(''),size:'42',quantity:1}),false);
});
test('old cart ids are recovered and quantities clamped',()=>{
 const migrate=useCart.persist.getOptions().migrate;
 const result=migrate({items:[{sneaker:{...shoe(undefined),_id:'legacy'},size:'42',quantity:99},{sneaker:shoe(undefined),size:'42',quantity:1}]});
 assert.equal(result.items.length,1); assert.equal(result.items[0].sneaker.id,'legacy'); assert.equal(result.items[0].quantity,2);
});
test('description sanitizer keeps formatting and removes active content',()=>{
 const html=sanitizeHtml('<p><strong>Товар</strong><img src=x onerror="alert(1)"><script>alert(1)</script><a href="javascript:alert(1)">link</a></p>');
 assert.match(html,/<strong>Товар<\/strong>/);
 assert.doesNotMatch(html,/onerror|javascript:|<script|<img/);
 const json=JSON.stringify({description:'</script><script>alert(1)</script>'}).replace(/</g,'\\u003c');
 assert.doesNotMatch(json,/<\/script>/);
});
