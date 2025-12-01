// =========================
// CACHE E MODELO DE DADOS
// =========================
const TURMAS_CACHE_KEY = 'coordinatorTurmas:v1';

function buildInitialTurmasData() {
  return {
    filtroAno: 'Todos',
    filtroTurno: 'Todos',
    filtroStatus: 'Todos',

    anosDisponiveis: ['Todos', '6º ano', '7º ano', '8º ano', '9º ano'],
    turnosDisponiveis: ['Todos', 'Manhã', 'Tarde'],
    statusDisponiveis: ['Todos', 'Ativa', 'Inativa', 'Encerrada'],

    turmas: [
      {
        id: 't1',
        nome: '9º A',
        ano: '9º ano',
        turno: 'Manhã',
        alunos: 30,
        professor: 'Prof. Santos',
        status: 'Ativa'
      },
      {
        id: 't2',
        nome: '9º B',
        ano: '9º ano',
        turno: 'Tarde',
        alunos: 28,
        professor: 'Prof. Silva',
        status: 'Ativa'
      },
      {
        id: 't3',
        nome: '8º A',
        ano: '8º ano',
        turno: 'Manhã',
        alunos: 32,
        professor: 'Prof. Lima',
        status: 'Ativa'
      },
      {
        id: 't4',
        nome: '8º B',
        ano: '8º ano',
        turno: 'Tarde',
        alunos: 27,
        professor: 'Prof. Costa',
        status: 'Inativa'
      }
    ]
  };
}

function getTurmasData() {
  const cached = localStorage.getItem(TURMAS_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler turmas do cache:', e);
    }
  }

  const initial = buildInitialTurmasData();
  localStorage.setItem(TURMAS_CACHE_KEY, JSON.stringify(initial));
  return initial;
}

function updateTurmasData(data) {
  localStorage.setItem(TURMAS_CACHE_KEY, JSON.stringify(data));
}

function changeTurmasFilter(tipo, valor) {
  const data = getTurmasData();

  if (tipo === 'ano') {
    data.filtroAno = valor;
  } else if (tipo === 'turno') {
    data.filtroTurno = valor;
  } else if (tipo === 'status') {
    data.filtroStatus = valor;
  }

  updateTurmasData(data);

  if (typeof loadView === 'function') {
    loadView('turmas');
  }
}

function getStatusBadgeClassTurma(status) {
  if (status === 'Ativa') return 'success';
  if (status === 'Inativa') return 'error';
  if (status === 'Encerrada') return 'warning';
  return 'neutral';
}

// =========================
// MODAL – CRIAR / EDITAR TURMA
// =========================
function closeTurmaModal() {
  const overlay = document.getElementById('turmaModalOverlay');
  if (overlay) overlay.remove();
}

function openTurmaFormModal(turmaId) {
  const data = getTurmasData();
  const turma = turmaId ? data.turmas.find(t => t.id === turmaId) : null;
  const isEdit = !!turma;

  const anoOptions = data.anosDisponiveis
    .filter(a => a !== 'Todos')
    .map(a => `<option value="${a}" ${turma && turma.ano === a ? 'selected' : ''}>${a}</option>`)
    .join('');

  const turnoOptions = data.turnosDisponiveis
    .filter(t => t !== 'Todos')
    .map(t => `<option value="${t}" ${turma && turma.turno === t ? 'selected' : ''}>${t}</option>`)
    .join('');

  const statusOptions = data.statusDisponiveis
    .filter(s => s !== 'Todos')
    .map(s => `<option value="${s}" ${turma && turma.status === s ? 'selected' : ''}>${s}</option>`)
    .join('');

  const overlay = document.createElement('div');
  overlay.id = 'turmaModalOverlay';
  overlay.className = 'modal-overlay';

  overlay.innerHTML = `
    <div class="modal modal--large"   style="padding: 0px;">
      <div class="modal-header">
        <h2 class="modal-title">${isEdit ? 'Editar Turma' : 'Nova Turma'}</h2>
        <button class="modal-close" onclick="closeTurmaModal()">×</button>
      </div>

      <form id="turmaForm" onsubmit="handleSaveTurma(event, '${turmaId || ''}')">
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Nome da Turma</label>
            <input
              type="text"
              class="form-input"
              name="nome"
              required
              placeholder="Ex: 9º C"
              value="${turma ? turma.nome : ''}"
            >
          </div>

          <div class="filters" style="margin-bottom: 16px;">
            <div class="filter-group">
              <label class="filter-label">Ano</label>
              <select class="filter-select" name="ano" required>
                <option value="" disabled ${turma ? '' : 'selected'}>Selecione</option>
                ${anoOptions}
              </select>
            </div>
            <div class="filter-group">
              <label class="filter-label">Turno</label>
              <select class="filter-select" name="turno" required>
                <option value="" disabled ${turma ? '' : 'selected'}>Selecione</option>
                ${turnoOptions}
              </select>
            </div>
            <div class="filter-group">
              <label class="filter-label">Status</label>
              <select class="filter-select" name="status" required>
                ${statusOptions}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Quantidade de Alunos</label>
            <input
              type="number"
              class="form-input"
              name="alunos"
              min="0"
              step="1"
              required
              placeholder="Ex: 30"
              value="${turma ? turma.alunos : ''}"
            >
          </div>

          <div class="form-group">
            <label class="form-label">Professor Responsável</label>
            <input
              type="text"
              class="form-input"
              name="professor"
              required
              placeholder="Ex: Prof. Souza"
              value="${turma ? turma.professor : ''}"
            >
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-secondary" onclick="closeTurmaModal()">Cancelar</button>
          <button type="submit" class="btn-primary-limited">
            ${isEdit ? 'Salvar Alterações' : 'Criar Turma'}
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);
}

function handleSaveTurma(event, turmaId) {
  event.preventDefault();
  const form = event.target;
  const data = getTurmasData();

  const nome = form.nome.value.trim();
  const ano = form.ano.value;
  const turno = form.turno.value;
  const status = form.status.value;
  const alunos = parseInt(form.alunos.value, 10) || 0;
  const professor = form.professor.value.trim();

  if (!nome || !ano || !turno || !status || !professor) {
    showToast('Preencha todos os campos obrigatórios.');
    return;
  }

  if (turmaId) {
    const idx = data.turmas.findIndex(t => t.id === turmaId);
    if (idx !== -1) {
      data.turmas[idx] = {
        ...data.turmas[idx],
        nome,
        ano,
        turno,
        status,
        alunos,
        professor
      };
    }
  } else {
    const newId = 't_' + Date.now();
    data.turmas.push({
      id: newId,
      nome,
      ano,
      turno,
      status,
      alunos,
      professor
    });
  }

  updateTurmasData(data);
  closeTurmaModal();
  showToast('Turma salva com sucesso!');

  if (typeof loadView === 'function') {
    loadView('turmas');
  }
}

// =========================
// VIEW PRINCIPAL – TURMAS
// =========================
function getTurmasView() {
  const data = getTurmasData();

  const anoOptions = data.anosDisponiveis.map(a => `
    <option ${a === data.filtroAno ? 'selected' : ''}>${a}</option>
  `).join('');

  const turnoOptions = data.turnosDisponiveis.map(t => `
    <option ${t === data.filtroTurno ? 'selected' : ''}>${t}</option>
  `).join('');

  const statusOptions = data.statusDisponiveis.map(s => `
    <option ${s === data.filtroStatus ? 'selected' : ''}>${s}</option>
  `).join('');

  const turmasFiltradas = data.turmas.filter(t => {
    const anoOk = data.filtroAno === 'Todos' || t.ano === data.filtroAno;
    const turnoOk = data.filtroTurno === 'Todos' || t.turno === data.filtroTurno;
    const statusOk = data.filtroStatus === 'Todos' || t.status === data.filtroStatus;
    return anoOk && turnoOk && statusOk;
  });

  const linhas = turmasFiltradas.length
    ? turmasFiltradas.map(t => {
        const badgeClass = getStatusBadgeClassTurma(t.status);
        return `
          <tr>
            <td><strong>${t.nome}</strong></td>
            <td>${t.ano}</td>
            <td>${t.turno}</td>
            <td>${t.alunos}</td>
            <td>${t.professor}</td>
            <td><span class="badge ${badgeClass}">${t.status}</span></td>
            <td>
              <button class="btn-icon" title="Editar turma" onclick="openTurmaFormModal('${t.id}')">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </td>
          </tr>
        `;
      }).join('')
    : `
      <tr>
        <td colspan="7" style="text-align:center; padding: 24px; color:#64748B;">
          Nenhuma turma encontrada com os filtros selecionados.
        </td>
      </tr>
    `;

  return `
    <div class="page-header">
      <h1 class="page-title">Turmas</h1>
      <p class="page-subtitle">Gerencie as turmas da instituição</p>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Lista de Turmas</h2>
          <p class="card-subtitle" style="font-size:13px; color:#64748B; margin-top:4px;">
            Use os filtros para localizar e editar rapidamente as turmas.
          </p>
        </div>
        <div class="card-actions">
          <button class="btn-primary-icon" onclick="openTurmaFormModal()">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nova Turma
          </button>
        </div>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label class="filter-label">Ano</label>
          <select class="filter-select" onchange="changeTurmasFilter('ano', this.value)">
            ${anoOptions}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Turno</label>
          <select class="filter-select" onchange="changeTurmasFilter('turno', this.value)">
            ${turnoOptions}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <select class="filter-select" onchange="changeTurmasFilter('status', this.value)">
            ${statusOptions}
          </select>
        </div>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Turma</th>
              <th>Ano</th>
              <th>Turno</th>
              <th>Alunos</th>
              <th>Professor Responsável</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${linhas}
          </tbody>
        </table>
      </div>
    </div>
  `;
}