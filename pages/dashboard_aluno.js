const DASHBOARD_CACHE_KEY = 'studentDashboard:v1';

function getStudentDashboardData() {
  // 1) Tenta pegar do cache
  const cached = localStorage.getItem(DASHBOARD_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao parsear cache do dashboard:', e);
    }
  }

  // 2) Se não tiver cache (ou der erro), usa os dados atuais
  const initialData = {
    periodo: '2024 - 1º Bimestre',
    mediaGeral: 8.5,
    frequenciaPercent: 92,
    aulasPresentes: 46,
    aulasTotais: 50,
    atividadesPendentes: 3,
    medalhas: 12,
    medalhasPercent: 85,
    disciplinas: [
      { nome: 'Matemática', media: 9.2, freq: 95, status: 'Aprovado' },
      { nome: 'Português', media: 8.7, freq: 92, status: 'Aprovado' },
      { nome: 'História', media: 8.0, freq: 88, status: 'Aprovado' },
      { nome: 'Geografia', media: 8.5, freq: 90, status: 'Aprovado' },
      { nome: 'Ciências', media: 9.0, freq: 96, status: 'Aprovado' },
      { nome: 'Inglês', media: 7.8, freq: 85, status: 'Em andamento' },
    ],
  };

  // 3) Salva inicialmente em cache
  localStorage.setItem(DASHBOARD_CACHE_KEY, JSON.stringify(initialData));

  return initialData;
}

// Student Dashboard
function getStudentDashboard() {
  const data = getStudentDashboardData();

  return `
    <div class="page-header">
      <h1 class="page-title" id="dashboardTitle">Dashboard</h1>
      <p class="page-subtitle">Visão geral do seu desempenho acadêmico</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-icon primary">
          <!-- ícone -->
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${data.mediaGeral.toFixed(1)}</div>
          <div class="kpi-label">Média Geral</div>
          <div class="kpi-sublabel">${data.periodo}</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon success">
          <!-- ícone -->
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${data.frequenciaPercent}%</div>
          <div class="kpi-label">Frequência</div>
          <div class="kpi-sublabel">${data.aulasPresentes} de ${data.aulasTotais} aulas</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon warning">
          <!-- ícone -->
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${data.atividadesPendentes}</div>
          <div class="kpi-label">Atividades Pendentes</div>
          <div class="kpi-sublabel">Prazo próximo</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon info">
          <!-- ícone -->
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${data.medalhas}</div>
          <div class="kpi-label">Medalhas Conquistadas</div>
          <div class="kpi-sublabel">${data.medalhasPercent}% do total</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Desempenho por Disciplina</h2>
        <div class="card-actions">
          <select class="filter-select" style="width: auto;">
            <option>${data.periodo}</option>
            <option>2023 - 4º Bimestre</option>
            <option>2023 - 3º Bimestre</option>
          </select>
        </div>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Média</th>
              <th>Frequência</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${data.disciplinas
              .map(
                (d) => `
                  <tr>
                    <td><strong>${d.nome}</strong></td>
                    <td>${d.media.toFixed(1)}</td>
                    <td>${d.freq}%</td>
                    <td>
                      <span class="badge ${d.status === 'Aprovado' ? 'success' : 'warning'}">
                        ${d.status}
                      </span>
                    </td>
                  </tr>
                `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
