// =========================
// CACHE E MODELO DE DADOS
// =========================
const PLANO_CACHE_KEY = 'teacherPlano:v1';

function getTeacherPlanoData() {
  const cached = localStorage.getItem(PLANO_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler planos do cache:', e);
    }
  }

  const initial = {
    filtroTurma: 'Todas as turmas',
    filtroStatus: 'Todos',
    turmasDisponiveis: ['Todas as turmas', '9º A', '9º B', '8º A'],
    statusDisponiveis: ['Todos', 'Aprovado', 'Pendente', 'Em revisão'],
    planos: [
      {
        id: 'p1',
        titulo: 'Introdução à Álgebra Linear',
        turma: '9º A',
        dataISO: '2024-03-25',
        status: 'Aprovado',
        objetivos: 'Apresentar conceitos básicos de vetores e operações.',
        conteudo: 'Vetores no plano, soma de vetores, multiplicação por escalar.',
        estrategias: 'Aula expositiva, resolução guiada de exercícios, exemplos no quadro.',
        avaliacao: 'Lista de exercícios e participação em sala.'
      },
      {
        id: 'p2',
        titulo: 'Geometria Espacial - Prismas',
        turma: '9º B',
        dataISO: '2024-03-27',
        status: 'Pendente',
        objetivos: 'Compreender as características dos prismas e cálculo de área.',
        conteudo: 'Prismas retos, área lateral, área total, exercícios práticos.',
        estrategias: 'Uso de modelos físicos, atividades em grupo, resolução de problemas.',
        avaliacao: 'Atividade em grupo e lista de exercícios.'
      },
      {
        id: 'p3',
        titulo: 'Funções Quadráticas',
        turma: '8º A',
        dataISO: '2024-03-30',
        status: 'Aprovado',
        objetivos: 'Identificar função quadrática e suas representações gráfica e algébrica.',
        conteudo: 'Equação y = ax²+bx+c, concavidade, vértice, raízes.',
        estrategias: 'Uso de gráfico no projetor, exercícios em dupla, discussão guiada.',
        avaliacao: 'Prova escrita e atividade avaliativa.'
      }
    ]
  };

  localStorage.setItem(PLANO_CACHE_KEY, JSON.stringify(initial));
  return initial;
}

function updateTeacherPlanoData(data) {
  localStorage.setItem(PLANO_CACHE_KEY, JSON.stringify(data));
}

function changePlanoFilter(tipo, valor) {
  const data = getTeacherPlanoData();

  if (tipo === 'turma') {
    data.filtroTurma = valor;
  } else if (tipo === 'status') {
    data.filtroStatus = valor;
  }

  updateTeacherPlanoData(data);
  if (typeof loadView === 'function') {
    loadView('plano');
  }
}

function getStatusBadgeClassPlano(status) {
  if (status === 'Aprovado') return 'success';
  if (status === 'Pendente') return 'warning';
  if (status === 'Em revisão') return 'info';
  return 'neutral';
}

function formatDateBR(iso) {
  if (!iso) return '-';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

// =========================
// MODAIS – CRIAR / EDITAR / VER
// =========================
function closePlanoModal() {
  const overlay = document.getElementById('planoModalOverlay');
  if (overlay) overlay.remove();
}

function openPlanoFormModal(planoId) {
  const data = getTeacherPlanoData();
  const plano = planoId ? data.planos.find(p => p.id === planoId) : null;
  const isEdit = !!plano;

  const turmasOptions = data.turmasDisponiveis
    .filter(t => t !== 'Todas as turmas')
    .map(t => `<option value="${t}" ${plano && plano.turma === t ? 'selected' : ''}>${t}</option>`)
    .join('');

  const statusOptions = data.statusDisponiveis
    .filter(s => s !== 'Todos')
    .map(s => `<option value="${s}" ${plano && plano.status === s ? 'selected' : ''}>${s}</option>`)
    .join('');

  const overlay = document.createElement('div');
  overlay.id = 'planoModalOverlay';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal modal--large"  style="padding: 0px;">
      <div class="modal-header">
        <h2 class="modal-title">${isEdit ? 'Editar Plano de Aula' : 'Novo Plano de Aula'}</h2>
        <button class="modal-close" onclick="closePlanoModal()">×</button>
      </div>

      <form id="planoForm" onsubmit="handleSavePlano(event, '${planoId || ''}')">
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Título do Plano</label>
            <input
              type="text"
              class="form-input"
              name="titulo"
              required
              placeholder="Ex: Funções Afins"
              value="${plano ? plano.titulo : ''}"
            >
          </div>

          <div class="filters" style="margin-bottom: 16px;">
            <div class="filter-group">
              <label class="filter-label">Turma</label>
              <select class="filter-select" name="turma" required>
                <option value="" disabled ${plano ? '' : 'selected'}>Selecione</option>
                ${turmasOptions}
              </select>
            </div>
            <div class="filter-group">
              <label class="filter-label">Data</label>
              <input
                type="date"
                class="filter-select"
                name="dataISO"
                value="${plano ? plano.dataISO : ''}"
                required
              >
            </div>
            <div class="filter-group">
              <label class="filter-label">Status</label>
              <select class="filter-select" name="status" required>
                ${statusOptions}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Objetivos</label>
            <textarea
              class="form-input"
              name="objetivos"
              rows="2"
              placeholder="Descreva os objetivos da aula..."
            >${plano ? plano.objetivos : ''}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Conteúdo / Etapas</label>
            <textarea
              class="form-input"
              name="conteudo"
              rows="3"
              placeholder="Liste os tópicos e etapas da aula..."
            >${plano ? plano.conteudo : ''}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Estratégias de Ensino</label>
            <textarea
              class="form-input"
              name="estrategias"
              rows="2"
              placeholder="Metodologias, recursos e dinâmica em sala..."
            >${plano ? plano.estrategias : ''}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Avaliação</label>
            <textarea
              class="form-input"
              name="avaliacao"
              rows="2"
              placeholder="Como será avaliado (prova, atividade, participação, etc.)"
            >${plano ? plano.avaliacao : ''}</textarea>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-secondary" onclick="closePlanoModal()">Cancelar</button>
          <button type="submit" class="btn-primary-limited">
            ${isEdit ? 'Salvar Alterações' : 'Criar Plano'}
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);
}

function handleSavePlano(event, planoId) {
  event.preventDefault();
  const form = event.target;
  const data = getTeacherPlanoData();

  const titulo = form.titulo.value.trim();
  const turma = form.turma.value;
  const dataISO = form.dataISO.value;
  const status = form.status.value;
  const objetivos = form.objetivos.value.trim();
  const conteudo = form.conteudo.value.trim();
  const estrategias = form.estrategias.value.trim();
  const avaliacao = form.avaliacao.value.trim();

  if (!titulo || !turma || !dataISO || !status) {
    showToast('Preencha os campos obrigatórios.');
    return;
  }

  if (planoId) {
    // edição
    const idx = data.planos.findIndex(p => p.id === planoId);
    if (idx !== -1) {
      data.planos[idx] = {
        ...data.planos[idx],
        titulo,
        turma,
        dataISO,
        status,
        objetivos,
        conteudo,
        estrategias,
        avaliacao
      };
    }
  } else {
    // novo
    const newId = 'p_' + Date.now();
    data.planos.push({
      id: newId,
      titulo,
      turma,
      dataISO,
      status,
      objetivos,
      conteudo,
      estrategias,
      avaliacao
    });
  }

  updateTeacherPlanoData(data);
  closePlanoModal();
  showToast('Plano de aula salvo com sucesso!');

  if (typeof loadView === 'function') {
    loadView('plano');
  }
}

function openPlanoDetailsModal(planoId) {
  const data = getTeacherPlanoData();
  const plano = data.planos.find(p => p.id === planoId);
  if (!plano) return;

  const overlay = document.createElement('div');
  overlay.id = 'planoModalOverlay';
  overlay.className = 'modal-overlay';

  overlay.innerHTML = `
    <div class="modal modal--large">
      <div class="modal-header">
        <h2 class="modal-title">${plano.titulo}</h2>
        <button class="modal-close" onclick="closePlanoModal()">×</button>
      </div>

      <div class="modal-body">
        <div style="margin-bottom: 16px; font-size: 14px; color:#64748B;">
          <strong>Turma:</strong> ${plano.turma} &nbsp;·&nbsp;
          <strong>Data:</strong> ${formatDateBR(plano.dataISO)} &nbsp;·&nbsp;
          <strong>Status:</strong>
          <span class="badge ${getStatusBadgeClassPlano(plano.status)}">${plano.status}</span>
        </div>

        <div class="card" style="box-shadow:none; border:1px solid #E2E8F0; margin-bottom:12px;">
          <div class="card-header" style="border-bottom:1px solid #E2E8F0;">
            <h3 class="card-title" style="font-size:15px;">Objetivos</h3>
          </div>
          <div style="padding:12px 16px; font-size:14px; color:#334155;">
            ${plano.objetivos || '<span style="color:#94A3B8;">Não informado</span>'}
          </div>
        </div>

        <div class="card" style="box-shadow:none; border:1px solid #E2E8F0; margin-bottom:12px;">
          <div class="card-header" style="border-bottom:1px solid #E2E8F0;">
            <h3 class="card-title" style="font-size:15px;">Conteúdo / Etapas</h3>
          </div>
          <div style="padding:12px 16px; font-size:14px; color:#334155;">
            ${plano.conteudo || '<span style="color:#94A3B8;">Não informado</span>'}
          </div>
        </div>

        <div class="card" style="box-shadow:none; border:1px solid #E2E8F0; margin-bottom:12px;">
          <div class="card-header" style="border-bottom:1px solid #E2E8F0;">
            <h3 class="card-title" style="font-size:15px;">Estratégias de Ensino</h3>
          </div>
          <div style="padding:12px 16px; font-size:14px; color:#334155;">
            ${plano.estrategias || '<span style="color:#94A3B8;">Não informado</span>'}
          </div>
        </div>

        <div class="card" style="box-shadow:none; border:1px solid #E2E8F0;">
          <div class="card-header" style="border-bottom:1px solid #E2E8F0;">
            <h3 class="card-title" style="font-size:15px;">Avaliação</h3>
          </div>
          <div style="padding:12px 16px; font-size:14px; color:#334155;">
            ${plano.avaliacao || '<span style="color:#94A3B8;">Não informado</span>'}
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn-secondary" onclick="closePlanoModal()">Fechar</button>
        <button type="button" class="btn-primary-limited" onclick="closePlanoModal(); openPlanoFormModal('${plano.id}')">
          Editar Plano
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
}

// =========================
// VIEW PRINCIPAL – PLANO PROF
// =========================
function getTeacherPlanoView() {
  const data = getTeacherPlanoData();

  const turmaOptions = data.turmasDisponiveis.map(t => `
    <option ${t === data.filtroTurma ? 'selected' : ''}>${t}</option>
  `).join('');

  const statusOptions = data.statusDisponiveis.map(s => `
    <option ${s === data.filtroStatus ? 'selected' : ''}>${s}</option>
  `).join('');

  const planosFiltrados = data.planos.filter(p => {
    const turmaOk = data.filtroTurma === 'Todas as turmas' || p.turma === data.filtroTurma;
    const statusOk = data.filtroStatus === 'Todos' || p.status === data.filtroStatus;
    return turmaOk && statusOk;
  });

  const linhas = planosFiltrados.length
    ? planosFiltrados.map(p => {
        const badgeClass = getStatusBadgeClassPlano(p.status);
        return `
          <tr>
            <td><strong>${p.titulo}</strong></td>
            <td>${p.turma}</td>
            <td>${formatDateBR(p.dataISO)}</td>
            <td><span class="badge ${badgeClass}">${p.status}</span></td>
            <td style="display:flex; gap:4px;">
              <button class="btn-icon" title="Visualizar" onclick="openPlanoDetailsModal('${p.id}')">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button class="btn-icon" title="Editar" onclick="openPlanoFormModal('${p.id}')">
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
        <td colspan="5" style="text-align:center; padding: 24px; color:#64748B;">
          Nenhum plano de aula encontrado com os filtros selecionados.
        </td>
      </tr>
    `;

  return `
    <div class="page-header">
      <h1 class="page-title">Plano de Aula</h1>
      <p class="page-subtitle">Crie e gerencie seus planos de aula</p>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Meus Planos de Aula</h2>
          <p class="card-subtitle" style="font-size:13px; color:#64748B; margin-top:4px;">
            Filtre por turma e status para localizar rapidamente seus planos.
          </p>
        </div>
        <div class="card-actions">
          <button class="btn-primary-icon" onclick="openPlanoFormModal()">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Novo Plano
          </button>
        </div>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label class="filter-label">Turma</label>
          <select class="filter-select" onchange="changePlanoFilter('turma', this.value)">
            ${turmaOptions}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <select class="filter-select" onchange="changePlanoFilter('status', this.value)">
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
              <th>Data</th>
              <th>Status</th>
              <th style="width:110px;">Ações</th>
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
