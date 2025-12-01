const TEACHER_DASHBOARD_CACHE_KEY = 'teacherDashboard:v1';

function getTeacherDashboardData() {
  const cached = localStorage.getItem(TEACHER_DASHBOARD_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler teacher dashboard do cache:', e);
    }
  }

  // Mock inicial (pode vir da API depois)
  const initialData = {
    totalTurmasAtivas: 5,
    totalAlunos: 142,

    atividadesPublicadas: 18,
    periodoAtividadesLabel: 'Este mês',

    progressoLancamentosPercent: 78,
    progressoLancamentosLabel: 'Notas e frequência',

    planosAulaTotal: 12,
    planosAulaPendentes: 3,

    turmasProgresso: [
      {
        id: '9A',
        nomeTurma: '9º A',
        disciplina: 'Matemática',
        atividadesPublicadas: 4,
        atividadesTotal: 5,
        notasLancadas: 28,
        alunosTotal: 30,
        frequenciaPercent: 100,
        status: 'Em dia'           // Em dia | Atrasado | Crítico (se quiser)
      },
      {
        id: '9B',
        nomeTurma: '9º B',
        disciplina: 'Matemática',
        atividadesPublicadas: 3,
        atividadesTotal: 5,
        notasLancadas: 25,
        alunosTotal: 28,
        frequenciaPercent: 89,
        status: 'Atrasado'
      },
      {
        id: '8A',
        nomeTurma: '8º A',
        disciplina: 'Matemática',
        atividadesPublicadas: 5,
        atividadesTotal: 5,
        notasLancadas: 32,
        alunosTotal: 32,
        frequenciaPercent: 100,
        status: 'Em dia'
      },
      {
        id: '8B',
        nomeTurma: '8º B',
        disciplina: 'Matemática',
        atividadesPublicadas: 4,
        atividadesTotal: 5,
        notasLancadas: 26,
        alunosTotal: 30,
        frequenciaPercent: 87,
        status: 'Atrasado'
      },
      {
        id: '7A',
        nomeTurma: '7º A',
        disciplina: 'Matemática',
        atividadesPublicadas: 5,
        atividadesTotal: 5,
        notasLancadas: 22,
        alunosTotal: 22,
        frequenciaPercent: 100,
        status: 'Em dia'
      }
    ]
  };

  localStorage.setItem(TEACHER_DASHBOARD_CACHE_KEY, JSON.stringify(initialData));
  return initialData;
}

function updateTeacherDashboardData(newData) {
  localStorage.setItem(TEACHER_DASHBOARD_CACHE_KEY, JSON.stringify(newData));
}

// Teacher Dashboard
function getTeacherDashboard() {
  const data = getTeacherDashboardData();

  const turmasRows = (data.turmasProgresso || []).map(t => {
    const atividadesLabel = `${t.atividadesPublicadas}/${t.atividadesTotal}`;
    const notasLabel = `${t.notasLancadas}/${t.alunosTotal}`;
    const freqLabel = `${t.frequenciaPercent}%`;

    const statusClass =
      t.status === 'Em dia'
        ? 'success'
        : t.status === 'Crítico'
          ? 'error'
          : 'warning';

    return `
      <tr>
        <td><strong>${t.nomeTurma}</strong></td>
        <td>${t.disciplina}</td>
        <td>${atividadesLabel}</td>
        <td>${notasLabel}</td>
        <td>${freqLabel}</td>
        <td><span class="badge ${statusClass}">${t.status}</span></td>
      </tr>
    `;
  }).join('');

  return `
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Visão geral das suas turmas e atividades</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-icon primary">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${data.totalTurmasAtivas}</div>
          <div class="kpi-label">Turmas Ativas</div>
          <div class="kpi-sublabel">${data.totalAlunos} alunos total</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon success">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${data.atividadesPublicadas}</div>
          <div class="kpi-label">Atividades Publicadas</div>
          <div class="kpi-sublabel">${data.periodoAtividadesLabel}</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon warning">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${data.progressoLancamentosPercent}%</div>
          <div class="kpi-label">Progresso de Lançamentos</div>
          <div class="kpi-sublabel">${data.progressoLancamentosLabel}</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon info">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${data.planosAulaTotal}</div>
          <div class="kpi-label">Planos de Aula</div>
          <div class="kpi-sublabel">${data.planosAulaPendentes} pendentes de revisão</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Progresso por Turma</h2>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Turma</th>
              <th>Disciplina</th>
              <th>Atividades</th>
              <th>Notas Lançadas</th>
              <th>Frequência</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${turmasRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
