export function nextStep({ symptoms, age, special }) {
  if (symptoms === 'yes' || symptoms === 'unsure') return {
    title: 'Walk in for a diagnostic assessment',
    body: 'Diagnostic mammograms are available during breast health week. Tell the team about your change or concern when you arrive so a clinician can assess you and decide which imaging or other tests are appropriate. Do not register for routine screening when you have symptoms.',
    foot: 'If the change is new or concerning, seek clinical care now rather than waiting until October.'
  };
  if (special === 'yes' || special === 'unsure') return {
    title: 'Speak with the team before imaging',
    body: 'Tell the hospital team if you may be pregnant or may have a higher risk of breast cancer. A clinician can help choose the appropriate timing and type of assessment for you.',
    foot: 'Screening and diagnostic mammograms are available during breast health week; the team will guide your individual pathway.'
  };
  if (age === 'under40') return {
    title: 'Ask a clinician about your screening plan',
    body: 'This walk-in screening week is generally aimed at people aged 40 or older without symptoms. If you are younger, a clinician can advise you based on your history and concerns.',
    foot: 'If you notice a breast change, seek a clinical assessment.'
  };
  return {
    title: 'Walk-in screening may be right for you',
    body: 'You can visit Public Hospital Suddie from Monday 12 to Friday 16 October, 8:00 am–4:00 pm, and ask for the mammography desk. The team will confirm whether screening is suitable and explain the next steps.',
    foot: 'This check does not reserve a place.'
  };
}

if (typeof document !== 'undefined') {
  const form = document.querySelector('#guide-form');
  const result = document.querySelector('#result');
  const reset = document.querySelector('#reset');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form));
    const advice = nextStep(values);
    result.replaceChildren();
    const label = document.createElement('p'); label.className = 'result-label'; label.textContent = 'YOUR SUGGESTED NEXT STEP';
    const heading = document.createElement('h3'); heading.textContent = advice.title;
    const body = document.createElement('p'); body.textContent = advice.body;
    const foot = document.createElement('p'); foot.textContent = advice.foot;
    result.append(label, heading, body, foot);
    result.hidden = false; reset.hidden = false;
    result.focus();
  });
  reset.addEventListener('click', () => { form.reset(); result.hidden = true; reset.hidden = true; form.querySelector('input').focus(); });
  const boxes = [...document.querySelectorAll('#prep-list input')];
  const progressText = document.querySelector('#progress-text');
  const progressFill = document.querySelector('#progress-fill');
  const updateProgress = () => { const done = boxes.filter(box => box.checked).length; progressText.textContent = `${done} of ${boxes.length} ready`; progressFill.style.width = `${100 * done / boxes.length}%`; };
  boxes.forEach(box => box.addEventListener('change', updateProgress));
  document.querySelector('#print-guide').addEventListener('click', () => window.print());
}
