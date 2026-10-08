/* Login form renderer */
if(currentUser())location.href='index.html';
document.getElementById('loginRight').innerHTML='<div class="w-full max-w-md">'
+'<div class="lg:hidden flex items-center gap-2 mb-6"><div class="w-10 h-10 rounded-xl bg-primary text-white grid place-items-center"><span class="material-symbols-outlined">mosque</span></div><div><div class="font-jakarta font-bold text-primary">SIMAS Yayasan</div><div class="text-[11px] text-mut">Sistem Informasi Manajemen Aset</div></div></div>'
+'<div class="card p-6 sm:p-8"><h1 class="font-jakarta font-bold text-[22px]">Assalamu\'alaikum</h1>'
+'<p class="text-[13px] text-mut mt-1 mb-5">Masuk untuk mengelola aset sesuai peran & unit kerja Anda.</p>'
+'<div id="loginErr" class="hidden mb-3 px-3 py-2 rounded-lg bg-econt text-err text-[13px] font-medium"></div>'
+'<form onsubmit="return doSubmit()"><label class="text-[12px] font-semibold">Username / NIP</label>'
+'<div class="relative mt-1 mb-3"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-out text-[18px]">badge</span><input id="inU" autocomplete="username" class="w-full bg-low rounded-lg pl-10 pr-3 py-2.5 text-[14px]" placeholder="mis. superadmin" required/></div>'
+'<label class="text-[12px] font-semibold">Kata Sandi</label>'
+'<div class="relative mt-1 mb-4"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-out text-[18px]">lock</span><input id="inP" type="password" autocomplete="current-password" class="w-full bg-low rounded-lg pl-10 pr-10 py-2.5 text-[14px]" placeholder="••••••••" required/><button type="button" onclick="let i=document.getElementById(\'inP\');i.type=i.type===\'password\'?\'text\':\'password\'" class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-mut"><span class="material-symbols-outlined text-[18px]">visibility</span></button></div>'
+'<button class="w-full bg-primary text-white rounded-lg py-2.5 text-[14px] font-semibold">Masuk ke Dashboard</button></form>'
+'<div class="flex items-center gap-2 my-5"><div class="flex-1 h-px bg-cont"></div><span class="text-[11px] text-mut font-semibold">AKUN DEMO — KLIK UNTUK MASUK</span><div class="flex-1 h-px bg-cont"></div></div>'
+'<div class="grid grid-cols-1 gap-2">'
+[['superadmin','yayasan123','Super Admin Yayasan','shield','bg-primary'],['admin.smk','smk123','Admin Unit — SMK IT','school','bg-pcont'],['kepsek.smp','smp123','Kepsek / Auditor — SMP IT','fact_check','bg-terr'],['pj.lab','pj123','PJ Ruangan — Lab SMK','badge','bg-second']].map(a=>'<button onclick="quickLogin(\''+a[0]+'\',\''+a[1]+'\')" class="flex items-center gap-3 p-2.5 rounded-xl bg-low hover:bg-cont text-left"><span class="w-9 h-9 rounded-lg '+a[4]+' text-white grid place-items-center shrink-0"><span class="material-symbols-outlined">'+a[3]+'</span></span><span><span class="block text-[13px] font-semibold">'+a[2]+'</span><span class="block text-[11px] text-mut">'+a[0]+' • '+a[1]+'</span></span></button>').join('')
+'</div><p class="mt-5 text-center text-[11px] text-mut">TA 2024/2025 Genap • Server Pusat Yayasan</p></div></div>';
function showErr(m){let e=document.getElementById('loginErr');e.textContent=m;e.classList.remove('hidden');}
function doSubmit(){let u=document.getElementById('inU').value,p=document.getElementById('inP').value;if(!doLogin(u,p)){showErr('Username atau kata sandi salah. Gunakan salah satu akun demo di bawah.');return false;}location.href='index.html';return false;}
function quickLogin(u,p){document.getElementById('inU').value=u;document.getElementById('inP').value=p;doSubmit();}
