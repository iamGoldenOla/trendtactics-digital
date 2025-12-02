(function(){
  // Question pools for each service area
  const questionPools = {
    seo: [
      { question: "How important is organic search growth to your business goals right now?", options: [{text:'Top priority',value:3},{text:'Somewhat important',value:2},{text:'Low priority',value:1}]},
      { question: "Do you know which keywords drive real customers (not just traffic)?", options: [{text:'Yes — tracked and prioritized',value:3},{text:'We have ideas',value:2},{text:'No, we don\'t know',value:1}]},
      { question: "How confident are you in your website\'s technical health (speed, crawlability)?", options: [{text:'Confident — good health',value:3},{text:'Some issues',value:2},{text:'Not confident',value:1}]},
      { question: "Does your team produce content with a clear conversion intent?", options: [{text:'Yes, systematic',value:3},{text:'Sometimes',value:2},{text:'No, ad-hoc',value:1}]},
      { question: "Are you measuring revenue or leads that come specifically from organic search?", options: [{text:'Yes, reliably',value:3},{text:'Partly',value:2},{text:'Not measured',value:1}]},
      { question: "If we gave you a prioritized SEO roadmap, would you commit budget/time to implement it?", options: [{text:'Yes — immediately',value:3},{text:'Maybe later',value:2},{text:'No',value:1}]}
    ],
    smm: [
      { question: "How central is social media to your acquisition strategy?", options: [{text:'Central channel',value:3},{text:'Helpful channel',value:2},{text:'Not a priority',value:1}]},
      { question: "Do you maintain a content calendar and test different creative approaches?", options: [{text:'Yes — regular testing',value:3},{text:'Occasional tests',value:2},{text:'No calendar',value:1}]},
      { question: "Can you attribute real leads or revenue to social activities?", options: [{text:'Yes — tracked',value:3},{text:'Partly',value:2},{text:'No',value:1}]},
      { question: "How quickly can your team create new social campaigns and creatives?", options: [{text:'Fast — in-house',value:3},{text:'Moderate',value:2},{text:'Slow/external',value:1}]},
      { question: "Do you have a documented audience and messaging framework for social?", options: [{text:'Yes, detailed',value:3},{text:'Some guidance',value:2},{text:'No',value:1}]},
      { question: "Would you increase budget for social if experiments showed positive ROI?", options: [{text:'Yes, scale up',value:3},{text:'Cautiously',value:2},{text:'Not likely',value:1}]}
    ],
    web: [
      { question: "Do visitors clearly understand what you offer within 5 seconds on your website?", options: [{text:'Yes, crystal clear',value:3},{text:'Somewhat clear',value:2},{text:'No, confusing',value:1}]},
      { question: "Are your conversion funnels (CTAs, forms, checkout) optimized and measured?", options: [{text:'Yes, measured & optimised',value:3},{text:'Partially',value:2},{text:'Not optimised',value:1}]},
      { question: "Is site performance (mobile speed) monitored and prioritised?", options: [{text:'Yes, monitoring & fixes',value:3},{text:'Occasional attention',value:2},{text:'Not monitored',value:1}]},
      { question: "Do you have reliable analytics and event tracking for user journeys?", options: [{text:'Yes — full events',value:3},{text:'Basic analytics',value:2},{text:'No analytics',value:1}]},
      { question: "How often do you release improvements or run experiments?", options: [{text:'Regularly',value:3},{text:'Sometimes',value:2},{text:'Rarely',value:1}]},
      { question: "Would you prioritise product/UX fixes that increase conversions if shown with data?", options: [{text:'Yes — high priority',value:3},{text:'Maybe',value:2},{text:'No',value:1}]}
    ],
    mobile: [
      { question: "Do you have a mobile app or a defined mobile product strategy?", options: [{text:'Yes — product in market',value:3},{text:'Planning/POC',value:2},{text:'No strategy',value:1}]},
      { question: "Are retention and engagement (DAU/MAU) tracked and considered?", options: [{text:'Yes — tracked',value:3},{text:'Partially',value:2},{text:'Not tracked',value:1}]},
      { question: "How strong is your feedback loop from users to product decisions?", options: [{text:'Strong & fast',value:3},{text:'Some feedback',value:2},{text:'Weak/none',value:1}]},
      { question: "Is app performance (loads, crashes) actively monitored?", options: [{text:'Yes, monitored',value:3},{text:'Occasionally',value:2},{text:'Not monitored',value:1}]},
      { question: "Do you have a release/QA cadence that prevents regressions?", options: [{text:'Yes — reliable',value:3},{text:'Ad-hoc',value:2},{text:'No',value:1}]},
      { question: "Would you invest to improve retention if given a clear plan?", options: [{text:'Yes — invest',value:3},{text:'Maybe',value:2},{text:'No',value:1}]}
    ],
    facebook: [
      { question: "Do you have clear customer segments and audiences for paid social?", options: [{text:'Yes — detailed',value:3},{text:'Some segments',value:2},{text:'No segmentation',value:1}]},
      { question: "Are conversion metrics (ROAS, CPA, LTV) actively tracked?", options: [{text:'Yes, daily/weekly',value:3},{text:'Sometimes',value:2},{text:'Not tracked',value:1}]},
      { question: "Do you routinely run A/B tests on creative, copy and offers?", options: [{text:'Yes, systematic',value:3},{text:'Occasionally',value:2},{text:'Rarely',value:1}]},
      { question: "Is your pixel and event tracking set up correctly across funnels?", options: [{text:'Yes',value:3},{text:'Partial',value:2},{text:'No',value:1}]},
      { question: "Can your team produce high-quality ad creative quickly?", options: [{text:'Yes — in-house',value:3},{text:'With partners',value:2},{text:'No',value:1}]},
      { question: "Would you increase ad spend for channels that show consistent positive return?", options: [{text:'Yes — scale',value:3},{text:'Carefully',value:2},{text:'No',value:1}]}
    ],
    email: [
      { question: "Do you actively segment your audience for more relevant email content?", options: [{text:'Yes — detailed',value:3},{text:'Some segmentation',value:2},{text:'No',value:1}]},
      { question: "Do you run automated flows (welcome, nurture, re-engagement)?", options: [{text:'Yes — multiple flows',value:3},{text:'One or two',value:2},{text:'None',value:1}]},
      { question: "Are you testing subject lines, timing and content to improve opens/clicks?", options: [{text:'Regular A/B tests',value:3},{text:'Occasional tests',value:2},{text:'Never',value:1}]},
      { question: "Do you monitor list health (deliverability, spam complaints)?", options: [{text:'Yes — actively',value:3},{text:'Some monitoring',value:2},{text:'Not monitored',value:1}]},
      { question: "Can you attribute revenue or conversions to email efforts?", options: [{text:'Yes — clearly',value:3},{text:'Partly',value:2},{text:'No',value:1}]},
      { question: "Would you invest in improving email performance if shown a clear ROI plan?", options: [{text:'Yes — invest',value:3},{text:'Maybe',value:2},{text:'No',value:1}]}
    ]
  };

  const questionPoolsExecutive = {
    seo: [
      { question: "Is organic search directly contributing to revenue goals?", options:[{text:'Yes — measured',value:3},{text:'Partly',value:2},{text:'No',value:1}]},
      { question: "Would you fund an SEO roadmap that shows clear ROI?", options:[{text:'Yes — approve',value:3},{text:'Maybe',value:2},{text:'No',value:1}]},
      { question: "Are decision-makers regularly briefed on organic performance?", options:[{text:'Yes',value:3},{text:'Sometimes',value:2},{text:'No',value:1}]},
      { question: "Is there internal ownership for content investments?", options:[{text:'Clear owner',value:3},{text:'Shared',value:2},{text:'None',value:1}]}
    ],
    smm: [
      { question: "Do social campaigns move customers through the funnel?", options:[{text:'Yes — measurable',value:3},{text:'Sometimes',value:2},{text:'No',value:1}]},
      { question: "Would you increase social budget if tests show profit?", options:[{text:'Yes',value:3},{text:'Maybe',value:2},{text:'No',value:1}]},
      { question: "Are social results discussed at exec reviews?", options:[{text:'Yes',value:3},{text:'Occasionally',value:2},{text:'Never',value:1}]},
      { question: "Do you need a short business case to improve social?", options:[{text:'Yes',value:3},{text:'Maybe',value:2},{text:'No',value:1}]}
    ],
    web: [
      { question: "Does the website convert at target rates for your business?", options:[{text:'Yes',value:3},{text:'Some pages',value:2},{text:'No',value:1}]},
      { question: "Would you back product/UX work if it showed conversion lift?", options:[{text:'Yes',value:3},{text:'Maybe',value:2},{text:'No',value:1}]},
      { question: "Is the web roadmap aligned to commercial goals?", options:[{text:'Yes',value:3},{text:'Partially',value:2},{text:'No',value:1}]},
      { question: "Do you review analytics summaries in leadership meetings?", options:[{text:'Yes',value:3},{text:'Sometimes',value:2},{text:'No',value:1}]}
    ],
    mobile: [
      { question: "Is mobile strategy part of the company roadmap?", options:[{text:'Yes',value:3},{text:'Planned',value:2},{text:'No',value:1}]},
      { question: "Does mobile contribute measurable revenue or retention?", options:[{text:'Yes',value:3},{text:'Some',value:2},{text:'No',value:1}]}
    ],
    facebook: [
      { question: "Do paid social returns justify current spend?", options:[{text:'Yes',value:3},{text:'Mixed',value:2},{text:'No',value:1}]},
      { question: "Would you expand channels that show repeatable ROAS?", options:[{text:'Yes',value:3},{text:'Cautiously',value:2},{text:'No',value:1}]}
    ],
    email: [
      { question: "Does email drive repeat purchases and retention?", options:[{text:'Yes, reliably',value:3},{text:'Somewhat',value:2},{text:'Not measured',value:1}]},
      { question: "Would you invest in automations that increase LTV?", options:[{text:'Yes',value:3},{text:'Maybe',value:2},{text:'No',value:1}]}
    ]
  };

  const questionPoolsTechnical = {
    seo: [
      { question: "Are XML sitemaps, robots rules and canonical tags properly configured?", options:[{text:'Yes',value:3},{text:'Partly',value:2},{text:'No',value:1}]},
      { question: "Is structured data implemented for important content types?", options:[{text:'Yes',value:3},{text:'Partly',value:2},{text:'No',value:1}]},
      { question: "Do you monitor crawl errors and indexation issues?", options:[{text:'Yes',value:3},{text:'Sometimes',value:2},{text:'No',value:1}]},
      { question: "Are performance budgets enforced for pages?", options:[{text:'Yes',value:3},{text:'Sometimes',value:2},{text:'No',value:1}]}
    ],
    smm: [
      { question: "Do you have tooling/automation for scheduling and analytics?", options:[{text:'Yes',value:3},{text:'Partial',value:2},{text:'No',value:1}]},
      { question: "Do you track UTM parameters and attribute correctly?", options:[{text:'Yes',value:3},{text:'Partly',value:2},{text:'No',value:1}]}
    ],
    web: [
      { question: "Is your site instrumented with event tracking and dataLayer?", options:[{text:'Yes',value:3},{text:'Partial',value:2},{text:'No',value:1}]},
      { question: "Do you use feature flags / CI for safe rollouts?", options:[{text:'Yes',value:3},{text:'Some',value:2},{text:'No',value:1}]},
      { question: "Is automated testing (E2E/unit) part of your deployment pipeline?", options:[{text:'Yes',value:3},{text:'Some tests',value:2},{text:'None',value:1}]}
    ],
    mobile: [
      { question: "Do you capture app diagnostics and crash reports centrally?", options:[{text:'Yes',value:3},{text:'Some',value:2},{text:'No',value:1}]},
      { question: "Are release pipelines and code signing automated?", options:[{text:'Yes',value:3},{text:'Partly',value:2},{text:'No',value:1}]}
    ],
    facebook: [
      { question: "Is pixel/event mapping and server-side tracking configured?", options:[{text:'Yes',value:3},{text:'Partial',value:2},{text:'No',value:1}]}
    ],
    email: [
      { question: "Do you have automated suppression lists and deliverability monitoring?", options:[{text:'Yes',value:3},{text:'Some',value:2},{text:'No',value:1}]}
    ]
  };

  // Sections (per selected service) for the current run
  let sections = []; // [{service, questions:[{question,options}] }]
  let currentSection = 0;
  let currentInSection = 0;

  // DOM refs
  const startBtn = document.getElementById('start-btn');
  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const resultScreen = document.getElementById('result-screen');
  const questionText = document.getElementById('question-text');
  const optionsList = document.getElementById('options-list');
  const qIndex = document.getElementById('q-index');
  const qTotal = document.getElementById('q-total');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const submitBtn = document.getElementById('submit-btn');
  const progressBar = document.getElementById('progress-bar');
  const resultTitle = document.getElementById('result-title');
  const resultDesc = document.getElementById('result-desc');
  const restartBtn = document.getElementById('restart-btn');
  const sendResultsBtn = document.getElementById('send-results-btn');

  let answers = []; // array of arrays per section

  function startQuiz(){
    // read selected services
    const checked = Array.from(document.querySelectorAll('input[name="service"]:checked')).map(i=>i.value);
    if(checked.length === 0){
      alert('Please select at least one service to assess.');
      return;
    }

    // assemble questions from selected pools (concatenate)
    questions = [];
    checked.forEach(service => {
      if(questionPools[service]){
        // tag questions with service for potential sectioning later
        questionPools[service].forEach(q => questions.push(Object.assign({service}, q)));
      }
    });

    if(questions.length === 0){
      alert('No questions available for the selected services.');
      return;
    }

    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    current = 0;
    answers = Array(questions.length).fill(null);
    renderQuestion();
    updateNav();
  }

  function renderQuestion(){
    const q = questions[current];
    qIndex.textContent = current + 1;
    qTotal.textContent = questions.length;
    questionText.textContent = q.question;

    // build options
    optionsList.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.type = 'button';
      btn.setAttribute('data-value', opt.value);
      btn.setAttribute('data-index', idx);
      btn.textContent = opt.text;
      btn.addEventListener('click', () => selectOption(idx));

      // mark selected if user already chose
      if(answers[current] === idx) btn.classList.add('selected');

      optionsList.appendChild(btn);
    });

    // update progress
    const pct = Math.round(((current) / questions.length) * 100);
    progressBar.style.width = pct + '%';

    // show/hide submit
    if(current === questions.length - 1){
      nextBtn.classList.add('hidden');
      submitBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
    }

    // prev button
    prevBtn.disabled = current === 0;
  }

  function selectOption(optionIdx){
    // highlight UI
    Array.from(optionsList.children).forEach((el, i)=>{
      el.classList.toggle('selected', i === optionIdx);
    });
    answers[current] = optionIdx;
  }

  function updateNav(){
    qIndex.textContent = current + 1;
    const pct = Math.round(((current) / questions.length) * 100);
    progressBar.style.width = pct + '%';
  }

  function nextQuestion(){
    if(answers[current] == null){
      // require selection
      alert('Please select an option to continue.');
      return;
    }
    if(current < questions.length - 1){
      current++;
      renderQuestion();
      updateNav();
    }
  }

  function prevQuestion(){
    if(current > 0){
      current--;
      renderQuestion();
      updateNav();
    }
  }

  function computeResult(){
    // compute total and per-service aggregates
    const summary = { total: 0, perService: {} };
    questions.forEach((q, i) => {
      const sel = answers[i];
      const svc = q.service || 'general';
      if(!summary.perService[svc]) summary.perService[svc] = { score: 0, max: 0, count: 0 };
      // add max (sum of highest option values)
      const maxOpt = Math.max(...q.options.map(o => o.value));
      summary.perService[svc].max += maxOpt;
      summary.perService[svc].count += 1;
      if(sel != null){
        const val = q.options[sel].value;
        summary.perService[svc].score += val;
        summary.total += val;
      }
    });
    return summary;
  }

  function showResult(){
    if(answers.some(a=>a==null)){
      if(!confirm('Some questions are unanswered. Submit anyway?')) return;
    }

    const summary = computeResult();

    // Build per-service cards
    const resultsContainer = document.getElementById('results-container');
    if(resultsContainer){
      resultsContainer.innerHTML = '';
      Object.keys(summary.perService).forEach(svc => {
        const data = summary.perService[svc];
        const pct = Math.round((data.score / Math.max(1, data.max)) * 100);
        let level = 'Early';
        let note = 'Foundational work advised.';
        if(pct >= 70){ level = 'Advanced'; note = 'Ready to scale and optimise.'; }
        else if(pct >= 40){ level = 'Developing'; note = 'Good foundations — focus on measurement.'; }

        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
          <h3 style="margin:0 0 6px; text-transform:capitalize;">${svc.replace(/[-_]/g,' ')}</h3>
          <div style="font-weight:600">${pct}% — ${level}</div>
          <div class="small-muted">${note}</div>
        `;
        resultsContainer.appendChild(card);
      });
    }

    // summary title and description
    resultTitle.textContent = 'Quiz Results — Summary';
    resultDesc.textContent = 'Below is a breakdown by service. You can send this result to your inbox or talk to an expert.';

    // Switch screens
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    // Save to localStorage for convenience
    try{ localStorage.setItem('trendtactics_quiz_result', JSON.stringify({summary, answers})); }catch(e){}
  }

  // Send results to backend or email
  async function sendResults(){
    const emailInput = document.getElementById('result-email');
    const sendBtn = document.getElementById('send-results-btn');
    if(sendBtn) sendBtn.disabled = true;
    const email = emailInput && emailInput.value && emailInput.value.includes('@') ? emailInput.value : null;
    const payload = { summary: computeResult(), answers, email, timestamp: new Date().toISOString() };
    try{
      // attempt POST to backend endpoint
      await fetch('/api/quiz-results', {
        method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload)
      });
      alert('Thanks — quiz results submitted. We will follow up via email if provided.');
    }catch(err){
      console.warn('submit failed', err);
      try{ localStorage.setItem('trendtactics_quiz_result_submission', JSON.stringify(payload)); }catch(e){}
      alert('Could not send results to server — saved locally in your browser.');
    } finally {
      if(sendBtn) sendBtn.disabled = false;
    }
  }

  function restart(){
    startScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
  }

  // Event wiring
  startBtn && startBtn.addEventListener('click', startQuiz);
  nextBtn && nextBtn.addEventListener('click', nextQuestion);
  prevBtn && prevBtn.addEventListener('click', prevQuestion);
  submitBtn && submitBtn.addEventListener('click', showResult);
  restartBtn && restartBtn.addEventListener('click', ()=>{
    restart();
    window.scrollTo({top:0,behavior:'smooth'});
  });
  sendResultsBtn && sendResultsBtn.addEventListener('click', sendResults);

  // Keyboard support: number keys 1..4 to select
  document.addEventListener('keydown', (e)=>{
    if(quizScreen.classList.contains('hidden')) return;
    const key = e.key;
    if(['1','2','3','4'].includes(key)){
      const idx = parseInt(key,10) - 1;
      const q = questions[current];
      if(idx < q.options.length) selectOption(idx);
    }
    if(key === 'ArrowRight') nextQuestion();
    if(key === 'ArrowLeft') prevQuestion();
  });

  // Expose for debugging
  window.TTQuiz = { startQuiz, questions };

})();
