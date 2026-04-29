import { useState, useEffect, useRef, useCallback } from 'react';

// ── Tetris constants ─────────────────────────────────────────────────────────
const T_COLS = 10, T_ROWS = 20, WIN_LINES = 20;
const CELL = 28;

const MARKETING_TERMS = [
  'CAC','LTV','MQL','SQL','ARR','MRR','NRR','GRR','ICP','TAM',
  'SAM','SOM','PLG','ABM','PQL','GTM','ROI','CPA','CPC','CPM',
  'CTR','ROAS','NPS','DAU','MAU','OKR','KPI','CRO','SEO','SEM',
  'ACV','TCV','ARPU','LCP','CLS','INP','AOV','CPL','CDP','DMP',
  'SERP','GBP','CWV','SDR','Churn','TOFU','MOFU','BOFU','Cohort',
  'Funnel','Brand','Pipeline','Quota','Upsell','Referral','Organic',
  'Paid','Inbound','Outbound','Email','Push','Social','UGC','PR',
  'Runway','Burn','EBITDA','Virality','Persona','B2B','B2C','SaaS',
  'MVP','POC','SLA','API','CRM','BI','LLM','SFDC','Braze','Klaviyo',
  'GA4','Heap','Mixpanel','Looker','Ahrefs','Stripe','Twilio',
  'Segment','Amplitude','Retention','Revenue','Profit','Conversion',
  'Attribution','Journey','Touchpoint','Engagement','Awareness',
  'Acquisition','Activation','Expansion','Payback','Win Rate',
  'Velocity','Coverage','Efficiency','Rule of 40','Magic Num',
  'Burn Rate','Flywheel','Moat','PMF','Traction','Scale','Freemium',
  'Trial','Demo','BANT','MEDDIC','Solution','Proof','Champion',
  'Outreach','Cadence','Signal','Intent','Workflow','Nurture',
  'Score','Qualify','Handoff','Retarget','A/B Test','Heatmap',
];

const PIECE_DEFS = [
  { shape: [[1,1,1,1]], color: '#e05a35' },
  { shape: [[1,1],[1,1]], color: '#2aaa8a' },
  { shape: [[0,1,0],[1,1,1]], color: '#a855f7' },
  { shape: [[0,1,1],[1,1,0]], color: '#3b82f6' },
  { shape: [[1,1,0],[0,1,1]], color: '#ef4444' },
  { shape: [[1,0,0],[1,1,1]], color: '#f59e0b' },
  { shape: [[0,0,1],[1,1,1]], color: '#10b981' },
];

const DROP_INTERVALS = [800,720,630,550,470,380,300,220,130,100];
const LINE_SCORES = [0,100,300,500,800];

// ── Tetris utils ─────────────────────────────────────────────────────────────
const rotateMat = m => m[0].map((_,c) => m.map(r => r[c]).reverse());
const mkBoard   = () => Array.from({length:T_ROWS}, () => Array(T_COLS).fill(null));
const randTerm  = () => MARKETING_TERMS[Math.floor(Math.random() * MARKETING_TERMS.length)];
const randPiece = () => {
  const d = PIECE_DEFS[Math.floor(Math.random() * PIECE_DEFS.length)];
  return { shape: d.shape.map(r => [...r]), color: d.color, term: randTerm() };
};

function valid(board, shape, pos) {
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nr = pos.r + r, nc = pos.c + c;
      if (nr < 0 || nr >= T_ROWS || nc < 0 || nc >= T_COLS || board[nr][nc]) return false;
    }
  return true;
}

function mergeBoard(board, shape, pos, color, term) {
  const next = board.map(r => [...r]);
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c]) next[pos.r+r][pos.c+c] = {color, term};
  return next;
}

function clearLines(board) {
  const kept = board.filter(row => row.some(c => !c));
  const cleared = T_ROWS - kept.length;
  return {
    board: [...Array.from({length:cleared}, () => Array(T_COLS).fill(null)), ...kept],
    cleared,
  };
}

function getGhost(board, shape, pos) {
  let gp = {...pos};
  while (valid(board, shape, {r:gp.r+1, c:gp.c})) gp = {r:gp.r+1, c:gp.c};
  return gp;
}

function tryRotate(board, shape, pos) {
  const rot = rotateMat(shape);
  for (const kick of [0,-1,1,-2,2]) {
    const np = {r:pos.r, c:pos.c+kick};
    if (valid(board, rot, np)) return {shape:rot, pos:np};
  }
  return null;
}

function lockAndAdvance(gs) {
  const merged = mergeBoard(gs.board, gs.cur.shape, gs.pos, gs.cur.color, gs.cur.term);
  const {board, cleared} = clearLines(merged);
  const score  = gs.score + LINE_SCORES[Math.min(cleared, 4)] * (gs.level + 1);
  const lines  = gs.lines + cleared;
  const level  = Math.floor(lines / 10);
  const won    = lines >= WIN_LINES;
  const nextPos = {r:0, c:Math.floor((T_COLS - gs.next.shape[0].length) / 2)};
  const over   = !valid(board, gs.next.shape, nextPos);
  gs.board  = board; gs.cur = gs.next; gs.pos = nextPos;
  gs.next   = randPiece(); gs.score = score; gs.lines = lines;
  gs.level  = level; gs.status = won ? 'won' : over ? 'over' : 'playing';
}

// ── Tetris game hook ─────────────────────────────────────────────────────────
function useGame(keybinds, enabled) {
  const gsRef = useRef(null);
  const [rev, setRev] = useState(0);
  const rafRef = useRef(null);
  const lastDropRef = useRef(0);
  const enabledRef = useRef(enabled);
  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  const start = useCallback(() => {
    const cur = randPiece();
    gsRef.current = {
      board: mkBoard(), cur,
      pos: {r:0, c:Math.floor((T_COLS - cur.shape[0].length) / 2)},
      next: randPiece(), score:0, lines:0, level:0, status:'playing',
    };
    lastDropRef.current = performance.now();
    setRev(v => v+1);
  }, []);

  useEffect(() => {
    function tick(ts) {
      rafRef.current = requestAnimationFrame(tick);
      if (!enabledRef.current) return;
      const gs = gsRef.current;
      if (!gs || gs.status !== 'playing') return;
      const interval = DROP_INTERVALS[Math.min(gs.level, DROP_INTERVALS.length-1)];
      if (ts - lastDropRef.current < interval) return;
      lastDropRef.current = ts;
      const newPos = {r:gs.pos.r+1, c:gs.pos.c};
      if (valid(gs.board, gs.cur.shape, newPos)) { gs.pos = newPos; }
      else { lockAndAdvance(gs); }
      setRev(v => v+1);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (!enabledRef.current) return;
      const gs = gsRef.current;
      if (!gs || gs.status !== 'playing') return;
      let changed = false;
      if (e.code === keybinds.left) {
        e.preventDefault();
        const np = {r:gs.pos.r, c:gs.pos.c-1};
        if (valid(gs.board, gs.cur.shape, np)) { gs.pos = np; changed = true; }
      } else if (e.code === keybinds.right) {
        e.preventDefault();
        const np = {r:gs.pos.r, c:gs.pos.c+1};
        if (valid(gs.board, gs.cur.shape, np)) { gs.pos = np; changed = true; }
      } else if (e.code === keybinds.down) {
        e.preventDefault();
        const np = {r:gs.pos.r+1, c:gs.pos.c};
        if (valid(gs.board, gs.cur.shape, np)) { gs.pos = np; lastDropRef.current = performance.now(); changed = true; }
      } else if (e.code === keybinds.rot) {
        e.preventDefault();
        const result = tryRotate(gs.board, gs.cur.shape, gs.pos);
        if (result) { gs.cur = {...gs.cur, shape:result.shape}; gs.pos = result.pos; changed = true; }
      } else if (e.code === keybinds.drop) {
        e.preventDefault();
        const ghost = getGhost(gs.board, gs.cur.shape, gs.pos);
        const bonus = (ghost.r - gs.pos.r) * 2;
        gs.pos = ghost; lockAndAdvance(gs); gs.score += bonus;
        lastDropRef.current = performance.now(); changed = true;
      }
      if (changed) setRev(v => v+1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [keybinds]);

  return { gs: gsRef.current, rev, start, restart: start };
}

// ── Board canvas ─────────────────────────────────────────────────────────────
function BoardCanvas({ gs, cellSize, rev }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gs) return;
    const ctx = canvas.getContext('2d');
    const W = T_COLS * cellSize, H = T_ROWS * cellSize;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#080a12'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 0.5;
    for (let r = 0; r < T_ROWS; r++)
      for (let c = 0; c < T_COLS; c++)
        ctx.strokeRect(c*cellSize, r*cellSize, cellSize, cellSize);

    function drawCell(r, c, color, term, alpha) {
      const x = c*cellSize, y = r*cellSize;
      ctx.save(); ctx.globalAlpha = alpha != null ? alpha : 1;
      ctx.fillStyle = color; ctx.fillRect(x+1, y+1, cellSize-2, cellSize-2);
      ctx.fillStyle = 'rgba(255,255,255,0.20)';
      ctx.fillRect(x+1, y+1, cellSize-2, 2); ctx.fillRect(x+1, y+1, 2, cellSize-2);
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.fillRect(x+1, y+cellSize-3, cellSize-2, 2);
      if (cellSize >= 14 && term && (alpha == null || alpha > 0.4)) {
        const fs = Math.max(5, Math.min(8, cellSize * 0.35));
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.font = `700 ${fs}px monospace`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 2;
        const label = term.length > 7 ? term.slice(0,6) + '.' : term;
        ctx.fillText(label, x + cellSize/2, y + cellSize/2);
      }
      ctx.restore();
    }

    for (let r = 0; r < T_ROWS; r++)
      for (let c = 0; c < T_COLS; c++) {
        const cell = gs.board[r][c];
        if (cell) drawCell(r, c, cell.color, cell.term);
      }

    if (gs.status === 'playing') {
      const ghost = getGhost(gs.board, gs.cur.shape, gs.pos);
      if (ghost.r !== gs.pos.r)
        for (let r = 0; r < gs.cur.shape.length; r++)
          for (let c = 0; c < gs.cur.shape[r].length; c++)
            if (gs.cur.shape[r][c])
              drawCell(ghost.r+r, ghost.c+c, gs.cur.color, '', 0.18);
      for (let r = 0; r < gs.cur.shape.length; r++)
        for (let c = 0; c < gs.cur.shape[r].length; c++)
          if (gs.cur.shape[r][c])
            drawCell(gs.pos.r+r, gs.pos.c+c, gs.cur.color, gs.cur.term);
    }

    if (gs.status === 'over') {
      ctx.save();
      ctx.fillStyle = 'rgba(8,10,18,0.80)'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#ef4444';
      ctx.font = `800 ${Math.max(13,cellSize*0.65)}px "Plus Jakarta Sans",sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('GAME OVER', W/2, H/2 - 14);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = `500 ${Math.max(9,cellSize*0.45)}px "Plus Jakarta Sans",sans-serif`;
      ctx.fillText('Press R to restart', W/2, H/2 + 12);
      ctx.restore();
    }
  }, [gs, cellSize, rev]);
  return <canvas ref={canvasRef} style={{display:'block', borderRadius:3}} />;
}

function NextPieceCanvas({ piece, cellSize }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!piece || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cols = piece.shape[0].length + 2, rows = piece.shape.length + 2;
    const W = cols*cellSize, H = rows*cellSize;
    const dpr = Math.min(window.devicePixelRatio||1, 2);
    canvas.width = W*dpr; canvas.height = H*dpr;
    canvas.style.width = W+'px'; canvas.style.height = H+'px';
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#080a12'; ctx.fillRect(0,0,W,H);
    for (let r=0; r<piece.shape.length; r++)
      for (let c=0; c<piece.shape[r].length; c++) {
        if (!piece.shape[r][c]) continue;
        const x=(1+c)*cellSize, y=(1+r)*cellSize;
        ctx.fillStyle = piece.color; ctx.fillRect(x+1,y+1,cellSize-2,cellSize-2);
        ctx.fillStyle = 'rgba(255,255,255,0.20)';
        ctx.fillRect(x+1,y+1,cellSize-2,2); ctx.fillRect(x+1,y+1,2,cellSize-2);
      }
  }, [piece, cellSize]);
  return <canvas ref={canvasRef} style={{display:'block', borderRadius:3}} />;
}

function WinModal({ score, lines, onPlayAgain }) {
  const [copied, setCopied] = useState(false);
  const CODE = 'GTMCHAMP';
  function copyCode() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CODE).then(() => {
        setCopied(true); setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  }
  return (
    <div style={{position:'absolute',inset:0,background:'rgba(8,10,18,0.92)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:20,borderRadius:4}}>
      <div style={{background:'oklch(0.16 0.04 258)',border:'1px solid oklch(0.28 0.06 258)',borderRadius:12,padding:'24px 20px',textAlign:'center',maxWidth:260,width:'90%'}}>
        <div style={{fontSize:32,marginBottom:6}}>🏆</div>
        <div style={{fontSize:14,fontWeight:800,color:'#f59e0b',letterSpacing:'-0.02em',marginBottom:4}}>GTM Mastermind Unlocked</div>
        <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',marginBottom:14}}>{lines} lines &middot; Score: {score.toLocaleString()}</div>
        <div style={{background:'oklch(0.11 0.03 258)',borderRadius:8,padding:'10px 12px',marginBottom:12}}>
          <div style={{fontSize:9,color:'rgba(255,255,255,0.35)',textTransform:'uppercase',letterSpacing:'0.09em',marginBottom:5}}>Unlock code</div>
          <div style={{fontFamily:'monospace',fontSize:20,fontWeight:800,color:'#e05a35',letterSpacing:'0.12em'}}>{CODE}</div>
        </div>
        <div style={{fontSize:10,color:'rgba(255,255,255,0.45)',marginBottom:14,lineHeight:1.55}}>GTM Remixed Vault — 50 frameworks,<br/>12 templates, 0 fluff</div>
        <div style={{display:'flex',gap:8,justifyContent:'center'}}>
          <button onClick={copyCode} style={{background:copied?'#2aaa8a':'#e05a35',color:'white',border:'none',borderRadius:6,padding:'7px 14px',fontSize:11,fontWeight:700,cursor:'pointer',transition:'background 0.2s'}}>
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <button onClick={onPlayAgain} style={{background:'transparent',color:'rgba(255,255,255,0.65)',border:'1px solid oklch(0.28 0.06 258)',borderRadius:6,padding:'7px 14px',fontSize:11,fontWeight:700,cursor:'pointer'}}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, big }) {
  return (
    <div style={{marginBottom:10}}>
      <div style={{fontSize:8,fontWeight:700,letterSpacing:'0.1em',color:'rgba(255,255,255,0.28)',textTransform:'uppercase',marginBottom:2}}>{label}</div>
      <div style={{fontSize:big?17:13,fontWeight:800,color:'white',letterSpacing:'-0.02em'}}>{value}</div>
    </div>
  );
}

// ── Side panel shell (shared by tetris/snake) ─────────────────────────────────
const SIDE = { width:116, flexShrink:0, display:'flex', flexDirection:'column', padding:'16px 12px', color:'white', borderLeft:'1px solid rgba(255,255,255,0.06)' };
const BACK_BTN = { background:'transparent', color:'rgba(255,255,255,0.25)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:4, padding:'4px 6px', fontSize:8, cursor:'pointer', width:'100%' };

// ── Game Menu (4 bold colored sections) ──────────────────────────────────────
const GAME_TILES = [
  { id:'crossword', name:'CROSSWORD', icon:'📝', desc:'Marketing Terms',    bg:'#6d28d9', accent:'#a78bfa' },
  { id:'snake',     name:'SNAKE',     icon:'🐍', desc:'Growth Eater',       bg:'#047857', accent:'#34d399' },
  { id:'tetris',    name:'TETRIS',    icon:'🧱', desc:'Stack Metrics',      bg:'#b91c1c', accent:'#fca5a5' },
  { id:'sudoku',    name:'SUDOKU',    icon:'🔢', desc:'Number Crunch',      bg:'#1d4ed8', accent:'#93c5fd' },
];

function GameMenu({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{position:'absolute',inset:0,display:'grid',gridTemplateColumns:'1fr 1fr',gridTemplateRows:'1fr 1fr',gap:3,background:'#000',borderRadius:6,overflow:'hidden'}}>
      {GAME_TILES.map(g => (
        <button
          key={g.id}
          onClick={() => onSelect(g.id)}
          onMouseEnter={() => setHovered(g.id)}
          onMouseLeave={() => setHovered(null)}
          style={{
            background: g.bg,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            transition: 'filter 0.15s',
            filter: hovered === g.id ? 'brightness(1.2)' : 'brightness(1)',
            padding: '20px 16px',
          }}
        >
          <div style={{fontSize:44,lineHeight:1,filter:'drop-shadow(0 3px 12px rgba(0,0,0,0.5))'}}>
            {g.icon}
          </div>
          <div style={{fontSize:17,fontWeight:900,color:'white',letterSpacing:'0.1em',textShadow:'0 2px 10px rgba(0,0,0,0.6)'}}>
            {g.name}
          </div>
          <div style={{
            fontSize:11,fontWeight:600,
            color:g.accent,
            background:'rgba(0,0,0,0.25)',
            padding:'3px 12px',borderRadius:999,
            letterSpacing:'0.04em',
          }}>
            {g.desc}
          </div>
        </button>
      ))}
    </div>
  );
}

// ── Tetris ────────────────────────────────────────────────────────────────────
const P1_KEYS = {left:'ArrowLeft',right:'ArrowRight',down:'ArrowDown',rot:'ArrowUp',drop:'Space'};

function TetrisPlay({ onBack }) {
  const { gs, rev, start, restart } = useGame(P1_KEYS, true);
  useEffect(() => { start(); }, []);
  useEffect(() => {
    function onKey(e) { if (e.code === 'KeyR') restart(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [restart]);

  return (
    <div style={{position:'absolute',inset:0,display:'flex',alignItems:'stretch'}}>
      <div style={{position:'relative',flexShrink:0}}>
        {gs && <BoardCanvas gs={gs} cellSize={CELL} rev={rev} />}
        {gs && gs.status === 'won' && <WinModal score={gs.score} lines={gs.lines} onPlayAgain={restart} />}
      </div>
      {gs && (
        <div style={SIDE}>
          <Stat label="SCORE" value={gs.score.toLocaleString()} big />
          <Stat label="LINES" value={`${gs.lines}/${WIN_LINES}`} />
          <Stat label="LEVEL" value={gs.level + 1} />
          <div style={{height:3,borderRadius:2,background:'rgba(255,255,255,0.07)',marginBottom:12,overflow:'hidden'}}>
            <div style={{height:'100%',borderRadius:2,background:'#e05a35',width:`${Math.min(100,(gs.lines/WIN_LINES)*100)}%`,transition:'width 0.3s'}} />
          </div>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:8,fontWeight:700,letterSpacing:'0.1em',color:'rgba(255,255,255,0.28)',textTransform:'uppercase',marginBottom:5}}>NEXT</div>
            {gs.next && <NextPieceCanvas piece={gs.next} cellSize={14} />}
          </div>
          {gs.cur && (
            <div style={{marginBottom:10}}>
              <div style={{fontSize:8,fontWeight:700,letterSpacing:'0.1em',color:'rgba(255,255,255,0.28)',textTransform:'uppercase',marginBottom:4}}>NOW</div>
              <div style={{fontSize:11,fontWeight:800,color:gs.cur.color,wordBreak:'break-word',lineHeight:1.2}}>{gs.cur.term}</div>
            </div>
          )}
          <div style={{marginTop:'auto'}}>
            <div style={{fontSize:7,color:'rgba(255,255,255,0.18)',lineHeight:1.9}}>←→ Move<br/>↑ Rotate<br/>↓ Drop<br/>Spc Hard<br/>R Reset</div>
            <button onClick={onBack} style={{...BACK_BTN, marginTop:10}}>← Back</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Snake ─────────────────────────────────────────────────────────────────────
function SnakePlay({ onBack }) {
  const [snake, setSnake] = useState([{x:10, y:10}]);
  const [dir, setDir] = useState({x:0, y:-1});
  const [food, setFood] = useState({x:15, y:5});
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);

  useEffect(() => {
    const handle = e => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
      if (e.key === 'ArrowUp' && dir.y !== 1) setDir({x:0,y:-1});
      if (e.key === 'ArrowDown' && dir.y !== -1) setDir({x:0,y:1});
      if (e.key === 'ArrowLeft' && dir.x !== 1) setDir({x:-1,y:0});
      if (e.key === 'ArrowRight' && dir.x !== -1) setDir({x:1,y:0});
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [dir]);

  useEffect(() => {
    if (over) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const nx = prev[0].x + dir.x, ny = prev[0].y + dir.y;
        if (nx<0||nx>=20||ny<0||ny>=40||prev.some(s=>s.x===nx&&s.y===ny)) { setOver(true); return prev; }
        const ns = [{x:nx,y:ny}, ...prev];
        if (nx===food.x && ny===food.y) {
          setScore(s=>s+10); setFood({x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*40)});
        } else ns.pop();
        return ns;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [dir, food, over]);

  return (
    <div style={{position:'absolute',inset:0,display:'flex',alignItems:'stretch'}}>
      <div style={{position:'relative',width:280,height:560,flexShrink:0,background:'#080a12'}}>
        {snake.map((s,i) => <div key={i} style={{position:'absolute',left:s.x*14,top:s.y*14,width:14,height:14,background:i===0?'#2aaa8a':'#10b981',border:'1px solid #080a12'}} />)}
        <div style={{position:'absolute',left:food.x*14,top:food.y*14,width:14,height:14,background:'#e05a35',borderRadius:'50%'}} />
        {over && (
          <div style={{position:'absolute',inset:0,background:'rgba(8,10,18,0.8)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <div style={{color:'#ef4444',fontWeight:800,fontSize:20}}>GAME OVER</div>
            <button onClick={()=>{setSnake([{x:10,y:10}]);setDir({x:0,y:-1});setScore(0);setOver(false);}} style={{marginTop:12,padding:'6px 12px',background:'transparent',border:'1px solid rgba(255,255,255,0.2)',color:'white',borderRadius:4,cursor:'pointer'}}>Restart</button>
          </div>
        )}
      </div>
      <div style={SIDE}>
        <Stat label="SCORE" value={score} big />
        <div style={{marginTop:'auto'}}>
          <div style={{fontSize:9,color:'rgba(255,255,255,0.4)',lineHeight:1.5,marginBottom:10}}>Arrow keys to eat MRR (dots). Don't hit walls or yourself.</div>
          <button onClick={onBack} style={BACK_BTN}>← Back</button>
        </div>
      </div>
    </div>
  );
}

// ── Crossword data ─────────────────────────────────────────────────────────────
// Grid: 9 cols (0-8) × 6 rows (0-5)
// Words: CAC(1A), CHURN(2D), LTV(3A), BRAND(4D), UPSELL(5A), SDR(6D), MQL(7A), FUNNEL(8A)
// Intersections: CAC∩CHURN at (0,2)=C; CHURN∩UPSELL at (2,2)=U; UPSELL∩SDR at (2,4)=S
const CW_CELL_DATA = [
  // Row 0
  {r:0,c:0,ans:'C',num:1}, {r:0,c:1,ans:'A'}, {r:0,c:2,ans:'C',num:2},
  {r:0,c:4,ans:'L',num:3}, {r:0,c:5,ans:'T'}, {r:0,c:6,ans:'V'},
  {r:0,c:8,ans:'B',num:4},
  // Row 1
  {r:1,c:2,ans:'H'}, {r:1,c:8,ans:'R'},
  // Row 2
  {r:2,c:2,ans:'U',num:5}, {r:2,c:3,ans:'P'},
  {r:2,c:4,ans:'S',num:6}, {r:2,c:5,ans:'E'},
  {r:2,c:6,ans:'L'}, {r:2,c:7,ans:'L'}, {r:2,c:8,ans:'A'},
  // Row 3
  {r:3,c:2,ans:'R'}, {r:3,c:4,ans:'D'}, {r:3,c:8,ans:'N'},
  // Row 4
  {r:4,c:2,ans:'N'}, {r:4,c:4,ans:'R'},
  {r:4,c:5,ans:'M',num:7}, {r:4,c:6,ans:'Q'}, {r:4,c:7,ans:'L'},
  {r:4,c:8,ans:'D'},
  // Row 5
  {r:5,c:0,ans:'F',num:8}, {r:5,c:1,ans:'U'}, {r:5,c:2,ans:'N'},
  {r:5,c:3,ans:'N'}, {r:5,c:4,ans:'E'}, {r:5,c:5,ans:'L'},
];

const CW_WORDS = [
  { num:1, dir:'A', answer:'CAC',    clue:'Cost to acquire a customer',           cellKeys:['0-0','0-1','0-2'] },
  { num:2, dir:'D', answer:'CHURN',  clue:'Rate customers stop subscribing',       cellKeys:['0-2','1-2','2-2','3-2','4-2'] },
  { num:3, dir:'A', answer:'LTV',    clue:'Customer lifetime value',               cellKeys:['0-4','0-5','0-6'] },
  { num:4, dir:'D', answer:'BRAND',  clue:'Company identity and reputation',       cellKeys:['0-8','1-8','2-8','3-8','4-8'] },
  { num:5, dir:'A', answer:'UPSELL', clue:'Sell a higher tier to existing buyer',  cellKeys:['2-2','2-3','2-4','2-5','2-6','2-7'] },
  { num:6, dir:'D', answer:'SDR',    clue:'Outbound sales prospecting role',       cellKeys:['2-4','3-4','4-4'] },
  { num:7, dir:'A', answer:'MQL',    clue:'Marketing qualified lead',              cellKeys:['4-5','4-6','4-7'] },
  { num:8, dir:'A', answer:'FUNNEL', clue:'The buyer journey shape',               cellKeys:['5-0','5-1','5-2','5-3','5-4','5-5'] },
];

const CW_MAP = {};
CW_CELL_DATA.forEach(c => { CW_MAP[`${c.r}-${c.c}`] = c; });

const CW_GRID_ROWS = 6, CW_GRID_COLS = 9, CW_CS = 26;

function CrosswordPlay({ onBack }) {
  const [vals, setVals] = useState({});
  const [revealed, setRevealed] = useState(new Set()); // revealed cell keys

  const isSolved = CW_CELL_DATA.every(c => vals[`${c.r}-${c.c}`] === c.ans);

  function revealWord(word) {
    const nv = { ...vals };
    const nr = new Set(revealed);
    word.cellKeys.forEach(k => { nv[k] = CW_MAP[k].ans; nr.add(k); });
    setVals(nv);
    setRevealed(nr);
  }

  function isWordRevealed(word) {
    return word.cellKeys.every(k => revealed.has(k));
  }

  // Build 9×6 grid cells
  const gridItems = [];
  for (let r = 0; r < CW_GRID_ROWS; r++) {
    for (let c = 0; c < CW_GRID_COLS; c++) {
      const key = `${r}-${c}`;
      const cell = CW_MAP[key];
      const val = vals[key] || '';
      const isRev = revealed.has(key);
      const isCorrect = cell && val === cell.ans && !isRev;

      gridItems.push(
        <div key={key} style={{
          width: CW_CS, height: CW_CS,
          background: cell ? (isRev ? '#78350f' : '#ffffff') : '#080a12',
          border: cell ? '1px solid #aaa' : 'none',
          boxSizing: 'border-box',
          position: 'relative',
        }}>
          {cell && cell.num && (
            <div style={{position:'absolute',top:1,left:1.5,fontSize:6.5,fontWeight:800,color:isRev?'#fcd34d':'#444',lineHeight:1,zIndex:1,pointerEvents:'none'}}>
              {cell.num}
            </div>
          )}
          {cell && (
            <input
              maxLength={1}
              value={val}
              onChange={e => {
                if (!isRev) setVals({...vals, [key]: e.target.value.toUpperCase().slice(-1)});
              }}
              readOnly={isRev}
              style={{
                position:'absolute',inset:0,
                background:'transparent',border:'none',outline:'none',
                textAlign:'center',fontWeight:800,
                fontSize:13,padding:0,margin:0,
                color: isRev ? '#fcd34d' : isCorrect ? '#059669' : '#111',
                width:'100%',height:'100%',
                cursor: isRev ? 'default' : 'text',
              }}
            />
          )}
        </div>
      );
    }
  }

  return (
    <div style={{position:'absolute',inset:0,display:'flex',color:'white'}}>
      {/* Main area */}
      <div style={{flex:1,display:'flex',flexDirection:'column',padding:'14px 18px',overflowY:'auto'}}>
        <div style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.35)',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:10}}>
          GTM Crossword {isSolved && <span style={{color:'#2aaa8a'}}>✓ Solved!</span>}
        </div>

        {/* Grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns:`repeat(${CW_GRID_COLS}, ${CW_CS}px)`,
          gridTemplateRows:`repeat(${CW_GRID_ROWS}, ${CW_CS}px)`,
          gap:0, marginBottom:18, flexShrink:0,
          background:'#080a12',
        }}>
          {gridItems}
        </div>

        {/* Clues — two columns */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px'}}>
          <div>
            <div style={{fontSize:9,fontWeight:800,color:'#e05a35',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Across</div>
            {CW_WORDS.filter(w=>w.dir==='A').map(w => (
              <div key={w.num} style={{fontSize:10,color:'rgba(255,255,255,0.65)',marginBottom:4,lineHeight:1.4}}>
                <span style={{fontWeight:800,color:'rgba(255,255,255,0.9)'}}>{w.num}.</span> {w.clue}
              </div>
            ))}
          </div>
          <div>
            <div style={{fontSize:9,fontWeight:800,color:'#e05a35',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Down</div>
            {CW_WORDS.filter(w=>w.dir==='D').map(w => (
              <div key={w.num} style={{fontSize:10,color:'rgba(255,255,255,0.65)',marginBottom:4,lineHeight:1.4}}>
                <span style={{fontWeight:800,color:'rgba(255,255,255,0.9)'}}>{w.num}.</span> {w.clue}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div style={{width:155,borderLeft:'1px solid rgba(255,255,255,0.06)',padding:'14px 10px',display:'flex',flexDirection:'column',overflowY:'auto'}}>
        <div style={{fontSize:9,fontWeight:700,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:10}}>
          Reveal a Word
        </div>
        {CW_WORDS.map(w => {
          const rev = isWordRevealed(w);
          return (
            <button key={`${w.num}${w.dir}`}
              onClick={() => !rev && revealWord(w)}
              style={{
                background: rev ? 'rgba(120,53,15,0.25)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${rev ? 'rgba(120,53,15,0.5)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius:5, padding:'5px 8px',
                color: rev ? 'rgba(252,211,77,0.5)' : 'rgba(255,255,255,0.75)',
                fontSize:10,fontWeight:600,cursor:rev?'default':'pointer',
                textAlign:'left',marginBottom:4,width:'100%',
                display:'flex',justifyContent:'space-between',alignItems:'center',
                transition:'background 0.15s',
              }}
              onMouseEnter={e => { if (!rev) e.currentTarget.style.background='rgba(255,255,255,0.09)'; }}
              onMouseLeave={e => { if (!rev) e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}
            >
              <span>{w.num}-{w.dir==='A'?'Across':'Down'}</span>
              <span style={{fontSize:9,color:'rgba(255,255,255,0.35)'}}>{rev?'✓':w.answer.length+'L'}</span>
            </button>
          );
        })}
        <div style={{marginTop:'auto',paddingTop:10}}>
          <button onClick={onBack} style={BACK_BTN}>← Back</button>
        </div>
      </div>
    </div>
  );
}

// ── Sudoku data ───────────────────────────────────────────────────────────────
const SUDOKU_GIVEN = [
  [5,3,0, 0,7,0, 0,0,0],
  [6,0,0, 1,9,5, 0,0,0],
  [0,9,8, 0,0,0, 0,6,0],
  [8,0,0, 0,6,0, 0,0,3],
  [4,0,0, 8,0,3, 0,0,1],
  [7,0,0, 0,2,0, 0,0,6],
  [0,6,0, 0,0,0, 2,8,0],
  [0,0,0, 4,1,9, 0,0,5],
  [0,0,0, 0,8,0, 0,7,9],
];

const SUDOKU_SOL = [
  [5,3,4, 6,7,8, 9,1,2],
  [6,7,2, 1,9,5, 3,4,8],
  [1,9,8, 3,4,2, 5,6,7],
  [8,5,9, 7,6,1, 4,2,3],
  [4,2,6, 8,5,3, 7,9,1],
  [7,1,3, 9,2,4, 8,5,6],
  [9,6,1, 5,3,7, 2,8,4],
  [2,8,7, 4,1,9, 6,3,5],
  [3,4,5, 2,8,6, 1,7,9],
];

const MAX_HINTS = 5;
const SDK_CS = 26; // cell size

function SudokuPlay({ onBack }) {
  const [vals, setVals] = useState({});
  const [errors, setErrors] = useState({});
  const [hintCells, setHintCells] = useState(new Set());
  const [hintsUsed, setHintsUsed] = useState(0);
  const [checkMsg, setCheckMsg] = useState(null);
  const [selected, setSelected] = useState(null);

  const isSolved = () => {
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++) {
        const g = SUDOKU_GIVEN[r][c];
        if (g === 0 && parseInt(vals[`${r}-${c}`]) !== SUDOKU_SOL[r][c]) return false;
      }
    return true;
  };

  function checkAnswers() {
    const errs = {};
    let errCount = 0;
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++) {
        const g = SUDOKU_GIVEN[r][c];
        if (g === 0) {
          const v = parseInt(vals[`${r}-${c}`]);
          if (v && v !== SUDOKU_SOL[r][c]) { errs[`${r}-${c}`] = true; errCount++; }
        }
      }
    setErrors(errs);
    if (isSolved()) setCheckMsg({ type:'win', text:'✓ Puzzle solved!' });
    else if (errCount > 0) setCheckMsg({ type:'err', text:`${errCount} error${errCount>1?'s':''} found` });
    else setCheckMsg({ type:'ok', text:'No errors so far — keep going!' });
  }

  function revealHint() {
    if (hintsUsed >= MAX_HINTS) return;
    const empty = [];
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++) {
        const key = `${r}-${c}`;
        if (SUDOKU_GIVEN[r][c] === 0 && !vals[key]) empty.push({ r, c, key });
      }
    if (!empty.length) return;
    const pick = empty[Math.floor(Math.random() * empty.length)];
    const nv = { ...vals, [pick.key]: String(SUDOKU_SOL[pick.r][pick.c]) };
    const nh = new Set(hintCells); nh.add(pick.key);
    const ne = { ...errors }; delete ne[pick.key];
    setVals(nv); setHintCells(nh); setHintsUsed(h=>h+1); setErrors(ne);
    setCheckMsg(null);
  }

  const solved = isSolved();

  return (
    <div style={{position:'absolute',inset:0,display:'flex',color:'white'}}>
      {/* Main: grid centered */}
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:16}}>
        {solved && (
          <div style={{marginBottom:12,fontSize:14,fontWeight:800,color:'#2aaa8a',textAlign:'center'}}>
            🏆 Puzzle Solved!
          </div>
        )}
        <div style={{
          display:'grid',gridTemplateColumns:`repeat(9,${SDK_CS}px)`,
          gap:0,border:'2px solid rgba(255,255,255,0.4)',background:'rgba(255,255,255,0.1)',
          borderRadius:2,
        }}>
          {SUDOKU_GIVEN.flatMap((row,r) => row.map((given,c) => {
            const key = `${r}-${c}`;
            const uval = vals[key] || '';
            const isGiven = given !== 0;
            const isHint = hintCells.has(key);
            const isErr = errors[key];
            const isSel = selected === key;
            return (
              <div key={key}
                onClick={() => !isGiven && !isHint && setSelected(isSel ? null : key)}
                style={{
                  width:SDK_CS,height:SDK_CS,
                  background: isGiven ? 'rgba(255,255,255,0.08)'
                    : isErr ? 'rgba(220,38,38,0.25)'
                    : isHint ? 'rgba(245,158,11,0.15)'
                    : isSel ? 'rgba(37,99,235,0.3)'
                    : 'rgba(0,0,0,0.3)',
                  borderRight: (c%3===2&&c<8) ? '2px solid rgba(255,255,255,0.35)' : '1px solid rgba(255,255,255,0.12)',
                  borderBottom: (r%3===2&&r<8) ? '2px solid rgba(255,255,255,0.35)' : '1px solid rgba(255,255,255,0.12)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  cursor: isGiven||isHint ? 'default' : 'pointer',
                  position:'relative',
                }}>
                {isGiven ? (
                  <span style={{fontSize:14,fontWeight:800,color:'rgba(255,255,255,0.92)'}}>{given}</span>
                ) : (
                  <input
                    maxLength={1}
                    value={uval}
                    readOnly={isHint}
                    onChange={e => {
                      const v = e.target.value.replace(/[^1-9]/g,'');
                      setVals({...vals,[key]:v});
                      const ne={...errors}; delete ne[key]; setErrors(ne);
                      setCheckMsg(null);
                    }}
                    onFocus={() => setSelected(key)}
                    style={{
                      width:'100%',height:'100%',border:'none',outline:'none',
                      background:'transparent',textAlign:'center',
                      fontWeight:800,fontSize:13,padding:0,
                      color: isErr ? '#f87171' : isHint ? '#f59e0b' : '#6ee7b7',
                      cursor: isHint ? 'default' : 'text',
                    }}
                  />
                )}
              </div>
            );
          }))}
        </div>
        <div style={{marginTop:10,fontSize:9,color:'rgba(255,255,255,0.3)',textAlign:'center'}}>
          Fill each row, col & 3×3 box with 1–9
        </div>
      </div>

      {/* Side panel */}
      <div style={{width:155,borderLeft:'1px solid rgba(255,255,255,0.06)',padding:'16px 12px',display:'flex',flexDirection:'column'}}>
        <div style={{fontSize:15,fontWeight:800,color:'white',marginBottom:4}}>SUDOKU</div>
        <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',marginBottom:16}}>GTM Edition</div>

        {solved && (
          <div style={{marginBottom:12,padding:'8px',background:'rgba(42,170,138,0.15)',borderRadius:6,border:'1px solid rgba(42,170,138,0.4)',textAlign:'center',fontSize:11,fontWeight:800,color:'#2aaa8a'}}>
            ✓ SOLVED!
          </div>
        )}

        {/* Check answers */}
        <button onClick={checkAnswers} style={{
          background:'#1d4ed8',color:'white',border:'none',borderRadius:6,
          padding:'9px 12px',fontSize:11,fontWeight:700,cursor:'pointer',
          marginBottom:6,width:'100%',letterSpacing:'0.02em',
          transition:'background 0.15s',
        }}
          onMouseEnter={e=>e.currentTarget.style.background='#2563eb'}
          onMouseLeave={e=>e.currentTarget.style.background='#1d4ed8'}
        >
          Check Answers
        </button>

        {checkMsg && (
          <div style={{
            fontSize:9.5,fontWeight:600,marginBottom:8,padding:'5px 8px',borderRadius:4,
            background: checkMsg.type==='win' ? 'rgba(42,170,138,0.15)'
              : checkMsg.type==='err' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)',
            color: checkMsg.type==='win' ? '#2aaa8a'
              : checkMsg.type==='err' ? '#f87171' : 'rgba(255,255,255,0.6)',
            lineHeight:1.4,
          }}>
            {checkMsg.text}
          </div>
        )}

        {/* Reveal hint */}
        <button onClick={revealHint} disabled={hintsUsed>=MAX_HINTS} style={{
          background: hintsUsed>=MAX_HINTS ? 'rgba(255,255,255,0.03)' : 'rgba(245,158,11,0.12)',
          color: hintsUsed>=MAX_HINTS ? 'rgba(255,255,255,0.2)' : '#f59e0b',
          border: `1px solid ${hintsUsed>=MAX_HINTS?'rgba(255,255,255,0.06)':'rgba(245,158,11,0.35)'}`,
          borderRadius:6,padding:'9px 12px',fontSize:11,fontWeight:700,
          cursor:hintsUsed>=MAX_HINTS?'not-allowed':'pointer',
          marginBottom:4,width:'100%',letterSpacing:'0.02em',
          transition:'background 0.15s',
        }}
          onMouseEnter={e=>{ if(hintsUsed<MAX_HINTS) e.currentTarget.style.background='rgba(245,158,11,0.2)'; }}
          onMouseLeave={e=>{ if(hintsUsed<MAX_HINTS) e.currentTarget.style.background='rgba(245,158,11,0.12)'; }}
        >
          Reveal a Number
        </button>
        <div style={{fontSize:9,color:hintsUsed>=MAX_HINTS?'rgba(239,68,68,0.6)':'rgba(255,255,255,0.3)',marginBottom:14}}>
          {MAX_HINTS - hintsUsed} / {MAX_HINTS} hints remaining
        </div>

        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:10,marginBottom:10}}>
          <div style={{fontSize:8.5,color:'rgba(255,255,255,0.25)',lineHeight:1.65}}>
            <span style={{color:'rgba(245,158,11,0.7)'}}>■</span> Revealed hint<br/>
            <span style={{color:'rgba(239,68,68,0.7)'}}>■</span> Error cell<br/>
            <span style={{color:'rgba(110,231,183,0.7)'}}>■</span> Your entry
          </div>
        </div>

        <div style={{marginTop:'auto'}}>
          <button onClick={onBack} style={BACK_BTN}>← Back</button>
        </div>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function HeroGames() {
  const [activeGame, setActiveGame] = useState(null);
  return (
    <div style={{position:'absolute',inset:0,background:'#080a12',overflow:'hidden',borderRadius:6}}>
      {/* CRT scanline overlay */}
      <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(0deg,rgba(0,0,0,0.12),rgba(0,0,0,0.12) 1px,transparent 1px,transparent 3px)',pointerEvents:'none',zIndex:100}} />
      {!activeGame && <GameMenu onSelect={setActiveGame} />}
      {activeGame === 'tetris'    && <TetrisPlay    onBack={() => setActiveGame(null)} />}
      {activeGame === 'snake'     && <SnakePlay     onBack={() => setActiveGame(null)} />}
      {activeGame === 'crossword' && <CrosswordPlay onBack={() => setActiveGame(null)} />}
      {activeGame === 'sudoku'    && <SudokuPlay    onBack={() => setActiveGame(null)} />}
    </div>
  );
}
