(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const $ = (selector) => document.querySelector(selector);
  const escape = (value) => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const globe = '<svg class="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>';
  const social = (full = false, links = data.socials) => links.map(item => `<a href="${escape(item.url)}" ${item.url.startsWith('https:') ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="${escape(item.name)}${item.url.startsWith('https:') ? ' (opens in new tab)' : ''}">${full ? escape(item.name) + ' ↗' : item.label === 'web' ? globe : escape(item.label)}</a>`).join('');
  $('.social-rail').innerHTML = social();
  $('.footer-socials').innerHTML = social(false, [...data.socials, ...data.footerSocials]);
  $('.contact-socials').innerHTML = social(true);
  const menu = $('.menu-toggle');
  const nav = $('#navigation');
  const closeMenu = () => {nav.classList.remove('open');menu.setAttribute('aria-expanded', 'false');};
  menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true';menu.setAttribute('aria-expanded', String(open));nav.classList.toggle('open', open);});
  nav.addEventListener('click', event => {if(event.target.closest('a'))closeMenu();});
  document.addEventListener('keydown', event => {if(event.key === 'Escape' && nav.classList.contains('open')){closeMenu();menu.focus();}});
  document.addEventListener('click', event => {if(!event.target.closest('.header'))closeMenu();});

  function projectCard(project, duplicate = false) {
    return `<button class="project-card" data-project="${escape(project.id)}" ${duplicate ? 'tabindex="-1"' : ''} aria-label="View ${escape(project.title)}"><div class="project-cover" style="--card-color:${escape(project.color)}"><div class="browser-bar" aria-hidden="true"><i></i><i></i><i></i><span class="browser-address"></span></div><img src="${escape(project.image)}" alt="${duplicate ? '' : escape(project.title + ' interface preview')}" width="380" height="250" loading="lazy"></div><div class="project-meta"><div><h3>${escape(project.title)}</h3><small class="project-category">${escape(project.category)}</small></div><span aria-hidden="true">↗</span></div></button>`;
  }
  $('#project-track').innerHTML = `<div class="project-group">${data.projects.map(p => projectCard(p)).join('')}</div><div class="project-group" aria-hidden="true">${data.projects.map(p => projectCard(p,true)).join('')}</div>`;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = motionQuery.matches;
  const motionButton = $('#motion-toggle');
  const applyMotion = () => {$('#project-track').classList.toggle('paused',paused);motionButton.setAttribute('aria-pressed',String(paused));motionButton.textContent = motionQuery.matches ? 'Reduced motion enabled' : paused ? 'Resume animation ▷' : 'Pause animation Ⅱ';motionButton.disabled=motionQuery.matches;};
  motionButton.addEventListener('click',()=>{paused=!paused;applyMotion();});
  motionQuery.addEventListener('change',()=>{paused=motionQuery.matches;applyMotion();});
  // Keyboard focus pauses the track so a focused card remains visible.
  $('#project-track').addEventListener('focusin',()=>{$('#project-track').style.animationPlayState='paused';});
  $('#project-track').addEventListener('focusout',()=>{$('#project-track').style.animationPlayState='';});
  applyMotion();
  const categories=['Website Design','Mobile App','Landing Page','Dashboard'];
  const folderIcon='<svg viewBox="0 0 36 30" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M2 7V3h12l4 4h16v21H2z"/><path d="M2 11h32"/></svg>';
  $('#folders').innerHTML=categories.map(category=>`<button class="folder" data-category="${category}" aria-haspopup="dialog">${folderIcon}<h3>${category}</h3><span>Open folder</span></button>`).join('');
  const dialog=$('#project-dialog');
  let returnFocus=null;
  let currentCategory=null;
  function showDialog(content){$('#dialog-body').innerHTML=content;if(!dialog.open){returnFocus=document.activeElement;dialog.showModal();document.body.style.overflow='hidden';}dialog.scrollTop=0;$('.close-dialog').focus();}
  function openFolder(category){currentCategory=category;const projects=data.projects.filter(project=>project.category===category);showDialog(`<h2 id="dialog-title">${escape(category)}</h2>${projects.length ? `<div class="dialog-grid">${projects.map(p=>projectCard(p)).join('')}</div>` : '<div class="empty-folder"><p>No projects have been added to this folder yet.</p><p>Browse the website and dashboard folders to see available previews.</p></div>'}`);}
  function openProject(id){const project=data.projects.find(p=>p.id===id);if(!project)return;showDialog(`${currentCategory ? '<button class="text-button dialog-back" id="dialog-back">← Back to folder</button>' : ''}<h2 id="dialog-title">${escape(project.title)}</h2><div class="detail-tags"><span>${escape(project.category)}</span><span>${escape(project.sector)}</span></div><img class="project-detail-image" src="${escape(project.image)}" alt="${escape(project.title)} design preview"><div class="detail-copy"><p>This preview is taken from the supplied portfolio reference. Full-resolution designs and the detailed case study have not been added yet.</p><a class="button dark" href="https://www.behance.net/aliamanzor" target="_blank" rel="noopener noreferrer">Visit Alia’s Behance <span aria-hidden="true">↗</span></a></div>`);}
  document.addEventListener('click',event=>{const category=event.target.closest('[data-category]');if(category){openFolder(category.dataset.category);return;}const project=event.target.closest('[data-project]');if(project){if(!dialog.open)currentCategory=null;openProject(project.dataset.project);return;}if(event.target.closest('#dialog-back'))openFolder(currentCategory);});
  $('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';currentCategory=null;returnFocus?.focus();});

  $('#process-tabs').innerHTML=data.process.map((step,i)=>`<button class="process-tab" id="step-${i}" role="tab" aria-controls="process-panel" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}" data-step="${i}"><b>${String(i+1).padStart(2,'0')}</b><strong>${escape(step.title)}</strong></button>`).join('');
  const processSymbols=[['◎','?','↗'],['▤','→','▦'],['▦','Aa','◉'],['▯','↗','▷'],['✓','↗','✓']];
  function selectStep(index){document.querySelectorAll('.process-tab').forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});const step=data.process[index];$('#process-panel').setAttribute('aria-labelledby',`step-${index}`);$('#process-panel').innerHTML=`<div><h3>${escape(step.short)}</h3><p>${escape(step.description)}</p><div class="outputs">${escape(step.outputs)}</div></div><div class="process-visual" aria-hidden="true">${processSymbols[index].map(s=>`<span>${s}</span>`).join('')}</div>`;}
  $('#process-tabs').addEventListener('click',event=>{const tab=event.target.closest('[data-step]');if(tab)selectStep(Number(tab.dataset.step));});
  $('#process-tabs').addEventListener('keydown',event=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;const current=Number(event.target.closest('[data-step]')?.dataset.step);if(!Number.isFinite(current))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?4:(current+(event.key==='ArrowRight'?1:4))%5;selectStep(next);$(`#step-${next}`).focus();});
  selectStep(0);
  $('#experience-list').innerHTML=data.experience.map(item=>`<article class="experience-item"><div class="experience-top"><h3>${escape(item.company)}</h3><span>${escape(item.date)}</span></div><p class="role">${escape(item.role)}</p><p>${escape(item.description)}</p><details><summary>Key accomplishments</summary><ul>${item.points.map(point=>`<li>${escape(point)}</li>`).join('')}</ul></details></article>`).join('');
  $('#skills').innerHTML=data.skills.map(skill=>`<span>${escape(skill)}</span>`).join('');
  $('#tools').innerHTML=data.tools.map(tool=>`<span>${escape(tool)}</span>`).join('');
  $('#education-list').innerHTML=data.education.map(item=>`<details><summary><span><strong>${escape(item.title)}</strong><small>${escape(item.institution)}</small></span></summary><p>${escape(item.description)}</p></details>`).join('');

  const form=$('#contact-form');
  const status=$('#form-status');
  const mode=data.contact.mode;
  if(mode!=='email')$('#form-help').textContent='Your details are used only to respond to your enquiry.';
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(!form.reportValidity())return;
    const fields=new FormData(form);if(fields.get('company'))return;
    const name=String(fields.get('name')).trim();const email=String(fields.get('email')).trim();const message=String(fields.get('message')).trim();
    status.className='';if(!name || message.length<10){status.textContent='Please enter your name and at least 10 characters about your project.';return;}
    if(mode==='email'){
      const subject=`Portfolio enquiry from ${name}`;
      const body=`Name: ${name}\nEmail: ${email}\n\n${message}`;
      const url=`mailto:${data.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href=url;
      status.textContent='Your email draft is ready. Please send it from your email app. If no app opens, email aliamanzoor680@gmail.com directly. Your message has not been sent by this website.';
      return;
    }
    const button=form.querySelector('[type=submit]');button.disabled=true;button.textContent='Sending…';status.textContent='';
    try{
      let response;
      if(mode==='netlify')response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(fields).toString()});
      else if(mode==='endpoint' && data.contact.endpoint)response=await fetch(data.contact.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,message})});
      else throw new Error('Contact service is not configured.');
      if(!response.ok)throw new Error('Message service rejected the request.');
      status.textContent='Thank you for reaching out! Your message has been sent successfully. I will get back to you as soon as possible.';form.reset();
    }catch(error){status.className='error';status.textContent='Your message could not be sent. Please email aliamanzoor680@gmail.com directly or try again later.';}
    finally{button.disabled=false;button.innerHTML='Send message <span aria-hidden="true">↗</span>';}
  });
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));}});},{rootMargin:'-15% 0px -60% 0px'});['about','work','projects','process','experience','contact'].forEach(id=>observer.observe(document.getElementById(id)));}
})();
