
    // Teacher Plano View
    function getTeacherPlanoView() {
      return `
        <div class="page-header">
          <h1 class="page-title">Plano de Aula</h1>
          <p class="page-subtitle">Crie e gerencie seus planos de aula</p>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Meus Planos de Aula</h2>
            <div class="card-actions">
              <button class="btn-primary-icon" onclick="showToast('Abrindo formulário de novo plano...')">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <p>Novo Plano</p>
              </button>
            </div>
          </div>

          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Turma</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Introdução à Álgebra Linear</strong></td>
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
                <tr>
                  <td><strong>Geometria Espacial - Prismas</strong></td>
                  <td>9º B</td>
                  <td>27/03/2024</td>
                  <td><span class="badge warning">Pendente</span></td>
                  <td>
                    <button class="btn-icon" onclick="showToast('Editando plano...')">
                      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><strong>Funções Quadráticas</strong></td>
                  <td>8º A</td>
                  <td>30/03/2024</td>
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