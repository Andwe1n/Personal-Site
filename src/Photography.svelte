<script>
  import { photographs, photoCategories } from './photography-data.js';
  import Icon from './Icon.svelte';
  export let photos = photographs;

  let category = 'All', active = 0, expanded = false;
  let gallery, returnFocus, touchStart = null, swiped = false;
  $: visiblePhotos = category === 'All' ? photos : photos.filter(photo => photo.category === category);
  $: active = Math.max(0, Math.min(active, visiblePhotos.length - 1));
  $: current = visiblePhotos[active];
  const pad = number => String(number).padStart(2, '0');

  function filterPhotos(value) { category = value; active = 0; }
  function move(direction) {
    if (visiblePhotos.length) active = (active + direction + visiblePhotos.length) % visiblePhotos.length;
  }
  function openPhoto(event, photo = current) {
    active = visiblePhotos.findIndex(item => item.id === photo.id);
    returnFocus = event.currentTarget;
    expanded = true;
  }
  function showViewer(node) {
    const previousOverflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = 'hidden';
    node.querySelector('.viewer-close')?.focus();
    return { destroy() {
      node.close();
      document.body.style.overflow = previousOverflow;
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    } };
  }
  function handleKey(event) {
    if (!expanded && !gallery?.contains(document.activeElement)) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
    } else if (event.key === 'Home') {
      event.preventDefault(); active = 0;
    } else if (event.key === 'End') {
      event.preventDefault(); active = visiblePhotos.length - 1;
    }
  }
  function endSwipe(event) {
    if (touchStart === null) return;
    const distance = event.clientX - touchStart;
    touchStart = null;
    if (Math.abs(distance) > 60) { swiped = true; move(distance < 0 ? 1 : -1); }
  }
  function viewerSwipe(node) {
    let start = null;
    const begin = event => {
      if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
      start = { x: event.clientX, y: event.clientY };
      node.setPointerCapture(event.pointerId);
    };
    const end = event => {
      if (!start) return;
      const dx = event.clientX - start.x, dy = event.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1);
    };
    const cancel = () => { start = null; };
    node.addEventListener('pointerdown', begin);
    node.addEventListener('pointerup', end);
    node.addEventListener('pointercancel', cancel);
    return { destroy() {
      node.removeEventListener('pointerdown', begin);
      node.removeEventListener('pointerup', end);
      node.removeEventListener('pointercancel', cancel);
    } };
  }
</script>

