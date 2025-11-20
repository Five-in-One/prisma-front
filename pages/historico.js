
    // Histórico View
    function getHistoricoView() {
      return `
        <div class="page-header">
          <h1 class="page-title">Histórico</h1>
          <p class="page-subtitle">Evolução do seu desempenho ao longo do tempo</p>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Evolução de Notas por Bimestre</h2>
          </div>
          <div style="padding: 32px;">
            <div style="height: 300px; display: flex; align-items: flex-end; gap: 24px; justify-content: space-around;">
              <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div style="width: 100%; height: 200px; background: linear-gradient(to top, #4F46E5, #6366F1); border-radius: 12px 12px 0 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 24px;">8.2</div>
                <span style="font-size: 14px; font-weight: 600; color: #475569;">1º Bim</span>
              </div>
              <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div style="width: 100%; height: 220px; background: linear-gradient(to top, #4F46E5, #6366F1); border-radius: 12px 12px 0 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 24px;">8.4</div>
                <span style="font-size: 14px; font-weight: 600; color: #475569;">2º Bim</span>
              </div>
              <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div style="width: 100%; height: 240px; background: linear-gradient(to top, #4F46E5, #6366F1); border-radius: 12px 12px 0 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 24px;">8.6</div>
                <span style="font-size: 14px; font-weight: 600; color: #475569;">3º Bim</span>
              </div>
              <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div style="width: 100%; height: 260px; background: linear-gradient(to top, #22C55E, #4ADE80); border-radius: 12px 12px 0 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 24px;">8.5</div>
                <span style="font-size: 14px; font-weight: 600; color: #475569;">Atual</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Destaques do Ano</h2>
          </div>
          <div style="padding: 24px;">
            <div style="border-left: 3px solid #4F46E5; padding-left: 24px; position: relative;">
              <div style="position: absolute; left: -9px; top: 0; width: 16px; height: 16px; background: #4F46E5; border-radius: 50%; border: 3px solid #FFFFFF;"></div>
              <div style="margin-bottom: 32px;">
                <div style="font-size: 12px; color: #94A3B8; margin-bottom: 4px;">Março 2024</div>
                <div style="font-weight: 600; color: #0F172A; margin-bottom: 8px;">Melhor Nota em Matemática</div>
                <div style="font-size: 14px; color: #475569;">Obteve nota 10.0 na avaliação de Álgebra</div>
              </div>

              <div style="position: absolute; left: -9px; top: 100px; width: 16px; height: 16px; background: #22C55E; border-radius: 50%; border: 3px solid #FFFFFF;"></div>
              <div style="margin-bottom: 32px;">
                <div style="font-size: 12px; color: #94A3B8; margin-bottom: 4px;">Fevereiro 2024</div>
                <div style="font-weight: 600; color: #0F172A; margin-bottom: 8px;">Frequência Perfeita</div>
                <div style="font-size: 14px; color: #475569;">100% de presença no mês</div>
              </div>

              <div style="position: absolute; left: -9px; top: 200px; width: 16px; height: 16px; background: #F59E0B; border-radius: 50%; border: 3px solid #FFFFFF;"></div>
              <div>
                <div style="font-size: 12px; color: #94A3B8; margin-bottom: 4px;">Janeiro 2024</div>
                <div style="font-weight: 600; color: #0F172A; margin-bottom: 8px;">Início do Ano Letivo</div>
                <div style="font-size: 14px; color: #475569;">Matrícula confirmada para 2024</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }