// =========================
// CACHE E MODELO DE DADOS – COORDENADOR
// =========================

const COORDINATOR_CACHE_KEY = 'coordinatorDashboard:v1';

function getCoordinatorDashboardData() {
  const cached = localStorage.getItem(COORDINATOR_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler dashboard do coordenador do cache:', e);
    }
  }

  const initial = {
    // filtros
    filtroAno: 'Todos',
    filtroStatusTurma: 'Todos',

    anosDisponiveis: ['Todos', '6º ano', '7º ano', '8º ano', '9º ano'],
    statusTurmaDisponiveis: ['Todos', 'Em dia', 'Atrasado'],

    // KPIs principais
    kpis: {
      professoresAtivos: 24,
      alunosMatriculados: 486,
      turmas: 18,
      notificacoesPendentes: 7,
      anoLetivoLabel: 'Ano letivo 2024',
      turmasLabel: '6º ao 9º ano',
      notificacoesLabel: 'Requerem atenção'
    },

    // Turmas com mock de desempenho
    turmas: [
      {
        id: '9A',
        nomeTurma: '9º A',
        ano: '9º ano',
        professor: 'Prof. Santos',
        mediaGeral: 8.7,
        frequencia: 94,
        atividadesEntregues: 18,
        atividadesPrevistas: 20,
        status: 'Em dia'
      },
      {
        id: '9B',
        nomeTurma: '9º B',
        ano: '9º ano',
        professor: 'Prof. Silva',
        mediaGeral: 8.2,
        frequencia: 89,
        atividadesEntregues: 15,
        atividadesPrevistas: 20,
        status: 'Atrasado'
      },
      {
        id: '8A',
        nomeTurma: '8º A',
        ano: '8º ano',
        professor: 'Prof. Lima',
        mediaGeral: 8.9,
        frequencia: 96,
        atividadesEntregues: 20,
        atividadesPrevistas: 20,
        status: 'Em dia'
      },
      {
        id: '8B',
        nomeTurma: '8º B',
        ano: '8º ano',
        professor: 'Prof. Costa',
        mediaGeral: 8.4,
        frequencia: 91,
        atividadesEntregues: 17,
        atividadesPrevistas: 20,
        status: 'Em dia'
      },
      {
        id: '7A',
        nomeTurma: '7º A',
        ano: '7º ano',
        professor: 'Prof. Oliveira',
        mediaGeral: 8.6,
        frequencia: 93,
        atividadesEntregues: 19,
        atividadesPrevistas: 20,
        status: 'Em dia'
      }
    ],

    // Resumo de planos de aula (pode futuramente ser ligado ao PLANO_CACHE_KEY)
    planosResumo: {
      aprovados: 52,
      totalMes: 60,
      pendentes: 8,
      mesLabel: 'Março 2024'
    }
  };

  localStorage.setItem(COORDINATOR_CACHE_KEY, JSON.stringify(initial));
  return initial;
}

function updateCoordinatorDashboardData(data) {
  localStorage.setItem(COORDINATOR_CACHE_KEY, JSON.stringify(data));
}

function changeCoordinatorFilter(tipo, valor) {
  const data = getCoordinatorDashboardData();

  if (tipo === 'ano') {
    data.filtroAno = valor;
  } else if (tipo === 'statusTurma') {
    data.filtroStatusTurma = valor;
  }

  updateCoordinatorDashboardData(data);

  // Ajuste o identificador da view se for outro no seu router
  if (typeof loadView === 'function') {
    loadView('coordinator-dashboard');
  }
}

function getTurmaStatusBadgeClass(status) {
  if (status === 'Em dia') return 'success';
  if (status === 'Atrasado') return 'warning';
  return 'neutral';
}

// =========================
// VIEW – COORDENADOR
// =========================

