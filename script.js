const headline = document.getElementById('headline');
const backBtn = document.getElementById('backBtn');
const body = document.body;
const whiteOverlay = document.getElementById('whiteOverlay');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function showWhiteScreen(){
  if(prefersReducedMotion){
    body.classList.add('is-white');
    backBtn.removeAttribute('aria-hidden');
    backBtn.focus();
    return;
  }
  body.classList.add('is-white');
  setTimeout(()=>{
    backBtn.removeAttribute('aria-hidden');
    backBtn.focus();
  },500);
}

function hideWhiteScreen(){
  backBtn.setAttribute('aria-hidden','true');
  if(prefersReducedMotion){
    body.classList.remove('is-white');
    headline.focus();
    return;
  }
  body.classList.remove('is-white');
  setTimeout(()=>headline.focus(),500);
}

/* Click or keyboard activate */
headline.addEventListener('click', showWhiteScreen);
headline.addEventListener('keydown', e=>{
  if(e.key==='Enter' || e.key===' '){
    e.preventDefault();
    showWhiteScreen();
  }
});

backBtn.addEventListener('click', hideWhiteScreen);
backBtn.addEventListener('keydown', e=>{
  if(e.key==='Escape') hideWhiteScreen();
});

/* Global escape key to close white screen */
document.addEventListener('keydown', e=>{
  if((e.key==='Escape') && body.classList.contains('is-white')){
    hideWhiteScreen();
  }
});
