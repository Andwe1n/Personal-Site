<script>
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';
  export let page = 'home';
  export let name = 'Mihnea';
  export let brand = 'Andwe1n';
  export let navigation = [];
  export let paused = false;
  let menuOpen = false, shell, mobileTrigger;
  $: if (page) menuOpen = false;
  onMount(() => {
    const outside = event => { if (!shell?.contains(event.target)) menuOpen = false; };
    const changed = () => menuOpen = false;
    window.addEventListener('pointerdown', outside);
    window.addEventListener('hashchange', changed);
    return () => { window.removeEventListener('pointerdown', outside); window.removeEventListener('hashchange', changed); };
  });
  function keydown(event) { if (event.key === 'Escape' && menuOpen) { menuOpen = false; mobileTrigger?.focus(); } }
</script>
<svelte:window onkeydown={keydown}/>
<div class="nav-shell" bind:this={shell}>
  <header class="sp-nav">
    <a class="sp-brand" href="#/home" aria-label={`${name} — Home`}><span class="sp-mark" aria-hidden="true">a<span>.</span></span><span>{brand}</span></a>
    <nav class="sp-links" aria-label="Primary navigation">{#each [{id:'projects',label:'Work'},{id:'about',label:'About'},{id:'skills',label:'Expertise'},{id:'services',label:'Services'},{id:'other',label:'Visual studio'}] as item}<a href={'#/'+item.id} aria-current={page===item.id?'page':undefined}>{item.label}</a>{/each}</nav>
    <div class="nav-actions"><button class="nav-motion" onclick={()=>paused=!paused} aria-label={paused?'Resume site animation':'Pause site animation'} aria-pressed={paused} title={paused?'Resume animation':'Pause animation'}><Icon name={paused?'play':'pause'} size={16}/></button><a class="sp-navcta" href="#/contact">Let’s talk <Icon size={16}/></a><button class="sp-mobile-menu" bind:this={mobileTrigger} aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} aria-controls="portfolio-pages" onclick={()=>menuOpen=!menuOpen}><Icon name={menuOpen?'close':'menu'} size={21}/></button></div>
  </header>
  {#if menuOpen}<nav class="page-menu" id="portfolio-pages" aria-label="All portfolio pages">{#each navigation as item}<a href={'#/'+item.id} aria-current={page===item.id?'page':undefined} onclick={()=>menuOpen=false}><span>{item.label}</span><Icon size={17}/></a>{/each}</nav>{/if}
</div>
