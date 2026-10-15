const DONATE_URL='';
const ORDER_URL=''; const MAIL='text-pro@list.ru'; // ссылка на заявку
const SFERA_URL='https://sferalab.github.io/talanta/'; // ссылка на страницу поддержки
const D=window.DATA,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],app=$('#app');
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const low=s=>s?s.charAt(0).toLowerCase()+s.slice(1):s,cap=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s,cut=s=>String(s).replace(/[.!?]+$/,'');
const acc=s=>esc(s).replace(/\*([^*]+)\*/g,'<span class="ac">$1</span>'),plain=s=>String(s).replace(/\*/g,'');
let st={ci:null,si:null,pk:null,type:'e',vals:{},vn:{},sk:null},hist=[],cur='hero',sound=localStorage.getItem('snd2')!=='0';
/* ---------- sound: kalimba / felt piano, warm pad ---------- */
let AC,BUS,greeted=false;
function ctx(){if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();BUS=AC.createBiquadFilter();BUS.type='lowpass';BUS.frequency.value=1300;BUS.Q.value=.3;
const rv=AC.createConvolver(),len=AC.sampleRate*2.6,ir=AC.createBuffer(2,len,AC.sampleRate);for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}rv.buffer=ir;
const dry=AC.createGain(),wet=AC.createGain();dry.gain.value=.75;wet.gain.value=.45;BUS.connect(dry);BUS.connect(rv);rv.connect(wet);dry.connect(AC.destination);wet.connect(AC.destination)}
if(AC.state==='suspended')AC.resume();return AC}
function kal(f,d,v){const t=AC.currentTime+d,g=AC.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+1.6);g.connect(BUS);
[[1,1,'sine'],[2.01,.18,'sine'],[1,.25,'triangle']].forEach(([m,a,ty])=>{const o=AC.createOscillator(),og=AC.createGain();o.type=ty;o.frequency.value=f*m;if(ty==='triangle')o.detune.value=-5;og.gain.value=a;o.connect(og);og.connect(g);o.start(t);o.stop(t+1.7)})}
function pad(fs,d,dur,v){fs.forEach(f=>{[-6,6].forEach(dt=>{const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime+d;o.type='sine';o.frequency.value=f;o.detune.value=dt;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.5);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(BUS);o.start(t);o.stop(t+dur+.1)})})}
function blip(f,d,v){const t=AC.currentTime+d,g=AC.createGain(),lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1400;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+.3);g.connect(lp);lp.connect(AC.destination);[[1,1],[2,.12]].forEach(([m,a])=>{const o=AC.createOscillator(),og=AC.createGain();o.type='sine';o.frequency.value=f*m;og.gain.value=a;o.connect(og);og.connect(g);o.start(t);o.stop(t+.33)})}
function tone(k){if(sound)try{ctx();
if(k==='nav')kal(196,0,.13);
else if(k==='exp'){pad([130.8,196],0,.9,.03)}
else if(k==='sel'){kal(220,0,.11);kal(277.2,.09,.09)}
else if(k==='copy'){kal(293.7,0,.12);kal(220,.1,.07)}
else if(k==='cta'){pad([164.8,246.9],0,1.4,.03);[329.6,392,493.9].forEach((f,i)=>kal(f,.05+i*.08,.05))}
else if(k==='sph'){kal(174.6,0,.1);kal(220,.07,.08);kal(261.6,.14,.06)}
else if(k==='mean'){pad([146.8,220],0,.8,.025);kal(293.7,.02,.08)}
else if(k==='sch'){kal(246.9,0,.09);kal(196,.06,.07);pad([98],0,.6,.03)}
else if(k.startsWith('n')&&!isNaN(k.slice(1))){const sc=[196,220,246.9,261.6,293.7,329.6,349.2];kal(sc[+k.slice(1)]||220,0,.09)}
else if(k==='ovc'){[329.6,261.6,196].forEach((f,i)=>kal(f,i*.08,.05));pad([130.8],0,.9,.025)}
else if(k==='th_bur'){blip(293.7,0,.12);blip(370,.06,.08)}
else if(k==='th_olive'){blip(261.6,0,.12);blip(329.6,.06,.08)}
else if(k==='th_vip'){blip(196,0,.14);blip(293.7,.06,.08)}
else if(k==='th_white'){blip(392,0,.09);blip(523.3,.05,.06)}
else if(k==='theme'){[392,493.9,587.3,659.3].forEach((f,i)=>kal(f,i*.05,.04));pad([196,293.7],0,1.1,.022)}
else if(k==='menu'){kal(164.8,0,.1);kal(246.9,.06,.06)}
else if(k==='menuc'){kal(246.9,0,.08);kal(164.8,.06,.07)}
else if(k==='back'){kal(220,0,.09);kal(174.6,.07,.08)}
else if(k==='tab'){kal(261.6,0,.08);pad([130.8],0,.4,.02)}
else if(k==='acc'){pad([110,164.8,220],0,1,.025);kal(329.6,.05,.04)}
else if(k==='ptype'){kal(196,0,.1);kal(246.9,.08,.08);kal(293.7,.16,.06)}
else if(k==='cat'){pad([123.5,185],0,.7,.025);kal(246.9,0,.09)}
else if(k==='open'){pad([110,164.8,220],0,2.2,.035);[220,277.2,329.6,440].forEach((f,i)=>kal(f,.3+i*.16,.05))}}catch(e){}
if(navigator.vibrate&&k!=='open'&&k!=='exp')try{navigator.vibrate(k==='sel'||k==='cta'?22:14)}catch(e){}}
/* ---------- utils ---------- */
function openOv(){tone('open');const o=$('#ov');if(!o.dataset.l){$('#ovf').src=SFERA_URL;o.dataset.l=1}o.hidden=false;requestAnimationFrame(()=>o.classList.add('on'));document.body.style.overflow='hidden';$('#menu').hidden=true}
function closeOv(){const o=$('#ov');o.classList.remove('on');document.body.style.overflow='';setTimeout(()=>o.hidden=true,350)}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),1400)}
function copy(t){const ok=()=>{toast('Скопировано ✓');tone('copy')};const fb=()=>{const a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove();ok()};
if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(t).then(ok,fb);else fb()}
const sp=()=>st.ci==null?null:D.cats[st.ci].sp[st.si];
const orn=(s,p,r)=>`<svg class="orn ${r?'rev':''}" style="width:${s}px;height:${s}px;${p}"><use href="#orn"/></svg>`;
const CPI='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/></svg>';
/* ---------- schemes ---------- */
const MK=(p,t)=>'\u0001'+p+t+'\u0002';
const SCH={
why:{n:'Вопрос «Почему»',sn:'Почему',p:[['0','Почему'],['a','кто'],['b','что не получается'],['c','даже когда']],f:[['a'],['b'],['c']],g:(v,M)=>({t:`${M('0','Почему')} ${M('a')} не могут ${M('b')}?`,s:M('c','Даже когда '+v.c)})},
ben:{n:'Выгода + подзаголовок',sn:'Выгода',p:[['a','выгода'],['c','без чего']],f:[['a'],['c']],g:(v,M)=>({t:M('a'),s:M('c','Без '+v.c)})},
hook:{n:'Хук + заголовок',sn:'Хук',p:[['a','хук'],['b','обещание'],['c','подзаголовок']],f:[['a'],['b'],['c']],g:(v,M)=>({h:M('a'),t:M('b'),s:M('c')})},
prov:{n:'Провокация',sn:'Провокация',p:[['a','неловкая привычка'],['0','дело не в Вас'],['b','настоящая причина']],f:[['a'],['b']],g:(v,M)=>({h:'Признайтесь честно',t:M('a',cap(cut(v.a))+'?'),s:`${M('0','Дело не в Вас')}, а в ${M('b')}`})},
all:{n:'Как все, но...',sn:'Как все',p:[['a','как все'],['b','но не получается'],['c','дело не в…'],['d','а в…']],f:[['a'],['b'],['c'],['d']],g:(v,M)=>({h:`${M('a',cap(v.a))}, но ${M('b')}?`,t:M('c','Дело не в '+v.c),s:M('d','А в '+v.d)})},
steps:{n:'Пошаговый',sn:'Шаги',p:[['0','как'],['a','чего хочет клиент'],['1','3 шага'],['b','без чего']],f:[['a'],['b']],g:(v,M)=>({h:'Сохраните себе',t:`${M('0','Как')} ${M('a')}: ${M('1','3 шага')}`,s:M('b','Без '+v.b)})},
cnt:{n:'Вопрос-узнавание',sn:'Узнавание',p:[['0','сколько раз Вы уже пробовали'],['a','что именно']],f:[['a']],g:(v,M)=>({t:`${M('0','Сколько раз Вы уже пробовали')} ${M('a')}?`,s:'Давайте найдем способ, который сработает'})},
story:{n:'Признание',sn:'Признание',p:[['a','во что верили раньше'],['b','что поняли сейчас']],f:[['a'],['b']],g:(v,M)=>({h:'Признание',t:M('a','Раньше мне казалось, что все дело в '+v.a),s:M('b','Сейчас я знаю: дело в '+v.b)})},
pain:{n:'Боль → решение',sn:'Боль',p:[['a','боль'],['b','решение'],['c','в чем секрет']],f:[['a'],['b'],['c']],g:(v,M)=>({h:M('a'),t:M('b'),s:M('c')})},
who:{n:'Для кого + что получите',sn:'Для кого',p:[['0','для тех, кто хочет'],['a','чего хочет'],['b','что получите']],f:[['a'],['b']],g:(v,M)=>({h:'Для Вас',t:`${M('0','Для тех, кто хочет')} ${M('a')}`,s:M('b')})},
offer:{n:'Оффер с ограничением',sn:'Оффер',p:[['a','ограничение'],['b','что получите'],['c','призыв']],f:[['a'],['b'],['c']],g:(v,M)=>({h:M('a'),t:M('b'),s:M('c')})},
want:{n:'Хотите, но мешает',sn:'Мешает',p:[['0','хотите'],['a','чего'],['1','но мешает'],['b','что мешает'],['c','выход']],f:[['a'],['b'],['c']],g:(v,M)=>({t:`${M('0','Хотите')} ${M('a')}, ${M('1','но мешает')} ${M('b')}?`,s:M('c')})},
intr:{n:'Интрига',sn:'Интрига',p:[['0','одна фраза принесла'],['a','цифра'],['b','и это было не про…']],f:[['a'],['b']],g:(v,M)=>({h:'Из практики',t:`${M('0','Одна фраза в профиле принесла мне')} ${M('a')} заявок`,s:M('b','И это была не фраза про '+v.b)})}};
/* variant frames: 7 differently-starting headlines per scheme */
(()=>{const low=s=>String(s).replace(/^(\*?)(.)/,(m,a,b)=>a+b.toLowerCase());const X={
why:[(v,M)=>({t:`${M('0','Почему')} ${M('a')} не могут ${M('b')}?`,s:M('c','Даже когда '+v.c)}),
(v,M)=>({h:'Сохраните себе',t:`3 причины, ${M('0','почему')} ${M('a')} не могут ${M('b')}`,s:M('c','Даже когда '+v.c)}),
(v,M)=>({t:`Знакомо, когда не получается ${M('b')}?`,s:`${M('a',cap(v.a))} ${M('c')}, а результата все нет`}),
(v,M)=>({t:`Если не получается ${M('b')}, дело не в Вас`,s:`${M('a',cap(v.a))} ${M('c')} и все равно сталкиваются с этим`}),
(v,M)=>({t:`Не пытайтесь ${M('b')}, пока не прочитаете это`,s:M('c','Даже когда '+v.c+', без этого не выходит')}),
(v,M)=>({t:`Как ${M('b')}, если раньше не получалось`,s:M('c','Даже когда '+v.c)}),
(v,M)=>({h:'Из практики',t:`Годы практики, одна картина: ${M('a')} не могут ${M('b')}`,s:`${M('0','Почему')} так, рассказываю`})],
ben:[(v,M)=>({t:M('a'),s:M('c','Без '+v.c)}),
(v,M)=>({h:'Сохраните себе',t:`${M('a')}: 3 простых шага`,s:M('c','Без '+v.c)}),
(v,M)=>({h:'Знакомо?',t:`Мечтаете об этом? ${M('a')}`,s:M('c','Без '+v.c+'. Это реально')}),
(v,M)=>({t:`${M('a')}? Если отказаться от ${M('c')}, это реально`,s:'Объясняю, с чего начать'}),
(v,M)=>({t:`Не соглашайтесь на результат ценой ${M('c')}`,s:M('a')}),
(v,M)=>({t:`${M('a')}: как к этому прийти без ${M('c')}`,s:'Показываю на примерах'}),
(v,M)=>({h:'Для Вас',t:`Это может быть и у Вас: ${M('a',low(v.a))}`,s:M('c','И без '+v.c)})],
prov:[(v,M)=>({h:'Признайтесь честно',t:M('a',cap(cut(v.a))+'?'),s:`${M('0','Дело не в Вас')}, а в ${M('b')}`}),
(v,M)=>({h:M('a',cap(cut(v.a))+'?'),t:`${M('0','Дело не в Вас')}, а в ${M('b')}`,s:'Разбираю 3 причины'}),
(v,M)=>({t:`Знакомо? ${M('a',cap(cut(v.a)))}`,s:`${M('0','Дело не в Вас')}, а в ${M('b')}`}),
(v,M)=>({t:`Если ${M('a',cut(v.a))}, ${M('0','дело не в Вас')}`,s:`А в ${M('b')}`}),
(v,M)=>({t:`Не ругайте себя, если ${M('a',cut(v.a))}`,s:`${M('0','Дело не в Вас')}, а в ${M('b')}`}),
(v,M)=>({h:M('a',cap(cut(v.a))+'?'),t:`Как это исправить: ${M('0','дело не в Вас')}, а в ${M('b')}`,s:'Объясняю простыми словами'}),
(v,M)=>({h:'Честно',t:`${M('a',cap(cut(v.a)))}? Со мной было так же`,s:`${M('0','Дело не в Вас')}, а в ${M('b')}`})],
all:[(v,M)=>({h:`${M('a',cap(v.a))}, но ${M('b')}?`,t:M('c','Дело не в '+v.c),s:M('d','А в '+v.d)}),
(v,M)=>({h:`Вы ${M('a')}, но ${M('b')}?`,t:M('c','Дело не в '+v.c),s:`${M('d','А в '+v.d)}. Объясняю в 3 пунктах`}),
(v,M)=>({t:`Знакомо, когда Вы ${M('a')}, но ${M('b')}?`,s:`${M('c','Дело не в '+v.c)}, ${M('d','а в '+v.d)}`}),
(v,M)=>({t:`Если Вы ${M('a')}, но ${M('b')}, ${M('c','дело не в '+v.c)}`,s:M('d','А в '+v.d)}),
(v,M)=>({t:`Не ищите причину в ${M('c',v.c)}`,s:`Если Вы ${M('a')}, но ${M('b')}, ${M('d','все дело в '+v.d)}`}),
(v,M)=>({h:'Признание',t:M('c','Раньше мне тоже казалось, что все дело в '+v.c),s:M('d','А потом стало ясно: дело в '+v.d)}),
(v,M)=>({h:'Мнение против всех',t:`Вы ${M('a')}? Отлично. Но если ${M('b')}, ${M('d','дело в '+v.d)}`,s:M('c','И точно не в '+v.c)})],
steps:[(v,M)=>({h:'Сохраните себе',t:`${M('0','Как')} ${M('a')}: ${M('1','3 шага')}`,s:M('b','Без '+v.b)}),
(v,M)=>({t:`${M('1','3 шага')}, чтобы ${M('a')}`,s:M('b','Без '+v.b)}),
(v,M)=>({t:`Хотите ${M('a')}, но не знаете, с чего начать?`,s:`${M('1','3 простых шага')} ${M('b','без '+v.b)}`}),
(v,M)=>({t:`Если хотите ${M('a')}, откажитесь от ${M('b')}`,s:`И сделайте эти ${M('1','3 шага')}`}),
(v,M)=>({t:`Не пытайтесь ${M('a')}, пока не прочитаете эти ${M('1','3 шага')}`,s:M('b','Без '+v.b)}),
(v,M)=>({h:'Из практики',t:`${M('1','3 шага')}, которые помогают моим клиентам ${M('a')}`,s:M('b','Без '+v.b)}),
(v,M)=>({t:`Вы можете ${M('a')} ${M('b','без '+v.b)}`,s:`Вот ${M('1','3 шага')}`})],
cnt:[(v,M)=>({t:`${M('0','Сколько раз Вы уже пробовали')} ${M('a')}?`,s:'Давайте найдем способ, который сработает'}),
(v,M)=>({t:`3 причины, почему не получается ${M('a')}`,s:'И способ, который сработает'}),
(v,M)=>({t:`Знакомо, когда ${M('0','снова и снова пробуете')} ${M('a')}?`,s:'Давайте найдем способ, который сработает'}),
(v,M)=>({t:`Если ${M('0','Вы уже не раз пробовали')} ${M('a')}, прочитайте это`,s:'Возможно, дело просто в способе'}),
(v,M)=>({t:`Не ${M('0','пробуйте еще раз')} ${M('a')}, пока не прочитаете это`,s:'Сначала найдем способ, который сработает'}),
(v,M)=>({t:`Как наконец ${M('a')}`,s:'Без сотой попытки по старой схеме'}),
(v,M)=>({h:'Из практики',t:`Ко мне чаще всего приходят, когда ${M('0','устали пробовать')} ${M('a')}`,s:'И вот что помогает'})],
story:[(v,M)=>({h:'Признание',t:M('a','Раньше мне казалось, что все дело в '+v.a),s:M('b','Сейчас я знаю: дело в '+v.b)}),
(v,M)=>({t:M('a','3 причины, почему дело не в '+v.a),s:M('b','А в '+v.b)}),
(v,M)=>({t:M('a','Знакомо, когда кажется, что все дело в '+v.a+'?'),s:M('b','На самом деле дело в '+v.b)}),
(v,M)=>({t:M('a','Если Вы думаете, что все дело в '+v.a+', прочитайте это'),s:M('b','Дело в '+v.b)}),
(v,M)=>({t:M('a','Не ищите ответ в '+v.a),s:M('b','Он в '+v.b)}),
(v,M)=>({h:'Признание',t:M('a','Годы практики, один вывод: дело не в '+v.a),s:M('b','А в '+v.b)}),
(v,M)=>({t:M('a','Вы правда думаете, что дело в '+v.a+'?'),s:M('b','Чаще всего дело в '+v.b)})],
who:[(v,M)=>({h:'Для Вас',t:`${M('0','Для тех, кто хочет')} ${M('a')}`,s:M('b')}),
(v,M)=>({t:`3 шага ${M('0','для тех, кто хочет')} ${M('a')}`,s:M('b')}),
(v,M)=>({t:`Знакомо, когда ${M('0','хочется')} ${M('a')}, но не выходит?`,s:M('b')}),
(v,M)=>({t:`Если ${M('0','Вы хотите')} ${M('a')}, это для Вас`,s:M('b')}),
(v,M)=>({t:`Не листайте дальше, если ${M('0','хотите')} ${M('a')}`,s:M('b')}),
(v,M)=>({t:`Как ${M('a')}: для тех, кто готов начать`,s:M('b')}),
(v,M)=>({h:'Из практики',t:`Я помогаю тем, ${M('0','кто хочет')} ${M('a')}`,s:M('b')})],
want:[(v,M)=>({t:`${M('0','Хотите')} ${M('a')}, ${M('1','но мешает')} ${M('b')}?`,s:M('c')}),
(v,M)=>({t:`3 способа ${M('a')}, даже если ${M('1','мешает')} ${M('b')}`,s:M('c')}),
(v,M)=>({t:`Знакомо: ${M('0','хочется')} ${M('a')}, ${M('1','но мешает')} ${M('b')}?`,s:M('c')}),
(v,M)=>({t:`Если ${M('0','хотите')} ${M('a')}, ${M('1','но мешает')} ${M('b')}, это нормально`,s:M('c')}),
(v,M)=>({t:`${M('1','Мешает')} ${M('b')}? Не сдавайтесь`,s:`Вы можете ${M('a')}. ${M('c')}`}),
(v,M)=>({t:`Как ${M('a')}, когда ${M('1','мешает')} ${M('b')}`,s:M('c')}),
(v,M)=>({h:'Из практики',t:`Чаще всего клиентам ${M('1','мешает')} одно: ${M('b')}`,s:`${M('c')}, и Вы сможете ${M('a')}`})],
intr:[(v,M)=>({h:'Из практики',t:`${M('0','Одна фраза в профиле принесла мне')} ${M('a')} заявок`,s:M('b','И это была не фраза про '+v.b)}),
(v,M)=>({t:`${M('0','3 слова в профиле принесли мне')} ${M('a')} заявок`,s:M('b','И ни одно не про '+v.b)}),
(v,M)=>({t:M('b','Знакомо, когда пишете про '+v.b+', а заявок нет?'),s:`${M('0','Одна фраза принесла мне')} ${M('a')} заявок`}),
(v,M)=>({t:M('b','Если пишете только про '+v.b+', клиенты проходят мимо'),s:`${M('0','Одна фраза о другом принесла мне')} ${M('a')} заявок`}),
(v,M)=>({t:M('b','Не пишите про '+v.b+', пока не прочитаете это'),s:`${M('0','Одна фраза принесла мне')} ${M('a')} заявок`}),
(v,M)=>({t:`Как ${M('0','одна фраза в профиле принесла')} ${M('a')} заявок`,s:M('b','Подсказка: она не про '+v.b)}),
(v,M)=>({t:`Вы удивитесь, какая ${M('0','фраза принесла мне')} ${M('a')} заявок`,s:M('b','Точно не про '+v.b)})]};
for(const k in X)SCH[k].x=X[k]})();
const PLUS={};
const schC=k=>{const V=variants(k),j=Math.min(st.vn[k]||0,V.length-1);return `<div class="form" id="bform">${formula(k,j)}</div><div class="cover an" id="bprev">${coverH(out(k,V[j],j))}</div><div class="nums">${V.map((_,i)=>`<button class="num ${i===j?'on':''}" data-bn="${i}">${i+1}</button>`).join('')}</div><button class="btn goldb cpbtn" data-cpb="1" data-snd="cta">Скопировать заголовок</button>`};
const formula=(k,j)=>{const X=SCH[k].x,P=SCH[k].p,T={};P.forEach(([key])=>T[key]='\u0003'+key+'\u0004');const v=new Proxy({},{get:(o,key)=>T[key]||''});
const M=(key,t)=>{const i=P.findIndex(x=>x[0]===key);let c=t==null?T[key]:String(t);const lit=c.replace(/\u0003[^\u0004]*\u0004/g,'').replace(/[*]/g,'').trim();
c=/[0-9A-Za-zА-Яа-я]/.test(lit)?c.replace(/\u0003[^\u0004]*\u0004/g,'…').replace(/[*]/g,''):P[i][1]+lit;return '\u0001'+i+c+'\u0002'};
const x=(j!=null&&X?X[j%X.length]:SCH[k].g)(v,M),parts=[];
[x.h,x.t,x.s].filter(Boolean).forEach(line=>String(line).split(/(\u0001\d[^\u0002]*\u0002)/).forEach(seg=>{const m=seg.match(/^\u0001(\d)([^\u0002]*)\u0002$/);
if(m)parts.push(`<span class="hl h${m[1]}">${esc(m[2])}</span>`);else{const t=seg.trim();if(t)parts.push(esc(t))}}));
return parts.join(' <b class="pl">+</b> ')};
function chips(k){const s=sp(),b=s.b,P=s.pairs,u=x=>[...new Set(x)];const sacs=u([b.sac,'лишнего стресса','сложных схем','долгих поисков']),real=u([b.realx,'системе','первом маленьком шаге']),
pains=u([b.pain,b.pain2]),likes=u([b.like,'делаете все по инструкции','стараетесь изо всех сил']),fails=u([b.fail,'результата все нет','все остается как было']),notx=u([b.notx,'силе воли','удаче','мотивации']);
return{why:{a:u([b.ca,b.ca2,'мои клиенты','даже опытные люди']),b:pains,c:u([b.even,'очень стараются','делают все по правилам'])},
ben:{a:u([b.want,b.want2,'Результат, который *видно*']),c:sacs},
hook:{a:u([`${cap(b.like)}, но ${b.fail}?`,`Хотите ${b.pain2}?`,'Узнали себя?']),b:u([plain(b.want),plain(b.want2),`Как ${b.pain}`]),c:['Напишите мне, и я подскажу первый шаг','Сохраните, чтобы не потерять',`Без ${b.sac}`]},
prov:{a:u([b.sin,b.sin2,'Вы снова отложили все на понедельник','Вы пообещали себе начать и не начали']),b:real},
all:{a:likes,b:fails,c:notx,d:real},steps:{a:pains,b:sacs},cnt:{a:u([...pains,'разобраться в этом самостоятельно','решить это в одиночку','найти ответ в интернете','начать заново','довести дело до конца'])},story:{a:notx,b:real},
pain:{a:u([`${cap(b.like)}, но ${b.fail}?`,`Хотите ${b.pain}, но не знаете, с чего начать?`,`Устали ждать, когда получится ${b.pain2}?`]),b:u([`Покажу, как ${b.pain}`,`Покажу, как ${b.pain2}`,plain(b.want)]),c:u([`Секрет в ${b.realx}`,'Секрет в системе','Секрет в первом маленьком шаге'])},
who:{a:u([b.pain,b.pain2,'перестать откладывать важное на потом']),b:u([`Что Вы получите: ${low(plain(b.want))}`,`Что Вы получите: ${low(plain(b.want2))}`,...P.slice(0,3).map(p=>`Клиенты говорят: «${cut(p[1])}»`)])},
offer:{a:['Открываю запись на этот месяц','Набираю небольшую группу','Осталось несколько мест'],b:u([plain(b.want),plain(b.want2),`Покажу, как ${b.pain}`]),c:['Напишите мне, чтобы забронировать место','Подробности в сообщениях','Напишите «хочу», и я расскажу детали']},
want:{a:u([b.pain,b.pain2]),b:['нехватка времени','страх ошибиться','путаница в советах','неуверенность в себе'],c:['Разберем это вместе','Покажу, с чего начать','Помогу сделать первый шаг']},
intr:{a:['несколько','неожиданно много'],b:u(P.map(p=>low(p[0])))}}[k]}
function items(type){const s=sp();if(!s){return{e:['why','all','steps'],s:['ben','pain','who','offer','want','hook'],r:['prov','cnt','hook'],p:['story','intr','hook']}[type].map(k=>[k,{}])}
const b=s.b,p=s.pairs[st.pk==null?0:st.pk],m=cut(p[1]),m0=low(p[0]),w=b.want,wa=(w.match(/\*([^*]+)\*/)||[,''])[1];
return{e:[['why',{a:b.ca,b:b.pain,c:b.even}],['all',{a:b.like,b:b.fail,c:b.notx,d:b.realx}],['steps',{a:b.pain,b:b.sac}],['hook',{a:`${cap(b.like)}, но ${b.fail}?`,b:`Что на самом деле нужно, чтобы ${b.pain}`,c:`Подсказка: точно не ${m0}`}]],
s:[['ben',{a:w,c:b.sac}],['pain',{}],['who',{}],['offer',{}],['want',{}],['hook',{a:`${cap(b.like)}, но ${b.fail}?`,b:plain(w),c:'Напишите мне, и я подскажу первый шаг'}],['hook',{a:`Клиенты говорят мне: «${m}»`,b:plain(w),c:`Покажу, как прийти к этому без ${b.sac}`}]],
r:[['prov',{a:b.sin,b:b.realx}],['hook',{a:'Мнение против всех',b:`${cap(b.like)}? Возможно, именно это и мешает`,c:`Дело не в ${b.notx}`}],['cnt',{a:b.pain}],['hook',{a:'Узнали себя?',b:`5 ошибок тех, кто хочет ${b.pain}`,c:'Третья есть почти у всех'}]],
p:[['story',{a:b.notx,b:b.realx}],['intr',{a:'несколько',b:m0}],['hook',{a:'Личная история',b:'Одна фраза клиента изменила мой подход к работе',c:`«${m}»`}]]}[type]}
function out(k,v,j){const P=SCH[k].p.map(x=>x[0]);const M=(key,t)=>MK(P.indexOf(key),t==null?v[key]:t);const X=SCH[k].x;return (j!=null&&X?X[j%X.length]:SCH[k].g)(v,M)}
const strip=s=>plain(String(s).replace(/[\u0001\u0002]|\u0001\d/g,'').replace(/\u0001\d?/g,''));
const hl=s=>acc(String(s)).replace(/\u0001(\d)([^\u0002]*)\u0002/g,'<span class="hl h$1">$2</span>');
const txt=x=>[x.h,x.t,x.s].filter(Boolean).map(t=>strip(String(t).replace(/\u0001\d/g,''))).join('\n');
const coverH=(x)=>{const L=strip(String(x.t).replace(/\u0001\d/g,'')).length;return `${orn(300,'right:-130px;top:-130px')}${x.h?`<div class="hk">${hl(x.h)}</div>`:''}<div class="ht ${L>70?'l':L>42?'m':''}">${hl(x.t)}</div><div class="sb">${hl(x.s)}</div>`};
function key(i){return (sp()?st.ci+'.'+st.si+'.'+st.pk:'x')+'|'+st.type+'|'+i}
function getV(i,def){const k=key(i);if(!st.vals[k])st.vals[k]={...def};return st.vals[k]}
/* ---------- screens ---------- */
const TYPES={e:['Экспертный','Объясняете, почему не получается'],s:['Продающий','Показываете результат и зовете к себе'],r:['Развлекающий','Цепляете честным «грешком» или смелым мнением'],p:['Личный','История из практики, признание или интрига']};
const BOTTOM=`<div class="don"><button class="btn soft" data-don="1">ПОДДЕРЖАТЬ АВТОРА ПРИЛОЖЕНИЯ ♥</button>
<button class="btn soft" data-ord="1" style="margin-top:12px">ХОЧУ ТАКОЕ ПРИЛОЖЕНИЕ ДЛЯ СВОЕГО ДЕЛА</button></div>`;
function variants(k){const C=chips(k),F=SCH[k].f.map(f=>f[0]),all=[];const rec=(i,v)=>{if(i===F.length){all.push(v);return}C[F[i]].forEach(o=>rec(i+1,{...v,[F[i]]:o}))};rec(0,{});
const N=all.length;if(SCH[k].x&&N<7)return [0,1,2,3,4,5,6].map(j=>all[j%N]);if(N<=7)return all;const idx=[...new Set([0,1,2,3,4,5,6].map(j=>Math.round(j*(N-1)/6)))];return idx.map(i=>all[i])}
const S={
hero:()=>`<section class="scr dark">${orn(460,'right:-190px;top:-110px')}${orn(280,'left:-130px;bottom:-70px',1)}
<div style="margin-top:3vh"><h1>Что на самом деле<br><span class="gt">ищет Ваш клиент</span></h1><p class="h-sub">Карта смыслов:<br>34 сферы экспертов</p>
<details class="hidea"><summary>Что клиенты покупают на самом деле?</summary><p>Не услугу, а изменение в своей жизни. Человек платит за то, что станет проще.</p>
${[['Разбор гардероба','Утром быстро одеться и не покупать вещи наугад'],['Уборка по часам','Свободный вечер и приятный дом'],['Контент-план','Не гадать, о чем писать']].map(p=>`<div class="hx"><span>Вы продаете: ${p[0]}</span><b>Клиент покупает: ${p[1]}</b></div>`).join('')}
<p>Найдите, кто Ваша аудитория, какая у нее боль и что она не может решить без Вас.</p></details><div class="line"></div>
<p class="sub">Клиенты покупают не услугу, а изменение в своей жизни. Найдите, какое именно, и заберите готовый заголовок.</p>
<button class="btn goldb" data-go="cats" data-snd="cta" style="margin-top:18px">Найти свою сферу</button><button class="btn goldb" data-go="how" data-snd="cta">Собрать свой заголовок</button>
<button class="btn goldo" data-ov="1">Узнать сильные стороны по дате рождения</button>
<button class="btn hord" data-ord="1">Хочу такое приложение для своего дела</button><button class="hdon" data-don="1">Поддержать автора ♥</button>
</div></section>`,
how:()=>`<section class="scr light"><p class="kick">Как это работает</p><h2>Ваш заголовок <span class="gt nw">за 4 шага</span></h2>
<ul class="bul"><li><b>Тип поста:</b><span class="subl">экспертный · продающий · развлекающий · личный</span></li><li><b>Сфера:</b> выберите свою нишу.</li><li><b>Смысл:</b> нажмите на то, что на самом деле покупает Ваш клиент.</li><li><b>Готовый заголовок:</b> скопируйте или соберите свой.</li></ul>
<button class="btn goldb" data-go="cats" data-snd="cta">Найти свою сферу</button></section>`,
idea:()=>`<section class="scr light"><p class="kick">Главная мысль</p><h2>Не описывайте услугу, <span class="gt">покажите изменение</span></h2>
<p class="sub">Человек платит за то, что станет проще в его жизни.</p>
<div class="ex">${[['Разбор гардероба','Утром быстро одеться и не покупать вещи наугад'],['Уборка по часам','Свободный вечер и приятный дом'],['Контент-план','Не гадать, о чем писать'],['Расклад карт','Новый взгляд на тревожащий вопрос и следующий шаг']].map(p=>`<div class="card"><div class="sold"><b>Вы продаете</b>${p[0]}</div><div class="buy"><b>Клиент покупает</b>${p[1]}</div></div>`).join('')}</div>
<details><summary>Как найти свой смысл</summary><p class="lead">Ответьте на три вопроса:</p><ul><li><b>Кто Ваша аудитория?</b> Конкретные люди, а не «все».</li><li><b>Какая у нее боль?</b> Что мешает ей прямо сейчас.</li><li><b>Что она не может решить без Вас?</b> Именно это она и покупает.</li></ul></details>
<button class="btn goldb" data-go="cats" data-snd="cta">Далее: найти свою сферу</button></section>`,
type:()=>`<section class="scr light"><p class="kick">Тип поста</p><h2>Какой <span class="gt nw">пост пишем?</span></h2>
${Object.entries(TYPES).map(([k,v])=>`<div class="tb" style="--d:${Object.keys(TYPES).indexOf(k)*.7}s" data-type="${k}" data-snd="sel" role="button" tabindex="0"><div class="tbtn">${v[0]}</div><p>${v[1]}</p></div>`).join('')}</section>`,
cats:()=>`<section class="scr light"><p class="kick">Шаг 1 · Сфера</p><h2>Выберите <span class="gt nw">свою сферу</span></h2><p class="note">Нет своей? Выберите близкую по смыслу</p>
${D.cats.map((c,ci)=>`<button class="lb" style="--d:${ci*.6}s" data-cat="${ci}" data-snd="sel">${esc(c.name)}</button>`).join('')}</section>`,
sph:()=>{const c=D.cats[st.cc];return `<section class="scr light"><p class="kick">Шаг 2 · ${esc(c.name)}</p><h2>Ваша <span class="gt nw">ниша</span></h2><p class="note">Нет своей? Выберите близкую по смыслу</p>
${c.sp.map((s,si)=>`<button class="lb ${st.ci===st.cc&&st.si===si?'on':''}" style="--d:${si*.6}s" data-sp="${st.cc}.${si}" data-snd="sel">${esc(s.name)}</button>`).join('')}</section>`},
cards:()=>{const s=sp();return `<section class="scr light"><p class="kick">Шаг 3 · ${esc(s.name)}</p><h2 class="one">Что покупает <span class="gt">Ваш клиент</span></h2>
<p class="hint">Нажмите на смысл, который подходит Вам</p><p class="cue">↓</p>
${s.pairs.map((p,n)=>`<div class="card pair ${st.pk===n?'on':''}" data-pk="${n}"><div class="sold"><b>Вы продаете</b>${esc(p[0])}</div><div class="buy"><b>Клиент покупает</b>${esc(p[1])}</div>
<button class="btn goldb sm" data-mk="${n}" data-snd="cta">Создать заголовок →</button></div>`).join('')}</section>`},
heads:()=>{const L=items(st.type),s=sp(),G=[];L.forEach(([k,v],i)=>{let g=G.find(x=>x.k===k);if(!g)G.push(g={k,it:[]});g.it.push([v,i])});
if(!G.some(g=>g.k===st.sk))st.sk=G[0].k;const sk=st.sk;
return `<section class="scr light"><p class="kick">Шаг 4 · ${esc(s.name)}</p><h2>Готовые заголовки <span class="gt">для Вашей сферы</span></h2>
<div class="tabs">${Object.entries(TYPES).map(([k,v])=>`<button data-tt="${k}" class="${k===st.type?'on':''}">${v[0]}</button>`).join('')}</div>
<p class="schh">Схема</p><div class="schl" style="--n:${G.length>4?3:G.length}">${G.map((g,i)=>`<button class="schb ${g.k===sk?'on':''}" data-sk="${g.k}" data-snd="sch"><b>${i+1}</b><span>${SCH[g.k].sn}</span></button>`).join('')}</div>
<div class="sch" id="schc">${schC(sk)}</div>
<div class="dvd"></div><div class="wine"><p class="wk">А теперь о Вас</p><button class="btn goldb" data-ov="1" data-snd="cta">Узнать сильные стороны по дате рождения</button>${BOTTOM}</div></section>`},
order:()=>{const body=encodeURIComponent('Здравствуйте!\n\nХочу такое приложение для своего дела.\n\nМоя сфера: \nИдея приложения: \nМатериалы (мини-продукты, PDF): \nЖелаемый стиль и цвета: \n\nКак со мной связаться: ');
return `<section class="scr light"><p class="kick">Для экспертов</p><h2>Приложение <span class="gt nw">для Вашего дела</span></h2>
<p class="sub">Соберу такое же интерактивное приложение под Вашу экспертность.</p>
<p class="ordh">Что нужно от Вас</p><ul class="bul"><li>Опишите свою сферу и идею</li><li>Пришлите свои мини-продукты, материалы или PDF</li><li>Выберите стиль и цвета</li></ul>
<p class="price">Стоимость: <b>4 999 ₽</b></p>
<a class="btn goldb" href="mailto:${MAIL}?subject=${encodeURIComponent('Хочу такое приложение')}&body=${body}">Написать на почту</a>
<button class="mailc" data-cpm="1"><span>${MAIL}</span><small>скопировать</small></button>
<button class="btn soft" id="back2">← Назад</button></section>`},
final:()=>`<section class="scr dark">${orn(400,'right:-170px;top:-70px')}<div style="margin-top:8vh">
<h2>Вы нашли, что ищет Ваш клиент. <span class="gt">А что сильнее всего в Вас самих,</span> подскажет дата рождения</h2>
<p class="sub">Персональный разбор: Ваша сильная сторона, удобный формат контента и шаги для блога.</p>
<button class="btn goldb" data-ov="1" style="margin-top:30px">Полный разбор карты — 990 ₽</button>
<button class="btn ghost" data-go="heads">Собрать еще заголовок</button><button class="btn ghost" data-go="cats">Другая сфера</button></div></section>`};
const STEPN={cats:1,sph:2,cards:3,heads:4,final:5};
function render(dir){app.innerHTML=S[cur]();app.firstElementChild.classList.add(dir==='b'?'in-l':'in-r');
document.body.classList.toggle('dk',cur==='hero'||cur==='final');
const n=STEPN[cur]||0;$('#steps').innerHTML=n?[1,2,3,4].map(i=>`<i class="${i<=n?'on':''}"></i>`).join('')+`<span>${n<5?'Шаг '+n+' из 4':'Готово'}</span>`:'';
$('#back').disabled=!hist.length;$('#menu').hidden=true;scrollTo(0,0);}
function go(v,noHist){$('#menu').hidden=true;if((v==='cards'||v==='heads')&&!sp())v='cats';if(v==='cats'&&!st.type)st.type=Object.keys(TYPES)[0];if(v==='heads'&&sp()&&st.pk==null)st.pk=0;if(v===cur&&v!=='heads')return;if(!noHist)hist.push(cur);cur=v;render('f')}
/* ---------- events ---------- */
document.addEventListener('click',e=>{const t=e.target.closest('button,a,[data-pk],[data-type]');if(!t)return;const d=t.dataset;
if(t.dataset.th){setTh(t.dataset.th);tone('th_'+t.dataset.th);return}
if(t.id==='menuBtn'){tone($('#menu').hidden?'menu':'menuc');$('#menu').hidden=!$('#menu').hidden;return}
if(!e.target.closest('#menu'))$('#menu').hidden=true;
if(t.id==='snd'||t.id==='sndb'){sound=!sound;localStorage.setItem('snd2',sound?'1':'0');sndUI();tone('nav');return}
if(t.id==='ovx'){tone('ovc');closeOv();return}
if(t.id==='back'){tone('back');if(hist.length){cur=hist.pop();render('b')}return}
if(d.cp!=null){e.stopPropagation();const p=sp().pairs[d.cp];copy('Вы продаете: '+p[0]+'\nКлиент покупает: '+p[1]);return}
if(d.cpv!=null){copy(txt(out(d.k,items(st.type)[+d.cpv][1])));return}
if(d.cpb){const k=st.sk,V7=variants(k);{const j=Math.min(st.vn[k]||0,V7.length-1);copy(txt(out(k,V7[j],j)))};return}
if(d.ov){openOv();return}
if(d.don){tone('nav');if(DONATE_URL)location.href=DONATE_URL;else toast('Скоро можно будет поддержать проект');return}
if(d.ord){tone('cta');if(ORDER_URL)location.href=ORDER_URL;else go('order');return}
if(d.cpm){copy(MAIL);return}
if(t.id==='back2'){tone('back');if(hist.length){cur=hist.pop();render('b')}return}
if(t.tagName==='A'){tone('cta');return}
tone(d.bn!=null?'n'+d.bn:d.sp?'sph':d.cat!=null?'cat':d.tt?'tab':d.type?'ptype':d.mk!=null||d.pk!=null?'mean':(d.snd||'nav'));
if(d.go)return go(d.go);
if(d.type){st.type=d.type;return go('cats')}
if(d.tt){st.type=d.tt;st.sk=null;render('n');return}
if(d.sk){st.sk=d.sk;$$('.schb').forEach(b=>b.classList.toggle('on',b===t));$('#schc').innerHTML=schC(st.sk);return}
if(d.bn!=null){const k=st.sk;st.vn[k]=+d.bn;$$('.num').forEach(b=>b.classList.toggle('on',b===t));const p=$('#bprev');p.innerHTML=coverH(out(k,variants(k)[st.vn[k]],st.vn[k]));const fm=$('#bform');if(fm)fm.innerHTML=formula(k,st.vn[k]);p.classList.remove('an');void p.offsetWidth;p.classList.add('an');return}
if(d.cat!=null){st.cc=+d.cat;return go('sph')}
if(d.sp){t.classList.add('on');const[a,b]=d.sp.split('.').map(Number);if(st.ci!==a||st.si!==b)st.pk=null;st.ci=a;st.si=b;setTimeout(()=>go('cards'),220);return}
if(d.mk!=null){st.pk=+d.mk;return go('heads')}
if(d.pk!=null){st.pk=+d.pk;$$('.pair').forEach(c=>c.classList.toggle('on',c===t));return}});
document.addEventListener('toggle',e=>{if(e.target.tagName==='DETAILS')tone('acc')},true);
$('#snd').textContent='Звук: '+(sound?'вкл':'выкл');
const THS=[["bur","#5A0F14","Бордо"],["olive","#556B2F","Олива"],["vip","#0E0E0E","Черный"],["white","#FFFFFF","Белый"]];$('#thm').insertAdjacentHTML('beforeend',THS.map(x=>`<button data-th="${x[0]}" style="background:${x[1]}" aria-label="${x[2]}" title="${x[2]}"></button>`).join(''));$('#menu .mth').innerHTML=THS.map(x=>`<button data-th="${x[0]}"><i style="background:${x[1]}"></i>${x[2]}</button>`).join('');
function setTh(k){THS.forEach(x=>document.body.classList.toggle(x[0],x[0]===k&&k!=='bur'));localStorage.setItem('thm',k);$$('[data-th]').forEach(b=>b.classList.toggle('on',b.dataset.th===k))}
setTh(localStorage.getItem('thm')||'bur');
const SVON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/></svg>',SVOFF='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9.5l5 5M22 9.5l-5 5"/></svg>';
function sndUI(){$('#sndb').innerHTML=sound?SVON:SVOFF;$('#sndb').setAttribute('aria-pressed',sound);$('#snd').textContent='Звук: '+(sound?'вкл':'выкл')}
sndUI();
render('f');
/* ---------- sparkles ---------- */
(()=>{const c=$('#spark'),x=c.getContext('2d');if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;let W,H,P=[];
const sp=document.createElement('canvas');sp.width=sp.height=32;const sx=sp.getContext('2d'),g=sx.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,'rgba(243,220,160,1)');g.addColorStop(.35,'rgba(232,199,122,.6)');g.addColorStop(1,'rgba(184,137,59,0)');sx.fillStyle=g;sx.fillRect(0,0,32,32);
const rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight};rs();addEventListener('resize',rs);
for(let i=0;i<30;i++)P.push({x:Math.random(),y:Math.random(),r:4+Math.random()*9,vy:.0002+Math.random()*.0005,vx:(Math.random()-.5)*.0002,p:Math.random()*6});
let last=0;(function f(t){requestAnimationFrame(f);if(t-last<33)return;last=t;x.clearRect(0,0,W,H);P.forEach(s=>{s.y-=s.vy*1.6;s.x+=s.vx;if(s.y<-.02){s.y=1.02;s.x=Math.random()}x.globalAlpha=.3+.4*Math.sin(t/700+s.p)**2;x.drawImage(sp,s.x*W-s.r,s.y*H-s.r,s.r*2,s.r*2)})})(0)})();

/* iOS: разблокировка звука + магический шелест при загрузке */
(function(){var S='data:audio/wav;base64,UklGRl4RAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YToRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',ok=0,sh=0;function G(){return ctx()}function ON(){return sound}
function shimmer(){if(sh||!ON())return;var c=G();if(c.state!=='running')return;sh=1;var t=c.currentTime+.05,out=c.createGain();out.gain.value=.9;out.connect(c.destination);
var d=1.8,n=Math.floor(c.sampleRate*d),b=c.createBuffer(1,n,c.sampleRate),x=b.getChannelData(0);for(var i=0;i<n;i++)x[i]=Math.random()*2-1;
var s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=b;f.type='bandpass';f.Q.value=.7;f.frequency.setValueAtTime(500,t);f.frequency.exponentialRampToValueAtTime(3600,t+d*.7);f.frequency.exponentialRampToValueAtTime(1800,t+d);
g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.035,t+.6);g.gain.linearRampToValueAtTime(0,t+d);s.connect(f).connect(g).connect(out);s.start(t);
[1046.5,1318.5,1567.98,1760,2093].forEach(function(fr,k){var o=c.createOscillator(),q=c.createGain(),tt=t+.25+k*.17;o.type='sine';o.frequency.value=fr;q.gain.setValueAtTime(0,tt);q.gain.linearRampToValueAtTime(.018,tt+.04);q.gain.exponentialRampToValueAtTime(.0001,tt+1.3);o.connect(q).connect(out);o.start(tt);o.stop(tt+1.4)})}
function unlock(){var c;try{c=G()}catch(e){return}if(c.state!=='running'||!ok){ok=1;try{var a=new Audio(S);a.setAttribute('playsinline','');a.volume=.01;var p=a.play();p&&p.catch&&p.catch(function(){})}catch(e){}try{var bb=c.createBuffer(1,1,22050),bs=c.createBufferSource();bs.buffer=bb;bs.connect(c.destination);bs.start(0)}catch(e){}}
var r=c.state!=='running'?c.resume():null;function go(){if(c.state==='running'){shimmer();if(sh)E.forEach(function(e){document.removeEventListener(e,unlock,true)})}}go();r&&r.then&&r.then(go,function(){})}
var E=['touchend','click','keydown'];E.forEach(function(e){document.addEventListener(e,unlock,true)});
function tryLoad(){var c;try{c=G()}catch(e){return}var r=c.state!=='running'?c.resume():null;function go(){if(c.state==='running'){shimmer();if(sh)E.forEach(function(e){document.removeEventListener(e,unlock,true)})}}go();r&&r.then&&r.then(go,function(){});setTimeout(function(){if(c.state!=='running'&&AC===c&&!ok){try{c.close()}catch(e){}AC=null}},300)}
document.readyState==='complete'?tryLoad():window.addEventListener('load',tryLoad);})();
