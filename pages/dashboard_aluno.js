    // Student Dashboard
    function getStudentDashboard() {
      return `
        <div class="page-header">
          <h1 class="page-title" id="dashboardTitle">Dashboard</h1>
          <p class="page-subtitle">Visão geral do seu desempenho acadêmico</p>
        </div>

        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-icon primary">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">8.5</div>
              <div class="kpi-label">Média Geral</div>
              <div class="kpi-sublabel">2024 - 1º Bimestre</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon success">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">92%</div>
              <div class="kpi-label">Frequência</div>
              <div class="kpi-sublabel">46 de 50 aulas</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon warning">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">3</div>
              <div class="kpi-label">Atividades Pendentes</div>
              <div class="kpi-sublabel">Prazo próximo</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon info">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">12</div>
              <div class="kpi-label">Medalhas Conquistadas</div>
              <div class="kpi-sublabel">85% do total</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Desempenho por Disciplina</h2>
            <div class="card-actions">
              <select class="filter-select" style="width: auto;">
                <option>2024 - 1º Bimestre</option>
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
                <tr>
                  <td><strong>Matemática</strong></td>
                  <td>9.2</td>
                  <td>95%</td>
                  <td><span class="badge success">Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>Português</strong></td>
                  <td>8.7</td>
                  <td>92%</td>
                  <td><span class="badge success">Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>História</strong></td>
                  <td>8.0</td>
                  <td>88%</td>
                  <td><span class="badge success">Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>Geografia</strong></td>
                  <td>8.5</td>
                  <td>90%</td>
                  <td><span class="badge success">Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>Ciências</strong></td>
                  <td>9.0</td>
                  <td>96%</td>
                  <td><span class="badge success">Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>Inglês</strong></td>
                  <td>7.8</td>
                  <td>85%</td>
                  <td><span class="badge warning">Em andamento</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }