// =========================
// CACHE E MODELO DE DADOS – COORDENADOR / PLANOS
// =========================

const COORDINATOR_PLANO_CACHE_KEY = 'coordinatorPlano:v1';

function getCoordinatorPlanoData() {
  const cached = localStorage.getItem(COORDINATOR_PLANO_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler planos do coordenador do cache:', e);
    }
  }

  const initial = {
    professorSelecionado: 'Todos',
    turmaSelecionada: 'Todas',
    statusSelecionado: 'Todos',

    professoresDisponiveis: ['Todos', 'Prof. Santos', 'Prof. Silva', 'Prof. Lima'],
    turmasDisponiveis: ['Todas', '9º A', '9º B', '8º A'],
    statusDisponiveis: ['Todos', 'Pendente', 'Aprovado', 'Reprovado'],

    planos: [
      {
        id: 'cp1',
        titulo: 'Geometria Espacial - Prismas',
        professor: 'Prof. Santos',
        turma: '9º B',
        dataISO: '2024-03-27',
        status: 'Pendente',
        resumo: 'Aula sobre prismas retos, área lateral e área total, com atividades práticas.',
        observacoesCoord: '',
        ultimaAtualizacao: null
      },
      {
        id: 'cp2',
        titulo: 'Revolução Industrial',
        professor: 'Prof. Silva',
        turma: '8º A',
        dataISO: '2024-03-28',
        status: 'Pendente',
        resumo: 'Estudo da Revolução Industrial, causas, consequências e impacto social.',
        observacoesCoord: '',
        ultimaAtualizacao: null
      },
      {
        id: 'cp3',
        titulo: 'Introdução à Álgebra Linear',
        professor: 'Prof. Santos',
        turma: '9º A',
        dataISO: '2024-03-25',
        status: 'Aprovado',
        resumo: 'Conceitos básicos de vetores, operações e aplicações em problemas simples.',
        observacoesCoord: 'Plano bem estruturado, com boa variedade de exercícios.',
        ultimaAtualizacao: '2024-03-20T10:00:00Z'
      }
    ]
  };

  localStorage.setItem(COORDINATOR_PLANO_CACHE_KEY, JSON.stringify(initial));
  return initial;
}

function updateCoordinatorPlanoData(data) {
  localStorage.setItem(COORDINATOR_PLANO_CACHE_KEY, JSON.stringify(data));
}

function changeCoordinatorPlanoFilter(tipo, valor) {
  const data = getCoordinatorPlanoData();

  if (tipo === 'professor') {
    data.professorSelecionado = valor;
  } else if (tipo === 'turma') {
    data.turmaSelecionada = valor;
  } else if (tipo === 'status') {
    data.statusSelecionado = valor;
  }

  updateCoordinatorPlanoData(data);

  if (typeof loadView === 'function') {
    // ajuste o identificador se a rota tiver outro nome
    loadView('coordinator-plano');
  }
}

function getCoordinatorPlanoStatusBadgeClass(status) {
  if (status === 'Aprovado') return 'success';
  if (status === 'Pendente') return 'warning';
  if (status === 'Reprovado') return 'neutral';
  return 'neutral';
}

// usa o mesmo formatDateBR do plano do professor;
// se não existir no seu arquivo, você pode reaproveitar esta função:
/*
function formatDateBR(iso) {
  if (!iso) return '-';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
*/

// =========================
// MODAIS – REVISÃO / DETALHES
// =========================

function closeCoordinatorPlanoModal() {
  const overlay = document.getElementById('coordinatorPlanoModalOverlay');
  if (overlay) overlay.remove();
}

function openCoordinatorPlanoReviewModal(planoId) {
  const data = getCoordinatorPlanoData();
  const plano = data.planos.find(p => p.id === planoId);
  if (!plano) return;

  const overlay = document.createElement('div');
  overlay.id = 'coordinatorPlanoModalOverlay';
  overlay.className = 'modal-overlay';

  overlay.innerHTML = `
    <div class="modal modal--large">
      <div class="modal-header">
        <h2 class="modal-title">Revisar Plano de Aula</h2>
        <button class="modal-close" onclick="closeCoordinatorPlanoModal()">×</button>
      </div>

      <form onsubmit="handleCoordinatorPlanoReviewSubmit(event, '${plano.id}')">
        <div class="modal-body">
          <div style="margin-bottom: 16px; font-size: 14px; color:#64748B;">
            <strong>Título:</strong> ${plano.titulo}<br>
            <strong>Professor:</strong> ${plano.professor} &nbsp;·&nbsp;
            <strong>Turma:</strong> ${plano.turma} &nbsp;·&nbsp;
            <strong>Data:</strong> ${typeof formatDateBR === 'function' ? formatDateBR(plano.dataISO) : plano.dataISO}
          </div>

          <div class="card" style="box-shadow:none; border:1px solid #E2E8F0; margin-bottom:12px;">
            <div class="card-header" style="border-bottom:1px solid #E2E8F0;">
              <h3 class="card-title" style="font-size:15px;">Resumo do Plano</h3>
            </div>
            <div style="padding:12px 16px; font-size:14px; color:#334155;">
              ${plano.resumo || '<span style="color:#94A3B8;">Professor não preencheu um resumo.</span>'}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Parecer do Coordenador</label>
            <textarea
              class="form-input"
              name="observacoesCoord"
              rows="3"
              placeholder="Inclua orientações, ajustes sugeridos ou justificativa da decisão..."
            >${plano.observacoesCoord || ''}</textarea>
          </div>

          <div class="form-group" style="margin-top: 12px;">
            <label class="form-label">Status do Plano</label>
            <select class="filter-select" name="status" required>
              <option value="Pendente" ${plano.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
              <option value="Aprovado" ${plano.status === 'Aprovado' ? 'selected' : ''}>Aprovado</option>
              <option value="Reprovado" ${plano.status === 'Reprovado' ? 'selected' : ''}>Reprovado</option>
            </select>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-secondary" onclick="closeCoordinatorPlanoModal()">Cancelar</button>
          <button type="submit" class="btn-primary-limited">Salvar Parecer</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);
}

function handleCoordinatorPlanoReviewSubmit(event, planoId) {
  event.preventDefault();
  const form = event.target;
  const data = getCoordinatorPlanoData();
  const plano = data.planos.find(p => p.id === planoId);
  if (!plano) return;

  const novoStatus = form.status.value;
  const observacoesCoord = form.observacoesCoord.value.trim();

  plano.status = novoStatus;
  plano.observacoesCoord = observacoesCoord;
  plano.ultimaAtualizacao = new Date().toISOString();

  updateCoordinatorPlanoData(data);
  closeCoordinatorPlanoModal();
  showToast('Parecer salvo com sucesso!');

  // Atualiza a tabela já renderizada
  updateCoordinatorPlanoRowInDOM(plano);

  // Se você quiser ainda recarregar a view inteira, pode manter:
  if (typeof loadView === 'function') {
    // garante sincronismo com filtros se você trocar de rota
    // loadView('coordinator-plano');
  }
}

function openCoordinatorPlanoDetailsModal(planoId) {
  const data = getCoordinatorPlanoData();
  const plano = data.planos.find(p => p.id === planoId);
  if (!plano) return;

  const overlay = document.createElement('div');
  overlay.id = 'coordinatorPlanoModalOverlay';
  overlay.className = 'modal-overlay';

  const ultima = plano.ultimaAtualizacao
    ? new Date(plano.ultimaAtualizacao).toLocaleString('pt-BR')
    : null;

  overlay.innerHTML = `
    <div class="modal modal--large">
      <div class="modal-header">
        <h2 class="modal-title">${plano.titulo}</h2>
        <button class="modal-close" onclick="closeCoordinatorPlanoModal()">×</button>
      </div>

      <div class="modal-body">
        <div style="margin-bottom: 16px; font-size: 14px; color:#64748B;">
          <strong>Professor:</strong> ${plano.professor} &nbsp;·&nbsp;
          <strong>Turma:</strong> ${plano.turma} &nbsp;·&nbsp;
          <strong>Data:</strong> ${typeof formatDateBR === 'function' ? formatDateBR(plano.dataISO) : plano.dataISO} &nbsp;·&nbsp;
          <strong>Status:</strong>
          <span class="badge ${getCoordinatorPlanoStatusBadgeClass(plano.status)}">${plano.status}</span>
          ${ultima ? `<br><span style="font-size:12px; color:#94A3B8;">Última atualização: ${ultima}</span>` : ''}
        </div>

        <div class="card" style="box-shadow:none; border:1px solid #E2E8F0; margin-bottom:12px;">
          <div class="card-header" style="border-bottom:1px solid #E2E8F0;">
            <h3 class="card-title" style="font-size:15px;">Resumo do Plano</h3>
          </div>
          <div style="padding:12px 16px; font-size:14px; color:#334155;">
            ${plano.resumo || '<span style="color:#94A3B8;">Professor não preencheu um resumo.</span>'}
          </div>
        </div>

        <div class="card" style="box-shadow:none; border:1px solid #E2E8F0;">
          <div class="card-header" style="border-bottom:1px solid #E2E8F0;">
            <h3 class="card-title" style="font-size:15px;">Parecer do Coordenador</h3>
          </div>
          <div style="padding:12px 16px; font-size:14px; color:#334155;">
            ${plano.observacoesCoord
              ? plano.observacoesCoord
              : '<span style="color:#94A3B8;">Nenhum parecer registrado.</span>'}
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn-secondary" onclick="closeCoordinatorPlanoModal()">Fechar</button>
        <button type="button" class="btn-primary-limited" onclick="closeCoordinatorPlanoModal(); openCoordinatorPlanoReviewModal('${plano.id}')">
          Revisar Plano
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
}

// =========================
// VIEW PRINCIPAL – COORDINATOR PLANO
// =========================

function getCoordinatorPlanoView() {
  const data = getCoordinatorPlanoData();

  const professorOptions = data.professoresDisponiveis.map(p => `
    <option ${p === data.professorSelecionado ? 'selected' : ''}>${p}</option>
  `).join('');

  const turmaOptions = data.turmasDisponiveis.map(t => `
    <option ${t === data.turmaSelecionada ? 'selected' : ''}>${t}</option>
  `).join('');

  const statusOptions = data.statusDisponiveis.map(s => `
    <option ${s === data.statusSelecionado ? 'selected' : ''}>${s}</option>
  `).join('');

  const planosFiltrados = data.planos.filter(p => {
    const profOk = data.professorSelecionado === 'Todos' || p.professor === data.professorSelecionado;
    const turmaOk = data.turmaSelecionada === 'Todas' || p.turma === data.turmaSelecionada;
    const statusOk = data.statusSelecionado === 'Todos' || p.status === data.statusSelecionado;
    return profOk && turmaOk && statusOk;
  });

  const linhas = planosFiltrados.length
    ? planosFiltrados.map(p => {
        const badgeClass = getCoordinatorPlanoStatusBadgeClass(p.status);
        const dataBR = typeof formatDateBR === 'function' ? formatDateBR(p.dataISO) : p.dataISO;

        // se estiver pendente, mostra botão "Revisar"; senão, "Visualizar"
        const acoesHtml = p.status === 'Pendente'
          ? `
            <button class="btn-small primary" onclick="openCoordinatorPlanoReviewModal('${p.id}')">
              Revisar
            </button>
          `
          : `
            <button class="btn-icon" title="Visualizar plano" onclick="openCoordinatorPlanoDetailsModal('${p.id}')">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          `;

        return `
          <tr>
            <td><strong>${p.titulo}</strong></td>
            <td>${p.professor}</td>
            <td>${p.turma}</td>
            <td>${dataBR}</td>
            <td><span class="badge ${badgeClass}">${p.status}</span></td>
            <td>${acoesHtml}</td>
          </tr>
        `;
      }).join('')
    : `
      <tr>
        <td colspan="6" style="text-align:center; padding:24px; color:#64748B;">
          Nenhum plano encontrado com os filtros selecionados.
        </td>
      </tr>
    `;

  return `
    <div class="page-header">
      <h1 class="page-title">Planos de Aula</h1>
      <p class="page-subtitle">Acompanhe e aprove os planos dos professores</p>
    </div>

    <div class="card">
      <div class="filters">
        <div class="filter-group">
          <label class="filter-label">Professor</label>
          <select class="filter-select" onchange="changeCoordinatorPlanoFilter('professor', this.value)">
            ${professorOptions}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Turma</label>
          <select class="filter-select" onchange="changeCoordinatorPlanoFilter('turma', this.value)">
            ${turmaOptions}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <select class="filter-select" onchange="changeCoordinatorPlanoFilter('status', this.value)">
            ${statusOptions}
          </select>
        </div>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Professor</th>
              <th>Turma</th>
              <th>Data</th>
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
