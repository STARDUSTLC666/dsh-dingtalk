// Generated: shared optional update controls; edit the original client templates.
(function(){
/* DSH workbench UI v1. MIT. Canonical source: dsh-suite/ui/workbench-ui.js.
 * Vendored into each plugin: no Suite or extra runtime dependency is required.
 * Styles are scoped to .dshw and never replace the host chrome or theme.
 */
function createWorkbenchUI(React) {
  const h = React.createElement;
  const { useEffect, useId, useRef } = React;
  const cx = (...values) => values.filter(Boolean).join(' ');
  const paths = {
    book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
    calendar: ['M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z', 'M7 3v4M17 3v4M3 10h18'],
    mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
    rss: ['M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16', 'M4 19h.01'],
    slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
    shield: ['m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z', 'm8 12 3 3 5-6'],
    layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
    play: ['m9 6 9 6-9 6Z'],
    video: ['M3 5h12v14H3z', 'm15 10 6-4v12l-6-4'],
    search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
    plus: ['M12 5v14M5 12h14'],
    refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
    settings: ['m9 3-.7 2.4-2 .9L4 5.8 2.5 8.4l1.7 1.8v2.3L2.5 14 4 17l2.5-.4 1.9 1L9 20h3l.8-2.4 2-1 2.5.4 1.5-2.7-1.7-1.9v-2.2l1.7-1.8-1.5-2.6-2.5.4-2-1L12 3Z', 'M14 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'],
    close: ['m6 6 12 12M18 6 6 18'],
    left: ['m14 5-7 7 7 7'],
    right: ['m10 5 7 7-7 7'],
    down: ['m5 9 7 7 7-7'],
    filter: ['M4 5h16M7 12h10M10 19h4'],
    download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
    upload: ['M12 16V4m-5 5 5-5 5 5', 'M4 16v5h16v-5'],
    copy: ['M8 8h13v13H8z', 'M16 8V3H3v13h5'],
    external: ['M14 3h7v7m0-7L10 14', 'M10 3H3v18h18v-7'],
    file: ['M4 3h10l6 6v12H4z', 'M14 3v6h6M8 13h8M8 17h6'],
    folder: ['M3 5h7l2 3h9v12H3z'],
    edit: ['m15 4 5 5-10 10-6 1 1-6Z', 'm13 6 5 5'],
    trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
    more: ['M5 12h.01M12 12h.01M19 12h.01'],
    info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6M12 7h.01'],
    check: ['m5 12 4 4L19 6'],
    quote: ['M4 12h6v7H3v-7c0-4 2-6 5-7M15 12h6v7h-7v-7c0-4 2-6 5-7'],
    star: ['m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z'],
    reply: ['m9 5-7 7 7 7v-5h6c3 0 5 2 6 5 0-8-4-11-12-11Z'],
    link: ['m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0', 'm14 8 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0'],
  };
  function Icon({ name = 'file', size = 20, ...props }) {
    return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false, ...props },
      (paths[name] || paths.file).map((d, index) => h('path', { key: index, d })));
  }
  function Button({ children, icon, variant, className, ...props }) {
    return h('button', { type: 'button', ...props, className: cx('w-button', variant && 'w-' + variant, className) }, icon ? h(Icon, { name: icon, size: 18 }) : null, children);
  }
  function IconButton({ label, icon, ...props }) {
    return h(Button, { ...props, icon, className: cx('w-icon-button', props.className), 'aria-label': label, title: label });
  }
  function Page({ title, subtitle, actions, children, workbench = false, className, rootRef, ...props }) {
    return h('section', { ...props, ref: rootRef, className: cx('dshw', 'w-page', className), 'data-main': workbench ? 'true' : 'false' },
      h(Styles, { key: 'styles' }),
      h('header', { className: 'w-page-header' }, h('div', { className: 'w-heading' }, h('h1', null, title), subtitle ? h('p', { className: 'w-subtitle' }, subtitle) : null), actions ? h('div', { className: 'w-header-actions' }, actions) : null),
      h('div', { className: 'w-body' }, children));
  }
  function Tabs({ items, value, onChange, label, children }) {
    const id = useId();
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    function keys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      const node = event.currentTarget.parentElement?.querySelectorAll('[role=tab]')[next];
      if (node) { onChange(items[next].id); node.focus(); }
    }
    return h('div', { className: 'w-tabs-layout' },
      h('div', { className: 'w-tabs', role: 'tablist', 'aria-label': label }, items.map((item, index) => h('button', {
        type: 'button', role: 'tab', key: item.id, id: id + '-' + item.id, 'aria-controls': id + '-panel', 'aria-selected': active === item.id, tabIndex: active === item.id ? 0 : -1,
        onClick: () => onChange(item.id), onKeyDown: event => keys(event, index),
      }, item.label, item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null))),
      h('div', { className: 'w-tab-panel', id: id + '-panel', role: 'tabpanel', 'aria-labelledby': id + '-' + active }, children));
  }
  function Status({ children, tone = 'info', className }) {
    if (!children) return null;
    return h('div', { className: cx('dshw', 'w-status', 'w-status-' + tone, className), role: tone === 'error' ? 'alert' : 'status', 'aria-live': tone === 'error' ? 'assertive' : 'polite' }, h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 18 }), h('div', null, children));
  }
  function Empty({ title, children, action, icon = 'file' }) {
    return h('div', { className: 'dshw w-empty' }, h(Styles, { key: 'styles' }), h(Icon, { name: icon, size: 32 }), h('h2', null, title), children ? h('div', { className: 'w-muted' }, children) : null, action ? h('div', { className: 'w-toolbar' }, action) : null);
  }
  function Split({ list, detail, selected, onBack, backLabel, className, listWidth = 360 }) {
    const ref = useRef(null);
    useEffect(() => {
      if (!selected || !ref.current || ref.current.clientWidth > 760) return;
      const heading = ref.current.querySelector('.w-detail h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }, [selected]);
    return h('div', { ref, className: cx('w-split', className), 'data-selected': selected ? 'true' : 'false', style: { '--w-list-width': listWidth + 'px' } },
      h('div', { className: 'w-master' }, list),
      h('div', { className: 'w-detail' }, selected ? h(Button, { className: 'w-back', icon: 'left', variant: 'ghost', onClick: onBack }, backLabel) : null, detail));
  }
  function Row({ title, meta, description, active, onClick, children, status, className, disabled }) {
    return h('div', { className: cx('w-row', active && 'w-selected', className) },
      children ? h('div', { className: 'w-row-select' }, children) : null,
      h('button', { type: 'button', className: 'w-row-button', onClick, disabled, 'aria-pressed': !!active },
        h('span', { className: 'w-row-head' }, h('strong', null, title), status ? h('span', { className: 'w-tag' }, status) : null),
        meta ? h('span', { className: 'w-row-meta' }, meta) : null,
        description ? h('span', { className: 'w-row-description' }, description) : null));
  }
  function Search({ label, value, onChange, ...props }) {
    const id = useId();
    return h('div', { className: 'w-search' }, h(Icon, { name: 'search', size: 18 }), h('input', { type: 'search', id, 'aria-label': label, placeholder: label, value, onChange, ...props }));
  }
  function Switch({ label, checked, onChange, disabled }) {
    return h('label', { className: 'w-switch-label' }, h('span', null, label), h('input', { type: 'checkbox', role: 'switch', checked, disabled, onChange, 'aria-label': label }), h('span', { className: 'w-switch-track', 'aria-hidden': true }));
  }
  function Dialog({ title, children, onClose, closeLabel, className, busy = false }) {
    const id = useId(), panel = useRef(null);
    useEffect(() => {
      const previous = document.activeElement;
      panel.current?.querySelector('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')?.focus();
      return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); };
    }, []);
    function keydown(event) {
      if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); event.stopPropagation(); if (!busy) onClose(); return; }
      if (event.key !== 'Tab') return;
      const controls = [...panel.current.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')].filter(node => node.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (!controls.length) { event.preventDefault(); panel.current.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    return h('div', { className: 'dshw w-overlay', onClick: event => { if (!busy && event.target === event.currentTarget) onClose(); } },
      h(Styles, { key: 'styles' }),
      h('section', { ref: panel, className: cx('w-dialog', className), role: 'dialog', 'aria-modal': true, 'aria-labelledby': id, tabIndex: -1, onKeyDown: keydown },
        h('header', { className: 'w-dialog-header' }, h('h2', { id }, title), h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: onClose })), h('div', { className: 'w-dialog-body' }, children)));
  }
  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    // The two slots are optional. Existing settings and manual tools still load
    // in hosts without a workbench, while RC.3 owns navigation/pinning itself.
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) }, component));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) { return h(Icon, { name: icon, size }); }));
  }
  const styles = `
.dshw{--w-bg:var(--dsw-alias-bg-layer-1,#fff);--w-soft:var(--dsw-alias-bg-layer-2,#f7f8fa);--w-text:var(--dsw-alias-label-primary,#18202c);--w-muted:var(--dsw-alias-label-secondary,#667085);--w-border:var(--dsw-alias-border-l3,#e7e9ef);--w-accent:var(--dsh-plugin-workbench-accent,#4f6bdb);--w-selected:color-mix(in srgb,var(--w-accent) 10%,var(--w-bg));--w-primary:var(--w-text);--w-on-primary:var(--w-bg);container-type:inline-size;container-name:dsh-workbench;color:var(--w-text);font:14px/1.65 var(--dsh-font-family-content,system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif);min-width:0;max-width:100%;box-sizing:border-box;text-align:start;color-scheme:inherit}
.dshw *,.dshw *:before,.dshw *:after{box-sizing:border-box}.dshw h1,.dshw h2,.dshw h3,.dshw h4,.dshw p{margin:0}.dshw h1{font-size:30px;line-height:1.25;letter-spacing:-.025em;font-weight:650}.dshw h2{font-size:24px;line-height:1.35;font-weight:650;letter-spacing:-.015em;overflow-wrap:anywhere}.dshw h3,.dshw h4{font-size:16px;line-height:1.4;font-weight:600}.dshw a{color:var(--w-accent);text-underline-offset:3px;overflow-wrap:anywhere}.dshw button,.dshw input,.dshw select,.dshw textarea{font:inherit;color:inherit;max-width:100%}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select,.dshw textarea{background:var(--dsw-specific-input-major,var(--w-bg));border:1px solid var(--w-border);border-radius:8px;padding:8px 11px;min-width:0;line-height:1.5}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select{min-height:38px}.dshw textarea{resize:vertical}.dshw input[type=checkbox],.dshw input[type=radio]{width:16px;height:16px;flex-shrink:0;accent-color:var(--w-accent)}.dshw :focus-visible{outline:2px solid var(--w-accent);outline-offset:3px}.dshw button:disabled,.dshw input:disabled,.dshw select:disabled,.dshw textarea:disabled{opacity:.5;cursor:not-allowed}.dshw label{font-size:13px}.dshw fieldset{min-width:0;border:1px solid var(--w-border);border-radius:8px}.dshw summary{cursor:pointer;font-weight:550;list-style:none;display:flex;align-items:center;gap:8px}.dshw summary::-webkit-details-marker{display:none}.dshw summary:after{content:'';display:block;margin-inline-start:auto;width:7px;height:7px;border-inline-end:1.75px solid currentColor;border-bottom:1.75px solid currentColor;transform:rotate(45deg);flex-shrink:0}.dshw details[open]>summary:after{transform:rotate(225deg)}.dshw details>summary+*{margin-top:12px}.dshw pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;max-width:100%;background:var(--w-soft);border-radius:6px;padding:14px}.dshw img,.dshw video,.dshw iframe{max-width:100%}
.w-page{display:flex;flex-direction:column;position:relative;padding:0;min-height:540px;gap:0}.w-page[data-main=true]{height:100%;min-height:0;padding:calc(24px + var(--dsh-frame-top-clearance,0px)) 28px 0 max(28px,var(--dsh-frame-leading-clearance,0px));overflow:auto}.dshw[data-main=true]{background:var(--w-bg)}.dshw.w-page,.dshw .w-body,.dshw .w-tab-panel{overflow-x:clip}.w-page-header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding-bottom:22px;flex-shrink:0}.w-heading{min-width:0}.w-subtitle{margin-top:8px!important;font-size:14px;color:var(--w-muted);line-height:1.6}.w-header-actions,.w-toolbar,.w-actions{display:flex;align-items:center;flex-wrap:wrap;gap:8px;min-width:0}.w-header-actions{justify-content:flex-end}.w-body,.w-tabs-layout{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0}.w-body{overflow:auto}.w-tab-panel{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:auto}.w-tabs{display:flex;align-items:stretch;gap:20px;border-bottom:1px solid var(--w-border);flex-shrink:0;overflow-x:auto;scrollbar-width:thin}.dshw .w-tabs>button{border:0;border-bottom:2px solid transparent;background:transparent;padding:11px 8px 13px;white-space:nowrap;font-size:14px;font-weight:550;cursor:pointer;color:var(--w-muted);display:flex;align-items:center;gap:7px}.dshw .w-tabs>button[aria-selected=true]{border-bottom-color:var(--w-accent);color:var(--w-accent)}.w-count,.w-tag{font-size:12px;line-height:1.5;display:inline-flex;align-items:center;flex-shrink:0;background:var(--w-soft);border-radius:5px;padding:1px 6px;color:var(--w-muted)}.w-tabs [aria-selected=true] .w-count,.w-selected .w-tag{color:var(--w-accent);background:var(--w-selected)}
.dshw .w-button{display:inline-flex;justify-content:center;align-items:center;gap:7px;background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 12px;min-height:36px;line-height:1.4;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;white-space:normal}.dshw .w-button:not(:disabled):hover{background:var(--w-soft)}.dshw .w-primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}.dshw .w-primary:not(:disabled):hover{background:var(--w-primary);opacity:.9}.dshw .w-ghost{background:transparent;border-color:transparent}.dshw .w-danger{color:var(--dsw-alias-state-error-primary,#b43c3c)}.dshw .w-icon-button{width:36px;min-width:36px;padding:8px}.dshw .w-button svg{flex-shrink:0}.w-muted{color:var(--w-muted);font-size:12px;line-height:1.6}.w-section{padding:24px 0;border-bottom:1px solid var(--w-border);min-width:0}.w-section>h3{margin-bottom:12px}.w-section>p+p{margin-top:8px}.w-fields{display:grid;gap:16px;min-width:0}.w-field{display:grid;gap:6px;min-width:0}.w-field>input,.w-field>select,.w-field>textarea{width:100%}.w-status{display:flex;align-items:flex-start;gap:8px;padding:11px 13px;margin:12px 0;border:1px solid var(--w-border);border-radius:8px;background:var(--w-soft);font-size:13px;overflow-wrap:anywhere;flex-shrink:0}.w-status>svg{flex-shrink:0;margin-top:2px}.w-status-error{color:var(--dsw-alias-state-error-primary,#ad3636)}.w-status-success{color:var(--dsw-alias-state-success-primary,#24794a)}.w-status-warn{color:var(--dsw-alias-state-warning-primary,#8a5a00)}.w-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;width:100%;max-width:580px;padding:48px 24px;margin:auto;min-height:280px;overflow-wrap:anywhere}.w-empty>svg{color:var(--w-muted)}.w-empty h2{font-size:20px}.w-empty .w-muted{font-size:14px}.w-empty .w-toolbar{justify-content:center}
.w-split{display:grid;grid-template-columns:minmax(240px,var(--w-list-width)) minmax(0,1fr);min-height:460px;flex:1;min-width:0}.w-master{min-width:0;border-inline-end:1px solid var(--w-border);overflow:auto;padding-bottom:24px}.w-detail{min-width:0;padding:26px 28px;overflow:auto;overflow-wrap:anywhere;display:flex;flex-direction:column}.w-master-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:20px 16px}.w-search{display:flex;align-items:center;gap:8px;border:1px solid var(--w-border);border-radius:8px;padding:0 10px;min-width:0;flex:1;background:var(--w-bg)}.w-search>svg{color:var(--w-muted);flex-shrink:0}.dshw .w-search>input{border:0!important;background:transparent!important;padding:8px 0!important;width:100%;outline-offset:0}.w-row{display:flex;gap:0;min-width:0;position:relative;border-bottom:1px solid var(--w-border);border-inline-start:3px solid transparent}.w-row-select{display:flex;align-items:flex-start;padding:21px 0 0 14px}.dshw .w-row-button{display:flex;flex-direction:column;align-items:stretch;gap:7px;text-align:start;width:100%;padding:18px 18px 18px 16px;border:0;background:transparent;color:inherit;min-width:0;cursor:pointer;line-height:1.5}.dshw .w-row-button:hover{background:var(--w-soft)}.w-row-head{display:flex;align-items:flex-start;gap:10px;justify-content:space-between;min-width:0}.w-row-head>strong{font-size:14px;line-height:1.5;font-weight:600;overflow-wrap:anywhere}.w-row-meta,.w-row-description{color:var(--w-muted);font-size:12px;line-height:1.6;overflow-wrap:anywhere}.w-row-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.w-selected{background:var(--w-selected);border-inline-start-color:var(--w-accent)}.w-back{display:none!important}.w-detail-title{margin-bottom:12px!important}.w-detail-meta{color:var(--w-muted);font-size:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.w-detail-footer{padding:24px 0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:auto;border-top:1px solid var(--w-border)}.w-detail-footer .w-muted{flex:1;min-width:160px}.w-definition{display:grid;grid-template-columns:minmax(80px,120px) minmax(0,1fr);gap:8px 16px;font-size:14px;margin:20px 0}.w-definition dt{color:var(--w-muted)}.w-definition dd{margin:0;min-width:0;overflow-wrap:anywhere}
.w-switch-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;position:relative;cursor:pointer}.w-switch-label>input{position:absolute;opacity:0;inset-inline-end:0;width:36px!important;height:22px!important;margin:0;cursor:pointer}.w-switch-track{width:36px;height:22px;border-radius:12px;display:block;background:var(--w-border);border:1px solid var(--w-border);pointer-events:none;padding:2px;transition:background .15s}.w-switch-track:before{content:'';display:block;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px #0002;transition:transform .15s}.w-switch-label>input:checked+.w-switch-track{background:var(--w-accent);border-color:var(--w-accent)}.w-switch-label>input:checked+.w-switch-track:before{transform:translateX(14px)}.w-switch-label>input:focus-visible+.w-switch-track{outline:2px solid var(--w-accent);outline-offset:3px}.w-switch-label:has(>input:disabled){opacity:.5;cursor:not-allowed}
.w-overlay{position:fixed;inset:0;background:#0005;display:flex;justify-content:flex-end;z-index:1000;padding:12px;overflow:auto}.w-dialog{width:min(620px,100%);max-height:100%;display:flex;flex-direction:column;min-height:0;background:var(--w-bg);color:var(--w-text);border:1px solid var(--w-border);border-radius:12px;box-shadow:0 18px 70px #0003}.w-dialog-header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid var(--w-border);flex-shrink:0}.w-dialog-header>h2{font-size:20px}.w-dialog-body{overflow:auto;padding:20px 24px;min-height:0}.w-editor-grid{display:grid;grid-template-columns:210px minmax(0,1fr) 300px;min-height:500px;flex:1}.w-editor-list{padding:20px 12px;border-inline-end:1px solid var(--w-border);min-width:0}.w-editor-canvas{background:var(--w-soft);padding:20px;min-width:0;display:flex;flex-direction:column;gap:14px}.w-editor-inspector{padding:24px;border-inline-start:1px solid var(--w-border);min-width:0;overflow:auto}.w-editor-inspector h3{margin-bottom:18px}.w-preview-empty{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;aspect-ratio:16/9;min-height:180px;background:var(--w-soft);border:1px solid var(--w-border);border-radius:8px;padding:24px;color:var(--w-muted)}.w-content-pad{padding:24px 0}.w-stack{display:flex;flex-direction:column;gap:16px;min-width:0}.w-scroll-x{overflow:auto;max-width:100%}
@container dsh-workbench (max-width:1000px){.w-editor-grid{grid-template-columns:160px minmax(0,1fr)}.w-editor-inspector{grid-column:1/-1;border-inline-start:0;border-top:1px solid var(--w-border)}.w-header-actions{max-width:60%}.w-split{grid-template-columns:minmax(240px,32%) minmax(0,1fr)}}
@container dsh-workbench (max-width:760px){.w-page-header{gap:14px;flex-wrap:wrap;padding-bottom:18px}.w-heading{flex:1;min-width:170px}.dshw h1{font-size:24px}.w-header-actions{max-width:100%;justify-content:flex-start}.w-subtitle{font-size:13px}.w-tabs{gap:12px}.dshw .w-tabs>button{padding:10px 4px 12px}.w-split{display:block;min-height:360px}.w-split[data-selected=false]>.w-detail{display:none}.w-split[data-selected=true]>.w-master{display:none}.w-master{border-inline-end:0}.w-detail{padding:20px 0}.w-back{display:inline-flex!important;align-self:flex-start;margin:0 0 16px!important}.w-detail h2{font-size:22px}.w-master-toolbar{padding:16px 0}.dshw .w-row-button{padding:16px 10px}.w-detail-footer{position:static}.w-detail-footer .w-muted{flex-basis:100%}.w-editor-grid{display:flex;flex-direction:column}.w-editor-list{border-inline-end:0;border-bottom:1px solid var(--w-border);padding:16px 0}.w-editor-canvas{padding:16px 0;background:var(--w-bg)}.w-editor-inspector{padding:20px 0}.w-dialog-header,.w-dialog-body{padding:16px}.w-button{min-height:40px}.w-definition{grid-template-columns:80px minmax(0,1fr)}}
@media(max-width:700px){.w-page[data-main=true]{padding:calc(16px + var(--dsh-frame-top-clearance,0px)) 16px 0 max(16px,var(--dsh-frame-leading-clearance,0px))}.w-overlay{padding:8px}.w-dialog{width:100%}}
@media(prefers-reduced-motion:reduce){.dshw *,.dshw *:before{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;
  function Styles() { return h('style', null, styles); }
  return { Icon, Button, IconButton, Page, Tabs, Status, Empty, Split, Row, Search, Switch, Dialog, Styles, register, styles };
}

/* One update control per plugin. Only transport, idle guards and installation
 * coordination are shared; no global update page or update-all action exists. */
function __stardustUpdatesGuards() {
  const key = Symbol.for('stardustlc.plugin-updates.guards.v1');
  return globalThis[key] ||= { values: new Map(), listeners: new Set(), viewListeners: new Set(), clients: new Set() };
}
function __stardustUpdatesGuard(React, name, { dirty = false, busy = false, retainOnClose = false } = {}) {
  const token = React.useRef(null);
  if (!token.current) token.current = {};
  React.useLayoutEffect(() => {
    const pool = __stardustUpdatesGuards();
    if (!dirty && !busy) for (const [key, value] of pool.values) if (value.name === name && value.orphan) pool.values.delete(key);
    pool.values.set(token.current, { name, dirty: !!dirty, busy: !!busy, retainOnClose, orphan: false });
    for (const listener of pool.listeners) listener();
  }, [name, !!dirty, !!busy, retainOnClose]);
  React.useEffect(() => () => {
    const pool = __stardustUpdatesGuards(), value = pool.values.get(token.current);
    if (value?.retainOnClose && (value.dirty || value.busy)) value.orphan = true;
    else pool.values.delete(token.current);
    for (const listener of pool.listeners) listener();
  }, []);
}
function __StardustPluginUpdatesFooter({ React, name }) {
  const [, render] = React.useState(0), pool = __stardustUpdatesGuards();
  React.useEffect(() => { const fn = () => render(value => value + 1); pool.viewListeners.add(fn); return () => pool.viewListeners.delete(fn); }, []);
  const client = [...pool.clients].find(client => typeof client.Footer === 'function' && client.has(name));
  if (!client) return null;
  return React.createElement(client.Footer, { name });
}
function __stardustUpdatesInlinePage(React, element, name) {
  return React.cloneElement(element, null, element.props.children, React.createElement(__StardustPluginUpdatesFooter, { key: 'plugin-updates', React, name }));
}
function __stardustUpdatesDetailName(subject, rows) {
  if (!subject || !['bundle', 'row'].includes(subject.kind)) return null;
  if (subject.kind === 'row' && subject.pkg?.name === '@stardustlc/dsh-suite') {
    const component = rows.find(row => row.bundledBy === subject.pkg.name && (subject.row?.moduleName === row.name || subject.row?.moduleName?.startsWith(row.name + '/')));
    if (component) return component.name;
  }
  return rows.some(row => row.name === subject.pkg?.name) ? subject.pkg.name : null;
}
function __stardustUpdatesNativeFormState(document) {
  let dirty = false, busy = false;
  for (const scope of document.querySelectorAll('[data-plugin-detail],[data-plugin-row-detail]')) for (const button of scope.querySelectorAll('button')) {
    if (!button.getClientRects().length || button.closest('.plugin-updates-footer')) continue;
    const label = (button.getAttribute('aria-label') || button.textContent || '').trim();
    if (/^(?:正在保存|保存中|Saving)(?:[.…\s]|$)/i.test(label) || button.getAttribute('aria-busy') === 'true') busy = true;
    if (!button.disabled && button.getAttribute('aria-disabled') !== 'true' && /^(?:保存(?:更改|设置|配置)?|Save(?: changes| settings| configuration)?)(?:\s+(?:Ctrl|⌘|Enter|↵).*)?$/i.test(label)) dirty = true;
  }
  return { dirty, busy };
}
function __stardustUpdatesDisplayRows(next, known) {
  for (const row of next.rows) known.set(row.name, row);
  if (!['verifying', 'installing', 'cancelling', 'unknown', 'restore-failed'].includes(next.job?.state)) return next;
  const rows = [...next.rows];
  for (const row of known.values()) if ((row.name === next.job.name || row.bundledBy === next.job.name) && !rows.some(item => item.name === row.name)) rows.push({ ...row, updating: true });
  return { ...next, rows };
}
function __stardustUpdatesSuiteRows(next, participants) {
  // The official manager lists top-level dependencies, not Suite's transitive
  // components. Project active, build-identified clients for display only.
  // Installation and preferences still use the real Suite row from the host.
  const suite = next.rows.find(row => row.name === '@stardustlc/dsh-suite' && row.enabled);
  if (!suite) return next;
  const rows = [...next.rows], names = new Set(rows.map(row => row.name));
  for (const item of participants) if (item.suiteComponent && item.packageVersion && item.label && !names.has(item.name)) {
    names.add(item.name);
    rows.push({ name: item.name, version: item.packageVersion, enabled: true, sourceKind: 'suite', loadError: false, label: item.label, labelEn: item.labelEn, bundledBy: suite.name });
  }
  return { ...next, rows };
}
function __stardustUpdatesWrap(definition, participant) {
  return { ...definition, factory(require) {
    const original = definition.factory(require);
    if (!original || typeof original !== 'object') return original;
    const React = require('react');
    return { ...original, apply(ctx, ...args) {
      const result = original.apply?.call(this, ctx, ...args);
      // The optional alpha.3 slot stays dormant in older hosts; its scoped
      // injection unregisters naturally when the plugin is unloaded.
      if (participant.iconData && participant.sectionIds?.length && typeof ctx.inject === 'function') ctx.inject(['slots'], host => {
        for (const id of new Set(participant.sectionIds)) host.slots.inject('settings.section.icon', () => host.slots.register({ name: 'settings.section.icon', id }, function PluginSettingsIcon({ size = 20 }) {
          return React.createElement('img', { src: participant.iconData, alt: '', 'aria-hidden': true, width: size, height: size, style: { objectFit: 'contain', display: 'block', flexShrink: 0 } });
        }));
      });
      if (typeof ctx.inject === 'function') ctx.inject(['slots', 'locale', 'remote', 'remote.pluginManager'], host => __stardustUpdatesJoin(host, React, require, participant));
      return result;
    } };
  } };
}
function __stardustUpdatesJoin(host, React, require, participant) {
  const key = Symbol.for('stardustlc.plugin-updates.client.v1'), pools = globalThis[key] ||= new WeakMap(), root = host.root || host;
  if (typeof root.plugin !== 'function') return;
  let record = pools.get(root);
  if (!record) {
    record = { refs: new Map(), timer: null, version: participant.version, alive: true, hold: false, uiRevision: 2 };
    pools.set(root, record);
    __stardustUpdatesActivate(record, pools, root, React, require);
  } else if (record.uiRevision !== 2 && !record.migration) {
    // The first loaded participant may still own a pre-footer client. Keep
    // its references and draft guards, wait for any admitted install, then
    // replace that one client fiber instead of running two window heartbeats.
    const shared = record;
    record.migration = Promise.resolve().then(async () => {
      while (shared.alive && shared.hold) await new Promise(resolve => setTimeout(resolve, 500));
      if (!shared.alive || !shared.refs.size) return;
      await shared.fiber?.dispose?.();
      if (!shared.refs.size) return;
      shared.alive = true; shared.uiRevision = 2; pools.set(root, shared);
      __stardustUpdatesActivate(shared, pools, root, React, require);
    }).catch(() => { /* The original page remains usable if host disposal fails. */ });
  }
  clearTimeout(record.timer);
  const ref = {}; record.refs.set(ref, participant);
  host.effect(() => () => {
    record.refs.delete(ref);
    const stop = () => {
      if (record.refs.size || !record.alive) return;
      if (record.hold) { record.timer = setTimeout(stop, 1000); return; }
      record.alive = false; Promise.resolve(record.fiber?.dispose?.()).catch(() => {});
    };
    if (!record.refs.size) record.timer = setTimeout(stop, 1000);
  });
}
function __stardustUpdatesActivate(shared, pools, root, React, require) {
  shared.fiber = root.plugin({ name: 'stardustlc-plugin-updates-client', inject: ['slots', 'locale', 'remote', 'remote.pluginManager'], apply(ctx) {
    const client = __stardustUpdatesClient(ctx, React, require, shared);
    ctx.effect(() => () => { shared.alive = false; client.dispose(); if (pools.get(root) === shared) pools.delete(root); });
  } });
  Promise.resolve(shared.fiber).catch(() => { shared.alive = false; if (pools.get(root) === shared) pools.delete(root); });
}
function __stardustUpdatesClient(ctx, React, require, shared) {
  const h = React.createElement, W = createWorkbenchUI(React), route = new URL('api/stardustlc/plugin-updates', document.baseURI);
  const { useState, useEffect } = React, id = crypto.randomUUID(), listeners = new Set(), pool = __stardustUpdatesGuards(), requests = new Set(), notified = new Set(), knownRows = new Map();
  let alive = true, registered = false, state = null, lastInteraction = Date.now(), inPoll = false, manualOperation = false, legacyHint = null;
  const language = () => String(ctx.locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh';
  const t = (zh, en) => language() === 'en' ? en : zh;
  const preferences = name => state?.preferences.packages[name] || { checkEnabled: true, autoInstall: false, deferredUntil: 0, ignoredVersion: null };
  const originalRow = name => state?.rows.find(row => row.name === name);
  const rowFor = name => { const row = originalRow(name); return row?.bundledBy ? originalRow(row.bundledBy) : row; };
  const activeJob = () => ['verifying', 'installing', 'cancelling'].includes(state?.job?.state);
  function notify() { shared.hold = manualOperation || activeJob(); for (const listener of listeners) listener(); for (const listener of pool.viewListeners) listener(); }
  async function api(body = { action: 'state' }) {
    const controller = new AbortController(); requests.add(controller);
    const timeout = setTimeout(() => controller.abort(), body.action === 'check' ? 95000 : 45000);
    try {
      const response = await fetch(route, { method: 'POST', credentials: 'same-origin', cache: 'no-store', signal: controller.signal, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify(body) });
      let data; try { data = await response.json(); } catch { throw new Error('service-unavailable'); }
      if (!response.ok || !data.ok) throw new Error(response.status === 403 ? 'owner-required' : data.code || 'service-unavailable');
      return data.value;
    } catch (error) { if (error?.name === 'AbortError') throw new Error('service-unavailable'); throw error; }
    finally { clearTimeout(timeout); requests.delete(controller); }
  }
  function pageState(manual = manualOperation) {
    const values = [...pool.values.values()], nativeForm = __stardustUpdatesNativeFormState(document);
    const dialog = [...document.querySelectorAll('[role="dialog"],dialog[open]')].some(node => node.getClientRects().length && !(manual && (node.closest('.plugin-updates-footer') || node.querySelector('.plugin-updates-footer'))));
    return { action: 'heartbeat', id, dirty: nativeForm.dirty || values.some(value => value.dirty), busy: nativeForm.busy || values.some(value => value.busy) || dialog, idleForMs: Math.min(86400000, Math.max(0, Date.now() - lastInteraction)) };
  }
  const heartbeat = () => api(pageState());
  function interaction() { lastInteraction = Date.now(); if (registered && alive) void heartbeat().catch(() => {}); }
  const guardChanged = () => { if (registered && alive) void heartbeat().catch(() => {}); };
  for (const event of ['pointerdown', 'keydown', 'input']) document.addEventListener(event, interaction, { capture: true, passive: true });
  pool.listeners.add(guardChanged);
  const close = () => { void fetch(route, { method: 'POST', credentials: 'same-origin', keepalive: true, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify({ action: 'client-close', id }) }).catch(() => {}); };
  window.addEventListener('pagehide', close);
  async function refresh() { const next = await api(); if (alive) { state = __stardustUpdatesDisplayRows(__stardustUpdatesSuiteRows(next, shared.refs.values()), knownRows); notify(); } return next; }
  function useSnapshot() {
    const [, render] = useState(0);
    useEffect(() => { const fn = () => render(value => value + 1); listeners.add(fn); const stop = ctx.locale?.subscribe?.(fn); return () => { listeners.delete(fn); stop?.(); }; }, []);
    return state;
  }
  function message(code) {
    return ({
      'page-dirty': t('有未保存的修改。请先保存或放弃修改，再更新。', 'Save or discard unsaved changes before updating.'),
      'page-busy': t('有页面操作或对话框尚未结束，请完成后再试。', 'Finish the active page operation or close its dialog, then retry.'),
      'page-not-ready': t('还有窗口状态未确认，或旧版插件尚未提供状态保护。请刷新相关窗口，必要时先手动更新旧版插件。', 'A window state is unknown or an older plugin lacks state protection. Refresh the affected windows and manually update legacy plugins if needed.'),
      busy: t('DSH 正在执行任务或安装，请等操作结束。', 'DSH is running a task or installation. Wait for it to finish.'),
      'activity-unknown': t('无法确认任务是否空闲，已暂停安装。', 'Installation paused because task activity is unknown.'),
      'restart-required': t('更新服务需要重启后继续。请在方便时手动重启 DSH。', 'The updater needs a restart. Restart DSH manually when convenient.'),
      'operation-unconfirmed': t('上次安装未确认或恢复失败。请在官方插件管理中检查并修复，之后手动重启 DSH。', 'The last installation is unconfirmed or recovery failed. Check and repair it in native plugin management, then restart DSH manually.'),
      'check-first': t('检查结果已过期，请重新检查。', 'This check expired. Check again.'),
      'release-changed': t('发布信息已变化，本次未安装。请重新检查。', 'Release metadata changed. Nothing was installed; check again.'),
      'preferences-conflict': t('另一个窗口修改了偏好，已刷新，请重试。', 'Preferences changed in another window. They have been refreshed; retry.'),
      'preferences-unreadable': t('更新偏好文件无法读取，自动安装已关闭。请检查当前 profile 的 stardustlc-plugin-updates.json。', 'Preferences could not be read. Automatic installation is off. Check stardustlc-plugin-updates.json in this profile.'),
      'no-update': t('版本已变化或暂不兼容，请重新检查。', 'The version changed or is incompatible. Check again.'),
      'source-not-registry': t('本地源码、Git 等安装，请通过原安装方式更新。', 'Update local, Git and other external sources through their original installation method.'),
      'managed-by-suite': t('这个插件随 Suite 安装，通过 Suite 更新。', 'This plugin was installed through Suite and is updated through Suite.'),
      'owner-required': t('只有 profile 拥有者能管理更新。', 'Only the profile owner can manage updates.'),
    })[code] || t('操作未完成，请刷新后重试。DSH 不会因此自动重启。', 'The operation could not be completed. Refresh and retry. DSH will not restart automatically.');
  }
  // releaseOf() keeps the failing engine/peer range check as a stable code; say which
  // environment has to change instead of only reporting that the release is incompatible.
  function requirement(release) {
    return ({
      'dsh-version': t('需要换成与该版本匹配的 DSH 本体', 'it needs a different DSH version'),
      'node-version': t('需要换成与该版本匹配的 Node.js', 'it needs a different Node.js version'),
      deprecated: t('作者已把这个版本标记为弃用', 'the author marked this release as deprecated'),
      'not-bundle': t('这个版本不是可加载的 DSH 插件包', 'this release is not a loadable DSH plugin bundle'),
    })[release?.reason] || t('发布元数据的兼容范围与当前环境不符', 'its published compatibility range does not match this environment');
  }
  function jobLabel(job) {
    return ({ verifying: t('正在核对版本', 'Verifying release'), installing: t('正在安装', 'Installing'), cancelling: t('正在请求取消', 'Requesting cancellation'), complete: t('已更新', 'Updated'), 'restart-required': t('已安装，等待你手动重启', 'Installed; manual restart needed'), restored: t('更新未成功，已恢复原版本', 'Update failed; previous version restored'), 'restore-failed': t('恢复未成功，请检查官方插件管理', 'Recovery failed; check native plugin management'), unknown: t('结果未确认，请检查官方插件管理', 'Result unconfirmed; check native plugin management'), cancelled: t('已取消', 'Cancelled'), failed: t('更新未成功', 'Update failed') })[job.state] || job.state;
  }
  function FooterFrame({ name, label, subtitle, actions, children }) {
    return h('section', { className: 'dshw plugin-updates-footer', 'data-plugin-update-footer': name, 'aria-label': label + t(' · 版本与更新', ' · Version and updates') },
      h('style', null, W.styles),
      h('style', null, '.plugin-updates-footer{box-sizing:border-box;flex-shrink:0;margin-top:28px;padding-top:18px;border-top:1px solid var(--dsw-alias-border-l3,#e5e7eb);min-width:0;max-width:100%;color:var(--dsw-alias-label-primary,#202124)}.plugin-updates-footer .updates-head{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px}.plugin-updates-footer h2{font-size:14px;line-height:22px;margin:0;font-weight:600}.plugin-updates-footer .updates-subtitle,.plugin-updates-footer .updates-version{font:12px/1.6 ui-monospace,monospace;overflow-wrap:anywhere;margin:4px 0}.plugin-updates-footer .updates-options{margin-top:12px}.plugin-updates-footer .updates-options>summary{cursor:pointer;font-size:12px;line-height:22px;color:var(--dsw-alias-label-secondary,#657080)}.plugin-updates-footer .updates-options>summary:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:4px}.plugin-updates-footer .updates-settings{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px;padding:14px 0 0}.plugin-updates-footer .updates-note{margin:5px 0 0;font-size:12px;line-height:1.6}.plugin-updates-footer>.w-section{margin:10px 0 0;padding:0;border:0}.plugin-updates-footer .w-toolbar{margin-top:10px!important}.plugin-updates-footer .w-switch-label{max-width:100%;gap:12px;align-items:flex-start}.plugin-updates-footer .w-switch-track{flex-shrink:0}.plugin-updates-footer .updates-notes{margin-top:12px;padding:12px;border:1px solid var(--dsw-alias-border-l3,#e5e7eb);border-radius:10px}.plugin-updates-footer .updates-notes pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:240px;overflow:auto;font:12px/1.7 ui-monospace,monospace}.plugin-updates-footer .w-overlay{z-index:1002}@media(max-width:600px){.plugin-updates-footer .updates-head{gap:8px}.plugin-updates-footer .w-toolbar{gap:6px;flex-wrap:wrap}.plugin-updates-footer .w-button{max-width:100%}}'),
      h('div', { className: 'updates-head' }, h('div', null, h('h2', null, t('版本与更新', 'Version and updates')), h('p', { className: 'updates-subtitle w-muted' }, subtitle)), actions), children);
  }
  function Panel({ name }) {
    const snapshot = useSnapshot(), [error, setError] = useState(''), [working, setWorking] = useState(false), [checking, setChecking] = useState(false), [dialog, setDialog] = useState(null), [notes, setNotes] = useState(null), [notesOpen, setNotesOpen] = useState(false), [loadingNotes, setLoadingNotes] = useState(false);
    const row = rowFor(name), original = originalRow(name), target = row?.name || name, prefs = preferences(target), job = snapshot?.job?.name === target ? snapshot.job : null;
    async function perform(callback) { setError(''); setWorking(true); try { await callback(); await refresh(); } catch (error) { setError(error.message); await refresh().catch(() => {}); } finally { setWorking(false); } }
    async function save(changes, consent) { await api({ action: 'preferences', name: target, revision: state.preferences.revision, changes, consent }); }
    async function check() { setError(''); setChecking(true); try { await api({ action: 'check', name: target }); await refresh(); } catch (error) { setError(error.message); } finally { setChecking(false); } }
    async function install() {
      setDialog(null); manualOperation = true; notify();
      await perform(async () => {
        try {
          await heartbeat();
          const started = await api({ action: 'install', name: row.name, version: row.release.version, confirmation: 'update-installed-plugin' });
          while (alive) {
            await new Promise(resolve => setTimeout(resolve, 800)); await heartbeat(); await refresh();
            if (state.job?.id !== started.id) throw new Error('operation-unconfirmed');
            if (!activeJob()) break;
          }
        } finally { manualOperation = false; notify(); }
      });
    }
    async function showNotes() {
      if (notesOpen) { setNotesOpen(false); return; }
      setNotesOpen(true); setNotes(null); setLoadingNotes(true); setError('');
      try { setNotes(await api({ action: 'notes', name: target, version: row.release.version })); } catch (error) { setError(error.message); } finally { setLoadingNotes(false); }
    }
    if (!snapshot || !row) return h(W.Status, null, t('此插件尚未安装或已从当前 profile 移除。', 'This plugin is not installed in the current profile.'));
    const title = language() === 'en' ? original.labelEn : original.label;
    const ownPage = pageState(true), unconfirmed = ['unknown', 'restore-failed'].includes(snapshot.job?.state), pageBusy = ownPage.busy || (snapshot.pages.clients || []).some(client => client.id !== id && client.busy), installLocked = working || activeJob() || unconfirmed || snapshot.updaterRestart || snapshot.preferenceError || !snapshot.activity.known || snapshot.activity.busy || snapshot.pages.dirty || ownPage.dirty || pageBusy || !snapshot.pages.known;
    const checkingThis = checking || snapshot.checkingNames?.includes(target);
    const status = row.sourceKind !== 'registry' ? t('本地 / 外部来源，保留原安装方式', 'Local / external source; keep original install method') : row.loadError ? t('加载异常，请先检查官方插件管理', 'Loading error; check native plugin management') : row.error ? t('检查失败，可以重试', 'Check failed; retry available') : row.release && !row.release.compatible ? t('新版本暂不兼容当前环境：', 'Latest release is incompatible with this environment: ') + requirement(row.release) : row.available ? (prefs.ignoredVersion === row.release.version ? t('已忽略提醒，仍可手动更新', 'Reminder ignored; manual update available') : t('有新版本', 'Update available')) : row.checkedAt ? t('当前已是最新稳定版', 'Latest stable version') : t('尚未检查', 'Not checked yet');
    return h(FooterFrame, { name, label: title, subtitle: original.name + ' · ' + original.version, actions: h(W.Button, { icon: 'refresh', disabled: checkingThis || row.sourceKind !== 'registry', onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : target === '@stardustlc/dsh-suite' ? t('检查整包更新', 'Check Suite updates') : t('检查更新', 'Check for updates')) },
      original.bundledBy && h(W.Status, null, t('此插件随 Suite 安装。以下设置与安装作用于 Suite 整包，以保持组件版本一致。单独安装的插件可以独立更新。', 'This plugin was installed through Suite. These controls update Suite as a package so its components stay consistent. Independently installed plugins update individually.')),
      h('section', { className: 'w-section' }, (original.bundledBy || row.available) && h('p', { className: 'updates-version' }, target + ' · ' + row.version, row.release?.version && row.release.version !== row.version ? ' → ' + row.release.version : ''), h('p', { className: 'w-muted updates-note' }, status), !row.enabled && h('p', { className: 'w-muted' }, t('当前已停用，更新后仍保持停用。', 'Currently disabled; it will remain disabled after updating.')), row.checkedAt && h('p', { className: 'w-muted updates-note' }, t('上次检查：', 'Last checked: ') + new Date(row.checkedAt).toLocaleString(language() === 'en' ? 'en-US' : 'zh-CN')),
        h('div', { className: 'w-toolbar' }, row.available && row.sourceKind === 'registry' && h(W.Button, { variant: 'primary', icon: 'download', disabled: installLocked || row.loadError, onClick: () => setDialog('install') }, target === '@stardustlc/dsh-suite' ? t('更新 Suite 整包', 'Update whole Suite') : t('更新此插件', 'Update this plugin')), row.release && h(W.Button, { variant: 'ghost', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')), row.available && h(W.Button, { variant: 'ghost', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')), row.available && prefs.ignoredVersion !== row.release.version && h(W.Button, { variant: 'ghost', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版本提醒', 'Ignore this reminder')))),
      notesOpen && h('section', { className: 'updates-notes', 'aria-label': t('更新记录', 'Release notes') }, h('strong', null, target + ' · ' + (notes?.version || row.release?.version || '')), loadingNotes ? h('p', null, t('正在读取…', 'Loading…')) : notes?.text ? h('pre', null, notes.text) : h('p', null, t('未找到此版本的独立更新记录。', 'No separate notes were found for this version.')), notes?.url && h('a', { href: notes.url, target: '_blank', rel: 'noreferrer noopener' }, t('查看仓库更新记录', 'View repository changelog'))),
      h('details', { className: 'updates-options' }, h('summary', null, t('更新选项', 'Update options'), ' · ', prefs.checkEnabled ? t('自动检查：开', 'Checks: on') : t('自动检查：关', 'Checks: off'), ' · ', prefs.autoInstall ? t('自动安装：开', 'Install: on') : t('自动安装：关', 'Install: off')), h('section', { className: 'updates-settings', 'aria-label': t('这个插件的更新偏好', 'Update preferences for this plugin') },
        h('div', null, h(W.Switch, { label: t('自动检查这个插件的更新', 'Automatically check this plugin'), checked: prefs.checkEnabled, disabled: working || !!snapshot.preferenceError || row.sourceKind !== 'registry', onChange: event => perform(() => save({ checkEnabled: event.target.checked })) }), h('p', { className: 'w-muted updates-note' }, t('默认开启，每天最多一次。只影响这个插件，关闭后仍可手动检查。', 'On by default, at most once daily. This affects only this plugin; manual checks remain available.'))),
        h('div', null, h(W.Switch, { label: t('空闲时自动安装这个插件的补丁', 'Install patches for this plugin while idle'), checked: prefs.autoInstall, disabled: working || !!snapshot.preferenceError || row.sourceKind !== 'registry', onChange: event => event.target.checked ? setDialog('automatic') : perform(() => save({ autoInstall: false })) }), h('p', { className: 'w-muted updates-note' }, t('默认关闭。明确开启后，仅空闲且没有未保存修改时安装兼容补丁。其他插件的开关不变。', 'Off by default. Explicitly enable compatible patches while idle with no unsaved changes. Other plugins’ settings stay unchanged.'))))),
      error && h(W.Status, { tone: 'error' }, message(error)), snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
      snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有更新等待手动重启后生效。你可以继续工作，自动安装已暂停。', 'Some updates need a manual restart. Continue your work; automatic installation is paused.')),
      prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
      snapshot.pages.clients.some(client => !client.fresh) && h(W.Status, null, h('p', null, t('有窗口已断开，无法确认是否还有未保存修改。仍在使用的窗口请先保存并刷新；已关闭的窗口可以手动重新确认。', 'A disconnected window may contain unsaved changes. Save and refresh windows still in use. If they are closed, you can confirm that manually.')), h(W.Button, { onClick: () => setDialog('windows') }, t('重新确认已关闭的窗口', 'Confirm closed windows'))),
      (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')), (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
      prefs.deferredUntil > Date.now() && h(W.Status, null, t('此插件已推迟提醒和自动安装 24 小时，仍可手动更新。', 'Reminders and automatic installation for this plugin are deferred for 24 hours. Manual updates remain available.')),
      unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
      job && h('section', { className: 'w-section', 'aria-label': t('这个插件的更新进度', 'Update progress for this plugin') }, h('h3', null, jobLabel(job)), h('p', { className: 'w-muted' }, job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动补丁更新', ' · Automatic patch') : '')), (job.reason || job.outcome?.result?.error?.code) && h(W.Status, { tone: 'error' }, message(job.reason || job.outcome.result.error.code)), activeJob() && h(W.Button, { disabled: job.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')), h('p', { className: 'w-muted updates-note' }, t('安装开始后，取消由官方包管理器处理；已落盘的写入以实际结果或恢复状态为准。', 'After installation starts, the native package manager handles cancellation. Completed writes and recovery are reported as they occur.'))),
      dialog && h(W.Dialog, { title: dialog === 'windows' ? t('断开的窗口都已关闭？', 'Are the disconnected windows closed?') : dialog === 'automatic' ? t('允许这个插件自动安装补丁？', 'Allow automatic patches for this plugin?') : t('确认更新此插件', 'Confirm this plugin update'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
        target === '@stardustlc/dsh-suite' && h('p', null, t('此处操作的是 Suite 整包，包含 18 个组件。独立安装的其他插件不受影响。', 'This action applies to the whole Suite, including its 18 components. Other independently installed plugins are unaffected.')),
        dialog === 'windows' ? h('div', { className: 'w-stack' }, h('p', null, t('只清除超过 45 秒未回应的其他窗口记录。请先确认它们已经关闭；仍在使用的窗口请保存修改并刷新。当前或仍在回应的窗口保护会保留。', 'Only other windows silent for over 45 seconds are cleared. Confirm that they are closed; save and refresh windows still in use. Current and responsive windows remain protected.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { onClick: () => { setDialog(null); void perform(() => api({ ...pageState(true), action: 'reconfirm-windows', confirmation: 'other-stale-windows-are-closed' })); } }, t('已关闭，重新确认状态', 'They are closed; reconfirm')))) :
        dialog === 'automatic' ? h('div', { className: 'w-stack' }, h('p', null, (language() === 'en' ? row.labelEn : row.label) + ' · ' + target), h('p', null, t('你正在主动启用这个插件的自动安装。只处理兼容的稳定补丁；有任务、未保存修改、未知窗口或等待重启时暂停。', 'You are explicitly enabling automatic installation for this plugin. Only compatible stable patches qualify; running tasks, unsaved changes, unknown windows or a pending restart pause it.')), h('p', null, t('不会自动重启 DSH，其他插件不会跟着开启。可随时关闭。', 'DSH will not restart automatically, and other plugins will not be enabled for automatic updates. Turn it off anytime.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('保持关闭', 'Keep off')), h(W.Button, { variant: 'primary', onClick: () => { setDialog(null); void perform(() => save({ checkEnabled: true, autoInstall: true }, 'enable-idle-patch-updates')); } }, t('允许此插件自动安装补丁', 'Allow patches for this plugin')))) :
        h('div', { className: 'w-stack' }, h('p', { className: 'updates-version' }, target + ': ' + row.version + ' → ' + row.release.version), h('p', null, t('通过 DSH 官方插件管理器安装。需要重启时，由你手动决定时间；停用状态会保留。', 'Install through DSH’s native plugin manager. Choose when to restart if needed; disabled status is preserved.')), h('p', { className: 'w-muted' }, t('来源：npm 官方 registry，网络不可达时回退 npmmirror。安装前再次核对版本与完整性。', 'Source: official npm registry, with npmmirror fallback if unreachable. Version and integrity are checked again before installation.')), (ownPage.dirty || snapshot.pages.dirty) && h(W.Status, null, message('page-dirty')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { variant: 'primary', disabled: installLocked || row.loadError, onClick: install }, t('确认安装此版本', 'Install this version')))))
    );
  }
  function NativeFooter({ subject }) {
    const snapshot = useSnapshot(), name = __stardustUpdatesDetailName(subject, snapshot?.rows || []);
    return name ? h(Panel, { name }) : null;
  }
  function Reminder() {
    useSnapshot();
    const row = state?.rows.find(row => { const prefs = preferences(row.name); return row.available && !row.updating && !row.bundledBy && prefs.checkEnabled && prefs.deferredUntil <= Date.now() && prefs.ignoredVersion !== row.release.version && !notified.has(row.name + '@' + row.release.version); });
    if (!row && !legacyHint) return null;
    let Toast; try { Toast = require('@deepseek-ai/dsh-client-ui-primitives').Toast; } catch { return null; }
    if (!Toast) return null;
    const hint = legacyHint, key = hint ? 'legacy-' + hint : row.name + '@' + row.release.version;
    return h(Toast, { key, text: hint ? hint + t('：请打开「插件」中的此插件详情页，在底部管理更新。', ': open its details in Plugins to manage updates at the bottom.') : (language() === 'en' ? row.labelEn : row.label) + t('有新版本，可在页面底部查看。', ' has an update. Review it at the bottom of its page.'), icon: h(W.Icon, { name: 'refresh', size: 18 }), holdMs: 7000, onDone: () => { if (hint) legacyHint = null; else notified.add(key); notify(); } });
  }
  function register() {
    if (!alive) return;
    if (!registered) {
      registered = true; pool.clients.add(client);
      ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'stardustlc.plugin-update-footer', order: 1000 }, NativeFooter));
      ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'stardustlc.plugin-update-reminder' }, Reminder));
      notify();
    }
  }
  async function poll() {
    if (inPoll || !alive || !shared.refs.size) return;
    inPoll = true;
    try { await refresh(); register(); await heartbeat(); }
    catch { /* Owner-only controls stay absent for guests and unsupported hosts. */ }
    finally { inPoll = false; }
  }
  const timer = setInterval(() => { void poll(); }, 15000), first = setTimeout(() => { void poll(); }, 100);
  const client = { t, Footer: Panel, Button: W.Button, open(name) { const footer = [...document.querySelectorAll('[data-plugin-update-footer]')].find(node => node.getAttribute('data-plugin-update-footer') === name); if (footer) footer.scrollIntoView({ block: 'end', behavior: 'smooth' }); else { legacyHint = name; notify(); } }, has: name => registered && !!originalRow(name), row: rowFor, dispose() {
    close(); alive = false; clearTimeout(first); clearInterval(timer); pool.clients.delete(client);
    pool.listeners.delete(guardChanged); listeners.clear();
    for (const event of ['pointerdown', 'keydown', 'input']) document.removeEventListener(event, interaction, true);
    window.removeEventListener('pagehide', close);
    for (const controller of requests) controller.abort();
    for (const listener of pool.viewListeners) listener();
  } };
  return client;
}

/* STARDUSTLC_UPDATE_CLIENT_BODY_START */
window.__ModuleLoader__.load(__stardustUpdatesWrap({id:"dsh-dingtalk",factory:require=>({apply(){}})},{"name":"dsh-dingtalk","version":"0.1.0","hasWorkbench":false,"packageVersion":"0.3.9","label":"钉钉","labelEn":"DingTalk","suiteComponent":true,"sectionIds":[],"iconData":"data:image/webp;base64,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"}));

/* STARDUSTLC_UPDATE_CLIENT_BODY_END */
})();
