const HISTORICO_CACHE_KEY = 'studentHistorico:v1';

function getHistoricoData() {
  const cached = localStorage.getItem(HISTORICO_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler histórico do cache:', e);
    }
  }

  // Dados iniciais (mock)
  const initialData = {
    ano: '2024',
    mediasBimestre: [
      {
        id: 'b1',
        labelCurto: '1º Bim',
        mediaGeral: 8.2,
        tipo: 'normal'
      },
      {
        id: 'b2',
        labelCurto: '2º Bim',
        mediaGeral: 8.4,
        tipo: 'normal'
      },
      {
        id: 'b3',
        labelCurto: '3º Bim',
        mediaGeral: 8.6,
        tipo: 'normal'
      },
      {
        id: 'atual',
        labelCurto: 'Atual',
        mediaGeral: 8.5,
        tipo: 'atual' // usa cor verdinha
      }
    ],
    destaquesAno: [
      {
        id: 'marco-2024',
        mesLabel: 'Março 2024',
        titulo: 'Melhor Nota em Matemática',
        descricao: 'Obteve nota 10.0 na avaliação de Álgebra.',
        corPonto: '#4F46E5'
      },
      {
        id: 'fevereiro-2024',
        mesLabel: 'Fevereiro 2024',
        titulo: 'Frequência Perfeita',
        descricao: '100% de presença no mês.',
        corPonto: '#22C55E'
      },
      {
        id: 'janeiro-2024',
        mesLabel: 'Janeiro 2024',
        titulo: 'Início do Ano Letivo',
        descricao: 'Matrícula confirmada para 2024.',
        corPonto: '#F59E0B'
      }
    ]
  };

  localStorage.setItem(HISTORICO_CACHE_KEY, JSON.stringify(initialData));
  return initialData;
}

function updateHistoricoData(newData) {
  localStorage.setItem(HISTORICO_CACHE_KEY, JSON.stringify(newData));
}

// Histórico View
function getHistoricoView() {
  const data = getHistoricoData();

  const medias = data.mediasBimestre || [];
  const maxMedia = medias.length
    ? Math.max(...medias.map(m => m.mediaGeral || 0))
    : 10;

  const minAltura = 140;
  const maxAltura = 260;

  const barrasHtml = medias.map(m => {
    const altura = Math.round(
      minAltura + (m.mediaGeral / maxMedia) * (maxAltura - minAltura)
    );

    const gradient =
      m.tipo === 'atual'
        ? 'linear-gradient(to top, #22C55E, #4ADE80)'
        : 'linear-gradient(to top, #4F46E5, #6366F1)';

    return `
      <div style="
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      ">
        <div style="
          width: 100%;
          height: ${altura}px;
          background: ${gradient};
          border-radius: 12px 12px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 24px;
        ">
          ${m.mediaGeral.toFixed(1)}
        </div>
        <span style="
          font-size: 14px;
          font-weight: 600;
          color: #475569;
        ">
          ${m.labelCurto}
        </span>
      </div>
    `;
  }).join('');

  const timelineHtml = (data.destaquesAno || []).map(item => `
    <div style="position: relative; margin-bottom: 32px;">
      <div style="
        position: absolute;
        left: -20px;
        top: 1px;
        width: 16px;
        height: 16px;
        background: ${item.corPonto || '#4F46E5'};
        border-radius: 50%;
        border: 3px solid #FFFFFF;
      "></div>

      <div>
        <div style="
          font-size: 12px;
          color: #94A3B8;
          margin-bottom: 4px;
        ">
          ${item.mesLabel}
        </div>

        <div style="
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 8px;
        ">
          ${item.titulo}
        </div>

        <div style="
          font-size: 14px;
          color: #475569;
        ">
          ${item.descricao}
        </div>
      </div>
    </div>
  `).join('');

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
        <div style="
          height: 300px;
          display: flex;
          align-items: flex-end;
          gap: 24px;
          justify-content: space-around;
        ">
          ${barrasHtml}
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Destaques do Ano</h2>
      </div>
      <div style="padding: 24px;">
        <div style="
          border-left: 3px solid #E2E8F0;
          padding-left: 24px;
          position: relative;
        ">
          ${timelineHtml}
        </div>
      </div>
    </div>
  `;
}
