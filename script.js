/* AJR Beauty - script.js */
/* Lokasi gambar */
var IMG={logo:"images/logo.webp",foto1:"images/foto1.webp",foto2:"images/foto2.webp",foto3:"images/foto3.webp",hb:"images/hb.webp",day:"images/day.webp",night:"images/night.webp",toner:"images/toner.webp",soap:"images/soap.webp",serum:"images/serum.webp",paket:"images/paket.webp",wa1:"images/wa1.webp",wa2:"images/wa2.webp",wa3:"images/wa3.webp",shopee:"images/shopee.webp",wa4:"images/wa4.webp",tim:"images/tim.webp"};
(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var rp=function(n){return "Rp"+n.toLocaleString("id-ID")};

var ADMINS=[
  {id:"mhira",name:"Mhira",num:"6289647077559",show:"0896-4707-7559"},
  {id:"misba",name:"Misba Azka",num:"6283132668520",show:"0831-3266-8520"},
  {id:"arista",name:"Arista",num:"6282396311136",show:"0823-9631-1136"}
];

var PRODUCTS=[
 {id:"paket",name:"Paket Lengkap AJR Beauty",short:"Paket Lengkap",price:205000,cats:["paket"],wide:true,tag:"Paket",
  desc:"Satu paket untuk wajah dan badan: perawatan pagi, malam, dan handbody.",
  contents:["Campuran Handbody","Toner","Night Cream","Day Cream"],
  benefits:["Perawatan wajah pagi dan malam","Ditambah handbody untuk badan","Semua produk asli AJR Beauty"],
  use:"Ikuti urutan pada bagian Rutinitas pagi dan malam."},
 {id:"hb",name:"Campuran Handbody Super Whitening",short:"Handbody Super Whitening",price:85000,cats:["badan"],tag:"10x lebih cepat memutihkan",
  desc:"Handbody untuk kulit badan, tangan, dan kaki yang ingin tampak lebih cerah dan merata.",
  benefits:["Formula super whitening, sesuai tulisan pada kemasan","Untuk perawatan kulit badan, tangan, dan kaki","Kemasan baru berlabel AJR Beauty"],
  use:"Ikuti petunjuk pada kemasan dan lakukan uji tempel terlebih dulu."},
 {id:"day",name:"Day Cream 15 gr",short:"Day Cream",price:40000,cats:["wajah"],
  desc:"Krim siang untuk kulit cerah, lembut, dan sehat.",
  benefits:["Mencerahkan kulit","Melembapkan kulit","Melindungi dari paparan luar"],
  use:"Oleskan tipis pada wajah yang sudah bersih di pagi hari."},
 {id:"night",name:"Night Cream 15 gr",short:"Night Cream",price:40000,cats:["wajah"],
  desc:"Krim malam agar kulit tampak sehat dan bercahaya saat pagi.",
  benefits:["Melembapkan kulit","Bekerja saat malam hari","Menjaga kelembapan kulit"],
  use:"Oleskan pada wajah yang sudah bersih sebelum tidur."},
 {id:"toner",name:"Toner",short:"Toner",price:40000,cats:["wajah"],
  desc:"Toner untuk kulit bersih dan segar setiap hari.",
  benefits:["Membersihkan sisa kotoran","Menyegarkan kulit","Menjaga keseimbangan kulit"],
  use:"Bersihkan wajah, lalu usapkan dengan kapas. Pakai pagi dan malam."},
 {id:"soap",name:"Soap",short:"Soap",price:10000,cats:["wajah","badan"],
  desc:"Sabun batang AJR Beauty untuk pembersih harian.",
  benefits:["Pembersih harian","Kemasan praktis dan mudah dibawa"],
  use:"Gunakan saat mandi atau cuci muka, lalu bilas hingga bersih."},
 {id:"serum",name:"Face Serum Gold",short:"Face Serum Gold",price:44000,cats:["wajah"],
  desc:"Serum wajah dengan extra niacinamide dalam botol dropper.",
  benefits:["Extra niacinamide","Botol dropper, mudah diteteskan","Dipakai sebelum krim"],
  use:"Teteskan pada wajah bersih setelah toner, lalu lanjutkan dengan krim."}
];
var P={};PRODUCTS.forEach(function(p){P[p.id]=p});


/* toast */
var tt;function toast(m){var t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){t.classList.remove("on")},2200)}

/* ---------- woman illustration ---------- */
function star(x,y,s,d){return '<path class="w-tw" style="animation-delay:'+d+'s" d="M'+x+' '+(y-s)+' Q'+x+' '+y+' '+(x+s)+' '+y+' Q'+x+' '+y+' '+x+' '+(y+s)+' Q'+x+' '+y+' '+(x-s)+' '+y+' Q'+x+' '+y+' '+x+' '+(y-s)+'Z" fill="#E3B93C"/>'}
function jar(){return '<ellipse cy="24" rx="36" ry="13" fill="#2E0F63"/><rect x="-36" y="-6" width="72" height="30" rx="12" fill="#4A1D96"/><ellipse cy="-6" rx="36" ry="14" fill="#6D3BC7"/><ellipse cy="-7" rx="28" ry="10.500" fill="#fff"/><text y="-3" text-anchor="middle" font-size="11" font-weight="800" fill="#3B1275" font-family="Georgia,serif">AJR</text>'}
function bottle(){return '<rect x="-12" y="-60" width="24" height="15" rx="3" fill="#fff" stroke="#DCCDF6"/><rect x="-22" y="-46" width="44" height="86" rx="13" fill="#5B21B6"/><rect x="-22" y="-26" width="44" height="46" fill="#fff"/><text y="-3" text-anchor="middle" font-size="12" font-weight="800" fill="#3B1275" font-family="Georgia,serif">AJR</text><text y="10" text-anchor="middle" font-size="6.500" font-weight="700" fill="#3B1275" font-family="sans-serif">TONER</text><rect x="-16" y="-42" width="4" height="72" rx="2" fill="#fff" opacity=".25"/>'}
function woman(o){
  var id=o.id,skin="#F5D2B6",shade="#E9B994",d=o.dress,h=o.hijab,hd=o.hijabDark;
  var prod=o.product==="bottle"?bottle():jar();
  var scene="";
  if(o.scene==="day"){
    var rays="";for(var i=0;i<8;i++)rays+='<rect x="-2.500" y="-46" width="5" height="12" rx="2.500" fill="#F0B93A" transform="rotate('+(i*45)+')"/>';
    scene='<g transform="translate(72 92)"><g class="w-rays"><circle r="30" fill="#F7D774"/>'+rays+'</g><circle r="22" fill="#FBE7A1"/></g>';
  } else if(o.scene==="night"){
    scene='<path transform="translate(78 98)" d="M0 -32 A32 32 0 1 0 28 16 A25 25 0 1 1 0 -32Z" fill="#F4E2A9"/>'+star(300,70,9,0)+star(340,130,6,.8)+star(58,190,7,1.4)+star(150,40,6,.4);
  }
  var petals='<g class="w-petal"><path transform="translate(320 300) rotate(-30)" d="M0 0 C6 -8 16 -8 20 0 C14 8 6 8 0 0Z" fill="#B58BE8"/></g><g class="w-petal" style="animation-delay:-3s"><path transform="translate(46 330) rotate(20)" d="M0 0 C6 -8 16 -8 20 0 C14 8 6 8 0 0Z" fill="#CDB3F2"/></g><g class="w-petal" style="animation-delay:-5s"><path transform="translate(350 200) rotate(60)" d="M0 0 C5 -6 12 -6 15 0 C10 6 5 6 0 0Z" fill="#E8D9FA"/></g>';
  var eye=function(x){return o.eyes==="happy"
    ? '<path d="M'+(x-9)+' 180 Q'+x+' 169 '+(x+9)+' 180" fill="none" stroke="#2B1B17" stroke-width="3" stroke-linecap="round"/>'
    : '<g class="w-blink"><ellipse cx="'+x+'" cy="178" rx="8.500" ry="5.500" fill="#fff"/><circle cx="'+x+'" cy="178" r="4.300" fill="#4A3126"/><circle cx="'+(x+1.5)+'" cy="176.500" r="1.300" fill="#fff"/><path d="M'+(x-10)+' 176 Q'+x+' 167 '+(x+10)+' 176" fill="none" stroke="#1E1412" stroke-width="2.600" stroke-linecap="round"/></g>'};
  var arms;
  if(o.pose==="raise"){
    arms='<path d="M136 338 C118 392 116 442 126 486" stroke="'+d+'" stroke-width="38" stroke-linecap="round" fill="none"/><circle cx="128" cy="496" r="14" fill="'+skin+'"/>'
    +'<g class="w-wave" style="transform-origin:262px 338px"><path d="M262 338 C300 336 322 316 326 290" stroke="'+d+'" stroke-width="38" stroke-linecap="round" fill="none"/><ellipse cx="326" cy="282" rx="23" ry="14" fill="'+d+'"/><g transform="translate(322 212) scale(1.3)">'+prod+'</g><circle cx="324" cy="262" r="16" fill="'+skin+'"/><ellipse cx="300" cy="248" rx="6.500" ry="11" fill="'+skin+'" transform="rotate(-20 300 248)"/>'+star(376,180,9,.3)+'</g>';
  } else {
    arms='<g class="w-bob"><path d="M138 338 C112 392 128 424 172 404" stroke="'+d+'" stroke-width="38" stroke-linecap="round" fill="none"/><path d="M262 338 C288 392 272 424 228 404" stroke="'+d+'" stroke-width="38" stroke-linecap="round" fill="none"/><g transform="translate(200 372) scale(1.05)">'+prod+'</g><circle cx="172" cy="394" r="14" fill="'+skin+'"/><circle cx="228" cy="394" r="14" fill="'+skin+'"/>'+star(250,318,8,.3)+'</g>';
  }
  return '<svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs><radialGradient id="bg'+id+'" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="'+o.bg1+'"/><stop offset="1" stop-color="'+o.bg2+'"/></radialGradient></defs>'
  +'<circle cx="200" cy="260" r="190" fill="url(#bg'+id+')"/>'+scene+petals
  +'<g class="w-float">'
  +'<path d="M92 530 C92 414 114 334 200 308 C286 334 308 414 308 530Z" fill="'+d+'"/>'
  +'<path d="M200 336 L200 530" stroke="rgba(0,0,0,.1)" stroke-width="3"/>'
  +'<path d="M200 60 C272 60 302 116 296 184 C293 232 326 268 340 356 C292 340 246 336 200 336 C154 336 108 340 60 356 C74 268 107 232 104 184 C98 116 128 60 200 60Z" fill="'+h+'"/>'
  +'<path d="M112 306 C146 322 170 326 200 326 C230 326 254 322 288 306" fill="none" stroke="'+hd+'" stroke-width="3" opacity=".55"/>'
  +'<path d="M84 340 C120 328 160 324 200 324" fill="none" stroke="'+hd+'" stroke-width="2" opacity=".4"/>'
  +'<ellipse cx="200" cy="184" rx="50" ry="60" fill="'+skin+'"/>'
  +'<ellipse cx="200" cy="184" rx="50" ry="60" fill="none" stroke="'+h+'" stroke-width="10"/>'
  +'<ellipse cx="200" cy="184" rx="46" ry="56" fill="none" stroke="'+hd+'" stroke-width="2" opacity=".45"/>'
  +'<path d="M168 158 Q181 150 194 156 M206 156 Q219 150 232 158" fill="none" stroke="#2B1B17" stroke-width="4" stroke-linecap="round"/>'
  +eye(181)+eye(219)
  +'<path d="M200 184 Q195 198 202 201" fill="none" stroke="'+shade+'" stroke-width="2.500" stroke-linecap="round"/>'
  +'<circle cx="170" cy="204" r="9" fill="#F4A6A0" opacity=".45"/><circle cx="230" cy="204" r="9" fill="#F4A6A0" opacity=".45"/>'
  +'<path d="M186 213 Q194 208 200 211 Q206 208 214 213 Q200 226 186 213Z" fill="#D6455D"/>'
  +arms+'</g></svg>';
}
$("#heroArt").innerHTML=woman({id:"h",dress:"#4A1D96",hijab:"#C9A8F2",hijabDark:"#7A4FBF",pose:"raise",product:"jar",scene:"",bg1:"#FFFFFF",bg2:"#DCCDF6"});
$("#figDay").innerHTML=woman({id:"d",dress:"#FFFFFF",hijab:"#E9B8CF",hijabDark:"#B5708F",pose:"chest",product:"bottle",scene:"day",bg1:"#FFF6D6",bg2:"#F3E3FF"});
$("#figNight").innerHTML=woman({id:"n",dress:"#5A3A2E",hijab:"#E3B93C",hijabDark:"#9C7712",pose:"raise",product:"jar",scene:"night",eyes:"happy",bg1:"#5B3FA0",bg2:"#241145"});

