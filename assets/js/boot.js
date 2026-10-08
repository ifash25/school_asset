let route='dashboard',distMode='nilai',q='';
const $=s=>document.querySelector(s);
const NAV1=[['dashboard','dashboard','Executive Dashboard'],['katalog','inventory_2','Katalog & Registrasi'],['layanan','swap_horizontal_circle','Layanan & Peminjaman'],['audit','qr_code_scanner','Audit & Stock Opname']];
const NAV2=[['depresiasi','trending_down','Depresiasi & Pemutihan'],['pengaturan','admin_panel_settings','Pengaturan & RBAC'],['bantuan','menu_book','Bantuan & Dokumen']];
function toast(m){let t=document.createElement('div');t.className='toast fixed bottom-5 right-5 bg-[#111c2d] text-white text-[13px] px-4 py-2.5 rounded-xl shadow-xl z-[99]';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2600);}
function openModal(id){document.getElementById(id).showModal();}
function closeModal(id){document.getElementById(id).close();}
function initNav(el,items){let n=$(el);n.innerHTML=items.map(x=>'<button data-r="'+x[0]+'" class="flex items-center gap-2 px-3 py-2 rounded-lg text-left '+(x[0]===route?'nav-active':'text-mut hover:bg-cont')+'"><span class="material-symbols-outlined text-[20px]">'+x[1]+'</span><span>'+x[2]+'</span></button>').join('');n.querySelectorAll('button').forEach(b=>b.onclick=()=>{route=b.dataset.r;initNav('#navMain',NAV1);initNav('#navSub',NAV2);render();});}
function initUnit(){let s=document.getElementById('unitSel');let me=currentUser();let locked=me&&me.role!=='super_admin';
s.innerHTML=(locked?'':'<option value="all">Semua Unit (Konsolidasi)</option>')+UNITS.filter(u=>!locked||u.id===me.unit).map(u=>'<option value="'+u.id+'">'+u.name+'</option>').join('');
s.value=locked?me.unit:S.unit;if(locked){s.disabled=true;s.title='Dikunci pada unit Anda ('+unitOf(me.unit).name+')';}
s.onchange=()=>{S.unit=s.value;save();render();};}
function fillHeader(){let me=currentUser();if(!me)return;let r=ROLES[me.role];
document.getElementById('hdrAvatar').textContent=me.name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
document.getElementById('hdrName').textContent=me.name;
document.getElementById('hdrRole').textContent=r.label+(me.role==='super_admin'?'':' • '+unitOf(me.unit).name);}
function navFilter(items){return items.filter(x=>canAccess(x[0]));}
function render(){if(!canAccess(route)){route=canAccess('dashboard')?'dashboard':ROLES[currentUser().role].menus[0];initNav('#navMain',navFilter(NAV1));initNav('#navSub',navFilter(NAV2));toast('Menu tidak tersedia untuk peran Anda');}
let v=document.getElementById('view');if(route==='dashboard')v.innerHTML=dashHTML();else if(route==='katalog')v.innerHTML=katalogHTML();else if(route==='layanan')v.innerHTML=layananHTML();else if(route==='audit')v.innerHTML=auditHTML();else if(route==='depresiasi')v.innerHTML=depHTML();else if(route==='pengaturan')v.innerHTML=setHTML();else v.innerHTML=bantuanHTML();bindDash();}
document.addEventListener('DOMContentLoaded',()=>{initNav('#navMain',navFilter(NAV1));initNav('#navSub',navFilter(NAV2));initUnit();fillHeader();render();document.getElementById('q').addEventListener('input',e=>{q=e.target.value;if(route==='katalog')render();});document.getElementById('btnMenu').onclick=()=>{let a=document.querySelector('aside');a.classList.toggle('hidden');a.classList.toggle('flex');};});
