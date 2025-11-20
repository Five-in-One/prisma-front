
    // Notas View (Teacher)
    function getNotasView() {
      return `
        <div class="page-header">
          <h1 class="page-title">Lançamento de Notas</h1>
          <p class="page-subtitle">Gerencie as notas dos seus alunos</p>
        </div>

        <div class="card">
          <div class="filters">
            <div class="filter-group">
              <label class="filter-label">Turma</label>
              <select class="filter-select">
                <option>9º A</option>
                <option>9º B</option>
                <option>8º A</option>
              </select>
            </div>
            <div class="filter-group">
              <label class="filter-label">Disciplina</label>
              <select class="filter-select">
                <option>Matemática</option>
              </select>
            </div>
            <div class="filter-group">
              <label class="filter-label">Bimestre</label>
              <select class="filter-select">
                <option>1º Bimestre</option>
                <option>2º Bimestre</option>
                <option>3º Bimestre</option>
                <option>4º Bimestre</option>
              </select>
            </div>
          </div>

          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Aluno</th>
                  <th>Avaliação 1</th>
                  <th>Avaliação 2</th>
                  <th>Avaliação 3</th>
                  <th>Avaliação 4</th>
                  <th>Média</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024001</td>
                  <td><strong>Ana Silva</strong></td>
                  <td><input type="number" class="form-input" style="width: 80px; padding: 8px;" value="9.5" min="0" max="10" step="0.1"></td>
                  <td><input type="number" class="form-input" style="width: 80px; padding: 8px;" value="9.0" min="0" max="10" step="0.1"></td>
                  <td><input type="number" class="form-input" style="width: 80px; padding: 8px;" value="9.2" min="0" max="10" step="0.1"></td>
                  <td><input type="number" class="form-input" style="width: 80px; padding: 8px;" value="9.0" min="0" max="10" step="0.1"></td>
                  <td><strong>9.2</strong></td>
                </tr>
                <tr>
                  <td>2024002</td>
                  <td><strong>Bruno Santos</strong></td>
                  <td><input type="number" class="form-input" style="width: 80px; padding: 8px;" value="8.5" min="0" max="10" step="0.1"></td>
                  <td><input type="number" class="form-input" style="width: 80px; padding: 8px;" value="8.8" min="0" max="10" step="0.1"></td>
                  <td><input type="number" class="form-input" style="width: 80px; padding: 8px;" value="8.7" min="0" max="10" step="0.1"></td>
                  <td><input type="number" class="form-input" style="width: 80px; padding: 8px;" value="9.0" min="0" max="10" step="0.1"></td>
                  <td><strong>8.7</strong></td>
                </tr>
                <tr>
                  <td>2024003</td>
                  <td><strong>Carlos Lima</strong></td>
                  <td><input type="number" class="form-input" style="width: 80px; padding: 8px;" value="7.5" min="0" max="10" step="0.1"></td>
                  <td><input type="number" class="form-input" style="width: 80px; padding: 8px;" value="8.0" min="0" max="10" step="0.1"></td>
                  <td><input type="number" class="form-input" style="width: 80px; padding: 8px;" value="7.8" min="0" max="10" step="0.1"></td>
                  <td><input type="number" class="form-input" style="width: 80px; padding: 8px;" placeholder="0.0" min="0" max="10" step="0.1"></td>
                  <td><strong>7.8</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="padding: 24px; border-top: 1px solid #E2E8F0; display: flex; justify-content: flex-end; gap: 12px;">
            <button class="btn-secondary">Cancelar</button>
            <button class="btn-primary-limited" onclick="showToast('Notas salvas com sucesso!')">Salvar Notas</button>
          </div>
        </div>
      `;
    }