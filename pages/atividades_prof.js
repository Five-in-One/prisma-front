const ATIVIDADES_CACHE_KEY = 'teacherAtividades:v1';

function buildInitialTeacherAtividadesData() {
  // helper pra montar entregas iniciais
  function entregasIniciais(turma, matriculas) {
    const alunosTurma = ALUNOS_POR_TURMA[turma] || [];
    return matriculas.map(m => {
      const aluno = alunosTurma.find(a => a.matricula === m);
      return {
        matricula: m,
        nome: aluno ? aluno.nome : 'Aluno',
        dataEntregaAluno: null // pode preencher depois se quiser
      };
    });
  }

  return {
    filtroTurma: 'Todas as turmas',
    filtroStatus: 'Todos',
    turmasDisponiveis: ['Todas as turmas', '9º A', '9º B', '8º A'],
    statusDisponiveis: ['Todos', 'Publicado', 'Rascunho', 'Agendado'],

    atividades: [
      {
        id: 'ATV-1',
        titulo: 'Exercícios de Álgebra - Capítulo 5',
        turma: '9º A',
        dataEntrega: '2024-03-25',
        status: 'Publicado',
        entregas: entregasIniciais('9º A', ['2024001', '2024002']) // 2/3 entregaram
      },
      {
        id: 'ATV-2',
        titulo: 'Lista de Geometria Espacial',
        turma: '9º B',
        dataEntrega: '2024-03-27',
        status: 'Rascunho',
        entregas: [] // ninguém entregou ainda
      },
      {
        id: 'ATV-3',
        titulo: 'Trabalho sobre Funções',
        turma: '8º A',
        dataEntrega: '2024-03-30',
        status: 'Publicado',
        entregas: entregasIniciais('8º A', ['2024201', '2024202', '2024203']) // todo mundo entregou
      }
    ]
  };
}

function getTeacherAtividadesData() {
  const cached = localStorage.getItem(ATIVIDADES_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler atividades do cache:', e);
    }
  }

  const initial = buildInitialTeacherAtividadesData();
  localStorage.setItem(ATIVIDADES_CACHE_KEY, JSON.stringify(initial));
  return initial;
}

function updateTeacherAtividadesData(newData) {
  localStorage.setItem(ATIVIDADES_CACHE_KEY, JSON.stringify(newData));
}

// troca filtros da tabela principal
function changeTeacherAtividadesFilter(tipo, valor) {
  const data = getTeacherAtividadesData();

  if (tipo === 'turma') {
    data.filtroTurma = valor;
  } else if (tipo === 'status') {
    data.filtroStatus = valor;
  }

  updateTeacherAtividadesData(data);

  if (typeof loadView === 'function') {
    loadView('atividades');
  }
}

function closeAtividadeModal() {
  const overlay = document.getElementById('atividadeModalOverlay');
  if (overlay) overlay.remove();
}

// abre modal para nova atividade (id = null) ou editar atividade existente
function openAtividadeModal(id) {
  const data = getTeacherAtividadesData();

  let atividade = null;
  if (id) {
    atividade = data.atividades.find(a => a.id === id) || null;
  }

  const hoje = new Date().toISOString().slice(0, 10);

  // turma usada no modal:
  let turmaModal;
  if (atividade) {
    turmaModal = atividade.turma;
  } else {
    // nova: usa o filtro atual, se não for "Todas as turmas"
    turmaModal = data.filtroTurma !== 'Todas as turmas'
      ? data.filtroTurma
      : '9º A';
  }

  const alunosTurma = ALUNOS_POR_TURMA[turmaModal] || [];
  const entreguesSet = new Set(
    (atividade?.entregas || []).map(e => e.matricula)
  );

  const tituloModal = atividade ? atividade.titulo : '';
  const dataEntregaModal = atividade ? atividade.dataEntrega : hoje;
  const statusModal = atividade ? atividade.status : 'Rascunho';

  const statusOptionsHtml = ['Publicado', 'Rascunho', 'Agendado']
    .map(st => `<option value="${st}" ${st === statusModal ? 'selected' : ''}>${st}</option>`)
    .join('');

  const alunosHtml = alunosTurma.length
    ? alunosTurma.map(al => `
        <label class="checkbox-label" style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #E2E8F0;">
          <div>
            <div style="font-weight:600;color:#0F172A;">${al.nome}</div>
            <div style="font-size:12px;color:#64748B;">Matrícula ${al.matricula}</div>
          </div>
          <input
            type="checkbox"
            class="form-checkbox"
            data-matricula="${al.matricula}"
            ${entreguesSet.has(al.matricula) ? 'checked' : ''}
          >
        </label>
      `).join('')
    : `<p style="font-size:14px;color:#64748B;">Nenhum aluno cadastrado para esta turma.</p>`;

  const overlay = document.createElement('div');
  overlay.id = 'atividadeModalOverlay';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">
          ${atividade ? 'Editar Atividade' : 'Nova Atividade'}
        </h2>
        <button type="button" class="btn-icon" onclick="closeAtividadeModal()">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onsubmit="salvarAtividadeFromModal(event)">
        <input type="hidden" id="atividadeModalId" value="${atividade ? atividade.id : ''}">
        <input type="hidden" id="atividadeModalTurma" value="${turmaModal}">

        <div class="modal-body">
          <div class="form-group">
            <label class="form-label" for="atividadeTitulo">Título da atividade</label>
            <input
              id="atividadeTitulo"
              type="text"
              class="form-input"
              placeholder="Ex: Exercícios de Álgebra - Capítulo 6"
              value="${tituloModal}"
              required
            >
          </div>

          <div class="form-group">
            <label class="form-label">Turma</label>
            <input
              type="text"
              class="form-input"
              value="${turmaModal}"
              disabled
            >
            <p style="font-size:12px;color:#64748B;margin-top:4px;">
              A turma é definida pelos filtros da tela principal.
            </p>
          </div>

          <div class="form-group">
            <label class="form-label" for="atividadeDataEntrega">Data de entrega</label>
            <input
              id="atividadeDataEntrega"
              type="date"
              class="form-input"
              value="${dataEntregaModal}"
              required
            >
          </div>

          <div class="form-group">
            <label class="form-label" for="atividadeStatus">Status</label>
            <select id="atividadeStatus" class="filter-select">
              ${statusOptionsHtml}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Entregas dos alunos</label>
            <div class="modal-alunos-list">
              ${alunosHtml}
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-secondary" onclick="closeAtividadeModal()">Cancelar</button>
          <button type="submit" class="btn-primary-limited">
            ${atividade ? 'Salvar alterações' : 'Salvar atividade'}
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);
}

function salvarAtividadeFromModal(event) {
  if (event) event.preventDefault();

  const data = getTeacherAtividadesData();

  const idInput = document.getElementById('atividadeModalId');
  const turmaInput = document.getElementById('atividadeModalTurma');
  const tituloInput = document.getElementById('atividadeTitulo');
  const dataEntregaInput = document.getElementById('atividadeDataEntrega');
  const statusSelect = document.getElementById('atividadeStatus');

  const id = idInput ? idInput.value.trim() : '';
  const turma = turmaInput ? turmaInput.value.trim() : '';
  const titulo = tituloInput ? tituloInput.value.trim() : '';
  const dataEntrega = dataEntregaInput ? dataEntregaInput.value : '';
  const status = statusSelect ? statusSelect.value : 'Rascunho';

  if (!titulo) {
    showToast('Informe o título da atividade.');
    return;
  }

  if (!turma) {
    showToast('Turma inválida.');
    return;
  }

  const alunosTurma = ALUNOS_POR_TURMA[turma] || [];

  const checkboxes = document.querySelectorAll(
    '#atividadeModalOverlay input[type="checkbox"][data-matricula]'
  );

  const entregas = [];
  checkboxes.forEach(cb => {
    if (!cb.checked) return;
    const mat = cb.getAttribute('data-matricula');
    const aluno = alunosTurma.find(a => a.matricula === mat);
    entregas.push({
      matricula: mat,
      nome: aluno ? aluno.nome : 'Aluno',
      dataEntregaAluno: null
    });
  });

  if (id) {
    // editar
    const idx = data.atividades.findIndex(a => a.id === id);
    if (idx >= 0) {
      data.atividades[idx] = {
        ...data.atividades[idx],
        titulo,
        turma,
        dataEntrega,
        status,
        entregas
      };
    }
  } else {
    // nova
    const novoId = 'ATV-' + Date.now();
    data.atividades.push({
      id: novoId,
      titulo,
      turma,
      dataEntrega,
      status,
      entregas
    });
  }

  updateTeacherAtividadesData(data);
  closeAtividadeModal();
  showToast('Atividade salva com sucesso!');

  if (typeof loadView === 'function') {
    loadView('atividades');
  }
}

// Teacher Activities View
function getTeacherAtividades() {
  const data = getTeacherAtividadesData();

  // aplica filtros
  const atividadesFiltradas = data.atividades.filter(atv => {
    const matchTurma = (
      data.filtroTurma === 'Todas as turmas' ||
      atv.turma === data.filtroTurma
    );
    const matchStatus = (
      data.filtroStatus === 'Todos' ||
      atv.status === data.filtroStatus
    );
    return matchTurma && matchStatus;
  });

  const turmaOptions = data.turmasDisponiveis.map(t => `
    <option ${t === data.filtroTurma ? 'selected' : ''}>${t}</option>
  `).join('');

  const statusOptions = data.statusDisponiveis.map(s => `
    <option ${s === data.filtroStatus ? 'selected' : ''}>${s}</option>
  `).join('');

  const linhas = atividadesFiltradas.length
    ? atividadesFiltradas.map(atv => {
        const alunosTurma = ALUNOS_POR_TURMA[atv.turma] || [];
        const totalAlunos = alunosTurma.length;
        const entregues = (atv.entregas || []).length;

        let badgeClass = 'neutral';
        if (atv.status === 'Publicado') badgeClass = 'success';
        else if (atv.status === 'Agendado') badgeClass = 'info';

        // dataEntrega exibida em dd/mm/aaaa
        let dataLabel = atv.dataEntrega;
        if (atv.dataEntrega && atv.dataEntrega.includes('-')) {
          const [y, m, d] = atv.dataEntrega.split('-');
          dataLabel = `${d}/${m}/${y}`;
        }

        return `
          <tr>
            <td><strong>${atv.titulo}</strong></td>
            <td>${atv.turma}</td>
            <td>${dataLabel || '-'}</td>
            <td>${entregues}/${totalAlunos || 0}</td>
            <td><span class="badge ${badgeClass}">${atv.status}</span></td>
            <td>
              <button
                class="btn-small secondary"
                onclick="openAtividadeModal('${atv.id}')"
              >
                Ver / Editar
              </button>
            </td>
          </tr>
        `;
      }).join('')
    : `
      <tr>
        <td colspan="6" style="text-align:center; padding: 24px; color:#64748B;">
          Nenhuma atividade encontrada com os filtros selecionados.
        </td>
      </tr>
    `;

  return `
    <div class="page-header">
      <h1 class="page-title">Atividades</h1>
      <p class="page-subtitle">Gerencie as atividades das suas turmas</p>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Minhas Atividades</h2>
        <div class="card-actions">
          <button
            class="btn-primary-icon"
            type="button"
            onclick="openAtividadeModal(null)"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nova Atividade
          </button>
        </div>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label class="filter-label">Turma</label>
          <select
            class="filter-select"
            onchange="changeTeacherAtividadesFilter('turma', this.value)"
          >
            ${turmaOptions}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <select
            class="filter-select"
            onchange="changeTeacherAtividadesFilter('status', this.value)"
          >
            ${statusOptions}
          </select>
        </div>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Turma</th>
              <th>Data de Entrega</th>
              <th>Entregas</th>
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