function getCoordinatorDashboard() {
  const data = getCoordinatorDashboardData();
  const { kpis, planosResumo } = data;

  // opções de filtro Ano
  const anoOptions = data.anosDisponiveis.map(ano => `
    <option ${ano === data.filtroAno ? 'selected' : ''}>${ano}</option>
  `).join('');

  // opções de filtro Status da turma
  const statusTurmaOptions = data.statusTurmaDisponiveis.map(s => `
    <option ${s === data.filtroStatusTurma ? 'selected' : ''}>${s}</option>
  `).join('');

  // aplica filtros nas turmas
  const turmasFiltradas = data.turmas.filter(t => {
    const anoOk = data.filtroAno === 'Todos' || t.ano === data.filtroAno;
    const statusOk = data.filtroStatusTurma === 'Todos' || t.status === data.filtroStatusTurma;
    return anoOk && statusOk;
  });

  const linhasTurmas = turmasFiltradas.length
    ? turmasFiltradas.map(t => {
        const badgeClass = getTurmaStatusBadgeClass(t.status);
        const freqStr = `${t.frequencia}%`;
        const mediaStr = t.mediaGeral.toFixed(1);
        const atividadesStr = `${t.atividadesEntregues}/${t.atividadesPrevistas}`;

        return `
          <tr>
            <td><strong>${t.nomeTurma}</strong></td>
            <td>${t.professor}</td>
            <td>${mediaStr}</td>
            <td>${freqStr}</td>
            <td>${atividadesStr}</td>
            <td><span class="badge ${badgeClass}">${t.status}</span></td>
          </tr>
        `;
      }).join('')
    : `
      <tr>
        <td colspan="6" style="text-align:center; padding:24px; color:#64748B;">
          Nenhuma turma encontrada com os filtros selecionados.
        </td>
      </tr>
    `;

  const percAprovados = planosResumo.totalMes
    ? Math.round((planosResumo.aprovados / planosResumo.totalMes) * 100)
    : 0;

  return `
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Visão geral da gestão acadêmica</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-icon primary">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${kpis.professoresAtivos}</div>
          <div class="kpi-label">Professores Ativos</div>
          <div class="kpi-sublabel">Corpo docente</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon success">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${kpis.alunosMatriculados}</div>
          <div class="kpi-label">Alunos Matriculados</div>
          <div class="kpi-sublabel">${kpis.anoLetivoLabel}</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon warning">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${kpis.turmas}</div>
          <div class="kpi-label">Turmas</div>
          <div class="kpi-sublabel">${kpis.turmasLabel}</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon info">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${kpis.notificacoesPendentes}</div>
          <div class="kpi-label">Notificações Pendentes</div>
          <div class="kpi-sublabel">${kpis.notificacoesLabel}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Desempenho por Turma</h2>
          <p class="card-subtitle" style="font-size:13px; color:#64748B; margin-top:4px;">
            Filtre por ano e status para acompanhar o desempenho das turmas.
          </p>
        </div>
        <div class="filters" style="gap:12px;">
          <div class="filter-group">
            <label class="filter-label">Ano</label>
            <select class="filter-select" onchange="changeCoordinatorFilter('ano', this.value)">
              ${anoOptions}
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">Status da turma</label>
            <select class="filter-select" onchange="changeCoordinatorFilter('statusTurma', this.value)">
              ${statusTurmaOptions}
            </select>
          </div>
        </div>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Turma</th>
              <th>Professor Responsável</th>
              <th>Média Geral</th>
              <th>Frequência</th>
              <th>Atividades</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${linhasTurmas}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Status de Planos de Aula</h2>
      </div>
      <div style="padding: 24px;">
        <div class="kpi-grid" style="margin: 0;">
          <div class="kpi-card" style="margin: 0;">
            <div class="kpi-icon success">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">${percAprovados}%</div>
              <div class="kpi-label">Aprovados</div>
              <div class="kpi-sublabel">${planosResumo.aprovados} de ${planosResumo.totalMes} planos</div>
            </div>
          </div>

          <div class="kpi-card" style="margin: 0;">
            <div class="kpi-icon warning">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">${planosResumo.pendentes}</div>
              <div class="kpi-label">Pendentes</div>
              <div class="kpi-sublabel">Aguardando revisão</div>
            </div>
          </div>

          <div class="kpi-card" style="margin: 0;">
            <div class="kpi-icon primary">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">${planosResumo.totalMes}</div>
              <div class="kpi-label">Total do Mês</div>
              <div class="kpi-sublabel">${planosResumo.mesLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
