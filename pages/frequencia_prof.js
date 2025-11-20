  // Frequência View (Teacher)
    function getFrequenciaView() {
      return `
        <div class="page-header">
          <h1 class="page-title">Registro de Frequência</h1>
          <p class="page-subtitle">Marque presença, faltas e atrasos</p>
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
              <label class="filter-label">Data</label>
              <input type="date" class="filter-select" value="2024-03-22">
            </div>
          </div>

          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Aluno</th>
                  <th style="text-align: center;">Presente</th>
                  <th style="text-align: center;">Falta</th>
                  <th style="text-align: center;">Atraso</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024001</td>
                  <td><strong>Ana Silva</strong></td>
                  <td style="text-align: center;">
                    <input type="radio" name="freq_001" value="presente" checked style="width: 20px; height: 20px; cursor: pointer;">
                  </td>
                  <td style="text-align: center;">
                    <input type="radio" name="freq_001" value="falta" style="width: 20px; height: 20px; cursor: pointer;">
                  </td>
                  <td style="text-align: center;">
                    <input type="radio" name="freq_001" value="atraso" style="width: 20px; height: 20px; cursor: pointer;">
                  </td>
                </tr>
                <tr>
                  <td>2024002</td>
                  <td><strong>Bruno Santos</strong></td>
                  <td style="text-align: center;">
                    <input type="radio" name="freq_002" value="presente" checked style="width: 20px; height: 20px; cursor: pointer;">
                  </td>
                  <td style="text-align: center;">
                    <input type="radio" name="freq_002" value="falta" style="width: 20px; height: 20px; cursor: pointer;">
                  </td>
                  <td style="text-align: center;">
                    <input type="radio" name="freq_002" value="atraso" style="width: 20px; height: 20px; cursor: pointer;">
                  </td>
                </tr>
                <tr>
                  <td>2024003</td>
                  <td><strong>Carlos Lima</strong></td>
                  <td style="text-align: center;">
                    <input type="radio" name="freq_003" value="presente" style="width: 20px; height: 20px; cursor: pointer;">
                  </td>
                  <td style="text-align: center;">
                    <input type="radio" name="freq_003" value="falta" checked style="width: 20px; height: 20px; cursor: pointer;">
                  </td>
                  <td style="text-align: center;">
                    <input type="radio" name="freq_003" value="atraso" style="width: 20px; height: 20px; cursor: pointer;">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="padding: 24px; border-top: 1px solid #E2E8F0;">
            <div style="display: flex; gap: 32px; margin-bottom: 24px;">
              <div>
                <span style="font-size: 14px; color: #475569;">Presentes: </span>
                <strong style="color: #22C55E;">28</strong>
              </div>
              <div>
                <span style="font-size: 14px; color: #475569;">Faltas: </span>
                <strong style="color: #EF4444;">1</strong>
              </div>
              <div>
                <span style="font-size: 14px; color: #475569;">Atrasos: </span>
                <strong style="color: #F59E0B;">1</strong>
              </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 12px;">
              <button class="btn-secondary">Cancelar</button>
              <button class="btn-primary-limited" onclick="showToast('Frequência registrada com sucesso!')">Salvar Frequência</button>
            </div>
          </div>
        </div>
      `;
    }