<svelte:window onkeydown={handleKey}/>
<section class="photography-gallery" bind:this={gallery} aria-label="Photography portfolio">
  <div class="journal-header"><div><span class="eyebrow">THE VISUAL JOURNAL</span><h2>Light. Lines. <em>Character.</em></h2></div><span class="collection-count">{pad(photos.length)} ORIGINAL PHOTOGRAPHS</span></div>
  <div class="photo-filters" aria-label="Filter photographs">{#each photoCategories as item}<button type="button" class:chosen={category===item} aria-pressed={category===item} onclick={()=>filterPhotos(item)}><span>{item}</span><span class="filter-count">{item==='All'?photos.length:photos.filter(photo=>photo.category===item).length}</span></button>{/each}</div>

  {#if current}
    <div class="feature-layout" aria-roledescription="carousel" aria-label="Featured photographs">
      <div class="feature-copy"><span class="feature-category">{current.category} / SELECTED FRAME</span><div class="feature-description" aria-live="polite" aria-atomic="true"><h3>{current.title}</h3><p>{current.description}</p></div><button class="small-link view-photo" onclick={openPhoto}>View photograph <Icon size={17}/></button><div class="feature-controls"><span class="feature-counter" aria-live="polite">{pad(active+1)} <span>/ {pad(visiblePhotos.length)}</span></span><div class="feature-arrows"><button onclick={()=>move(-1)} aria-label="Previous photograph" disabled={visiblePhotos.length<2}>←</button><button onclick={()=>move(1)} aria-label="Next photograph" disabled={visiblePhotos.length<2}>→</button></div></div><p class="keyboard-hint">Use the arrows to explore. Select an image for a closer look.</p></div>
      <button class="feature-image" data-glass="none" aria-label={`Open large view: ${current.title}`} aria-haspopup="dialog" onclick={event=>{if(swiped){swiped=false;return;}openPhoto(event);}} onpointerdown={event=>{touchStart=event.clientX;swiped=false;}} onpointerup={endSwipe} onpointercancel={()=>touchStart=null}>
        <img class="feature-atmosphere" src={current.src} alt="" aria-hidden="true" decoding="async"/>
        {#key current.id}<img class="feature-photo" src={current.src} alt={current.alt} width={current.width} height={current.height} decoding="async"/>{/key}
        <span class="image-corner"><Icon size={20}/></span><span class="image-label">SELECT TO EXPAND</span>
      </button>
    </div>

    <div class="collection-heading"><span class="eyebrow">{category==='All'?'THE COMPLETE COLLECTION':category.toUpperCase()}</span><p>{visiblePhotos.length} {visiblePhotos.length===1?'frame':'frames'} · Photography & editing by me</p></div>
    <div class="photo-grid">{#each visiblePhotos as photo,index}<button class="photo-tile" class:is-active={photo.id===current.id} data-glass="none" aria-label={`Open ${photo.title}`} aria-haspopup="dialog" onclick={event=>openPhoto(event,photo)}><span class="tile-image"><img src={photo.thumbnail} srcset={`${photo.thumbnail} ${photo.thumbnailWidth}w, ${photo.src} ${photo.displayWidth}w`} sizes="(max-width:520px) 42vw, (max-width:900px) 28vw, 22vw" alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async"/><span class="tile-expand"><Icon size={18}/></span></span><span class="tile-caption"><span><span class="tile-title">{photo.title}</span><span class="tile-category">{photo.category}</span></span><span class="tile-index">{pad(index+1)}</span></span></button>{/each}</div>
  {:else}<div class="photo-empty"><h3>More frames, soon.</h3><p>Choose another collection to keep exploring.</p></div>{/if}

  {#if expanded && current}
    <dialog class="photo-viewer" use:showViewer onclose={()=>expanded=false} aria-labelledby="viewer-title">
      <div class="viewer-top"><div aria-live="polite" aria-atomic="true"><span class="eyebrow">{current.category} / {pad(active+1)} OF {pad(visiblePhotos.length)}</span><h2 id="viewer-title">{current.title}</h2></div><button class="viewer-close" aria-label="Close photograph" onclick={()=>expanded=false}><Icon name="close" size={21}/></button></div>
      <div class="viewer-image"><button class="viewer-previous" aria-label="Previous photograph" onclick={()=>move(-1)} disabled={visiblePhotos.length<2}>←</button><img use:viewerSwipe src={current.full} alt={current.alt} width={current.width} height={current.height} decoding="async" draggable="false"/><button class="viewer-next" aria-label="Next photograph" onclick={()=>move(1)} disabled={visiblePhotos.length<2}>→</button></div>
      <div class="viewer-bottom"><p>{current.description}</p><span><span class="desktop-viewer-hint">← → TO EXPLORE <i>·</i> ESC TO CLOSE</span><span class="touch-viewer-hint">SWIPE TO EXPLORE</span></span></div>
    </dialog>
  {/if}
</section>

<style>
  .photography-gallery{width:100%;min-width:0;color:#fff}
  .journal-header{display:flex;align-items:end;justify-content:space-between;gap:25px;margin:2px 0 28px}.journal-header h2{margin-top:12px;font-size:clamp(30px,3.5vw,48px)}.collection-count{font-size:11px;letter-spacing:1.7px;color:#aaa;white-space:nowrap;margin-bottom:8px}
  .photo-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px}.photo-filters button{display:flex;align-items:center;gap:18px;padding:10px 16px;min-height:44px;border:1px solid #ffffff20;border-radius:24px;background:#ffffff04;font-size:14px;color:#b8bfb1}.photo-filters .chosen{color:#182011;background:#d7f78a;border-color:#d7f78a}.photo-filters .chosen .filter-count{color:#465432}.photo-filters button:hover{border-color:#d7f78a88}.filter-count{font-size:11px;color:#aaa}
  .feature-layout{display:grid;grid-template-columns:.72fr 1.28fr;gap:35px;align-items:stretch}.feature-copy{display:flex;flex-direction:column;align-items:start;padding:35px 10px 20px 8px}.feature-category{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#bcbcbc}.feature-description{margin:auto 0 25px}.feature-description h3{font:400 clamp(34px,4vw,56px)/1.1 var(--font-general),sans-serif;letter-spacing:-2px;max-width:320px;margin:24px 0}.feature-description p{max-width:340px;font-size:15px;line-height:1.9;color:#bdbdbd}.view-photo{margin-bottom:auto}.feature-controls{display:flex;align-items:center;justify-content:space-between;gap:22px;width:100%;margin-top:50px;padding-top:25px;border-top:1px solid #ffffff20}.feature-counter{font-size:25px;font-family:var(--font-general),sans-serif;letter-spacing:-1px}.feature-counter>span{font-size:12px;letter-spacing:0;color:#999;margin-left:4px}.feature-arrows{display:flex;gap:8px}.feature-arrows button{width:44px;height:44px;display:grid;place-items:center;border:0;border-radius:50%;font-size:21px}.keyboard-hint{font-size:12px;line-height:1.8;color:#8f8f8f;margin-top:18px;max-width:260px}
  .feature-image{position:relative;display:block;isolation:isolate;overflow:hidden;min-width:0;width:100%;height:clamp(450px,56vw,680px);border:1px solid #ffffff25;border-radius:22px;background:rgba(0,0,0,.2);padding:0;touch-action:pan-y;cursor:zoom-in}.feature-atmosphere{position:absolute;inset:-10%;width:120%;height:120%;object-fit:cover;filter:blur(45px);opacity:.35;pointer-events:none;z-index:0}.feature-photo{position:relative;z-index:1;display:block;width:100%;height:100%;object-fit:contain;animation:photo-appear .35s ease}.image-corner{position:absolute;right:20px;top:20px;width:36px;height:36px;display:grid;place-items:center;border:1px solid #ffffff60;border-radius:50%;background:#00000030;backdrop-filter:blur(8px);z-index:2}.image-label{position:absolute;bottom:16px;right:20px;font-size:11px;letter-spacing:1.7px;color:white;text-shadow:0 1px 8px black;z-index:2}.feature-image:hover .image-corner{background:#ffffff20}
  .collection-heading{display:flex;align-items:center;justify-content:space-between;gap:20px;border-top:1px solid #ffffff20;padding-top:28px;margin:45px 0 22px}.collection-heading p{font-size:12px;color:#aab2a4}.photo-grid{columns:4;column-gap:18px}.photo-tile{display:inline-block;vertical-align:top;width:100%;padding:0;margin:0 0 18px;text-align:left;break-inside:avoid;border:1px solid #ffffff1c;border-radius:14px;overflow:hidden;background:rgba(255,255,255,.025);color:white;cursor:zoom-in}.photo-tile.is-active{border-color:#ffffff60}.tile-image{position:relative;display:block;overflow:hidden}.tile-image img{display:block;width:100%;height:auto;transition:transform .45s ease}.photo-tile:hover img{transform:scale(1.025)}.tile-expand{position:absolute;top:12px;right:12px;width:28px;height:28px;display:grid;place-items:center;border-radius:50%;background:#0005;border:1px solid #ffffff50;opacity:0;transition:opacity .2s}.photo-tile:hover .tile-expand,.photo-tile:focus-visible .tile-expand{opacity:1}.tile-caption{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:15px 13px}.tile-title{display:block;font-size:14px;line-height:1.5}.tile-category{display:block;font-size:11px;text-transform:uppercase;letter-spacing:1.3px;color:#999;margin-top:5px}.tile-index{font-size:11px;color:#9ba391}.photo-empty{padding:60px 20px;text-align:center}.photo-empty p{margin-top:15px}
  .photo-viewer{position:fixed;inset:0;margin:0;padding:24px 35px;width:100vw;max-width:none;height:100dvh;max-height:none;border:0;background:rgba(3,3,3,.94);color:white;overflow:hidden;box-sizing:border-box}.photo-viewer[open]{display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:18px}.photo-viewer::backdrop{background:#000b;backdrop-filter:blur(15px)}.viewer-top{display:flex;align-items:center;justify-content:space-between;gap:25px}.viewer-top .eyebrow{font-size:11px}.viewer-top h2{font-size:22px;line-height:1.3;letter-spacing:-.5px;margin:7px 0 0}.viewer-close{width:44px;height:44px;display:grid;place-items:center;flex-shrink:0;border:0;border-radius:50%}.viewer-image{display:grid;grid-template-columns:48px minmax(0,1fr) 48px;gap:22px;align-items:center;min-height:0;height:100%}.viewer-image>img{touch-action:pan-y pinch-zoom;user-select:none;display:block;object-fit:contain;width:100%;height:100%;min-height:0;max-height:100%}.viewer-previous,.viewer-next{width:44px;height:44px;border:0;border-radius:50%;font-size:22px}.viewer-bottom{display:flex;justify-content:space-between;align-items:center;gap:25px}.viewer-bottom p{font-size:14px;line-height:1.7;color:#bbb}.viewer-bottom>span{font-size:11px;letter-spacing:1.2px;color:#999;white-space:nowrap}.viewer-bottom i{font-style:normal;padding:0 9px}button:disabled{opacity:.35;cursor:default}button:focus-visible{outline:2px solid #fff;outline-offset:4px}
  .view-photo{min-height:44px;font-size:14px}.feature-arrows button,.viewer-close,.viewer-previous,.viewer-next{background:#ffffff09;color:#edf1e7;border:1px solid #ffffff25;transition:background .2s,border-color .2s}.feature-arrows button:hover,.viewer-close:hover,.viewer-previous:hover,.viewer-next:hover{background:#d7f78a18;border-color:#d7f78a88}.photo-tile:focus-visible{outline-color:#d7f78a}.touch-viewer-hint{display:none}
  @media(hover:none) and (pointer:coarse){.desktop-viewer-hint{display:none}.touch-viewer-hint{display:inline}.tile-expand{opacity:1}}
  @keyframes photo-appear{from{opacity:.25}to{opacity:1}}
  @media(max-width:1000px){.photo-grid{columns:3}.feature-layout{grid-template-columns:.75fr 1.25fr;gap:22px}.feature-copy{padding:20px 0 15px}.feature-description h3{font-size:40px}.feature-image{height:550px}.collection-count{font-size:11px;letter-spacing:1px}}
  @media(max-width:700px){.journal-header{display:block;margin-bottom:25px}.collection-count{display:block;margin:16px 0 0}.feature-layout{display:flex;flex-direction:column;gap:0}.feature-image{order:-1;height:520px}.feature-copy{padding:25px 0 0}.feature-category{font-size:11px}.feature-description{margin:0 0 20px}.feature-description h3{font-size:34px;max-width:none;margin:14px 0}.feature-description p{max-width:none;font-size:14px}.feature-controls{margin-top:25px;padding-top:20px}.keyboard-hint{max-width:none}.photo-grid{columns:2;column-gap:13px}.photo-tile{margin-bottom:13px}.collection-heading{align-items:start;margin-top:32px}.collection-heading .eyebrow{font-size:11px}.collection-heading p{font-size:11px;text-align:right;max-width:140px}.photo-viewer{padding:18px 15px}.viewer-image{grid-template-columns:44px minmax(0,1fr) 44px;gap:4px}.viewer-previous,.viewer-next{width:44px;height:44px;font-size:20px}.viewer-top h2{font-size:18px}.viewer-top .eyebrow{font-size:11px}.viewer-close{width:44px;height:44px}.viewer-bottom{display:block}.viewer-bottom p{font-size:14px}.viewer-bottom>span{display:block;margin-top:10px;font-size:11px}}
  @media(max-width:420px){.feature-image{height:420px;border-radius:17px}.photo-filters{gap:6px}.photo-filters button{font-size:14px;padding:10px 13px;gap:10px}.tile-caption{padding:12px 10px}.tile-title{font-size:14px}.tile-category{font-size:11px}.tile-index{font-size:11px}.photo-grid{column-gap:10px}.photo-tile{margin-bottom:10px}}
  @media(prefers-reduced-motion:reduce){.feature-photo{animation:none}.tile-image img,.tile-expand{transition:none}}
</style>
