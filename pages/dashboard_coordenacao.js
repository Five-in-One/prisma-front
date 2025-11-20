
    // Coordinator Dashboard
    function getCoordinatorDashboard() {
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
              <div class="kpi-value">24</div>
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
              <div class="kpi-value">486</div>
              <div class="kpi-label">Alunos Matriculados</div>
              <div class="kpi-sublabel">Ano letivo 2024</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon warning">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">18</div>
              <div class="kpi-label">Turmas</div>
              <div class="kpi-sublabel">6º ao 9º ano</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon info">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">7</div>
              <div class="kpi-label">Notificações Pendentes</div>
              <div class="kpi-sublabel">Requerem atenção</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Desempenho por Turma</h2>
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
                <tr>
                  <td><strong>9º A</strong></td>
                  <td>Prof. Santos</td>
                  <td>8.7</td>
                  <td>94%</td>
                  <td>18/20</td>
                  <td><span class="badge success">Em dia</span></td>
                </tr>
                <tr>
                  <td><strong>9º B</strong></td>
                  <td>Prof. Silva</td>
                  <td>8.2</td>
                  <td>89%</td>
                  <td>15/20</td>
                  <td><span class="badge warning">Atrasado</span></td>
                </tr>
                <tr>
                  <td><strong>8º A</strong></td>
                  <td>Prof. Lima</td>
                  <td>8.9</td>
                  <td>96%</td>
                  <td>20/20</td>
                  <td><span class="badge success">Em dia</span></td>
                </tr>
                <tr>
                  <td><strong>8º B</strong></td>
                  <td>Prof. Costa</td>
                  <td>8.4</td>
                  <td>91%</td>
                  <td>17/20</td>
                  <td><span class="badge success">Em dia</span></td>
                </tr>
                <tr>
                  <td><strong>7º A</strong></td>
                  <td>Prof. Oliveira</td>
                  <td>8.6</td>
                  <td>93%</td>
                  <td>19/20</td>
                  <td><span class="badge success">Em dia</span></td>
                </tr>
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
                  <div class="kpi-value">87%</div>
                  <div class="kpi-label">Aprovados</div>
                  <div class="kpi-sublabel">52 de 60 planos</div>
                </div>
              </div>

              <div class="kpi-card" style="margin: 0;">
                <div class="kpi-icon warning">
                  <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="kpi-content">
                  <div class="kpi-value">8</div>
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
                  <div class="kpi-value">60</div>
                  <div class="kpi-label">Total do Mês</div>
                  <div class="kpi-sublabel">Março 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }