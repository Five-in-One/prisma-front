  // Teacher Dashboard
    function getTeacherDashboard() {
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
              <div class="kpi-value">5</div>
              <div class="kpi-label">Turmas Ativas</div>
              <div class="kpi-sublabel">142 alunos total</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon success">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">18</div>
              <div class="kpi-label">Atividades Publicadas</div>
              <div class="kpi-sublabel">Este mês</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon warning">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">78%</div>
              <div class="kpi-label">Progresso de Lançamentos</div>
              <div class="kpi-sublabel">Notas e frequência</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon info">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">12</div>
              <div class="kpi-label">Planos de Aula</div>
              <div class="kpi-sublabel">3 pendentes de revisão</div>
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
                <tr>
                  <td><strong>9º A</strong></td>
                  <td>Matemática</td>
                  <td>4/5</td>
                  <td>28/30</td>
                  <td>100%</td>
                  <td><span class="badge success">Em dia</span></td>
                </tr>
                <tr>
                  <td><strong>9º B</strong></td>
                  <td>Matemática</td>
                  <td>3/5</td>
                  <td>25/28</td>
                  <td>89%</td>
                  <td><span class="badge warning">Atrasado</span></td>
                </tr>
                <tr>
                  <td><strong>8º A</strong></td>
                  <td>Matemática</td>
                  <td>5/5</td>
                  <td>32/32</td>
                  <td>100%</td>
                  <td><span class="badge success">Em dia</span></td>
                </tr>
                <tr>
                  <td><strong>8º B</strong></td>
                  <td>Matemática</td>
                  <td>4/5</td>
                  <td>26/30</td>
                  <td>87%</td>
                  <td><span class="badge warning">Atrasado</span></td>
                </tr>
                <tr>
                  <td><strong>7º A</strong></td>
                  <td>Matemática</td>
                  <td>5/5</td>
                  <td>22/22</td>
                  <td>100%</td>
                  <td><span class="badge success">Em dia</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }