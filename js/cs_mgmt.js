
const CS_ITEMS = [
  {id:1,hospital:'올래성형외과',type:'urgent',title:'사이트 다운 문의',body:'jp.oleps.co.kr 접속이 안된다는 문의가 3건 접수되었습니다.',time:'10분 전',status:'open'},
  {id:2,hospital:'청담미래성형외과',type:'urgent',title:'LINE 연동 오류',body:'LINE 자동상담 응답이 안되고 있습니다. 즉시 확인 필요합니다.',time:'1시간 전',status:'open'},
  {id:3,hospital:'강남뷰티클리닉',type:'normal',title:'B/A 사진 업로드 오류',body:'사진 업로드 시 "파일 형식 오류" 메시지가 뜹니다.',time:'2시간 전',status:'open'},
  {id:4,hospital:'압구정원성형외과',type:'normal',title:'계약 플랜 변경 요청',body:'Basic → Pro 업그레이드 요청입니다.',time:'어제',status:'open'},
  {id:5,hospital:'신사라인성형외과',type:'normal',title:'일본어 카피 수정 요청',body:'홈페이지 메인 카피 일부를 수정해달라는 요청입니다.',time:'어제',status:'closed'},
  {id:6,hospital:'올래성형외과',type:'normal',title:'AEO 추적 리포트 요청',body:'5월 AEO 인용 현황 리포트를 보내달라는 요청입니다.',time:'5/18',status:'closed'},
];
let selectedId = null;
let currentFilter = 'all';

function renderList(filter='all') {
  const el = document.getElementById('cs-list');
  const filtered = filter==='all' ? CS_ITEMS : filter==='urgent' ? CS_ITEMS.filter(c=>c.type==='urgent') : CS_ITEMS.filter(c=>c.status===filter);
  el.innerHTML = filtered.map(c=>`
    <div style="padding:12px 16px;border-bottom:1px solid var(--gray-100);cursor:pointer;background:${selectedId===c.id?'var(--teal-l)':c.type==='urgent'?'#FFF5F5':'#fff'}" onclick="selectCs(${c.id})">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
        ${c.type==='urgent'?'<span style="width:6px;height:6px;border-radius:50%;background:var(--red);flex-shrink:0"></span>':''}
        <span style="font-size:12px;font-weight:500;color:var(--gray-900);flex:1">${c.title}</span>
        <span style="font-size:10px;color:var(--gray-400)">${c.time}</span>
      </div>
      <div style="font-size:12px;color:var(--teal);margin-bottom:3px">${c.hospital}</div>
      <div style="font-size:12px;color:var(--gray-500);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.body}</div>
    </div>`).join('');
}

function selectCs(id) {
  selectedId = id;
  const c = CS_ITEMS.find(x=>x.id===id);
  renderList(currentFilter);
  const el = document.getElementById('cs-detail');
  el.innerHTML = `
    <div style="padding:16px 20px;border-bottom:1px solid var(--gray-100);background:var(--gray-50);display:flex;align-items:center;justify-content:space-between">
      <div>
        <div style="font-size:14px;font-weight:600;color:var(--navy)">${c.title}</div>
        <div style="font-size:12px;color:var(--gray-400);margin-top:3px">${c.hospital} · ${c.time}</div>
      </div>
      <div style="display:flex;gap:6px">
        ${c.status==='open'?`<button class="btn btn-primary" style="font-size:12px" onclick="markCsDone(${c.id})">✓ 처리 완료</button>`:'<span class="badge badge-gray">완료</span>'}
        ${c.type==='urgent'?'<span class="badge badge-red">긴급</span>':''}
      </div>
    </div>
    <div style="flex:1;padding:20px;overflow-y:auto">
      <div style="background:var(--gray-50);border-radius:var(--r);padding:14px;font-size:13px;color:var(--gray-700);line-height:1.7;margin-bottom:16px">${c.body}</div>
      <div style="font-size:12px;font-weight:600;color:var(--gray-500);margin-bottom:8px">답변 작성</div>
      <textarea id="cs-reply-${c.id}" style="width:100%;padding:10px 12px;border:1px solid var(--gray-200);border-radius:var(--r);font-size:13px;font-family:inherit;resize:vertical;line-height:1.6;outline:none" rows="4" placeholder="답변 내용을 입력하세요..."></textarea>
      <div style="display:flex;justify-content:flex-end;gap:6px;margin-top:8px">
        <button class="btn" onclick="saveCsDraft(${c.id})">임시 저장</button>
        <button class="btn btn-primary" onclick="sendCsReply(${c.id})">📤 발송</button>
      </div>
    </div>`;
}

function setCsFilter(f, btn) {
  currentFilter = f;
  document.querySelectorAll('.pill').forEach(p=>p.classList.remove('on'));
  btn.classList.add('on');
  renderList(f);
}

const csKpi = document.getElementById('cs-kpi');
csKpi.innerHTML = [
  {label:'전체 CS',val:'6건',color:'teal'},{label:'미처리',val:'4건',color:'red'},
  {label:'긴급',val:'2건',color:'amber'},{label:'평균 처리 시간',val:'2.3시간',color:'blue'},
].map(k=>`<div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r);padding:12px 16px;border-left:3px solid var(--${k.color})">
  <div style="font-size:12px;color:var(--gray-400);margin-bottom:4px">${k.label}</div>
  <div style="font-size:22px;font-weight:700;color:var(--navy)">${k.val}</div>
</div>`).join('');

renderList();

function showToast(msg,type){var e=document.getElementById('__toast');if(e)e.remove();var bg=type==='success'?'#059669':type==='error'?'#DC2626':'#0F1E3C';var t=document.createElement('div');t.id='__toast';t.style.cssText='position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:'+bg+';color:#fff;padding:11px 22px;border-radius:10px;font-size:13px;font-weight:500;box-shadow:0 4px 20px rgba(0,0,0,.2);z-index:9999;white-space:nowrap';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(function(){t.remove();},300);},2500);}

function markCsDone(id) {
  var item = CS_ITEMS.find(function(c){ return c.id === id; });
  if (!item) return;
  item.status = 'closed';
  renderList(currentFilter);
  showToast('✓ 처리 완료로 변경되었습니다.', 'success');
}

function saveCsDraft(id) {
  var ta = document.getElementById('cs-reply-' + id);
  var txt = ta ? ta.value.trim() : '';
  if (!txt) { showToast('답변 내용을 입력하세요.', 'error'); return; }
  showToast('임시 저장되었습니다.', '');
}

function sendCsReply(id) {
  var ta = document.getElementById('cs-reply-' + id);
  var txt = ta ? ta.value.trim() : '';
  if (!txt) { showToast('답변 내용을 입력하세요.', 'error'); return; }
  var item = CS_ITEMS.find(function(c){ return c.id === id; });
  if (item) item.status = 'closed';
  renderList(currentFilter);
  showToast('✓ 답변이 발송되었습니다.', 'success');
}
