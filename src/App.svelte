<script>
  import { onMount, tick } from 'svelte';
  import Storm from './Storm.svelte';
  import Spotlight from './Spotlight.svelte';
  import SpotlightNav from './SpotlightNav.svelte';
  import { reveal } from './reveal.js';
  import Icon from './Icon.svelte';
  import ProjectCard from './ProjectCard.svelte';
  import Photography from './Photography.svelte';
  import { photographs } from './photography-data.js';
  import { profile, navigation, projects, highlights, skillGroups, services, socialLinks, principles } from './content.js';

  let route = 'home', paused = false;
  let contactName = '', contactEmail = '', contactTopic = 'A project', contactMessage = '';
  let draft = '', copied = false, copyError = false;
  let projectFilter = 'All work';
  const projectFilters = ['All work', 'Engineering', 'Digital', 'Creative', 'Community'];
  const projectGroups = { Engineering: ['undefined'], Digital: ['quickstart','websites'], Creative: ['creative-work'], Community: ['nexus','haven'] };
  $: filteredProjects = projectFilter === 'All work' ? projects : projects.filter(project => projectGroups[projectFilter].includes(project.slug));
  $: connections = socialLinks.filter(link => connectionHref(link));
  $: page = route.split('/')[0];
  $: activeProject = projects.find(project => route === 'projects/' + project.slug);
  $: nextProject = activeProject && projects[(projects.indexOf(activeProject) + 1) % projects.length];
  $: pageLabel = activeProject?.title || navigation.find(item => item.id === page)?.label || 'Page not found';
  const topicOptions = ['Book a call', 'A project', 'Recruitment', 'Mechanical design & CAD', 'Robotics & prototyping', 'Web development', 'Hardware & technical support', 'Workshops & mentoring', 'Photography', 'Photo editing', 'Video editing', 'Something else'];

  async function syncRoute(focus = false) {
    const [path, search = ''] = window.location.hash.replace(/^#\/?/, '').split('?');
    route = path || 'home';
    const topic = new URLSearchParams(search).get('topic');
    if (topicOptions.includes(topic)) contactTopic = topic;
    await tick();
    document.title = route === 'home' ? `${profile.brand} — ${profile.name}` : `${pageLabel} — ${profile.brand}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (focus) document.getElementById('page-content')?.focus({ preventScroll: true });
  }
  onMount(() => {
    syncRoute();
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    paused = motion.matches;
    const updateMotion = event => paused = event.matches;
    motion.addEventListener('change', updateMotion);
    const changed = () => syncRoute(true);
    window.addEventListener('hashchange', changed);
    return () => { window.removeEventListener('hashchange', changed); motion.removeEventListener('change', updateMotion); };
  });
  function prepareMessage(event) {
    event.preventDefault();
    copied = false; copyError = false;
    draft = `Hello ${profile.name},\n\n${contactMessage.trim()}\n\nFrom: ${contactName.trim()}\nEmail: ${contactEmail.trim()}\nRegarding: ${contactTopic}`;
    if (profile.email) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(contactTopic + ' — ' + contactName.trim())}&body=${encodeURIComponent(draft)}`;
    }
  }
  async function copyMessage() {
    try { await navigator.clipboard.writeText(draft); copied = true; copyError = false; }
    catch { copyError = true; }
  }
  function connectionHref(link) {
    if (link.href) return link.href;
    if (link.id === 'gmail' && profile.email) return `mailto:${profile.email}`;
    if (link.id === 'whatsapp' && profile.phone) return `https://wa.me/${profile.phone.replace(/\D/g, '')}`;
    return '';
  }
</script>

<div class="site-root" class:motion-paused={paused}>
{#if page==='home'}<Storm {paused}/>{/if}
<a class="skip-link" href="#page-content" onclick={event=>{event.preventDefault();document.getElementById('page-content')?.focus();}}>Skip to content</a>
<SpotlightNav bind:paused {page} name={profile.name} brand={profile.brand} {navigation}/>

<main id="page-content" tabindex="-1" class:home-main={route==='home'} use:reveal>
  {#if route !== 'home'}<div class="page-top"><div class="workspace-switch" aria-label="Portfolio areas"><a href="#/home" class:chosen={page!=='other'}><Icon name="code" size={14}/> Technology</a><a href="#/other" class:chosen={page==='other'}><Icon name="camera" size={14}/> Visual studio</a></div><span class="preview-label">{#if profile.isPreview}<span></span> {profile.previewLabel}{/if}</span></div>{/if}
  {#if route === 'home'}
    <Spotlight/>
    <div class="home-content">
    <section class="intro-strip glass"><span class="section-number">A LITTLE CONTEXT</span><h2>Design. Build.<br/><em>Test. Improve.</em></h2><div><p>{profile.shortBio}</p><a class="small-link" href="#/about">More about me <Icon size={16}/></a></div></section>
    <section class="honors-strip" aria-label="Awards and achievements">{#each highlights as item}<article class="honor-card glass"><span class="honor-icon"><Icon name="spark" size={20}/></span><div><strong>{item.title}</strong><small>{item.detail}</small></div></article>{/each}</section>
    <section class="section-block selected-work" id="selected-work"><div class="section-heading"><div><span class="eyebrow">01 / SELECTED WORK</span><h2>Ideas are good.<br/><em>Making them real is better.</em></h2></div><a class="button secondary" href="#/projects">All projects <Icon size={17}/></a></div><div class="project-grid">{#each projects.slice(0, 2) as project}<ProjectCard {project}/>{/each}</div></section>
    <section class="home-photo-feature glass"><div class="home-photo-copy"><span class="eyebrow">THE VISUAL SIDE / {photographs.length} FRAMES</span><h2>Driven by detail.<br/><em>Framed with feeling.</em></h2><p>Automotive forms, close-up details, and moments worth a second look. A selection from my photography projects.</p><a class="button secondary" href="#/other">Explore the photography <Icon size={18}/></a></div><a class="home-photo-preview" data-glass="none" href="#/other" aria-label="Explore my photography collection">{#each [photographs[1],photographs[0],photographs[2]] as photo,index}<span class="preview-photo preview-photo-{index}"><img src={photo.thumbnail} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async"/></span>{/each}<span class="photo-preview-label">A DIFFERENT PERSPECTIVE <Icon size={16}/></span></a></section>
    <section class="recruiter-strip glass"><div class="icon-badge"><Icon name="chip" size={27}/></div><div><span class="eyebrow">FOR RECRUITERS & COLLABORATORS</span><h2>Potential, with <em>perspective.</em></h2><p>{profile.recruiterIntro}</p></div><a class="button primary" href="#/services">Ways I can contribute <Icon size={18}/></a></section>
    <section class="recommendations glass"><span class="quote-mark">↗</span><div><span class="eyebrow">WHAT I’M WORKING TOWARD</span><h3>{profile.mission}</h3><p>{profile.availability}</p></div></section>
    </div>
  {:else if route === 'about'}
    <section class="page-intro glass"><span class="eyebrow">01 / ABOUT ME</span><h1>The person behind<br/><em>the projects.</em></h1><p>Curiosity brought me to robotics. Building with other people keeps me there.</p></section>
    <section class="about-layout section-block"><div class="portrait-placeholder glass"><span class="portrait-monogram">{profile.initials}<i>✳</i></span><div><span class="eyebrow">MECHANICS · ROBOTICS · MEDIA</span><h3>{profile.name}</h3><p>Curious by nature. Serious about the work.</p></div></div><div class="story-panel glass"><span class="eyebrow">MY STORY</span><h2>It starts with<br/><em>“how does this work?”</em></h2>{#each profile.bio as paragraph}<p>{paragraph}</p>{/each}<div class="mission"><Icon name="spark"/><p>{profile.mission}</p></div></div></section>
    <section class="section-block"><div class="section-heading"><div><span class="eyebrow">THE APPROACH</span><h2>Good work. <em>Good working relationships.</em></h2></div></div><div class="principle-grid">{#each principles as principle,i}<article class="principle glass"><span class="section-number">0{i+1}</span><h3>{principle.title}</h3><p>{principle.description}</p></article>{/each}</div></section>
  {:else if activeProject}
    <a class="back-link" href="#/projects">← Back to projects</a><section class="case-hero glass"><div><span class="eyebrow">PROJECT {activeProject.id} / CASE STUDY</span><h1>{activeProject.title}<em>.</em></h1><p>{activeProject.summary}</p><span class="tag">{activeProject.status}</span></div><div class="case-emblem {activeProject.slug}" aria-hidden="true">{activeProject.slug==='undefined'?'{ u. }':activeProject.slug==='nexus'?'n ×':activeProject.slug==='quickstart'?'>_':activeProject.slug==='websites'?'</>':activeProject.slug==='creative-work'?'[ + ]':'✳'}</div></section>
    <div class="case-meta glass"><div><span class="eyebrow">MY ROLE</span><p>{activeProject.role}</p></div><div><span class="eyebrow">TOOLKIT</span><div class="tags">{#each activeProject.tags as tag}<span class="tag">{tag}</span>{/each}</div></div><div><span class="eyebrow">PROJECT LINKS</span><div class="case-links">{#if activeProject.repoUrl}<a href={activeProject.repoUrl} target="_blank" rel="noreferrer">Repository ↗</a>{/if}{#if activeProject.liveUrl}<a href={activeProject.liveUrl} target="_blank" rel="noreferrer">Live project ↗</a>{/if}{#if !activeProject.repoUrl && !activeProject.liveUrl}<p>Explore the process below</p>{/if}</div></div></div>
    <section class="case-story glass">{#each [['01','The challenge',activeProject.challenge],['02','My contribution',activeProject.contribution],['03','What I learned',activeProject.learning]] as part}<article><span class="section-number">{part[0]}</span><h2>{part[1]}</h2><p>{part[2]}</p></article>{/each}</section>
    {#if nextProject}<a class="next-project glass" href={'#/projects/' + nextProject.slug}><span class="eyebrow">NEXT PROJECT</span><h2>{nextProject.title}</h2><Icon size={30}/></a>{/if}
  {:else if route === 'projects'}
    <section class="page-intro glass"><span class="eyebrow">02 / PROJECTS</span><h1>Ideas, turned into<br/><em>working things.</em></h1><p>Competition robots, open-source tools, club websites, community events and visual projects—each one taught me something about engineering and teamwork.</p><div class="intro-foot"><span>SELECTED WORK</span><span>{projects.length} PROJECT STORIES</span></div></section>
    <section class="section-block"><div class="project-toolbar"><div class="project-filters" aria-label="Filter projects">{#each projectFilters as filter}<button class:chosen={projectFilter===filter} aria-pressed={projectFilter===filter} onclick={()=>projectFilter=filter}>{filter}</button>{/each}</div><p aria-live="polite">{filteredProjects.length} {filteredProjects.length===1?'project':'projects'}</p></div><div class="project-grid">{#each filteredProjects as project (project.slug)}<ProjectCard {project}/>{/each}</div></section>
    <section class="recruiter-strip glass"><Icon name="camera" size={32}/><div><span class="eyebrow">LOOKING FOR THE CREATIVE WORK?</span><h2>There’s another <em>side.</em></h2><p>Explore photography and visual editing in the studio.</p></div><a class="button secondary" href="#/other">Visit the studio <Icon size={18}/></a></section>
  {:else if route === 'skills'}
    <section class="page-intro glass"><span class="eyebrow">03 / SKILLS</span><h1>A practical toolkit.<br/><em>An open mind.</em></h1><p>Software, hardware, visual practice, and the habits that make collaboration work.</p></section>
    <section class="skill-grid section-block">{#each skillGroups as group,i}<article class="skill-card glass"><div class="skill-top"><span class="icon-badge"><Icon name={['code','chip','camera','spark'][i]} size={25}/></span><span class="section-number">0{i+1}</span></div><h2>{group.title}</h2><p>{group.intro}</p><ul>{#each group.items as item}<li><span></span>{item}</li>{/each}</ul></article>{/each}</section>
    <section class="evidence-strip glass"><div><span class="eyebrow">SKILLS IN CONTEXT</span><h3>Learn by making it work.</h3><p>My strongest experience comes from designing and testing FTC mechanisms, supporting real club websites and sharing technical skills with younger students.</p></div><a class="button secondary" href="#/projects">Explore the projects <Icon size={17}/></a></section>
  {:else if route === 'services'}
    <section class="page-intro glass"><span class="eyebrow">04 / AREAS TO EXPLORE</span><h1>Good work starts<br/><em>with collaboration.</em></h1><p>Mechanical design, CAD and 3D printing, robotics support, web development, and careful photo or video editing. We can shape the scope around the project.</p></section>
    <section class="services-list section-block">{#each services as service,i}<article class="service-row glass"><div class="service-number">0{i+1}<Icon name={['code','chip','camera'][i]} size={30}/></div><div><h2>{service.title}</h2><p>{service.description}</p><a class="small-link" href={'#/contact?topic='+encodeURIComponent(['Mechanical design & CAD','Robotics & prototyping','Web development'][i])}>Let’s discuss the scope <Icon size={16}/></a></div><div class="deliverables"><span class="eyebrow">WHAT WE CAN DEFINE TOGETHER</span><ul>{#each service.deliverables as item}<li><Icon name="check" size={15}/>{item}</li>{/each}</ul></div></article>{/each}</section>
    <section class="hiring-panel glass"><div><span class="eyebrow">BUILDING YOUR TEAM?</span><h2>A person behind<br/><em>the skill set.</em></h2><p>I understand the full chain from idea to CAD to a tested, working part. I fix problems instead of giving up, speak fluent English and Romanian, and treat collaborators like teammates.</p><div class="actions"><a class="button primary" href="#/contact?topic=Recruitment">Discuss an opportunity <Icon size={18}/></a>{#if profile.resumeUrl}<a class="button secondary" href={profile.resumeUrl} download>Download CV <Icon name="download" size={18}/></a>{:else}<a class="small-link" href="#/about">Read my background <Icon size={17}/></a>{/if}</div></div><div class="hiring-points">{#each principles as principle}<div><Icon name="check" size={18}/><span>{principle.title}</span></div>{/each}</div></section>
  {:else if route === 'other'}
    <section class="page-intro visual-intro glass"><span class="eyebrow">05 / THE VISUAL STUDIO</span><h1>Driven by detail.<br/><em>Framed with feeling.</em></h1><p>Car-event photography and visual editing shaped by careful composition, clear structure, color and finishing detail.</p><a class="small-link" href="#/contact?topic=Photography">Let’s create something <Icon size={18}/></a></section>
    <section class="section-block gallery-shell glass"><Photography/></section>
    <section class="creative-services">{#each [{title:'Photography',icon:'camera',copy:'Automotive forms, small details and moments from car events. Explore a selection of my photography in the journal above.'},{title:'Photo editing',icon:'spark',copy:'Retouching, color and atmosphere in Photoshop, including batch workflows for consistent design series.'},{title:'Video editing',icon:'play',copy:'Structured edits in DaVinci Resolve with transitions, color grading, title effects and platform-ready exports.'}] as service}<article class="glass"><Icon name={service.icon} size={28}/><h3>{service.title}</h3><p>{service.copy}</p><a class="small-link" href={'#/contact?topic='+encodeURIComponent(service.title)}>Start a conversation <Icon size={16}/></a></article>{/each}</section>
  {:else if route === 'contact'}
    <section class="page-intro glass"><span class="eyebrow">06 / CONTACT</span><h1>Good things start<br/>with <em>a conversation.</em></h1><p>A project, an opportunity, or a creative idea. There’s a place for all of them here.</p></section>
    <section class="contact-layout section-block"><div class="connections-panel glass"><span class="eyebrow">FIND ME AROUND THE WEB</span><h2>Let’s <em>connect.</em></h2><div class="connections">{#each connections as link}{@const href = connectionHref(link)}{#if href}<a href={href} target={href.startsWith('mailto:')?undefined:'_blank'} rel="noreferrer"><span class="connection-icon"><Icon name={link.id}/></span><div><strong>{link.label}</strong><p>{link.caption}</p></div><Icon size={17}/></a>{:else}<div class="connection-unset"><span class="connection-icon"><Icon name={link.id}/></span><div><strong>{link.label}</strong><p>{link.caption}</p></div><span class="coming-soon">Soon</span></div>{/if}{/each}</div>{#if connections.length===0}<div class="contact-empty"><Icon name="gmail" size={30}/><h3>Contact details are on the way.</h3><p>Direct contact isn’t available here yet. In the meantime, explore my work or use the draft tool to prepare a message for later.</p><a class="small-link" href="#/projects">Explore my work <Icon size={17}/></a></div>{:else}<p class="quiet-note">{profile.email}</p>{/if}</div><div class="message-panel glass"><span class="eyebrow">TELL ME WHAT YOU HAVE IN MIND</span><h2>{#if profile.email}A first <em>hello.</em>{:else}Prepare a <em>message.</em>{/if}</h2>{#if !profile.email}<p class="contact-notice">This is a draft tool. You can preview and copy your message; it won’t be sent.</p>{/if}<form onsubmit={prepareMessage}><div class="form-row"><label>Your name<span class="field-control glass"><input bind:value={contactName} name="name" autocomplete="name" placeholder="Alex Morgan" required maxlength="100"/></span></label><label>Email address<span class="field-control glass"><input bind:value={contactEmail} type="email" name="email" autocomplete="email" placeholder="alex@example.com" required maxlength="200"/></span></label></div><label>What brings you here?<span class="field-control glass"><select bind:value={contactTopic} name="topic">{#each topicOptions as topic}<option>{topic}</option>{/each}</select></span></label><label>Your message<span class="field-control glass"><textarea bind:value={contactMessage} name="message" rows="5" placeholder="A little about your idea, timeline, or opportunity…" required minlength="10" maxlength="5000"></textarea></span></label><button class="button primary" type="submit">{profile.email?'Open email draft':'Preview message'} <Icon size={18}/></button><p class="form-note">{profile.email?'Opens your email app with a prepared draft. You choose when to send.':'Prepare and copy a message here. Nothing is sent until a contact address is configured.'}</p></form>{#if draft}<div class="draft-preview" role="status"><div><strong>Message prepared</strong><span>Not sent</span></div><pre>{draft}</pre><button class="small-link" onclick={copyMessage}><Icon name={copied?'check':'copy'} size={16}/>{copied?'Copied to clipboard':'Copy message'}</button>{#if copyError}<p>Copy is unavailable in this browser. You can select and copy the message above.</p>{/if}</div>{/if}</div></section>
  {:else}
    <section class="page-intro glass"><span class="eyebrow">404 / A SMALL DETOUR</span><h1>Let’s find<br/><em>your way back.</em></h1><a class="button primary" href="#/home">Back home <Icon/></a></section>
  {/if}
  {#if page!=='contact'}<section class="closing-cta glass"><div><span class="eyebrow">HAVE SOMETHING IN MIND?</span><h2>Let’s make it <em>happen.</em></h2></div><a class="button primary" href="#/contact">Start a conversation <Icon size={18}/></a></section>{/if}
</main>
<footer class="site-footer"><div class="footer-main"><a class="footer-name" href="#/home">Mihnea-Andrei<br/>Cristache<span>Andwe1n / {profile.location}</span></a><nav aria-label="Footer navigation">{#each navigation.filter(item=>item.id!=='home') as item}<a href={'#/'+item.id}>{item.label}</a>{/each}</nav></div><div class="footer-bottom"><a class="brand" href="#/home">{profile.brand} <Icon size={16}/></a><span>TECHNOLOGY. CREATIVITY. A HUMAN TOUCH.</span><div><button class="motion-control" onclick={()=>paused=!paused} aria-label={paused?'Resume background animation':'Pause background animation'} aria-pressed={paused}><Icon name={paused?'play':'pause'} size={13}/>{paused?'Motion off':'Motion on'}</button><span>© {new Date().getFullYear()}</span></div></div></footer>
</div>