/* ---------- nav ---------- */
$("#burger").addEventListener("click",function(){var m=$("#menu"),o=m.classList.toggle("open");this.setAttribute("aria-expanded",o)});
$$("#menu a").forEach(function(a){a.addEventListener("click",function(){$("#menu").classList.remove("open");$("#burger").setAttribute("aria-expanded","false")})});

/* ---------- products ---------- */
function card(p){
  var c=document.createElement("article");c.className="card"+(p.wide?" wide":"");c.dataset.cats=p.cats.join(" ");
  c.innerHTML='<button class="pic" data-open="'+p.id+'" aria-label="Lihat detail '+p.name+'"><img src="'+IMG[p.id]+'" alt="'+p.name+'">'+(p.tag?'<span class="tag">'+p.tag+'</span>':'')+'</button>'
   +'<div class="body"><h3>'+p.name+'</h3><p class="desc">'+p.desc+'</p>'
   +(p.contents?'<ul class="contents">'+p.contents.map(function(x){return '<li>'+x+'</li>'}).join("")+'</ul>':'')
   +'<div class="row"><span class="price">'+rp(p.price)+'</span><div class="acts"><button class="btn btn-wa btn-sm" data-order="'+p.id+'"><svg class="ico"><use href="#i-wa"/></svg>Pesan via WhatsApp</button><button class="btn btn-line btn-sm" data-open="'+p.id+'">Detail</button><button class="btn btn-line btn-sm" data-add="'+p.id+'">+ Keranjang</button></div></div></div>';
  return c;
}
var grid=$("#grid");PRODUCTS.forEach(function(p){grid.appendChild(card(p))});
$$("#prodFilters button").forEach(function(b){b.addEventListener("click",function(){
  $$("#prodFilters button").forEach(function(x){x.setAttribute("aria-pressed","false")});b.setAttribute("aria-pressed","true");
  var f=b.dataset.f;$$(".card",grid).forEach(function(c){c.style.display=(f==="semua"||c.dataset.cats.split(" ").indexOf(f)>-1)?"":"none"});
})});

/* modal */
var modal=$("#modal");
function openProduct(id){
  var p=P[id];
  modal.innerHTML='<div style="position:relative"><button class="icon-btn close" id="mClose" aria-label="Tutup"><svg class="ico"><use href="#i-x"/></svg></button><div class="md"><img src="'+IMG[id]+'" alt="'+p.name+'"><div class="info"><h3>'+p.name+'</h3><span class="price">'+rp(p.price)+'</span><p style="color:var(--muted);font-size:.93rem">'+p.desc+'</p><div><h4>Manfaat</h4><ul>'+p.benefits.map(function(b){return '<li>'+b+'</li>'}).join("")+'</ul></div><div><h4>Cara pakai</h4><p style="color:var(--muted);font-size:.93rem">'+p.use+'</p></div><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:auto"><button class="btn btn-wa" data-order="'+id+'"><svg class="ico"><use href="#i-wa"/></svg>Pesan via WhatsApp</button><button class="btn btn-line" data-add="'+id+'" data-close="1">Tambah ke keranjang</button></div></div></div></div>';
  modal.showModal();
}
modal.addEventListener("click",function(e){if(e.target===modal||e.target.closest("#mClose"))modal.close()});

/* ---------- cart ---------- */
var cart={};
try{var sv=JSON.parse(localStorage.getItem("ajr_cart")||"{}");Object.keys(sv).forEach(function(k){if(P[k]&&sv[k]>0)cart[k]=sv[k]})}catch(e){}
function save(){try{localStorage.setItem("ajr_cart",JSON.stringify(cart))}catch(e){}}
function count(){return Object.keys(cart).reduce(function(a,k){return a+cart[k]},0)}
function total(){return Object.keys(cart).reduce(function(a,k){return a+cart[k]*P[k].price},0)}
function renderCart(){
  var ids=Object.keys(cart),box=$("#cartItems");
  var n=count(),b=$("#cartCount");b.textContent=n;b.hidden=n===0;
  $("#cartFoot").style.display=ids.length?"":"none";
  if(!ids.length){box.innerHTML='<div class="empty"><p>Keranjang masih kosong.</p><p style="margin-top:8px"><a href="#produk" data-closecart>Pilih produk</a> atau <a href="#konsultasi" data-closecart>mulai konsultasi kulit</a>.</p></div>';return}
  box.innerHTML=ids.map(function(id){var p=P[id];return '<div class="ci"><img src="'+IMG[id]+'" alt=""><div><b>'+p.name+'</b><small>'+rp(p.price)+'</small><div class="qty"><button data-dec="'+id+'" aria-label="Kurangi '+p.short+'">-</button><span>'+cart[id]+'</span><button data-inc="'+id+'" aria-label="Tambah '+p.short+'">+</button></div></div><button class="rm" data-rm="'+id+'">Hapus</button></div>'}).join("");
  $("#cartTotal").textContent=rp(total());
}
function add(id,q){cart[id]=(cart[id]||0)+(q||1);save();renderCart();toast(P[id].short+" masuk keranjang")}
function openCart(){$("#drawer").classList.add("on");$("#overlay").classList.add("on");$("#drawer").setAttribute("aria-hidden","false");$("#closeCart").focus()}
function closeCart(){$("#drawer").classList.remove("on");$("#overlay").classList.remove("on");$("#drawer").setAttribute("aria-hidden","true")}
$("#openCart").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#overlay").addEventListener("click",closeCart);
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeCart()});
$("#oAdmin").innerHTML=ADMINS.map(function(a){return '<option value="'+a.id+'">Pesan ke '+a.name+'</option>'}).join("");
function wa(num,text){return "https://wa.me/"+num+"?text="+encodeURIComponent(text)}
$("#checkout").addEventListener("click",function(){
  var ad=ADMINS.filter(function(a){return a.id===$("#oAdmin").value})[0];
  var nm=$("#oName").value.trim(),addr=$("#oAddr").value.trim();
  var lines=Object.keys(cart).map(function(id){return "- "+P[id].name+" x"+cart[id]+" = "+rp(cart[id]*P[id].price)});
  var t="Halo kak "+ad.name+", saya "+(nm||"ingin")+" memesan produk AJR Beauty:\n"+lines.join("\n")+"\n\nTotal: "+rp(total())+(addr?"\nAlamat: "+addr:"")+"\n\nMohon info ongkir dan cara pembayarannya. Terima kasih.";
  window.open(wa(ad.num,t),"_blank","noopener");
});

/* direct order + admin picker */
var curAdmin=ADMINS[0].id;
function adminById(id){return ADMINS.filter(function(a){return a.id===id})[0]}
function orderNow(id){
  var a=adminById(curAdmin),p=P[id];
  var t="Halo kak "+a.name+", saya ingin memesan produk AJR Beauty:\n- "+p.name+" x1 = "+rp(p.price)+"\n\nMohon info ketersediaan, ongkir, dan cara pembayarannya. Terima kasih.";
  window.open(wa(a.num,t),"_blank","noopener");
}
var ap=$("#apick");
ADMINS.forEach(function(a){var b=document.createElement("button");b.type="button";b.textContent=a.name;b.setAttribute("aria-pressed",a.id===curAdmin?"true":"false");b.onclick=function(){curAdmin=a.id;$$("button",ap).forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false")});$("#oAdmin").value=a.id;toast("Pesanan diarahkan ke "+a.name)};ap.appendChild(b)});
/* delegated clicks */
document.addEventListener("click",function(e){
  var t=e.target.closest("[data-order],[data-open],[data-add],[data-inc],[data-dec],[data-rm],[data-direct],[data-closecart]");if(!t)return;
  if(t.dataset.order){orderNow(t.dataset.order)}
  else if(t.dataset.open){if(modal.open)modal.close();openProduct(t.dataset.open)}
  else if(t.dataset.add){add(t.dataset.add);if(t.dataset.close&&modal.open)modal.close()}
  else if(t.dataset.inc){cart[t.dataset.inc]++;save();renderCart()}
  else if(t.dataset.dec){cart[t.dataset.dec]--;if(cart[t.dataset.dec]<1)delete cart[t.dataset.dec];save();renderCart()}
  else if(t.dataset.rm){delete cart[t.dataset.rm];save();renderCart()}
  else if(t.dataset.direct){var a=ADMINS[0];window.open(wa(a.num,"Halo kak "+a.name+", saya ingin bertanya tentang "+P[t.dataset.direct].name+" (" +rp(P[t.dataset.direct].price)+")."),"_blank","noopener")}
  else if(t.hasAttribute("data-closecart")){closeCart()}
});
renderCart();

/* ---------- consult ---------- */
function recommend(f){
  var ids=[],notes=[],why={};
  var face=f.area!=="badan",body=f.area!=="wajah",c=f.concerns;
  var has=function(x){return c.indexOf(x)>-1};
  if(face){
    ids.push("soap");why.soap="Membersihkan wajah sebelum langkah berikutnya.";
    ids.push("toner");why.toner=(f.skin==="berminyak"||has("berminyak"))?"Membantu wajah terasa bersih dan segar, cocok dipakai pagi dan malam.":"Menyegarkan dan menjaga keseimbangan kulit.";
    if(has("kusam")||has("flek")){ids.push("serum");why.serum=has("flek")?"Extra niacinamide untuk warna kulit yang tampak lebih merata.":"Extra niacinamide untuk tampilan kulit yang lebih cerah."}
    ids.push("day");why.day=has("kusam")?"Mencerahkan dan melindungi dari paparan luar di siang hari.":"Melembapkan dan melindungi dari paparan luar di siang hari.";
    ids.push("night");why.night=(f.skin==="kering"||has("kering"))?"Menjaga kelembapan kulit sepanjang malam.":"Melembapkan dan bekerja saat kamu tidur.";
  }
  if(body||has("belang")){ if(ids.indexOf("hb")<0){ids.push("hb");why.hb=has("belang")?"Untuk kulit badan yang belang atau gelap agar tampak lebih cerah dan merata.":"Merawat kulit badan agar tampak lebih cerah dan merata."} if(ids.indexOf("soap")<0){ids.push("soap");why.soap="Pembersih badan sebelum handbody."} }
  notes.push("Lakukan uji tempel di lengan bagian dalam selama 24 jam sebelum memakai produk baru.");
  if(f.skin==="sensitif")notes.push("Kulit sensitif: mulai dengan satu produk baru pada satu waktu, lalu tambah bertahap.");
  if(has("jerawat"))notes.push("Untuk jerawat meradang atau membandel, sebaiknya periksakan ke dokter kulit. Produk kami fokus pada perawatan cerah dan lembap.");
  if(f.age&&f.age<16)notes.push("Untuk usia di bawah 16 tahun, sebaiknya berkonsultasi dengan orang tua atau dokter kulit dulu.");
  notes.push("Sedang hamil, menyusui, atau punya kondisi kulit tertentu? Tanyakan dulu ke dokter.");
  return {ids:ids,why:why,notes:notes,face:face,body:body};
}
$("#consultForm").addEventListener("submit",function(e){
  e.preventDefault();
  var name=$("#cName").value.trim(),concerns=$$('input[name=concern]:checked').map(function(x){return x.value});
  $("#errName").textContent=name?"":"Isi nama dulu supaya admin tahu cara menyapamu.";
  $("#errConcern").textContent=concerns.length?"":"Pilih minimal satu keluhan.";
  if(!name){$("#cName").focus();return}if(!concerns.length)return;
  var f={name:name,age:parseInt($("#cAge").value,10)||0,area:$('input[name=area]:checked').value,skin:$('input[name=skin]:checked').value,concerns:concerns,note:$("#cNote").value.trim()};
  var r=recommend(f),sum=r.ids.reduce(function(a,id){return a+P[id].price},0);
  var out=$("#result");
  var morning=[],night=[];
  if(r.face){morning=["Soap","Toner"].concat(r.ids.indexOf("serum")>-1?["Face Serum Gold"]:[],["Day Cream"]);night=["Soap","Toner"].concat(r.ids.indexOf("serum")>-1?["Face Serum Gold"]:[],["Night Cream"])}
  else{night=["Mandi dengan Soap"]}
  if(r.ids.indexOf("hb")>-1){night.push("Campuran Handbody (sesuai petunjuk kemasan)")}
  out.innerHTML='<div class="result"><h3>Halo '+esc(name)+', ini saran kami</h3><p class="sub">'+(f.skin==="belum tahu"?"Jenis kulit belum diketahui":"Kulit "+esc(f.skin))+', keluhan: '+esc(concerns.join(", "))+'.</p>'
   +'<div class="rec">'+r.ids.map(function(id){return '<div class="rec-item"><img src="'+IMG[id]+'" alt=""><div><b>'+P[id].name+'</b><small>'+r.why[id]+'</small></div><span class="p">'+rp(P[id].price)+'</span></div>'}).join("")+'</div>'
   +'<div class="rr">'+(morning.length?'<div><b>Pagi</b><ol>'+morning.map(function(x){return '<li>'+x+'</li>'}).join("")+'</ol></div>':'')+'<div><b>Malam</b><ol>'+night.map(function(x){return '<li>'+x+'</li>'}).join("")+'</ol></div></div>'
   +'<div class="tips">'+r.notes.map(function(n){return '<p>'+n+'</p>'}).join("")+'</div>'
   +'<div class="field" style="margin:16px 0 0"><label for="cAdmin">Kirim hasil ke admin</label><select id="cAdmin">'+ADMINS.map(function(a){return '<option value="'+a.id+'"'+(a.id===curAdmin?' selected':'')+'>'+a.name+'</option>'}).join("")+'</select></div>'
   +'<div class="actions"><button type="button" class="btn btn-primary" id="addAll">Tambah semua ke keranjang ('+rp(sum)+')</button><button type="button" class="btn btn-wa" id="sendWa"><svg class="ico"><use href="#i-wa"/></svg>Lanjut konsultasi di WhatsApp</button></div></div>';
  $("#addAll").onclick=function(){r.ids.forEach(function(id){if(!cart[id])cart[id]=1});save();renderCart();toast("Semua saran masuk keranjang");openCart()};
  $("#sendWa").onclick=function(){
    var ad=ADMINS.filter(function(a){return a.id===$("#cAdmin").value})[0];
    var t="Halo kak "+ad.name+", saya ingin konsultasi kulit.\nNama: "+name+(f.age?"\nUsia: "+f.age:"")+"\nBagian dirawat: "+f.area+"\nJenis kulit: "+f.skin+"\nKeluhan: "+concerns.join(", ")+(f.note?"\nCerita: "+f.note:"")+"\n\nSaran dari website: "+r.ids.map(function(id){return P[id].short}).join(", ")+".\nMohon dibantu ya kak.";
    window.open(wa(ad.num,t),"_blank","noopener");
  };
  out.scrollIntoView({behavior:"smooth",block:"nearest"});
});
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}

/* ---------- testimonials ---------- */
var T=[
 {img:"wa1",src:"WhatsApp",cap:"Baru dua minggu memakai, pelanggan bercerita wajahnya terasa lebih bersih dan cerah."},
 {img:"shopee",src:"Shopee",cap:"Ulasan bintang lima: pengemasan kokoh, produk asli, dan kulit terlihat lebih cerah dan merata."},
 {img:"wa3",src:"WhatsApp",cap:"Kulit terasa agak lebih cerah setelah memakai campuran handbody, pelanggan berencana memesan dua pot."},
 {img:"wa2",src:"WhatsApp",cap:"Testimoni pemakaian campuran handbody dan cream AJR untuk wajah dan tangan."},
 {img:"wa4",src:"WhatsApp",cap:"Setelah empat pot, pelanggan bercerita kulit kakinya tampak lebih cerah."}
];
var track=$("#track"),dotsEl=$("#dots"),idx=0,per=3,timer=null,paused=false;
track.innerHTML=T.map(function(t,i){return '<div class="slide" data-i="'+i+'"><div class="shot"><img src="'+IMG[t.img]+'" alt="Tangkapan layar testimoni '+t.src+'"></div><div class="cap"><b><span class="stars" aria-label="Bintang lima">★★★★★</span><span class="src">'+t.src+'</span></b><p>'+t.cap+'</p></div></div>'}).join("");
function calc(){per=window.innerWidth>=980?3:window.innerWidth>=620?2:1;$$(".slide",track).forEach(function(s){s.style.width=(100/per)+"%"});var m=T.length-per;dotsEl.innerHTML="";for(var i=0;i<=m;i++){(function(i){var b=document.createElement("button");b.setAttribute("aria-label","Ke testimoni "+(i+1));b.onclick=function(){go(i,true)};dotsEl.appendChild(b)})(i)}go(Math.min(idx,m),false)}
function go(i,user){var m=T.length-per;idx=i>m?0:i<0?m:i;track.style.transform="translateX(-"+(idx*100/per)+"%)";$$("button",dotsEl).forEach(function(b,k){b.setAttribute("aria-current",k===idx?"true":"false")});if(user)restart()}
function restart(){clearTimeout(timer);if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;timer=setTimeout(function(){if(!paused)go(idx+1,false);restart()},4500)}
$("#prev").onclick=function(){go(idx-1,true)};$("#next").onclick=function(){go(idx+1,true)};
var sl=$("#slider");["mouseenter","focusin","touchstart"].forEach(function(ev){sl.addEventListener(ev,function(){paused=true})});["mouseleave","focusout"].forEach(function(ev){sl.addEventListener(ev,function(){paused=false})});
var sx=null;sl.addEventListener("pointerdown",function(e){sx=e.clientX});sl.addEventListener("pointerup",function(e){if(sx===null)return;var dx=e.clientX-sx;if(Math.abs(dx)>50)go(idx+(dx<0?1:-1),true);sx=null;paused=false});
window.addEventListener("resize",calc);calc();restart();

/* ---------- contact ---------- */
$("#people").innerHTML=ADMINS.map(function(a){return '<div class="person"><div class="avatar" aria-hidden="true">'+a.name.charAt(0)+'</div><div><b>'+a.name+'</b><small>'+a.show+'</small></div><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="'+wa(a.num,"Halo kak "+a.name+", saya ingin bertanya tentang produk AJR Beauty.")+'"><svg class="ico"><use href="#i-wa"/></svg>Chat WhatsApp</a></div>'}).join("");
$("#fab").href=wa(ADMINS[0].num,"Halo kak Mhira, saya ingin bertanya tentang produk AJR Beauty.");
})();
