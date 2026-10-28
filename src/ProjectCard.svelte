<script>
  import Icon from './Icon.svelte';
  export let project;
</script>
<a class="project-card glass" href={'#/projects/' + project.slug}>
  <div class="project-visual {project.slug}">
    <span class="visual-index">PROJECT / {project.id}</span>
    <div class="cover-art art-{project.slug}" aria-hidden="true">
      {#if project.slug === 'undefined'}
        <svg class="mechanism" viewBox="0 0 480 250" fill="none">
          <path class="guide" d="M38 190h404M240 20v207M102 65h276M90 54v146M390 54v146"/>
          <path class="frame" d="m138 157 84-95h93l44 95H138ZM158 157v27h184v-27M194 157l48-72h58l28 72"/>
          <circle class="wheel" cx="173" cy="185" r="30"/><circle class="wheel" cx="329" cy="185" r="30"/>
          <circle class="hub" cx="173" cy="185" r="10"/><circle class="hub" cx="329" cy="185" r="10"/>
          <path class="accent" d="m226 61 18-25 89 13-17 28M249 47l68 10M239 37l-9-16M225 21h14"/>
          <path class="detail" d="m134 131-20 26h-9m236-49 35 14v37h-16M121 96h36M139 78v36"/>
          <circle class="point" cx="225" cy="63" r="5"/><circle class="point" cx="314" cy="63" r="5"/>
        </svg>
        <span class="art-note">MECHANISM STUDIES</span>
      {:else if project.slug === 'nexus'}
        <svg class="science" viewBox="0 0 480 250" fill="none">
          <circle class="science-guide" cx="240" cy="125" r="99"/>
          <ellipse cx="240" cy="125" rx="120" ry="42"/>
          <ellipse cx="240" cy="125" rx="120" ry="42" transform="rotate(60 240 125)"/>
          <ellipse cx="240" cy="125" rx="120" ry="42" transform="rotate(120 240 125)"/>
          <circle class="nucleus" cx="240" cy="125" r="19"/>
          <circle class="electron" cx="345" cy="145" r="6"/><circle class="electron" cx="208" cy="28" r="6"/><circle class="electron" cx="175" cy="203" r="6"/>
          <path class="science-guide" d="M58 125h40m284 0h40M240 0v15m0 220v15"/>
        </svg>
        <span class="art-note">CURIOSITY, CONNECTED.</span>
      {:else if project.slug === 'quickstart'}
        <div class="terminal-art"><div class="window-chrome"><span></span><span></span><span></span><small>defined-quickstart</small></div><div class="terminal-body"><span class="terminal-prompt">~/robot <b>›</b></span><strong>build. run. repeat<span class="terminal-cursor">_</span></strong><div class="code-lines"><i></i><i></i><i></i></div><span class="terminal-status"><span></span>Actions, made reusable.</span></div></div>
      {:else if project.slug === 'websites'}
        <div class="browser-art"><div class="window-chrome"><span></span><span></span><span></span><small>ideas → interfaces</small></div><div class="browser-content"><div class="browser-nav"><i></i><span></span><span></span><span></span></div><div class="browser-columns"><div><span class="browser-kicker"></span><strong>Made for<br/>real people.</strong><span class="browser-button">Explore ↗</span></div><div class="browser-shape"><span></span><span></span><span></span></div></div></div></div>
      {:else if project.slug === 'creative-work'}
        <img class="creative-cover" src="/images/portfolio/gt3-studio-display.webp" alt="" loading="lazy" decoding="async"/>
        <div class="photo-frame"><span></span><span></span><span></span><span></span></div>
        <span class="art-note">A DIFFERENT PERSPECTIVE</span>
      {:else if project.slug === 'haven'}
        <div class="workshop-art"><div class="pixel-grid">{#each Array(25) as _, index}<span class:pixel-lit={[2, 6, 7, 8, 10, 12, 14, 16, 17, 18, 20, 24].includes(index)}></span>{/each}</div><div class="workshop-copy"><span>LEARN BY MAKING</span><strong>Your first<br/>“I built that.”</strong><div class="workshop-keys"><i>←</i><i>↑</i><i>→</i></div></div></div>
      {/if}
    </div>
    <span class="visual-caption">{project.category.toUpperCase()} · {project.id}</span>
    <span class="project-arrow"><Icon/></span>
  </div>
  <div class="project-body"><div class="project-heading"><h3>{project.title}</h3><span class="tag">{project.category}</span></div><p>{project.summary}</p><span class="small-link">Explore the project <Icon size={16}/></span></div>
</a>

<style>
  .cover-art{position:absolute;inset:0;overflow:hidden;display:grid;place-items:center;background-color:#141715;background-image:linear-gradient(#ffffff05 1px,transparent 1px),linear-gradient(90deg,#ffffff05 1px,transparent 1px);background-size:28px 28px;color:#d7f78a}
  .cover-art>svg{width:86%;height:80%;max-width:480px;overflow:visible;transition:transform .5s cubic-bezier(.2,.7,.3,1)}
  :global(.project-card:hover) .cover-art>svg{transform:scale(1.035)}
  .art-note{position:absolute;right:24px;top:26px;font:10px/1.4 var(--font-mono);letter-spacing:1px;color:#a4b19e}
  .mechanism .guide{stroke:#d7f78a;stroke-opacity:.16;stroke-dasharray:4 5}
  .mechanism .frame{stroke:#e3e9dd;stroke-width:2.5;stroke-linejoin:round}
  .mechanism .wheel{stroke:#d7f78a;stroke-width:5;fill:#1d231b}
  .mechanism .hub,.mechanism .accent,.mechanism .detail{stroke:#d7f78a;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .mechanism .point{fill:#d7f78a}
  .art-nexus{background-color:#171d1a}
  .science ellipse{stroke:#bdcbb8;stroke-width:1.3}
  .science .science-guide{stroke:#778272;stroke-opacity:.3;stroke-dasharray:3 5}
  .science .nucleus{fill:#d7f78a;stroke:#efffd3;stroke-width:8;stroke-opacity:.12}
  .science .electron{fill:#d7f78a}
  .terminal-art,.browser-art{width:73%;max-width:380px;border:1px solid #ffffff22;border-radius:10px;overflow:hidden;background:#0b100e;box-shadow:0 18px 40px #0003;transform:rotate(-3deg);transition:transform .4s ease}
  :global(.project-card:hover) .terminal-art,:global(.project-card:hover) .browser-art{transform:rotate(0deg) translateY(-4px)}
  .window-chrome{height:30px;padding:0 12px;display:flex;align-items:center;gap:5px;border-bottom:1px solid #ffffff13;background:#ffffff04}
  .window-chrome>span{width:5px;height:5px;border-radius:50%;background:#6e786b}.window-chrome>span:first-child{background:#d7f78a}
  .window-chrome small{margin-left:10px;font:9px var(--font-mono);color:#899486}
  .terminal-body{padding:24px 22px}.terminal-prompt{display:block;font:11px var(--font-mono);color:#a7b29d}.terminal-prompt b{color:#d7f78a;font-weight:400}
  .terminal-body strong{display:block;margin-top:10px;font:16px var(--font-mono);color:#e4eadd}.terminal-cursor{color:#d7f78a}
  .code-lines{display:grid;gap:6px;margin:18px 0}.code-lines i{display:block;width:68%;height:4px;background:#d7f78a25;border-radius:2px}.code-lines i:nth-child(2){width:42%;margin-left:14px}.code-lines i:nth-child(3){width:56%;margin-left:14px}
  .terminal-status{display:flex;align-items:center;gap:7px;font:9px var(--font-mono);color:#8e9a87}.terminal-status>span{width:5px;height:5px;border-radius:50%;background:#d7f78a}
  .art-websites{background-color:#20251e}.browser-art{transform:rotate(3deg);background:#f0f1e8}.browser-art .window-chrome{border-color:#101a1417;background:#e3e6da}.browser-art .window-chrome small{color:#6b7564}.browser-art .window-chrome>span{background:#a0a994}.browser-content{padding:18px 20px 23px}.browser-nav{display:flex;align-items:center;gap:8px;margin-bottom:22px}.browser-nav i{width:14px;height:14px;background:#28331f;border-radius:50%;margin-right:auto}.browser-nav span{width:18px;height:3px;background:#b6bead}.browser-columns{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:center}.browser-kicker{display:block;width:40px;height:3px;background:#9ca98c;margin-bottom:9px}.browser-columns strong{font:500 24px/1.05 var(--font-general);letter-spacing:-1px;color:#20291b}.browser-button{display:inline-block;background:#25341e;color:#eff3e5;font:8px var(--font-mono);padding:7px 10px;border-radius:20px;margin-top:13px}.browser-shape{position:relative;height:105px;display:grid;place-items:center}.browser-shape span{position:absolute;width:85px;height:85px;border:1px solid #667752;border-radius:20px;transform:rotate(20deg);background:#c6de9b20}.browser-shape span:nth-child(2){transform:rotate(50deg)}.browser-shape span:nth-child(3){transform:rotate(80deg);background:#abc87535}
  .art-creative-work{background:#161819}.creative-cover{width:100%;height:100%;object-fit:cover;object-position:center 45%;transition:transform .6s ease}.art-creative-work::after{content:'';position:absolute;inset:0;background:linear-gradient(#0007,transparent 38%,transparent 65%,#0009)}:global(.project-card:hover) .creative-cover{transform:scale(1.04)}.art-creative-work .art-note{z-index:1;color:#e3e9dd}.photo-frame{position:absolute;inset:26% 26%;z-index:1}.photo-frame span{position:absolute;width:15px;height:15px;border-color:#f2f5e7a0;border-style:solid;border-width:1px 0 0 1px}.photo-frame span:nth-child(2){right:0;transform:rotate(90deg)}.photo-frame span:nth-child(3){right:0;bottom:0;transform:rotate(180deg)}.photo-frame span:nth-child(4){left:0;bottom:0;transform:rotate(270deg)}
  .art-haven{background-color:#20251b}.workshop-art{display:flex;align-items:center;justify-content:center;gap:30px;width:90%}.pixel-grid{display:grid;grid-template-columns:repeat(5,17px);gap:5px;transform:rotate(-8deg)}.pixel-grid span{width:17px;height:17px;border:1px solid #c9e8a115;background:#c9e8a107}.pixel-grid .pixel-lit{background:#d7f78a;border-color:#d7f78a;box-shadow:0 3px 0 #84994f}.workshop-copy>span{font:8px var(--font-mono);letter-spacing:1.4px;color:#9aa68c}.workshop-copy strong{display:block;font:400 28px/1.15 var(--font-general);letter-spacing:-1px;color:#edf1e4;margin:10px 0 16px}.workshop-keys{display:flex;gap:5px}.workshop-keys i{display:grid;place-items:center;width:23px;height:23px;border:1px solid #7d8a6c;border-radius:4px;font:12px var(--font-mono);color:#c8d6b6;box-shadow:0 2px 0 #525d44}
  @media(max-width:700px){.art-note{font-size:8px;right:18px;top:26px;letter-spacing:.4px}.terminal-art,.browser-art{width:79%}.terminal-body{padding:18px 14px}.terminal-body strong{font-size:12px}.browser-content{padding:13px}.browser-columns strong{font-size:20px}.browser-shape span{width:60px;height:60px}.workshop-art{gap:20px}.pixel-grid{grid-template-columns:repeat(5,12px);gap:4px}.pixel-grid span{width:12px;height:12px}.workshop-copy strong{font-size:23px}}
  @media(prefers-reduced-motion:reduce){.cover-art>svg,.terminal-art,.browser-art,.creative-cover{transition:none}}
</style>
