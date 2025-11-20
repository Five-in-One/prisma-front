
    // Medalhas View
    function getMedalhasView() {
      return `
        <div class="page-header">
          <h1 class="page-title">Medalhas</h1>
          <p class="page-subtitle">Suas conquistas e progresso</p>
        </div>

        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-icon success">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">12</div>
              <div class="kpi-label">Medalhas Conquistadas</div>
              <div class="kpi-sublabel">De 14 disponíveis</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon primary">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="kpi-content">
              <div class="kpi-value">85%</div>
              <div class="kpi-label">Taxa de Conquista</div>
              <div class="kpi-sublabel">Acima da média</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Conquistas Recentes</h2>
          </div>
          <div class="activity-grid">
            <div class="activity-card">
              <div class="activity-info">
                <div class="activity-title">🏆 Excelência em Matemática</div>
                <div class="activity-meta">
                  <span>Conquistada em 20/03/2024</span>
                </div>
                <p style="font-size: 14px; color: #475569; margin-top: 8px;">Obteve média acima de 9.0 em todas as avaliações de Matemática do bimestre.</p>
              </div>
            </div>

            <div class="activity-card">
              <div class="activity-info">
                <div class="activity-title">⭐ Frequência Exemplar</div>
                <div class="activity-meta">
                  <span>Conquistada em 15/03/2024</span>
                </div>
                <p style="font-size: 14px; color: #475569; margin-top: 8px;">Manteve 100% de presença durante todo o bimestre.</p>
              </div>
            </div>

            <div class="activity-card">
              <div class="activity-info">
                <div class="activity-title">📚 Leitor Assíduo</div>
                <div class="activity-meta">
                  <span>Conquistada em 10/03/2024</span>
                </div>
                <p style="font-size: 14px; color: #475569; margin-top: 8px;">Completou a leitura de 5 livros do programa de leitura.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Metas em Progresso</h2>
          </div>
          <div style="padding: 24px;">
            <div style="margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #0F172A;">🎯 Participação Ativa</span>
                <span style="font-size: 14px; color: #475569;">7/10 participações</span>
              </div>
              <div style="height: 8px; background: #E2E8F0; border-radius: 8px; overflow: hidden;">
                <div style="height: 100%; width: 70%; background: #4F46E5; border-radius: 8px;"></div>
              </div>
            </div>

            <div style="margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #0F172A;">💯 Nota Máxima</span>
                <span style="font-size: 14px; color: #475569;">2/3 notas 10</span>
              </div>
              <div style="height: 8px; background: #E2E8F0; border-radius: 8px; overflow: hidden;">
                <div style="height: 100%; width: 66%; background: #22C55E; border-radius: 8px;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #0F172A;">🌟 Destaque do Mês</span>
                <span style="font-size: 14px; color: #475569;">Em progresso</span>
              </div>
              <div style="height: 8px; background: #E2E8F0; border-radius: 8px; overflow: hidden;">
                <div style="height: 100%; width: 45%; background: #F59E0B; border-radius: 8px;"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }