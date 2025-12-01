// =========================
// CACHE E MODELO DE DADOS
// =========================
const NOTIFICACOES_CACHE_KEY = 'coordinatorNotificacoes:v1';

function buildInitialNotificacoesData() {
  return {
    filtroTipo: 'Todos',
    filtroStatus: 'Todas',
    tiposDisponiveis: ['Todos', 'Urgente', 'Normal', 'Informativo'],
    statusDisponiveis: ['Todas', 'Não lidas', 'Lidas'],
    notificacoes: [
      {
        id: 'n1',
        titulo: 'Plano de Aula Reprovado',
        mensagem: 'O plano de aula "Geometria Espacial" do Prof. Santos foi reprovado. Requer revisão urgente.',
        tipo: 'Urgente',
        accent: 'error',             // define a cor do lado esquerdo / badge
        tempoLabel: 'Há 2 horas',
        lida: false,
        origem: 'Plano de Aula',
        referencia: 'plano:p2'
      },
      {
        id: 'n2',
        titulo: 'Novo Plano Aguardando Aprovação',
        mensagem: 'Prof. Silva enviou novo plano de aula para a turma 8º A.',
        tipo: 'Normal',
        accent: 'warning',
        tempoLabel: 'Há 5 horas',
        lida: false,
        origem: 'Plano de Aula',
        referencia: 'plano:p4'
      },
      {
        id: 'n3',
        titulo: 'Relatório Mensal Disponível',
        mensagem: 'O relatório de desempenho de março está disponível para consulta.',
        tipo: 'Informativo',
        accent: 'info',
        tempoLabel: 'Ontem',
        lida: true,
        origem: 'Relatórios',
        referencia: 'relatorio:mensal-marco'
      }
    ]
  };
}

function getNotificacoesData() {
  const cached = localStorage.getItem(NOTIFICACOES_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler notificações do cache:', e);
    }
  }

  const initial = buildInitialNotificacoesData();
  localStorage.setItem(NOTIFICACOES_CACHE_KEY, JSON.stringify(initial));
  return initial;
}

function updateNotificacoesData(data) {
  localStorage.setItem(NOTIFICACOES_CACHE_KEY, JSON.stringify(data));
}

// =========================
// HELPERS
// =========================
function changeNotificacoesFilter(tipo, valor) {
  const data = getNotificacoesData();

  if (tipo === 'tipo') {
    data.filtroTipo = valor;
  } else if (tipo === 'status') {
    data.filtroStatus = valor;
  }

  updateNotificacoesData(data);
  if (typeof loadView === 'function') {
    loadView('notificacoes');
  }
}

function markAllNotificacoesComoLidas() {
  const data = getNotificacoesData();
  data.notificacoes.forEach(n => { n.lida = true; });
  updateNotificacoesData(data);
  showToast('Todas as notificações marcadas como lidas');
  if (typeof loadView === 'function') {
    loadView('notificacoes');
  }
}

function toggleNotificacaoLida(id, closeModalAfter = false) {
  const data = getNotificacoesData();
  const notif = data.notificacoes.find(n => n.id === id);
  if (!notif) return;

  notif.lida = !notif.lida;
  updateNotificacoesData(data);

  showToast(notif.lida ? 'Notificação marcada como lida' : 'Notificação marcada como não lida');

  if (closeModalAfter) {
    closeNotificacaoModal();
  }

  if (typeof loadView === 'function') {
    loadView('notificacoes');
  }
}

function getNotificacaoBorderColor(accent) {
  if (accent === 'error') return '#EF4444';
  if (accent === 'warning') return '#F59E0B';
  if (accent === 'info') return '#3B82F6';
  return '#E5E7EB';
}

// =========================
// MODAL DETALHES
// =========================
function closeNotificacaoModal() {
  const overlay = document.getElementById('notificacaoModalOverlay');
  if (overlay) overlay.remove();
}

function openNotificacaoModal(id) {
  const data = getNotificacoesData();
  const notif = data.notificacoes.find(n => n.id === id);
  if (!notif) return;

  const overlay = document.createElement('div');
  overlay.id = 'notificacaoModalOverlay';
  overlay.className = 'modal-overlay';

  const badgeClass = notif.accent || 'neutral';

  overlay.innerHTML = `
    <div class="modal modal--large">
      <div class="modal-header">
        <h2 class="modal-title">${notif.titulo}</h2>
        <button class="modal-close" onclick="closeNotificacaoModal()">×</button>
      </div>

      <div class="modal-body">
        <div style="margin-bottom: 12px; font-size: 14px; color:#64748B; display:flex; gap:8px; align-items:center;">
          <span class="badge ${badgeClass}">${notif.tipo}</span>
          <span>${notif.tempoLabel}</span>
          <span style="color:#CBD5F5;">•</span>
          <span><strong>Origem:</strong> ${notif.origem}</span>
        </div>

        <p style="font-size: 14px; color:#334155; line-height:1.6;">
          ${notif.mensagem}
        </p>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn-secondary" onclick="closeNotificacaoModal()">Fechar</button>
        <button
          type="button"
          class="btn-primary-limited"
          onclick="toggleNotificacaoLida('${notif.id}', true)"
        >
          ${notif.lida ? 'Marcar como não lida' : 'Marcar como lida'}
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
}

// =========================
// VIEW PRINCIPAL – NOTIFICAÇÕES
// =========================
function getNotificacoesView() {
  const data = getNotificacoesData();

  const tipoOptions = data.tiposDisponiveis.map(t => `
    <option ${t === data.filtroTipo ? 'selected' : ''}>${t}</option>
  `).join('');

  const statusOptions = data.statusDisponiveis.map(s => `
    <option ${s === data.filtroStatus ? 'selected' : ''}>${s}</option>
  `).join('');

  const notificacoesFiltradas = data.notificacoes.filter(n => {
    const tipoOk = data.filtroTipo === 'Todos' || n.tipo === data.filtroTipo;
    const statusOk =
      data.filtroStatus === 'Todas' ||
      (data.filtroStatus === 'Não lidas' && !n.lida) ||
      (data.filtroStatus === 'Lidas' && n.lida);

    return tipoOk && statusOk;
  });

  const cards = notificacoesFiltradas.length
    ? notificacoesFiltradas.map(n => {
        const borderColor = getNotificacaoBorderColor(n.accent);
        const badgeClass = n.accent || 'neutral';
        const readClass = n.lida ? 'notificacao-card--read' : '';

        return `
          <div
            class="activity-card notificacao-card ${readClass}"
            style="border-left: 4px solid ${borderColor};"
          >
            <div class="activity-info">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span class="badge ${badgeClass}">${n.tipo}</span>
                <span style="font-size: 13px; color: #94A3B8;">${n.tempoLabel}</span>
                ${n.lida ? '<span style="font-size:12px; color:#22C55E;">• Lida</span>' : ''}
              </div>
              <div class="activity-title">${n.titulo}</div>
              <p style="font-size: 14px; color: #475569; margin-top: 8px;">
                ${n.mensagem}
              </p>
            </div>
            <div class="activity-actions" style="display:flex; flex-direction:column; gap:8px;">
              <button
                class="btn-small primary"
                onclick="openNotificacaoModal('${n.id}')"
              >
                Ver detalhes
              </button>
              <button
                class="btn-small secondary"
                onclick="toggleNotificacaoLida('${n.id}')"
              >
                ${n.lida ? 'Marcar como não lida' : 'Marcar como lida'}
              </button>
            </div>
          </div>
        `;
      }).join('')
    : `
      <div style="padding: 24px; text-align:center; color:#64748B; font-size:14px;">
        Nenhuma notificação encontrada com os filtros selecionados.
      </div>
    `;

  return `
    <div class="page-header">
      <h1 class="page-title">Notificações</h1>
      <p class="page-subtitle">Acompanhe avisos e alertas importantes</p>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Feed de Notificações</h2>
          <p class="card-subtitle" style="font-size:13px; color:#64748B; margin-top:4px;">
            Filtre por tipo e status ou marque todas como lidas.
          </p>
        </div>
        <div class="card-actions" style="gap: 8px;">
          <button
            class="btn-secondary"
            onclick="markAllNotificacoesComoLidas()"
          >
            Marcar todas como lidas
          </button>
        </div>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label class="filter-label">Tipo</label>
          <select
            class="filter-select"
            onchange="changeNotificacoesFilter('tipo', this.value)"
          >
            ${tipoOptions}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <select
            class="filter-select"
            onchange="changeNotificacoesFilter('status', this.value)"
          >
            ${statusOptions}
          </select>
        </div>
      </div>

      <div class="activity-grid">
        ${cards}
      </div>
    </div>
  `;
}
