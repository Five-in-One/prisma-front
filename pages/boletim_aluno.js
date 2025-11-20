
    // Boletim View
    function getBoletimView() {
      return `
        <div class="page-header">
          <h1 class="page-title">Boletim Escolar</h1>
          <p class="page-subtitle">Consulte suas notas e desempenho</p>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Notas por Disciplina</h2>
            <div class="card-actions">
              <select class="filter-select" style="width: auto; margin-right: 8px;">
                <option>2024</option>
                <option>2023</option>
              </select>
              <select class="filter-select" style="width: auto; margin-right: 8px;">
                <option>1º Bimestre</option>
                <option>2º Bimestre</option>
                <option>3º Bimestre</option>
                <option>4º Bimestre</option>
              </select>
              <button class="btn-secondary" onclick="showToast('Exportando boletim em PDF...')">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar PDF
              </button>
            </div>
          </div>
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Avaliação 1</th>
                  <th>Avaliação 2</th>
                  <th>Avaliação 3</th>
                  <th>Avaliação 4</th>
                  <th>Média</th>
                  <th>Situação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Matemática</strong></td>
                  <td>9.5</td>
                  <td>9.0</td>
                  <td>9.2</td>
                  <td>9.0</td>
                  <td><strong>9.2</strong></td>
                  <td><span class="badge success">Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>Português</strong></td>
                  <td>8.5</td>
                  <td>8.8</td>
                  <td>8.7</td>
                  <td>9.0</td>
                  <td><strong>8.7</strong></td>
                  <td><span class="badge success">Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>História</strong></td>
                  <td>8.0</td>
                  <td>7.8</td>
                  <td>8.2</td>
                  <td>8.0</td>
                  <td><strong>8.0</strong></td>
                  <td><span class="badge success">Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>Geografia</strong></td>
                  <td>8.5</td>
                  <td>8.3</td>
                  <td>8.7</td>
                  <td>8.5</td>
                  <td><strong>8.5</strong></td>
                  <td><span class="badge success">Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>Ciências</strong></td>
                  <td>9.0</td>
                  <td>9.2</td>
                  <td>8.8</td>
                  <td>9.0</td>
                  <td><strong>9.0</strong></td>
                  <td><span class="badge success">Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>Inglês</strong></td>
                  <td>7.5</td>
                  <td>8.0</td>
                  <td>7.8</td>
                  <td>-</td>
                  <td><strong>7.8</strong></td>
                  <td><span class="badge warning">Em andamento</span></td>
                </tr>
                <tr>
                  <td><strong>Educação Física</strong></td>
                  <td>10.0</td>
                  <td>10.0</td>
                  <td>9.5</td>
                  <td>10.0</td>
                  <td><strong>9.9</strong></td>
                  <td><span class="badge success">Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>Artes</strong></td>
                  <td>9.0</td>
                  <td>8.5</td>
                  <td>9.0</td>
                  <td>8.8</td>
                  <td><strong>8.8</strong></td>
                  <td><span class="badge success">Aprovado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }