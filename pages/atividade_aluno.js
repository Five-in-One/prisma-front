  // Student Activities View
    function getStudentAtividades() {
      return `
        <div class="page-header">
          <h1 class="page-title">Atividades</h1>
          <p class="page-subtitle">Acompanhe suas tarefas e entregas</p>
        </div>

        <div class="card">
          <div class="tabs">
            <button class="tab active" onclick="switchTab(event, 'pendentes')">Pendentes (3)</button>
            <button class="tab" onclick="switchTab(event, 'entregues')">Entregues (15)</button>
          </div>

          <div id="pendentes" class="activity-grid">
            <div class="activity-card">
              <div class="activity-info">
                <div class="activity-title">Exercícios de Álgebra - Capítulo 5</div>
                <div class="activity-meta">
                  <span>📚 Matemática</span>
                  <span>📅 Prazo: 25/03/2024</span>
                </div>
                <span class="badge warning">Pendente</span>
              </div>
              <div class="activity-actions">
                <button class="btn-small primary" onclick="showToast('Abrindo detalhes da atividade...')">Ver detalhes</button>
              </div>
            </div>

            <div class="activity-card">
              <div class="activity-info">
                <div class="activity-title">Redação: Análise de Texto Literário</div>
                <div class="activity-meta">
                  <span>📝 Português</span>
                  <span>📅 Prazo: 28/03/2024</span>
                </div>
                <span class="badge warning">Pendente</span>
              </div>
              <div class="activity-actions">
                <button class="btn-small primary" onclick="showToast('Abrindo detalhes da atividade...')">Ver detalhes</button>
              </div>
            </div>

            <div class="activity-card">
              <div class="activity-info">
                <div class="activity-title">Pesquisa sobre Revolução Industrial</div>
                <div class="activity-meta">
                  <span>🌍 História</span>
                  <span>📅 Prazo: 30/03/2024</span>
                </div>
                <span class="badge warning">Pendente</span>
              </div>
              <div class="activity-actions">
                <button class="btn-small primary" onclick="showToast('Abrindo detalhes da atividade...')">Ver detalhes</button>
              </div>
            </div>
          </div>

          <div id="entregues" class="activity-grid" style="display: none;">
            <div class="activity-card">
              <div class="activity-info">
                <div class="activity-title">Trabalho sobre Fotossíntese</div>
                <div class="activity-meta">
                  <span>🔬 Ciências</span>
                  <span>📅 Entregue: 20/03/2024</span>
                  <span>⭐ Nota: 9.5</span>
                </div>
                <span class="badge success">Entregue</span>
              </div>
              <div class="activity-actions">
                <button class="btn-small secondary" onclick="showToast('Abrindo detalhes da atividade...')">Ver detalhes</button>
              </div>
            </div>

            <div class="activity-card">
              <div class="activity-info">
                <div class="activity-title">Lista de Exercícios - Geometria</div>
                <div class="activity-meta">
                  <span>📚 Matemática</span>
                  <span>📅 Entregue: 18/03/2024</span>
                  <span>⭐ Nota: 10.0</span>
                </div>
                <span class="badge success">Entregue</span>
              </div>
              <div class="activity-actions">
                <button class="btn-small secondary" onclick="showToast('Abrindo detalhes da atividade...')">Ver detalhes</button>
              </div>
            </div>

            <div class="activity-card">
              <div class="activity-info">
                <div class="activity-title">Interpretação de Texto</div>
                <div class="activity-meta">
                  <span>📝 Português</span>
                  <span>📅 Entregue: 15/03/2024</span>
                  <span>⭐ Nota: 8.5</span>
                </div>
                <span class="badge success">Entregue</span>
              </div>
              <div class="activity-actions">
                <button class="btn-small secondary" onclick="showToast('Abrindo detalhes da atividade...')">Ver detalhes</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
