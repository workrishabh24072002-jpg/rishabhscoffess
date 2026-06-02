const DOMAIN='rishabhscoffee.myshopify.com';
const TOKEN='894827c544e3458fd0ca049c6fa786f9';
const API=`https://${DOMAIN}/api/2024-01/graphql.json`;

async function shopifyFetch(query,vars={}){
  const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json','X-Shopify-Storefront-Access-Token':TOKEN},body:JSON.stringify({query,variables:vars})});
  const j=await r.json();
  if(j.errors)console.warn('Shopify:',j.errors);
  return j.data;
}

async function getCart(){
  const id=localStorage.getItem('rc_cart');
  if(!id)return null;
  const q=`query($id:ID!){cart(id:$id){id checkoutUrl lines(first:50){edges{node{id quantity cost{totalAmount{amount currencyCode}} merchandise{...on ProductVariant{id title price{amount currencyCode} product{title handle featuredImage{url}}}}}}} cost{subtotalAmount{amount currencyCode}}}}`;
  const d=await shopifyFetch(q,{id});
  return d?.cart||null;
}

async function addToCart(variantId,qty=1){
  const cartId=localStorage.getItem('rc_cart');
  if(!cartId){
    const q=`mutation($input:CartInput!){cartCreate(input:$input){cart{id checkoutUrl}userErrors{message}}}`;
    const d=await shopifyFetch(q,{input:{lines:[{merchandiseId:variantId,quantity:qty}]}});
    const cart=d?.cartCreate?.cart;
    if(cart){localStorage.setItem('rc_cart',cart.id);localStorage.setItem('rc_checkout',cart.checkoutUrl);}
    return cart;
  }
  const q=`mutation($cartId:ID!,$lines:[CartLineInput!]!){cartLinesAdd(cartId:$cartId,lines:$lines){cart{id checkoutUrl lines(first:50){edges{node{id quantity merchandise{...on ProductVariant{id}}}}}} userErrors{message}}}`;
  const d=await shopifyFetch(q,{cartId,lines:[{merchandiseId:variantId,quantity:qty}]});
  const cart=d?.cartLinesAdd?.cart;
  if(cart){localStorage.setItem('rc_cart',cart.id);localStorage.setItem('rc_checkout',cart.checkoutUrl);}
  return cart;
}

async function updateLine(lineId,qty){
  const cartId=localStorage.getItem('rc_cart');
  if(!cartId)return null;
  const q=`mutation($cartId:ID!,$lines:[CartLineUpdateInput!]!){cartLinesUpdate(cartId:$cartId,lines:$lines){cart{id checkoutUrl lines(first:50){edges{node{id quantity cost{totalAmount{amount currencyCode}} merchandise{...on ProductVariant{id title price{amount currencyCode} product{title handle featuredImage{url}}}}}}} cost{subtotalAmount{amount currencyCode}}}userErrors{message}}}`;
  const d=await shopifyFetch(q,{cartId,lines:[{id:lineId,quantity:qty}]});
  return d?.cartLinesUpdate?.cart||null;
}

async function removeLine(lineId){
  const cartId=localStorage.getItem('rc_cart');
  if(!cartId)return null;
  const q=`mutation($cartId:ID!,$lineIds:[ID!]!){cartLinesRemove(cartId:$cartId,lineIds:$lineIds){cart{id checkoutUrl lines(first:50){edges{node{id quantity cost{totalAmount{amount currencyCode}} merchandise{...on ProductVariant{id title price{amount currencyCode} product{title handle featuredImage{url}}}}}}} cost{subtotalAmount{amount currencyCode}}}userErrors{message}}}`;
  const d=await shopifyFetch(q,{cartId,lineIds:[lineId]});
  return d?.cartLinesRemove?.cart||null;
}

function setCartCount(n){
  document.querySelectorAll('.cart-badge').forEach(el=>{el.textContent=n;el.style.display=n>0?'flex':'none'});
}

async function refreshCount(){
  const c=await getCart();
  if(!c){setCartCount(0);return;}
  setCartCount(c.lines.edges.reduce((s,e)=>s+e.node.quantity,0));
}

function initNav(){
  const h=document.getElementById('hamburger');
  const m=document.getElementById('mobile-nav');
  const x=document.getElementById('mobile-close');
  if(h&&m){h.addEventListener('click',()=>m.classList.add('open'));x?.addEventListener('click',()=>m.classList.remove('open'));m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')});}
  const ab=document.getElementById('announce');
  const ac=document.getElementById('announce-close');
  if(ac&&ab)ac.addEventListener('click',()=>{ab.style.display='none';const nav=document.querySelector('.nav');if(nav)nav.style.top='0'});
}

document.addEventListener('DOMContentLoaded',()=>{
  initNav();
  refreshCount();
  if(typeof Lenis!=='undefined'){const l=new Lenis({duration:1.2});const r=t=>{l.raf(t);requestAnimationFrame(r)};requestAnimationFrame(r);}
});

window.shopifyFetch=shopifyFetch;
window.getCart=getCart;
window.addToCart=addToCart;
window.updateLine=updateLine;
window.removeLine=removeLine;
window.setCartCount=setCartCount;
window.refreshCount=refreshCount;
