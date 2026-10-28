<script>
  import Icon from './Icon.svelte';
  import { profile } from './content.js';
  function explore() { document.getElementById('selected-work')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }
</script>
<section class="spotlight-stage" aria-labelledby="hero-title">
  <div class="hero-introduction"><span class="availability"><span></span> OPEN TO OPPORTUNITIES</span><span class="hero-location">{profile.location} <span>↗</span></span></div>
  <div class="sp-hero">
    <div class="sp-head">
      <p class="hero-name">Hi, I’m Mihnea. <span>Engineer in the making.</span></p>
      <h1 id="hero-title">Curiosity.<br/>Built into<br/><em>real things.</em></h1>
      <p class="hero-description">I design robot mechanisms, build digital experiences, and find a different perspective through a lens.</p>
      <div class="sp-cta"><a class="button primary" href="#/projects">Explore my work <Icon size={19}/></a><a class="button text-button" href="#/about">The person behind it <Icon size={18}/></a></div>
    </div>
    <div class="hero-engineering" aria-label="Conceptual engineering illustration: design, build, test, repeat">
      <div class="drawing-label"><span><i></i> THE WAY I THINK</span><span>FIG. 01</span></div>
      <svg class="mechanism-drawing" viewBox="0 0 500 460" fill="none" aria-hidden="true">
        <defs><linearGradient id="metal" x1="100" y1="50" x2="380" y2="410" gradientUnits="userSpaceOnUse"><stop stop-color="#e9efdc"/><stop offset=".45" stop-color="#566150"/><stop offset="1" stop-color="#c5d4ac"/></linearGradient><linearGradient id="surface" x1="130" y1="70" x2="330" y2="360"><stop stop-color="#cad9ad" stop-opacity=".11"/><stop offset="1" stop-color="#cad9ad" stop-opacity=".015"/></linearGradient></defs>
        <g class="drawing-guides" stroke="#a8b693" stroke-opacity=".16"><path d="M40 340 420 120M65 405 455 180M80 190 430 390M100 95 450 295M250 35v385" stroke-dasharray="4 7"/><path d="m110 345 140 80 140-80M110 345v-85M390 345v-85"/><path d="m105 340 10 10m130 70 10 10m130-90 10 10"/></g>
        <g class="mechanism-base" stroke="url(#metal)" stroke-width="1.5"><path d="m107 291 143-83 143 83v30l-143 83-143-83z" fill="url(#surface)"/><path d="m107 291 143 83 143-83M250 374v30"/><ellipse cx="250" cy="291" rx="101" ry="58"/><ellipse cx="250" cy="291" rx="81" ry="46" stroke-opacity=".35"/><path d="M149 291v14c0 32 45 58 101 58s101-26 101-58v-14" stroke-opacity=".5"/></g>
        <g class="mechanism-layer" stroke="url(#metal)" stroke-width="1.5"><ellipse cx="250" cy="213" rx="101" ry="58" fill="#151914"/><path d="M149 213v22c0 32 45 58 101 58s101-26 101-58v-22" fill="url(#surface)"/><ellipse cx="250" cy="213" rx="74" ry="42"/><ellipse cx="250" cy="213" rx="28" ry="16"/><path d="m177 184 26 15m94 28 27 16m-74-72v26m0 32v26m-73-13 27-15m93-28 27-15" stroke-opacity=".5"/></g>
        <g class="mechanism-top" stroke="#d9f49a" stroke-width="1.5"><path d="m166 124 84-49 84 49v18l-84 49-84-49z" fill="url(#surface)"/><path d="m166 124 84 49 84-49M250 173v18"/><ellipse cx="250" cy="124" rx="48" ry="28"/><ellipse cx="250" cy="124" rx="17" ry="10"/><path d="M233 124v48m34-48v48" stroke-dasharray="3 5" stroke-opacity=".4"/><circle cx="186" cy="124" r="3"/><circle cx="314" cy="124" r="3"/><circle cx="250" cy="87" r="3"/></g>
        <g stroke="#d9f49a" stroke-opacity=".6"><path d="m332 124 48-28h51M352 232h49M149 307l-45 25H65"/><circle cx="332" cy="124" r="3" fill="#d9f49a"/><circle cx="352" cy="232" r="3" fill="#d9f49a"/><circle cx="149" cy="307" r="3" fill="#d9f49a"/></g>
        <g fill="#aab79b" font-family="monospace" font-size="10" letter-spacing="2"><text x="385" y="86">DESIGN</text><text x="376" y="252">BUILD</text><text x="43" y="351">TEST</text></g>
      </svg>
      <div class="drawing-footer"><span>FROM A FIRST SKETCH<br/><strong>To something that works.</strong></span><span class="drawing-cross">✳</span></div>
      <a class="hero-award" href="#/projects/undefined"><span class="award-symbol">↗</span><span><strong>European Champions, 2026</strong><small>FTC · Team Undefined #19112</small></span><Icon size={20}/></a>
    </div>
  </div>
  <div class="hero-bottom"><div><span>01 / MECHANICAL DESIGN</span><span>02 / DEVELOPMENT</span><span>03 / VISUAL STORYTELLING</span></div><button onclick={explore}>Discover the work <span>↓</span></button></div>
</section>
