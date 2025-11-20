    // Coordinator Plano View
    function getCoordinatorPlanoView() {
      return `
        <div class="page-header">
          <h1 class="page-title">Planos de Aula</h1>
          <p class="page-subtitle">Acompanhe e aprove os planos dos professores</p>
        </div>

        <div class="card">
          <div class="filters">
            <div class="filter-group">
              <label class="filter-label">Professor</label>
              <select class="filter-select">
                <option>Todos</option>
                <option>Prof. Santos</option>
                <option>Prof. Silva</option>
                <option>Prof. Lima</option>
              </select>
            </div>
            <div class="filter-group">
              <label class="filter-label">Turma</label>
              <select class="filter-select">
                <option>Todas</option>
                <option>9º A</option>
                <option>9º B</option>
                <option>8º A</option>
              </select>
            </div>
            <div class="filter-group">
              <label class="filter-label">Status</label>
              <select class="filter-select">
                <option>Todos</option>
                <option>Pendente</option>
                <option>Aprovado</option>
                <option>Reprovado</option>
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
                <tr>
                  <td><strong>Geometria Espacial - Prismas</strong></td>
                  <td>Prof. Santos</td>
                  <td>9º B</td>
                  <td>27/03/2024</td>
                  <td><span class="badge warning">Pendente</span></td>
                  <td>
                    <button class="btn-small primary" onclick="showToast('Abrindo plano para revisão...')">Revisar</button>
                  </td>
                </tr>
                <tr>
                  <td><strong>Revolução Industrial</strong></td>
                  <td>Prof. Silva</td>
                  <td>8º A</td>
                  <td>28/03/2024</td>
                  <td><span class="badge warning">Pendente</span></td>
                  <td>
                    <button class="btn-small primary" onclick="showToast('Abrindo plano para revisão...')">Revisar</button>
                  </td>
                </tr>
                <tr>
                  <td><strong>Introdução à Álgebra Linear</strong></td>
                  <td>Prof. Santos</td>
                  <td>9º A</td>
                  <td>25/03/2024</td>
                  <td><span class="badge success">Aprovado</span></td>
                  <td>
                    <button class="btn-icon" onclick="showToast('Visualizando plano...')">
                      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }