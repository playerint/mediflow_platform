
const SECTIONS = {
  profile: `<div class="card fade">
    <div style="font-size:15px;font-weight:700;color:var(--navy);margin-bottom:16px">👤 내 프로필</div>
    <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--gray-100)">
      <div style="width:60px;height:60px;border-radius:50%;background:var(--teal);color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;cursor:pointer" title="프로필 사진 변경">김</div>
      <div><div style="font-size:14px;font-weight:600;color:var(--navy)" id="profile-name-display">김운영</div><div style="font-size:12px;color:var(--gray-400)" id="profile-role-display"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">이름</div><input type="text" value="김운영"></div>
      <div><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">이메일</div><input type="email" value="admin@MEDIFLOW.co.kr"></div>
    </div>
    <div style="margin-top:12px"><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">현재 비밀번호</div><input type="password" placeholder="변경 시 입력"></div>
  </div>`,

  team: `<div class="card fade">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="font-size:15px;font-weight:700;color:var(--navy)">👥 팀 계정 관리</div>
      <button class="btn btn-primary" style="font-size:12px" onclick="openInviteModal()">+ 멤버 초대</button>
    </div>
    ${[
      {name:'김운영',email:'admin@MEDIFLOW.co.kr',role:'super',last:'방금'},
      {name:'이수진',email:'ops@MEDIFLOW.co.kr',role:'ops',last:'1시간 전'},
      {name:'박재무',email:'finance@MEDIFLOW.co.kr',role:'finance',last:'어제'},
    ].map(m=>`<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--gray-100)">
      <div style="width:34px;height:34px;border-radius:50%;background:var(--teal);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${m.name.charAt(0)}</div>
      <div style="flex:1"><div style="font-size:13px;font-weight:500">${m.name}</div><div style="font-size:12px;color:var(--gray-400)">${m.email}</div></div>
      <span class="role-${m.role}">${m.role==='super'?'슈퍼 어드민':m.role==='ops'?'운영팀':'재무팀'}</span>
      <span style="font-size:12px;color:var(--gray-400)">${m.last}</span>
      <button class="btn btn-danger" style="font-size:12px;padding:3px 8px" onclick="openMemberManage('${m.name}','${m.email}','${m.role}')">관리</button>
    </div>`).join('')}
  </div>`,

  roles: `<div class="card fade">
    <div style="font-size:15px;font-weight:700;color:var(--navy);margin-bottom:16px">🔐 권한 설정</div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="font-size:12px;color:var(--gray-400);text-align:left;padding:8px 12px;border-bottom:2px solid var(--gray-100)">메뉴</th>
            <th style="font-size:12px;padding:8px 12px;border-bottom:2px solid var(--gray-100)"><span class="role-super">슈퍼 어드민</span></th>
            <th style="font-size:12px;padding:8px 12px;border-bottom:2px solid var(--gray-100)"><span class="role-ops">운영팀</span></th>
            <th style="font-size:12px;padding:8px 12px;border-bottom:2px solid var(--gray-100)"><span class="role-finance">재무팀</span></th>
          </tr>
        </thead>
        <tbody>
          ${[
            ['대시보드','✓','✓','✓'],
            ['병원 관리','✓','✓','✗'],
            ['온보딩 관리','✓','✓','✗'],
            ['사이트 관리','✓','✓','✗'],
            ['CRM 관리','✓','✓','✗'],
            ['마케팅 관리','✓','✓','✗'],
            ['CS 관리','✓','✓','✗'],
            ['계약 관리','✓','✗','✓'],
            ['결제 관리','✓','✗','✓'],
            ['리포트','✓','✗','✓'],
            ['설정 (팀 관리)','✓','✗','✗'],
            ['설정 (본인 프로필)','✓','✓','✓'],
          ].map(r=>`<tr>
            <td style="font-size:13px;color:var(--gray-700);padding:10px 12px;border-bottom:1px solid var(--gray-100)">${r[0]}</td>
            <td style="text-align:center;padding:10px 12px;border-bottom:1px solid var(--gray-100);color:var(--green);font-weight:700">${r[1]}</td>
            <td style="text-align:center;padding:10px 12px;border-bottom:1px solid var(--gray-100);color:${r[2]==='✓'?'var(--green)':'var(--red)'};font-weight:700">${r[2]}</td>
            <td style="text-align:center;padding:10px 12px;border-bottom:1px solid var(--gray-100);color:${r[3]==='✓'?'var(--green)':'var(--red)'};font-weight:700">${r[3]}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`,

  notification: `<div class="card fade">
    <div style="font-size:15px;font-weight:700;color:var(--navy);margin-bottom:16px">🔔 알림 설정</div>
    ${[
      ['컴플라이언스 위반 감지','즉시 알림'],['미납 병원 발생','D+1, D+7 알림'],
      ['CS 긴급 접수','즉시 알림'],['온보딩 단계 완료','완료 시 알림'],
      ['계약 만료 임박','30일·7일 전 알림'],['신규 병원 입점','즉시 알림'],
    ].map(([label,sub])=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--gray-100)">
      <div><div style="font-size:13px;font-weight:500;color:var(--gray-900)">${label}</div><div style="font-size:12px;color:var(--gray-400);margin-top:2px">${sub}</div></div>
      <label class="toggle-wrap"><input type="checkbox" checked><div class="toggle-track"></div><div class="toggle-thumb"></div></label>
    </div>`).join('')}
  </div>`,

  system: `<div class="card fade">
    <div style="font-size:15px;font-weight:700;color:var(--navy);margin-bottom:16px">⚙ 시스템 설정</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
      <div><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">플랫폼 이름</div><input type="text" value="MEDIFLOW Admin"></div>
      <div><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">대표 이메일</div><input type="email" value="admin@MEDIFLOW.co.kr"></div>
      <div><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">Claude API 모델</div><select><option>claude-sonnet-4</option><option>claude-haiku-4-5</option></select></div>
      <div><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">기본 언어</div><select><option>한국어</option><option>日本語</option><option>English</option></select></div>
    </div>
    <div style="background:var(--red-l);border:1px solid #FCA5A5;border-radius:var(--rl);padding:16px 20px">
      <div style="font-size:13px;font-weight:700;color:var(--red);margin-bottom:8px">⚠ 위험 구역</div>
      <div style="font-size:12px;color:#991B1B;margin-bottom:12px">모든 데이터를 초기화합니다. 이 작업은 되돌릴 수 없습니다.</div>
      <button class="btn btn-danger" onclick="confirmSystemReset()">시스템 초기화</button>
    </div>
  </div>`,
};

function showSec(key, btn) {
  document.querySelectorAll('.sn-item').forEach(i => i.classList.remove('active'));
  btn.classList.add('active');
  const el = document.getElementById('sec-content');
  el.innerHTML = SECTIONS[key] || '';
  // 프로필 섹션이면 현재 로그인 유저 정보 표시
  if (key === 'profile') {
    const user = getSession ? getSession() : null;
    if (user) {
      const el1 = document.getElementById('profile-name-display');
      const el2 = document.getElementById('profile-role-display');
      if (el1) el1.textContent = user.name;
      if (el2) el2.innerHTML = '<span class="role-'+user.role+'">'+(user.role==='super'?'슈퍼 어드민':user.role==='ops'?'운영팀':'재무팀')+'</span>';
    }
  }
}

showSec('profile', document.querySelector('.sn-item'));

/* ── 유틸 ── */
function showToast(msg,type){const e=document.getElementById('__toast');if(e)e.remove();const bg=type==='success'?'#059669':type==='error'?'#DC2626':'#0F1E3C';const t=document.createElement('div');t.id='__toast';t.style.cssText=`position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:${bg};color:#fff;padding:11px 22px;border-radius:10px;font-size:13px;font-weight:500;box-shadow:0 4px 20px rgba(0,0,0,.2);z-index:9999;white-space:nowrap`;t.textContent=msg;document.body.appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(()=>t.remove(),300);},2500);}
function closeSettingsModal(id='__s-modal'){const m=document.getElementById(id);if(m)m.remove();}
function makeSettingsModal(content){
  closeSettingsModal();
  const m=document.createElement('div');m.id='__s-modal';
  m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9000;display:flex;align-items:center;justify-content:center;padding:20px';
  m.innerHTML=`<div style="background:#fff;border-radius:16px;width:100%;max-width:460px;box-shadow:0 20px 60px rgba(0,0,0,.2);overflow:hidden">${content}</div>`;
  m.addEventListener('click',e=>{if(e.target===m)closeSettingsModal();});
  document.body.appendChild(m);
}

/* ── 💾 설정 저장 ── */
function saveSettings() {
  const inputs = document.querySelectorAll('#sec-content input, #sec-content select, #sec-content textarea');
  if (!inputs.length) { showToast('저장할 설정이 없습니다.', ''); return; }
  const data = {};
  inputs.forEach(el => {
    const key = el.id || el.name || el.placeholder;
    if (key) data[key] = el.type==='checkbox' ? el.checked : el.value;
  });
  try { sessionStorage.setItem('MEDIFLOW_settings', JSON.stringify(data)); } catch(e) {}
  showToast('설정이 저장되었습니다.', 'success');
}

/* ── 멤버 초대 모달 ── */
function openInviteModal() {
  makeSettingsModal(`
    <div style="padding:22px 26px;border-bottom:1px solid var(--gray-100)">
      <div style="font-size:16px;font-weight:700;color:var(--navy)">👥 멤버 초대</div>
    </div>
    <div style="padding:22px 26px;display:flex;flex-direction:column;gap:14px">
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:5px">이메일 주소 <span style="color:var(--red)">*</span></div>
        <input type="email" id="invite-email" placeholder="초대할 이메일을 입력하세요" style="width:100%;padding:8px 12px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:13px;font-family:inherit;box-sizing:border-box">
      </div>
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:5px">권한</div>
        <select id="invite-role" style="width:100%;padding:8px 12px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:13px;font-family:inherit">
          <option value="ops">운영팀</option>
          <option value="finance">재무팀</option>
          <option value="super">슈퍼 어드민</option>
        </select>
      </div>
      <div style="background:var(--gray-50);border-radius:8px;padding:10px 14px;font-size:12px;color:var(--gray-500)">
        초대 이메일이 발송되며, 수신자가 링크를 클릭하면 계정이 생성됩니다.
      </div>
    </div>
    <div style="padding:16px 26px;background:var(--gray-50);display:flex;gap:8px;justify-content:flex-end">
      <button class="btn" onclick="closeSettingsModal()">취소</button>
      <button class="btn btn-primary" onclick="submitInvite()">초대 발송</button>
    </div>
  `);
  setTimeout(()=>document.getElementById('invite-email')?.focus(), 100);
}
function submitInvite() {
  const email = document.getElementById('invite-email')?.value.trim();
  const role  = document.getElementById('invite-role')?.value;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('올바른 이메일을 입력하세요.', 'error'); return; }
  closeSettingsModal();
  showToast(`✓ ${email}로 초대 이메일이 발송되었습니다.`, 'success');
}

/* ── 멤버 관리 모달 ── */
function openMemberManage(name, email, role) {
  const roleLabel = role==='super'?'슈퍼 어드민':role==='ops'?'운영팀':'재무팀';
  makeSettingsModal(`
    <div style="padding:22px 26px;border-bottom:1px solid var(--gray-100)">
      <div style="font-size:16px;font-weight:700;color:var(--navy)">👤 ${name} 계정 관리</div>
      <div style="font-size:12px;color:var(--gray-400);margin-top:2px">${email}</div>
    </div>
    <div style="padding:22px 26px;display:flex;flex-direction:column;gap:14px">
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:5px">권한 변경</div>
        <select id="member-role" style="width:100%;padding:8px 12px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:13px;font-family:inherit">
          <option value="ops" ${role==='ops'?'selected':''}>운영팀</option>
          <option value="finance" ${role==='finance'?'selected':''}>재무팀</option>
          <option value="super" ${role==='super'?'selected':''}>슈퍼 어드민</option>
        </select>
      </div>
      <div style="padding:12px 14px;background:var(--amber-l);border:1px solid #FCD34D;border-radius:8px;font-size:12px;color:#92400E">
        ⚠ 비밀번호 초기화 시 해당 이메일로 임시 비밀번호가 발송됩니다.
      </div>
    </div>
    <div style="padding:16px 26px;background:var(--gray-50);display:flex;gap:8px">
      <button class="btn btn-danger" style="font-size:12px" onclick="removeMember('${name}')">계정 삭제</button>
      <button class="btn" style="font-size:12px" onclick="resetMemberPw('${name}','${email}')">비밀번호 초기화</button>
      <div style="flex:1"></div>
      <button class="btn" onclick="closeSettingsModal()">취소</button>
      <button class="btn btn-primary" onclick="saveMemberRole('${name}')">저장</button>
    </div>
  `);
}
function saveMemberRole(name) {
  const role = document.getElementById('member-role')?.value;
  const label = role==='super'?'슈퍼 어드민':role==='ops'?'운영팀':'재무팀';
  closeSettingsModal();
  showToast(`${name}의 권한이 ${label}으로 변경되었습니다.`, 'success');
}
function resetMemberPw(name, email) {
  openSettingsConfirm(`${name}(${email})의 비밀번호를 초기화하시겠습니까?`, function() {
    closeSettingsModal();
    showToast(`${email}로 임시 비밀번호가 발송되었습니다.`, 'success');
  }, '초기화', false);
}
function removeMember(name) {
  openSettingsConfirm(`<strong>"${name}"</strong> 계정을 삭제하시겠습니까?<br><span style="font-size:12px;color:#9CA3AF">이 작업은 되돌릴 수 없습니다.</span>`, function() {
    closeSettingsModal();
    showToast(`${name} 계정이 삭제되었습니다.`, '');
  }, '삭제', true);
}

/* ── 시스템 초기화 ── */
function confirmSystemReset() {
  openSettingsConfirm('모든 데이터를 초기화하시겠습니까?<br><span style="font-size:12px;color:#9CA3AF">이 작업은 되돌릴 수 없습니다.</span>', function() {
    openSettingsInput('확인 입력', '초기화를 진행하려면 <strong>RESET</strong>을 정확히 입력하세요.', function(code) {
      if (code !== 'RESET') { showToast('초기화가 취소되었습니다.', ''); return; }
      try { sessionStorage.clear(); } catch(e) {}
      showToast('시스템이 초기화되었습니다.', 'success');
      setTimeout(() => location.href = '../index.html', 2000);
    });
  }, '초기화', true);
}

function openSettingsConfirm(msg, onConfirm, confirmLabel, isDanger) {
  var e = document.getElementById('__sc-modal'); if(e) e.remove();
  var m = document.createElement('div'); m.id = '__sc-modal';
  m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9500;display:flex;align-items:center;justify-content:center';
  var btnStyle = isDanger ? 'background:#DC2626;color:#fff' : 'background:#0F1E3C;color:#fff';
  m.innerHTML = '<div style="background:#fff;border-radius:16px;padding:28px 32px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,.2)">'
    + '<div style="font-size:13px;color:#374151;line-height:1.7;margin-bottom:20px">' + msg + '</div>'
    + '<div style="display:flex;gap:8px;justify-content:flex-end">'
    + '<button onclick="document.getElementById(\'__sc-modal\').remove()" style="padding:8px 16px;border-radius:8px;border:1px solid #E5E7EB;background:#fff;font-size:13px;font-family:inherit;cursor:pointer">취소</button>'
    + '<button id="__sc-ok" style="padding:8px 16px;border-radius:8px;border:none;font-size:13px;font-family:inherit;cursor:pointer;font-weight:500;' + btnStyle + '">' + (confirmLabel||'확인') + '</button>'
    + '</div></div>';
  m.addEventListener('click', function(e){ if(e.target===m) m.remove(); });
  document.body.appendChild(m);
  document.getElementById('__sc-ok').addEventListener('click', function(){ m.remove(); if(typeof onConfirm==='function') onConfirm(); });
}

function openSettingsInput(title, msg, onSubmit) {
  var e = document.getElementById('__si-modal'); if(e) e.remove();
  var m = document.createElement('div'); m.id = '__si-modal';
  m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9600;display:flex;align-items:center;justify-content:center';
  m.innerHTML = '<div style="background:#fff;border-radius:16px;padding:28px 32px;width:100%;max-width:400px;box-shadow:0 20px 60px rgba(0,0,0,.2)">'
    + '<div style="font-size:15px;font-weight:700;color:#0F1E3C;margin-bottom:10px">' + title + '</div>'
    + '<div style="font-size:13px;color:#374151;line-height:1.7;margin-bottom:14px">' + msg + '</div>'
    + '<input id="__si-input" type="text" style="width:100%;padding:9px 12px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:13px;font-family:inherit;outline:none;box-sizing:border-box;margin-bottom:16px">'
    + '<div style="display:flex;gap:8px;justify-content:flex-end">'
    + '<button onclick="document.getElementById(\'__si-modal\').remove()" style="padding:8px 16px;border-radius:8px;border:1px solid #E5E7EB;background:#fff;font-size:13px;font-family:inherit;cursor:pointer">취소</button>'
    + '<button id="__si-ok" style="padding:8px 16px;border-radius:8px;border:none;background:#DC2626;color:#fff;font-size:13px;font-family:inherit;cursor:pointer;font-weight:500">확인</button>'
    + '</div></div>';
  m.addEventListener('click', function(e){ if(e.target===m) m.remove(); });
  document.body.appendChild(m);
  var inp = document.getElementById('__si-input');
  inp.focus();
  document.getElementById('__si-ok').addEventListener('click', function(){
    var val = inp.value; m.remove(); if(typeof onSubmit==='function') onSubmit(val);
  });
}
