
    // Turmas View
    function getTurmasView() {
      return `
        <div class="page-header">
          <h1 class="page-title">Turmas</h1>
          <p class="page-subtitle">Gerencie as turmas da instituição</p>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Lista de Turmas</h2>
            <div class="card-actions">
              <button class="btn-primary-icon" onclick="showToast('Abrindo formulário de nova turma...')">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Nova Turma
              </button>
            </div>
          </div>

          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Turma</th>
                  <th>Ano</th>
                  <th>Turno</th>
                  <th>Alunos</th>
                  <th>Professor Responsável</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>9º A</strong></td>
                  <td>9º ano</td>
                  <td>Manhã</td>
                  <td>30</td>
                  <td>Prof. Santos</td>
                  <td><span class="badge success">Ativa</span></td>
                  <td>
                    <button class="btn-icon" onclick="showToast('Editando turma...')">
                      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><strong>9º B</strong></td>
                  <td>9º ano</td>
                  <td>Tarde</td>
                  <td>28</td>
                  <td>Prof. Silva</td>
                  <td><span class="badge success">Ativa</span></td>
                  <td>
                    <button class="btn-icon" onclick="showToast('Editando turma...')">
                      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><strong>8º A</strong></td>
                  <td>8º ano</td>
                  <td>Manhã</td>
                  <td>32</td>
                  <td>Prof. Lima</td>
                  <td><span class="badge success">Ativa</span></td>
                  <td>
                    <button class="btn-icon" onclick="showToast('Editando turma...')">
                      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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