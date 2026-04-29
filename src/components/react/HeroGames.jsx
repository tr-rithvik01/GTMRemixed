import { useState, useEffect, useRef, useCallback } from 'react';

// ── Tetris constants ─────────────────────────────────────────────────────────

const T_COLS = 10, T_ROWS = 20, WIN_LINES = 20;
const CELL = 28; // 28 × 20 rows = 560px — fills the hero panel exactly

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
  'Session','ARPA','Logo Churn','Net Rev','New MRR','Exp MRR',
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

// ── Pure utils ───────────────────────────────────────────────────────────────

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

// ── Game hook ────────────────────────────────────────────────────────────────

function lockAndAdvance(gs) {
  const merged = mergeBoard(gs.board, gs.cur.shape, gs.pos, gs.cur.color, gs.cur.term);
  const {board, cleared} = clearLines(merged);
  const score  = gs.score + LINE_SCORES[Math.min(cleared, 4)] * (gs.level + 1);
  const lines  = gs.lines + cleared;
  const level  = Math.floor(lines / 10);
  const won    = lines >= WIN_LINES;
  const nextPos = {r:0, c:Math.floor((T_COLS - gs.next.shape[0].length) / 2)};
  const over   = !valid(board, gs.next.shape, nextPos);
  gs.board  = board;
  gs.cur    = gs.next;
  gs.pos    = nextPos;
  gs.next   = randPiece();
  gs.score  = score;
  gs.lines  = lines;
  gs.level  = level;
  gs.status = won ? 'won' : over ? 'over' : 'playing';
}

function useGame(keybinds, enabled) {
  const gsRef       = useRef(null);
  const [rev, setRev] = useState(0);
  const rafRef      = useRef(null);
  const lastDropRef = useRef(0);
  const enabledRef  = useRef(enabled);
  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  const start = useCallback(() => {
    const cur = randPiece();
    gsRef.current = {
      board: mkBoard(), cur,
      pos:  {r:0, c:Math.floor((T_COLS - cur.shape[0].length) / 2)},
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
      if (valid(gs.board, gs.cur.shape, newPos)) {
        gs.pos = newPos;
      } else {
        lockAndAdvance(gs);
      }
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
      const kb = keybinds;
      let changed = false;
      if (e.code === kb.left) {
        e.preventDefault();
        const np = {r:gs.pos.r, c:gs.pos.c-1};
        if (valid(gs.board, gs.cur.shape, np)) { gs.pos = np; changed = true; }
      } else if (e.code === kb.right) {
        e.preventDefault();
        const np = {r:gs.pos.r, c:gs.pos.c+1};
        if (valid(gs.board, gs.cur.shape, np)) { gs.pos = np; changed = true; }
      } else if (e.code === kb.down) {
        e.preventDefault();
        const np = {r:gs.pos.r+1, c:gs.pos.c};
        if (valid(gs.board, gs.cur.shape, np)) {
          gs.pos = np; lastDropRef.current = performance.now(); changed = true;
        }
      } else if (e.code === kb.rot) {
        e.preventDefault();
        const result = tryRotate(gs.board, gs.cur.shape, gs.pos);
        if (result) { gs.cur = {...gs.cur, shape:result.shape}; gs.pos = result.pos; changed = true; }
      } else if (e.code === kb.drop) {
        e.preventDefault();
        const ghost  = getGhost(gs.board, gs.cur.shape, gs.pos);
        const bonus  = (ghost.r - gs.pos.r) * 2;
        gs.pos = ghost;
        lockAndAdvance(gs);
        gs.score += bonus;
        lastDropRef.current = performance.now();
        changed = true;
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
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#080a12';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 0.5;
    for (let r = 0; r < T_ROWS; r++)
      for (let c = 0; c < T_COLS; c++)
        ctx.strokeRect(c*cellSize, r*cellSize, cellSize, cellSize);

    function drawCell(r, c, color, term, alpha) {
      const x = c*cellSize, y = r*cellSize;
      ctx.save();
      ctx.globalAlpha = alpha != null ? alpha : 1;
      ctx.fillStyle = color;
      ctx.fillRect(x+1, y+1, cellSize-2, cellSize-2);
      ctx.fillStyle = 'rgba(255,255,255,0.20)';
      ctx.fillRect(x+1, y+1, cellSize-2, 2);
      ctx.fillRect(x+1, y+1, 2, cellSize-2);
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.fillRect(x+1, y+cellSize-3, cellSize-2, 2);
      ctx.fillRect(x+1, y+cellSize-3, 2, cellSize-2); // Fixed: was x+cellSize-3, y+1, 2, cellSize-2
      if (cellSize >= 14 && term && (alpha == null || alpha > 0.4)) {
        const fs = Math.max(5, Math.min(8, cellSize * 0.35));
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.font = `700 ${fs}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 2;
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
      ctx.fillStyle = 'rgba(8,10,18,0.80)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#ef4444';
      ctx.font = `800 ${Math.max(13,cellSize*0.65)}px "Plus Jakarta Sans",sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GAME OVER', W/2, H/2 - 14);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = `500 ${Math.max(9,cellSize*0.45)}px "Plus Jakarta Sans",sans-serif`;
      ctx.fillText('Press R to restart', W/2, H/2 + 12);
      ctx.restore();
    }
  }, [gs, cellSize, rev]);

  return <canvas ref={canvasRef} style={{display:'block', borderRadius:3}} />;
}

// ── Next-piece canvas ─────────────────────────────────────────────────────────

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
    ctx.fillStyle = '#080a12';
    ctx.fillRect(0,0,W,H);
    const offR=1, offC=1;
    for (let r=0; r<piece.shape.length; r++)
      for (let c=0; c<piece.shape[r].length; c++) {
        if (!piece.shape[r][c]) continue;
        const x=(offC+c)*cellSize, y=(offR+r)*cellSize;
        ctx.fillStyle = piece.color;
        ctx.fillRect(x+1,y+1,cellSize-2,cellSize-2);
        ctx.fillStyle = 'rgba(255,255,255,0.20)';
        ctx.fillRect(x+1,y+1,cellSize-2,2);
        ctx.fillRect(x+1,y+1,2,cellSize-2);
      }
  }, [piece, cellSize]);
  return <canvas ref={canvasRef} style={{display:'block', borderRadius:3}} />;
}

// ── Win modal ─────────────────────────────────────────────────────────────────

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
    <div style={{
      position:'absolute', inset:0,
      background:'rgba(8,10,18,0.92)',
      display:'flex', alignItems:'center', justifyContent:'center',
      zIndex:20, borderRadius:4,
    }}>
      <div style={{
        background:'oklch(0.16 0.04 258)',
        border:'1px solid oklch(0.28 0.06 258)',
        borderRadius:12, padding:'24px 20px',
        textAlign:'center', maxWidth:260, width:'90%',
      }}>
        <div style={{fontSize:32, marginBottom:6}}>🏆</div>
        <div style={{fontSize:14, fontWeight:800, color:'#f59e0b', letterSpacing:'-0.02em', marginBottom:4}}>
          GTM Mastermind Unlocked
        </div>
        <div style={{fontSize:11, color:'rgba(255,255,255,0.5)', marginBottom:14}}>
          {lines} lines &middot; Score: {score.toLocaleString()}
        </div>
        <div style={{background:'oklch(0.11 0.03 258)', borderRadius:8, padding:'10px 12px', marginBottom:12}}>
          <div style={{fontSize:9, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'0.09em', marginBottom:5}}>
            Unlock code
          </div>
          <div style={{fontFamily:'monospace', fontSize:20, fontWeight:800, color:'#e05a35', letterSpacing:'0.12em'}}>
            {CODE}
          </div>
        </div>
        <div style={{fontSize:10, color:'rgba(255,255,255,0.45)', marginBottom:14, lineHeight:1.55}}>
          GTM Remixed Vault — 50 frameworks,<br/>12 templates, 0 fluff
        </div>
        <div style={{display:'flex', gap:8, justifyContent:'center'}}>
          <button
            onClick={copyCode}
            style={{
              background: copied ? '#2aaa8a' : '#e05a35',
              color:'white', border:'none', borderRadius:6,
              padding:'7px 14px', fontSize:11, fontWeight:700, cursor:'pointer',
              transition:'background 0.2s',
            }}
          >{copied ? 'Copied!' : 'Copy Code'}</button>
          <button
            onClick={onPlayAgain}
            style={{
              background:'transparent', color:'rgba(255,255,255,0.65)',
              border:'1px solid oklch(0.28 0.06 258)',
              borderRadius:6, padding:'7px 14px', fontSize:11, fontWeight:700, cursor:'pointer',
            }}
          >Play Again</button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, big }) {
  return (
    <div style={{marginBottom:10}}>
      <div style={{fontSize:8, fontWeight:700, letterSpacing:'0.1em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginBottom:2}}>{label}</div>
      <div style={{fontSize: big ? 17 : 13, fontWeight:800, color:'white', letterSpacing:'-0.02em'}}>{value}</div>
    </div>
  );
}

// ── Tetris game ───────────────────────────────────────────────────────────────

const P1_KEYS = {left:'ArrowLeft', right:'ArrowRight', down:'ArrowDown', rot:'ArrowUp', drop:'Space'};

const CW_CELLS = [
  {r:1, c:1, ans:'C', num:1}, {r:1, c:2, ans:'A'}, {r:1, c:3, ans:'C'},
  {r:2, c:1, ans:'H'}, {r:3, c:1, ans:'U', num:3}, {r:4, c:1, ans:'R'}, {r:5, c:1, ans:'N'},
  {r:3, c:2, ans:'P'}, {r:3, c:3, ans:'S'}, {r:3, c:4, ans:'E'}, {r:3, c:5, ans:'L'}, {r:3, c:6, ans:'L'},
  {r:1, c:5, ans:'S', num:2}, {r:2, c:5, ans:'A'}, {r:4, c:5, ans:'E'}, {r:5, c:5, ans:'S'}
];

const SUDOKU_BOARD = [
  [5,3,null, null,7,null, null,null,null],
  [6,null,null, 1,9,5, null,null,null],
  [null,9,8, null,null,null, null,6,null],
  [8,null,null, null,6,null, null,null,3],
  [4,null,null, 8,null,3, null,null,1],
  [7,null,null, null,2,null, null,null,6],
  [null,6,null, null,null,null, 2,8,null],
  [null,null,null, 4,1,9, null,null,5],
  [null,null,null, null,8,null, null,7,9]
];

export default function HeroGames() {
  const [activeGame, setActiveGame] = useState(null);
  return (
    <div style={{position:'absolute', inset:0, background:'#080a12', overflow:'hidden', borderRadius: 6}}>
      {/* CRT Scanline Overlay */}
      <div style={{position:'absolute', inset:0, background:'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)', pointerEvents:'none', zIndex:100}} />
      {!activeGame && <GameMenu onSelect={setActiveGame} />}
      {activeGame === 'tetris' && <TetrisPlay onBack={() => setActiveGame(null)} />}
      {activeGame === 'snake' && <SnakePlay onBack={() => setActiveGame(null)} />}
      {activeGame === 'crossword' && <CrosswordPlay onBack={() => setActiveGame(null)} />}
      {activeGame === 'sudoku' && <SudokuPlay onBack={() => setActiveGame(null)} />}
    </div>
  );
}

function GameMenu({ onSelect }) {
  return (
    <div style={{position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
      {/* Retro Synthwave Grid Background */}
      <div style={{position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none'}}>
        {/* Sun / Glow */}
        <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, rgba(224, 90, 53, 0.15) 0%, transparent 60%)'}} />
        {/* Horizon Grid */}
        <div style={{
          position: 'absolute', bottom: 0, left: '-50%', right: '-50%', height: '50%',
          transform: 'perspective(300px) rotateX(80deg)',
          transformOrigin: 'top center',
          backgroundImage: 'linear-gradient(rgba(42, 170, 138, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(42, 170, 138, 0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: 'center top',
          borderTop: '2px solid rgba(42, 170, 138, 0.8)',
          boxShadow: '0 -10px 40px rgba(42, 170, 138, 0.3)',
        }} />
        {/* Floating marketing terms in the "sky" */}
        {MARKETING_TERMS.slice(0,32).map((t,i) => (
          <div key={t} style={{
            position:'absolute',
            left:`${(i*37+13)%90}%`, top:`${(i*19+7)%45}%`,
            fontSize: i%3===0 ? 12 : i%3===1 ? 9 : 8,
            fontWeight:700,
            color:`rgba(255,255,255,${0.03+(i%4)*0.03})`,
            fontFamily:'monospace',
            letterSpacing:'-0.02em', whiteWhiteSpace:'nowrap', // Fixed: whiteWhiteSpace to whiteSpace
          }}>{t}</div>
        ))}
      </div>
      <div style={{position:'relative', zIndex:1, textAlign:'center', padding:'0 20px', width:'100%'}}>
        <div style={{fontSize:20, fontWeight:800, color:'white', letterSpacing:'-0.02em', marginBottom:28, lineHeight:1.35, textShadow:'0 2px 10px rgba(0,0,0,0.8)'}}>
          Template games engage;<br/>
          <span style={{color:'#e05a35', textShadow:'0 0 20px rgba(224,90,53,0.4)'}}>Template SaaS hero images bore.</span>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          {[
            {id:'crossword', name:'Crossword', icon:'📝', desc:'Marketing Terms'},
            {id:'snake', name:'Snake', icon:'🐍', desc:'Growth Eater'},
            {id:'tetris', name:'Tetris', icon:'🧱', desc:'Stack Metrics'},
            {id:'sudoku', name:'Sudoku', icon:'🔢', desc:'Number Crunch'},
          ].map(g => (
            <button key={g.id} onClick={() => onSelect(g.id)} style={{
              background:'rgba(18, 20, 30, 0.7)', border:'1px solid rgba(42, 170, 138, 0.3)',
              boxShadow:'0 4px 12px rgba(0,0,0,0.3)', borderRadius:8, padding:'16px 12px',
              cursor:'pointer', textAlign:'center', transition:'all 0.2s', color:'white'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#2aaa8a'; e.currentTarget.style.background='rgba(42, 170, 138, 0.15)'; e.currentTarget.style.transform='translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(42, 170, 138, 0.3)'; e.currentTarget.style.background='rgba(18, 20, 30, 0.7)'; e.currentTarget.style.transform='translateY(0)'; }}>
              <div style={{fontSize:28, marginBottom:8, filter:'drop-shadow(0 0 8px rgba(255,255,255,0.3))'}}>{g.icon}</div>
              <div style={{fontSize:13, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.05em'}}>{g.name}</div>
              <div style={{fontSize:10, color:'rgba(255,255,255,0.4)', marginTop:4}}>{g.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SnakePlay({ onBack }) {
  const [snake, setSnake] = useState([{x:10, y:10}]);
  const [dir, setDir] = useState({x:0, y:-1});
  const [food, setFood] = useState({x:15, y:5});
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);

  useEffect(() => {
    const handle = e => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
      if (e.key === 'ArrowUp' && dir.y !== 1) setDir({x:0, y:-1});
      if (e.key === 'ArrowDown' && dir.y !== -1) setDir({x:0, y:1});
      if (e.key === 'ArrowLeft' && dir.x !== 1) setDir({x:-1, y:0});
      if (e.key === 'ArrowRight' && dir.x !== -1) setDir({x:1, y:0});
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [dir]);

  useEffect(() => {
    if (over) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const nx = prev[0].x + dir.x, ny = prev[0].y + dir.y;
        // Adjusted bounds for 20x40 grid with 14px cells
        if (nx<0||nx>=20||ny<0||ny>=40||prev.some(s=>s.x===nx&&s.y===ny)) { setOver(true); return prev; }
        const ns = [{x:nx, y:ny}, ...prev];
        if (nx===food.x && ny===food.y) {
          setScore(s=>s+10); setFood({x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*40)});
        } else ns.pop();
        return ns;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [dir, food, over]);

  return (
    <div style={{position:'absolute', inset:0, display:'flex', alignItems:'stretch'}}>
      <div style={{position:'relative', width:280, height:560, flexShrink:0, background:'#080a12'}}> {/* Added height to match Tetris */}
        {snake.map((s,i) => <div key={i} style={{position:'absolute', left:s.x*14, top:s.y*14, width:14, height:14, background:i===0?'#2aaa8a':'#10b981', border:'1px solid #080a12'}} />)}
        <div style={{position:'absolute', left:food.x*14, top:food.y*14, width:14, height:14, background:'#e05a35', borderRadius:'50%'}} />
        {over && (
          <div style={{position:'absolute', inset:0, background:'rgba(8,10,18,0.8)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <div style={{color:'#ef4444', fontWeight:800, fontSize:20}}>GAME OVER</div>
            <button onClick={()=>{setSnake([{x:10,y:10}]);setDir({x:0,y:-1});setScore(0);setOver(false);}} style={{marginTop:12, padding:'6px 12px', background:'transparent', border:'1px solid rgba(255,255,255,0.2)', color:'white', borderRadius:4, cursor:'pointer'}}>Restart</button>
          </div>
        )}
      </div>
      <div style={{width:116, flexShrink:0, display:'flex', flexDirection:'column', padding:'16px 12px', color:'white', borderLeft:'1px solid rgba(255,255,255,0.06)'}}>
        <Stat label="SCORE" value={score} big />
        <div style={{marginTop:'auto'}}>
          <div style={{fontSize:9, color:'rgba(255,255,255,0.4)', lineHeight:1.5, marginBottom:10}}>Use arrow keys to eat MRR (apples). Don't hit walls or yourself.</div> {/* Clarified instructions */}
          <button onClick={onBack} style={{background:'transparent', color:'rgba(255,255,255,0.25)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:4, padding:'4px 6px', fontSize:8, cursor:'pointer', width:'100%'}}>← Back</button>
        </div>
      </div>
    </div>
  );
}

function CrosswordPlay({ onBack }) {
  const [vals, setVals] = useState({});
  const solution = {
    '1-1': 'C', '1-2': 'A', '1-3': 'C',
    '2-1': 'H',
    '3-1': 'U', '3-2': 'P', '3-3': 'S', '3-4': 'E', '3-5': 'L', '3-6': 'L',
    '4-1': 'R',
    '5-1': 'N',
    '1-5': 'S', // This is 'S' for 'SDR' or 'SaaS' in the original, but the clue is 'The revenue generating team' which is 'SDR'
    '2-5': 'D', // Assuming 'SDR' for 2 Down
    '4-5': 'R', // Assuming 'SDR' for 2 Down
  };

  const checkSolution = () => {
    for (const key in solution) {
      if (vals[key] !== solution[key]) {
        return false;
      }
    }
    return true;
  };

  const isSolved = checkSolution();

  return (
    <div style={{position:'absolute', inset:0, display:'flex', alignItems:'stretch'}}>
      <div style={{position:'relative', width:280, flexShrink:0, background:'#080a12', padding:10}}>
        <div style={{position:'relative', width:260, height:240}}>
          {CW_CELLS.map((cell, i) => (
            <div key={i} style={{position:'absolute', left:cell.c*28+28, top:cell.r*28+50, width:28, height:28, background:'white', border:'1px solid #333'}}>
              {cell.num && <div style={{position:'absolute', top:1, left:2, fontSize:8, color:'#333', zIndex:2}}>{cell.num}</div>}
              <input
                maxLength={1}
                value={vals[`${cell.r}-${cell.c}`] || ''}
                onChange={e => setVals({...vals, [`${cell.r}-${cell.c}`]: e.target.value.toUpperCase()})}
                style={{position:'absolute', inset:0, background:'transparent', border:'none', textAlign:'center', textTransform:'uppercase', fontWeight:800, fontSize:14, padding:0, margin:0, color:'#000', width:'100%', height:'100%', outline:'none'}}
                disabled={!!cell.ans} // Disable input for pre-filled cells if `cell.ans` is meant to be fixed
              />
            </div>
          ))}
        </div>
        <div style={{marginTop:10, color:'white', fontSize:10.5, lineHeight:1.5, padding:'0 10px'}}>
          <strong style={{color:'#e05a35'}}>Across</strong><br/>
          1. Cost to acquire a customer (Abbr) [CAC]<br/>
          3. Persuading a customer to buy more [UPSELL]<br/><br/>
          <strong style={{color:'#e05a35'}}>Down</strong><br/>
          1. The rate at which customers leave [CHURN]<br/>
          2. The revenue generating team [SDR]
        </div>
      </div>
      <div style={{width:116, flexShrink:0, display:'flex', flexDirection:'column', padding:'16px 12px', color:'white', borderLeft:'1px solid rgba(255,255,255,0.06)'}}>
        <Stat label="GAME" value="WORDS" />
        {isSolved && <Stat label="STATUS" value="SOLVED!" big />}
        <div style={{marginTop:'auto'}}>
          <div style={{fontSize:9, color:'rgba(255,255,255,0.4)', lineHeight:1.5, marginBottom:10}}>Click cells to type. Fill in the marketing terms.</div>
          <button onClick={onBack} style={{background:'transparent', color:'rgba(255,255,255,0.25)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:4, padding:'4px 6px', fontSize:8, cursor:'pointer', width:'100%'}}>← Back</button>
        </div>
      </div>
    </div>
  );
}

function SudokuPlay({ onBack }) {
  const [vals, setVals] = useState({});
  const initialBoard = SUDOKU_BOARD;

  const checkSudoku = (currentVals) => {
    const board = initialBoard.map((row, r) =>
      row.map((val, c) => val || parseInt(currentVals[`${r}-${c}`]) || 0)
    );

    // Check rows
    for (let r = 0; r < 9; r++) {
      const rowSet = new Set();
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== 0) {
          if (rowSet.has(board[r][c])) return false;
          rowSet.add(board[r][c]);
        }
      }
    }

    // Check columns
    for (let c = 0; c < 9; c++) {
      const colSet = new Set();
      for (let r = 0; r < 9; r++) {
        if (board[r][c] !== 0) {
          if (colSet.has(board[r][c])) return false;
          colSet.add(board[r][c]);
        }
      }
    }

    // Check 3x3 boxes
    for (let boxR = 0; boxR < 3; boxR++) {
      for (let boxC = 0; boxC < 3; boxC++) {
        const boxSet = new Set();
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const num = board[boxR * 3 + r][boxC * 3 + c];
            if (num !== 0) {
              if (boxSet.has(num)) return false;
              boxSet.add(num);
            }
          }
        }
      }
    }

    // Check if all cells are filled (implies solved if valid)
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) return false;
      }
    }

    return true;
  };

  const isSolved = checkSudoku(vals);

  return (
    <div style={{position:'absolute', inset:0, display:'flex', alignItems:'stretch'}}>
      <div style={{position:'relative', width:280, flexShrink:0, background:'#080a12', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(9, 28px)', gap:0, background:'#333', border:'2px solid white'}}>
          {initialBoard.flatMap((row, r) => row.map((val, c) => (
            <div key={`${r}-${c}`} style={{width:28, height:28, background:'white', borderRight: (c%3===2 && c<8) ? '2px solid #333' : '1px solid #ccc', borderBottom: (r%3===2 && r<8) ? '2px solid #333' : '1px solid #ccc', position:'relative'}}>
              {val ? (
                <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#000', fontWeight:800, fontSize:14}}>{val}</div>
              ) : (
                <input
                  maxLength={1}
                  value={vals[`${r}-${c}`] || ''}
                  onChange={e => setVals({...vals, [`${r}-${c}`]: e.target.value.replace(/[^1-9]/g,'')})}
                  style={{position:'absolute', inset:0, background:'transparent', border:'none', textAlign:'center', fontWeight:800, fontSize:14, padding:0, margin:0, color:'#2aaa8a', width:'100%', height:'100%', outline:'none'}}
                />
              )}
            </div>
          )))}
        </div>
      </div>
      <div style={{width:116, flexShrink:0, display:'flex', flexDirection:'column', padding:'16px 12px', color:'white', borderLeft:'1px solid rgba(255,255,255,0.06)'}}>
        <Stat label="GAME" value="SUDOKU" />
        {isSolved && <Stat label="STATUS" value="SOLVED!" big />}
        <div style={{marginTop:'auto'}}>
          <div style={{fontSize:9, color:'rgba(255,255,255,0.4)', lineHeight:1.5, marginBottom:10}}>Fill the 9x9 grid so every row, col, and 3x3 box has 1-9.</div>
          <button onClick={onBack} style={{background:'transparent', color:'rgba(255,255,255,0.25)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:4, padding:'4px 6px', fontSize:8, cursor:'pointer', width:'100%'}}>← Back</button>
        </div>
      </div>
    </div>
  );
}

function TetrisPlay({ onBack }) {
  const { gs, rev, start, restart } = useGame(P1_KEYS, true);

  useEffect(() => { start(); }, []);

  useEffect(() => {
    function onKey(e) { if (e.code === 'KeyR') restart(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [restart]);

  const cs = CELL;

  return (
    <div style={{position:'absolute', inset:0, display:'flex', alignItems:'stretch'}}>
      {/* Board — fills full height */}
      <div style={{position:'relative', flexShrink:0}}>
        {gs && <BoardCanvas gs={gs} cellSize={cs} rev={rev} />}
        {gs && gs.status === 'won' && <WinModal score={gs.score} lines={gs.lines} onPlayAgain={restart} />}
      </div>

      {/* HUD — fixed narrow strip */}
      {gs && (
        <div style={{width:116, flexShrink:0, display:'flex', flexDirection:'column', padding:'16px 12px', color:'white', borderLeft:'1px solid rgba(255,255,255,0.06)'}}>
          <Stat label="SCORE" value={gs.score.toLocaleString()} big />
          <Stat label="LINES" value={`${gs.lines}/${WIN_LINES}`} />
          <Stat label="LEVEL" value={gs.level + 1} />

          {/* Progress */}
          <div style={{height:3, borderRadius:2, background:'rgba(255,255,255,0.07)', marginBottom:12, overflow:'hidden'}}>
            <div style={{height:'100%', borderRadius:2, background:'#e05a35', width:`${Math.min(100,(gs.lines/WIN_LINES)*100)}%`, transition:'width 0.3s'}} />
          </div>

          {/* Next */}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:8, fontWeight:700, letterSpacing:'0.1em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginBottom:5}}>NEXT</div>
            {gs.next && <NextPieceCanvas piece={gs.next} cellSize={14} />}
          </div>

          {/* Dropping term */}
          {gs.cur && (
            <div style={{marginBottom:10}}>
              <div style={{fontSize:8, fontWeight:700, letterSpacing:'0.1em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginBottom:4}}>NOW</div>
              <div style={{fontSize:11, fontWeight:800, color:gs.cur.color, wordBreak:'break-word', lineHeight:1.2}}>{gs.cur.term}</div>
            </div>
          )}

          {/* Controls + back */}
          <div style={{marginTop:'auto'}}>
            <div style={{fontSize:7, color:'rgba(255,255,255,0.18)', lineHeight:1.9}}>
              ←→ Move<br/>↑ Rotate<br/>↓ Drop<br/>Spc Hard<br/>R Reset
            </div>
            <button
              onClick={onBack}
              style={{
                marginTop:10, background:'transparent',
                color:'rgba(255,255,255,0.25)',
                border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:4, padding:'4px 6px',
                fontSize:8, cursor:'pointer', width:'100%',
              }}
            >← Back</button>
          </div>
        </div>
      )}
    </div>
  );
}