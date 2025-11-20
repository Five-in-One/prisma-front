// Teacher Activities View
function getTeacherAtividades() {
    return `
        <div class="page-header">
          <h1 class="page-title">Atividades</h1>
          <p class="page-subtitle">Gerencie as atividades das suas turmas</p>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Minhas Atividades</h2>
            <div class="card-actions">
              <button class="btn-primary-icon" onclick="showToast('Abrindo formulário de nova atividade...')">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Nova Atividade
              </button>
            </div>
          </div>

          <div class="filters">
            <div class="filter-group">
              <label class="filter-label">Turma</label>
              <select class="filter-select">
                <option>Todas as turmas</option>
                <option>9º A</option>
                <option>9º B</option>
                <option>8º A</option>
              </select>
            </div>
            <div class="filter-group">
              <label class="filter-label">Status</label>
              <select class="filter-select">
                <option>Todos</option>
                <option>Publicado</option>
                <option>Rascunho</option>
                <option>Agendado</option>
              </select>
            </div>
          </div>

          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Turma</th>
                  <th>Data de Entrega</th>
                  <th>Entregas</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Exercícios de Álgebra - Capítulo 5</strong></td>
                  <td>9º A</td>
                  <td>25/03/2024</td>
                  <td>18/30</td>
                  <td><span class="badge success">Publicado</span></td>
                  <td>
                    <button class="btn-icon" onclick="showToast('Editando atividade...')">
                      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><strong>Lista de Geometria Espacial</strong></td>
                  <td>9º B</td>
                  <td>27/03/2024</td>
                  <td>0/28</td>
                  <td><span class="badge neutral">Rascunho</span></td>
                  <td>
                    <button class="btn-icon" onclick="showToast('Editando atividade...')">
                      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><strong>Trabalho sobre Funções</strong></td>
                  <td>8º A</td>
                  <td>30/03/2024</td>
                  <td>32/32</td>
                  <td><span class="badge success">Publicado</span></td>
                  <td>
                    <button class="btn-icon" onclick="showToast('Editando atividade...')">
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