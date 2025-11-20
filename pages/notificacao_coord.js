  // Notificações View
    function getNotificacoesView() {
      return `
        <div class="page-header">
          <h1 class="page-title">Notificações</h1>
          <p class="page-subtitle">Acompanhe avisos e alertas importantes</p>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Feed de Notificações</h2>
            <div class="card-actions">
              <button class="btn-secondary" onclick="showToast('Todas as notificações marcadas como lidas')">Marcar todas como lidas</button>
            </div>
          </div>

          <div class="activity-grid">
            <div class="activity-card" style="border-left: 4px solid #EF4444;">
              <div class="activity-info">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span class="badge error">Urgente</span>
                  <span style="font-size: 13px; color: #94A3B8;">Há 2 horas</span>
                </div>
                <div class="activity-title">Plano de Aula Reprovado</div>
                <p style="font-size: 14px; color: #475569; margin-top: 8px;">O plano de aula "Geometria Espacial" do Prof. Santos foi reprovado. Requer revisão urgente.</p>
              </div>
              <div class="activity-actions">
                <button class="btn-small primary" onclick="showToast('Abrindo detalhes...')">Ver detalhes</button>
              </div>
            </div>

            <div class="activity-card" style="border-left: 4px solid #F59E0B;">
              <div class="activity-info">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span class="badge warning">Normal</span>
                  <span style="font-size: 13px; color: #94A3B8;">Há 5 horas</span>
                </div>
                <div class="activity-title">Novo Plano Aguardando Aprovação</div>
                <p style="font-size: 14px; color: #475569; margin-top: 8px;">Prof. Silva enviou novo plano de aula para a turma 8º A.</p>
              </div>
              <div class="activity-actions">
                <button class="btn-small primary" onclick="showToast('Abrindo detalhes...')">Ver detalhes</button>
              </div>
            </div>

            <div class="activity-card" style="border-left: 4px solid #3B82F6;">
              <div class="activity-info">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span class="badge info">Normal</span>
                  <span style="font-size: 13px; color: #94A3B8;">Ontem</span>
                </div>
                <div class="activity-title">Relatório Mensal Disponível</div>
                <p style="font-size: 14px; color: #475569; margin-top: 8px;">O relatório de desempenho de março está disponível para consulta.</p>
              </div>
              <div class="activity-actions">
                <button class="btn-small secondary" onclick="showToast('Baixando relatório...')">Baixar</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }