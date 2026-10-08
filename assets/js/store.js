/* SIMAS store: seed + localStorage */
const UNITS=[
{id:'pusat',short:'YAYASAN',name:'Kantor Yayasan Pusat',desc:'Tanah Induk, Gedung Rektorat, Armada',color:'#003820'},
{id:'smk',short:'SMK',name:'SMK IT Bina Insani',desc:'Bengkel TKJ, Otomasi & Lab Komputer',color:'#0f5132'},
{id:'smp',short:'SMP',name:'SMP IT Insan Kamil',desc:'Lab Sains, Smart Multimedia & Kelas',color:'#005049'},
{id:'sd',short:'SD',name:'SD IT Al-Hikmah',desc:'Meubilair Siswa, Smart TV & Sound',color:'#2d6a48'},
{id:'tk',short:'TK',name:'TK IT Al-Falah',desc:'Alat Peraga Edukatif, Wahana Luar',color:'#904d00'},
{id:'rq',short:'RQ',name:"Rumah Qur'an (RQ) Tahfizh",desc:'Audio Akustik, Mushaf & Lemari Waqaf',color:'#fe932c'}];
const KEY='simas_state_v1';
function seed(){return{unit:'all',
assets:[
{code:'SMK-ELK-2023-0182',name:'Proyektor Laser Epson EB-L200F',unit:'smk',room:'Lab Multimedia 2',cat:'Elektronik & TIK',value:18500000,cond:'baik',fund:'BOS',icon:'videocam'},
{code:'YYS-TRN-2021-0004',name:'Bus Elf Long Antar-Jemput',unit:'pusat',room:'Pool Transport Pusat',cat:'Kendaraan',value:385000000,cond:'ringan',fund:'Yayasan',icon:'directions_bus'},
{code:'SMP-TIK-2022-0043',name:'Server CBT & NAS Synology',unit:'smp',room:'Ruang Server Gedung B',cat:'Elektronik & TIK',value:62000000,cond:'baik',fund:'BOS',icon:'dns'},
{code:'RQ-SAR-2023-0012',name:'AC Daikin 2PK Inverter Tahfizh',unit:'rq',room:'Halaqah Ikhwan 1',cat:'Elektronik & TIK',value:9800000,cond:'servis',fund:'Wakaf',icon:'ac_unit'},
{code:'SD-TIK-2024-0110',name:'Laptop Lenovo ThinkBook (12 unit)',unit:'sd',room:'Lab CBT SD',cat:'Elektronik & TIK',value:96000000,cond:'dipinjam',fund:'BOS',icon:'laptop'},
{code:'SMK-TIK-2023-0091',name:'PC Lab Komputer 30 Unit',unit:'smk',room:'Lab Komputer 1',cat:'Elektronik & TIK',value:210000000,cond:'baik',fund:'Yayasan',icon:'desktop_windows'},
{code:'SMP-MBL-2022-0201',name:'Meja Kursi Kelas 40 Set',unit:'smp',room:'Kelas 8A-8D',cat:'Meubilair',value:48000000,cond:'baik',fund:'BOS',icon:'chair'},
{code:'TK-APE-2024-0033',name:'Alat Peraga Edukatif + Wahana',unit:'tk',room:'Ruang Sentra',cat:'Meubilair',value:35000000,cond:'baik',fund:'Donatur',icon:'toys'},
{code:'YYS-GDG-2020-0001',name:'Gedung Rektorat 2 Lantai',unit:'pusat',room:'Komplek Pusat',cat:'Bangunan',value:3800000000,cond:'baik',fund:'Wakaf',icon:'apartment'},
{code:'SD-ELK-2024-0044',name:'Smart TV 55 + Sound System',unit:'sd',room:'Aula SD',cat:'Elektronik & TIK',value:24000000,cond:'ringan',fund:'Yayasan',icon:'tv'},
{code:'SMP-LAB-2023-0077',name:'Mikroskop & Kit IPA 20 Set',unit:'smp',room:'Lab Sains',cat:'Lab',value:42000000,cond:'berat',fund:'BOS',icon:'science'},
{code:'RQ-MBR-2025-0001',name:'Meja Siswa Jati 25 Unit (Wakaf)',unit:'rq',room:'Halaqah Akhwat',cat:'Meubilair',value:18750000,cond:'baik',fund:'Wakaf',icon:'table_restaurant'}],
alerts:[
{code:'SMK-ELK-2023-0182',issue:'Garansi Distributor Habis',vendor:'PT Epson Service Center',due:'5 Hari Lagi',tone:'red',action:'Klaim Servis'},
{code:'YYS-TRN-2021-0004',issue:'Uji KIR & Servis 20.000 KM',vendor:'Dishub & Bengkel Resmi',due:'Jatuh Tempo Hari Ini',tone:'amber',action:'Jadwalkan'},
{code:'SMP-TIK-2022-0043',issue:'Lisensi Antivirus & Backup Cloud',vendor:'Perpanjangan Tahunan',due:'12 Hari Lagi',tone:'gray',action:'Perpanjang'},
{code:'RQ-SAR-2023-0012',issue:'Cuci Rutin & Pengecekan Freon',vendor:'Kontrak CV Sejuk Abadi',due:'Besok',tone:'amber',action:'Kirim SPK'}],
loans:[{item:'12 Laptop ThinkBook — Panitia CBT SD',by:'Ahmad Syakir, S.Kom',status:'Disetujui',due:'Hari ini'},{item:'Proyektor + Tripod — Kajian RQ',by:'Ustzh. Maryam',status:'Berjalan',due:'Besok'},{item:'Sound Portable — TK Pentas',by:'Bu Siti',status:'Terlambat',due:'Kemarin'}],
activities:[
{t:'Peminjaman Disetujui',c:'primary',time:'10 Menit lalu',d:'12 Unit Laptop Lenovo ThinkBook untuk Panitia Ujian CBT SD IT Al-Hikmah.',m:'Petugas: Ahmad Syakir, S.Kom'},
{t:'Servis Selesai',c:'amber',time:'2 Jam lalu',d:'Perbaikan AC Central Lab Komputer SMK IT diverifikasi & kembali operasional.',m:'Biaya: Rp 450.000 (Kas Rutin SMK)'},
{t:'Registrasi Aset Baru',c:'teal',time:'Kemarin, 16:20',d:'Pendaftaran 25 Meja Siswa Kayu Jati. Sumber: Hibah Wakaf Umat 2024.',m:'Label: RQ-MBR-2025-001 s/d 025'},
{t:'Audit Ruangan Selesai',c:'primary',time:'2 Hari lalu',d:'Stock opname Ruang Multimedia SMP IT tervalidasi 100% tanpa selisih.',m:'Auditor: Tim Internal Yayasan'}]};}
let S;
try{S=JSON.parse(localStorage.getItem(KEY))||seed()}catch(e){S=seed()}
function save(){localStorage.setItem(KEY,JSON.stringify(S))}
function unitOf(id){return UNITS.find(u=>u.id===id)}
const rp=n=>'Rp '+Number(n||0).toLocaleString('id-ID');
function filteredAssets(){return S.unit==='all'?S.assets:S.assets.filter(a=>a.unit===S.unit)}
function kpi(){
 const a=filteredAssets();
 // valuasi besar sesuai desain: pakai basis konsolidasi
 const base={all:14850250000,pusat:4200000000,smk:3800000000,smp:2900000000,sd:2400000000,tk:950000000,rq:600000000};
 const count={all:3428,pusat:342,smk:840,smp:715,sd:890,tk:410,rq:231};
 return{valuasi:base[S.unit]||0,count:count[S.unit]||a.length,
 baik:3120,ringan:215,berat:68,servis:25,pinjam:18,tempo:3,tiket:7};}
