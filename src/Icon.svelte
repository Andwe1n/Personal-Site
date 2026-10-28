<script>
  export let name = 'arrow';
  export let size = 20;
  const paths = {
    arrow: 'M7 17 17 7M7 7h10v10',
    chevron: 'm9 5 7 7-7 7',
    code: 'm8 6-6 6 6 6m8-12 6 6-6 6m-3-16-2 20',
    chip: 'M7 7h10v10H7zM9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4',
    camera: 'M3 6h4l2-3h6l2 3h4v15H3zM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    github: 'M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-2-1-2 3-.4 6-1.5 6-6 0-1.5-.5-2.5-1.5-3.5.2-1 .2-2-.3-3-1.5-.2-3.2.8-4.2 1.5-2-.5-4-.5-6 0-1-.7-2.7-1.7-4.2-1.5-.5 1-.5 2-.3 3C2.5 7.5 2 8.5 2 10c0 4.5 3 5.6 6 6-.7.5-1 1.5-1 2v4',
    linkedin: 'M4 9v12m0-17v.01M10 21V9h5v2c1-3 6-3 6 2v8M15 11v10',
    instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0m2-6v.01',
    gmail: 'M3 5h18v14H3zM3 5l9 7 9-7',
    whatsapp: 'M21 11.5a9 9 0 0 1-13.5 7.8L2 21l1.7-5.5A9 9 0 1 1 21 11.5M8 7c0 5 4 9 8 9l1-3-3-1-1 2-3-3 2-1-1-3z',
    check: 'm5 12 4 4L19 6',
    pause: 'M8 5v14M16 5v14',
    play: 'm8 4 12 8-12 8z',
    menu: 'M4 7h16M4 12h16M4 17h16',
    close: 'm6 6 12 12M6 18 18 6',
    copy: 'M9 9h12v12H9zM15 5V1H1v14h4',
    download: 'M12 3v12m-5-5 5 5 5-5M3 16v5h18v-5',
    spark: 'm12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z',
  };
</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow}/></svg>
