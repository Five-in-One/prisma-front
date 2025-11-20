
    // Usuários View
    function getUsuariosView() {
      return `
        <div class="page-header">
          <h1 class="page-title">Usuários</h1>
          <p class="page-subtitle">Gerencie professores, alunos e coordenadores</p>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Lista de Usuários</h2>
            <div class="card-actions">
              <button class="btn-primary-icon" onclick="showToast('Abrindo formulário de novo usuário...')">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Novo Usuário
              </button>
            </div>
          </div>

          <div class="filters">
            <div class="filter-group">
              <label class="filter-label">Tipo</label>
              <select class="filter-select">
                <option>Todos</option>
                <option>Professor</option>
                <option>Aluno</option>
                <option>Coordenação</option>
              </select>
            </div>
            <div class="filter-group">
              <label class="filter-label">Status</label>
              <select class="filter-select">
                <option>Todos</option>
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
            </div>
          </div>

          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Tipo</th>
                  <th>Turma/Disciplina</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Prof. Santos</strong></td>
                  <td>santos@escola.com</td>
                  <td><span class="badge info">Professor</span></td>
                  <td>Matemática</td>
                  <td><span class="badge success">Ativo</span></td>
                  <td>
                    <button class="btn-icon" onclick="showToast('Editando usuário...')">
                      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><strong>Ana Silva</strong></td>
                  <td>ana.silva@escola.com</td>
                  <td><span class="badge neutral">Aluno</span></td>
                  <td>9º A</td>
                  <td><span class="badge success">Ativo</span></td>
                  <td>
                    <button class="btn-icon" onclick="showToast('Editando usuário...')">
                      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><strong>Coord. Lima</strong></td>
                  <td>lima@escola.com</td>
                  <td><span class="badge warning">Coordenação</span></td>
                  <td>Geral</td>
                  <td><span class="badge success">Ativo</span></td>
                  <td>
                    <button class="btn-icon" onclick="showToast('Editando usuário...')">
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