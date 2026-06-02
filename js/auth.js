
/**
 * auth.js — 이뻐 관리자 권한 관리
 * 권한: super(슈퍼 어드민) | ops(운영팀) | finance(재무팀)
 *
 * 메뉴 접근 권한:
 *   super   — 전체
 *   ops     — 대시보드·병원관리·온보딩·사이트·CRM·마케팅·CS·설정(본인)
 *   finance — 대시보드·계약·결제·리포트
 */

const ROLES = {
  super:   { label:'슈퍼 어드민', cls:'role-super', menus:'all' },
  ops:     { label:'운영팀',      cls:'role-ops',   menus:['dashboard','hospitals','onboarding','site','crm','marketing','cs','settings'] },
  finance: { label:'재무팀',      cls:'role-finance',menus:['dashboard','contract','billing','reports','settings'] },
};

// 데모용 계정 (실제는 서버 인증)
const DEMO_ACCOUNTS = [
  { email:'admin@ippeo.co.kr',    password:'admin1234',  name:'김운영', role:'super'   },
  { email:'ops@ippeo.co.kr',      password:'ops1234',    name:'이수진', role:'ops'     },
  { email:'finance@ippeo.co.kr',  password:'finance1234',name:'박재무', role:'finance' },
];

var DEFAULT_SESSION = { email:'admin@ippeo.co.kr', name:'김운영', role:'super' };

function getSession() {
  try { return JSON.parse(sessionStorage.getItem('ippeo_user')) || DEFAULT_SESSION; } catch { return DEFAULT_SESSION; }
}
function setSession(user) {
  sessionStorage.setItem('ippeo_user', JSON.stringify(user));
}
function clearSession() {
  sessionStorage.removeItem('ippeo_user');
}
function requireAuth() {
  const user = getSession();
  if (!user) { location.href = getLoginPath(); return null; }
  return user;
}
function getLoginPath() {
  return location.pathname.includes('/html/') ? '../login.html' : 'login.html';
}
function logout() {
  var prev = document.getElementById('__logout-modal');
  if (prev) prev.remove();
  var m = document.createElement('div');
  m.id = '__logout-modal';
  m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;display:flex;align-items:center;justify-content:center';
  m.innerHTML = '<div style="background:#fff;border-radius:16px;padding:28px 32px;width:100%;max-width:380px;box-shadow:0 20px 60px rgba(0,0,0,.2)">'
    + '<div style="font-size:15px;font-weight:700;color:#0F1E3C;margin-bottom:10px">로그아웃</div>'
    + '<div style="font-size:13px;color:#374151;margin-bottom:20px">로그아웃 하시겠습니까?</div>'
    + '<div style="display:flex;gap:8px;justify-content:flex-end">'
    + '<button onclick="document.getElementById(\'__logout-modal\').remove()" style="padding:8px 16px;border-radius:8px;border:1px solid #E5E7EB;background:#fff;font-size:13px;font-family:inherit;cursor:pointer">취소</button>'
    + '<button id="__logout-confirm" style="padding:8px 16px;border-radius:8px;border:none;background:#0F1E3C;color:#fff;font-size:13px;font-family:inherit;cursor:pointer;font-weight:500">로그아웃</button>'
    + '</div></div>';
  document.body.appendChild(m);
  document.getElementById('__logout-confirm').addEventListener('click', function() {
    m.remove();
    clearSession();
    location.href = getLoginPath();
  });
}
function canAccess(menuKey) {
  const user = getSession();
  if (!user) return false;
  const role = ROLES[user.role];
  if (!role) return false;
  if (role.menus === 'all') return true;
  return role.menus.includes(menuKey);
}
