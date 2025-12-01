const MEDALHAS_CACHE_KEY = 'studentMedalhas:v1';

function getMedalhasData() {
  const cached = localStorage.getItem(MEDALHAS_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler medalhas do cache:', e);
    }
  }

  // Dados iniciais (mock)
  const initialData = {
    totalConquistadas: 12,
    totalDisponiveis: 14,
    taxaConquista: 0.85, // 85%
    taxaTexto: 'Acima da média',
    conquistasRecentes: [
      {
        id: 'excelencia-matematica',
        titulo: 'Excelência em Matemática',
        icone: '🏆',
        dataConquistaLabel: '20/03/2024',
        descricaoCurta: 'Obteve média acima de 9.0 em todas as avaliações de Matemática do bimestre.',
        descricaoDetalhada: 'Durante todo o bimestre, você manteve um desempenho excepcional em Matemática, com média acima de 9.0 em todas as avaliações, demonstrando domínio de conteúdos de álgebra, geometria e problemas contextualizados.',
        categoria: 'Desempenho Acadêmico',
        nivel: 'Ouro',
        pontos: 150,
        proximaMetaTexto: 'Mantenha a média acima de 9.0 por dois bimestres consecutivos para desbloquear a medalha “Mestre da Matemática”.'
      },
      {
        id: 'frequencia-exemplar',
        titulo: 'Frequência Exemplar',
        icone: '⭐',
        dataConquistaLabel: '15/03/2024',
        descricaoCurta: 'Manteve 100% de presença durante todo o bimestre.',
        descricaoDetalhada: 'Você compareceu a todas as aulas do bimestre, sem faltas, demonstrando compromisso, responsabilidade e dedicação ao aprendizado.',
        categoria: 'Participação',
        nivel: 'Prata',
        pontos: 100,
        proximaMetaTexto: 'Mantenha 100% de presença por dois bimestres para conquistar a medalha “Presença Impecável”.'
      },
      {
        id: 'leitor-assiduo',
        titulo: 'Leitor Assíduo',
        icone: '📚',
        dataConquistaLabel: '10/03/2024',
        descricaoCurta: 'Completou a leitura de 5 livros do programa de leitura.',
        descricaoDetalhada: 'Você concluiu a leitura de 5 livros indicados no programa de leitura, ampliando seu repertório cultural e sua capacidade de interpretação de textos.',
        categoria: 'Leitura',
        nivel: 'Bronze',
        pontos: 80,
        proximaMetaTexto: 'Leia mais 3 livros para desbloquear a medalha “Maratonista da Leitura”.'
      }
    ],
    metasProgresso: [
      {
        id: 'participacao-ativa',
        titulo: 'Participação Ativa',
        icone: '🎯',
        atual: 7,
        objetivo: 10,
        percentual: 70,
        progressoTexto: '7/10 participações',
        cor: 'primary'
      },
      {
        id: 'nota-maxima',
        titulo: 'Nota Máxima',
        icone: '💯',
        atual: 2,
        objetivo: 3,
        percentual: 66,
        progressoTexto: '2/3 notas 10',
        cor: 'success'
      },
      {
        id: 'destaque-mes',
        titulo: 'Destaque do Mês',
        icone: '🌟',
        atual: 45,
        objetivo: 100,
        percentual: 45,
        progressoTexto: 'Em progresso',
        cor: 'warning'
      }
    ]
  };

  localStorage.setItem(MEDALHAS_CACHE_KEY, JSON.stringify(initialData));
  return initialData;
}

function updateMedalhasData(newData) {
  localStorage.setItem(MEDALHAS_CACHE_KEY, JSON.stringify(newData));
}

function openMedalModal(medalId) {
  const data = getMedalhasData();
  const medalha = data.conquistasRecentes.find(m => m.id === medalId);
  if (!medalha) {
    console.warn('Medalha não encontrada:', medalId);
    return;
  }

  const modal = document.getElementById('medalhaDetalheModal');
  if (!modal) return;

  const titleEl = document.getElementById('medalhaModalTitle');
  const badgeEl = document.getElementById('medalhaModalBadge');
  const dataEl = document.getElementById('medalhaModalData');
  const categoriaEl = document.getElementById('medalhaModalCategoria');
  const nivelEl = document.getElementById('medalhaModalNivel');
  const pontosEl = document.getElementById('medalhaModalPontos');
  const descEl = document.getElementById('medalhaModalDescricao');
  const proximaEl = document.getElementById('medalhaModalProxima');

  if (titleEl) titleEl.textContent = `${medalha.icone || ''} ${medalha.titulo}`;
  if (badgeEl) {
    badgeEl.textContent = medalha.nivel || 'Medalha';
    badgeEl.className = 'badge info';
  }
  if (dataEl) dataEl.textContent = medalha.dataConquistaLabel || '-';
  if (categoriaEl) categoriaEl.textContent = medalha.categoria || '-';
  if (nivelEl) nivelEl.textContent = medalha.nivel || '-';
  if (pontosEl) pontosEl.textContent = (medalha.pontos || 0) + ' pts';
  if (descEl) descEl.textContent = medalha.descricaoDetalhada || medalha.descricaoCurta || '-';
  if (proximaEl) proximaEl.textContent = medalha.proximaMetaTexto || 'Sem próxima meta definida.';

  modal.style.display = 'flex';
}

function closeMedalModal() {
  const modal = document.getElementById('medalhaDetalheModal');
  if (modal) modal.style.display = 'none';
}

// Medalhas View
function getMedalhasView() {
  const data = getMedalhasData();

  const totalConquistadas = data.totalConquistadas ?? 0;
  const totalDisponiveis = data.totalDisponiveis ?? 0;
  const taxaPercent = Math.round((data.taxaConquista ?? 0) * 100);

  const conquistasHtml = data.conquistasRecentes.map(m => `
    <div class="activity-card">
      <div class="activity-info">
        <div class="activity-title">${m.icone || ''} ${m.titulo}</div>
        <div class="activity-meta">
          <span>Conquistada em ${m.dataConquistaLabel}</span>
        </div>
        <p class="activity-description">
          ${m.descricaoCurta}
        </p>
      </div>
      <div class="activity-actions">
        <button class="btn-small secondary" onclick="openMedalModal('${m.id}')">
          Ver detalhes
        </button>
      </div>
    </div>
  `).join('');

  const metasHtml = data.metasProgresso.map(meta => {
    const colorClass =
      meta.cor === 'success' ? 'progress-fill-success' :
      meta.cor === 'warning' ? 'progress-fill-warning' :
      'progress-fill-primary';

    return `
      <div class="meta-item">
        <div class="meta-header">
          <span class="meta-title">${meta.icone || ''} ${meta.titulo}</span>
          <span class="meta-progress-text">${meta.progressoTexto}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill ${colorClass}" style="width: ${meta.percentual}%;"></div>
        </div>
      </div>
    `;
  }).join('');

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
          <div class="kpi-value">${totalConquistadas}</div>
          <div class="kpi-label">Medalhas Conquistadas</div>
          <div class="kpi-sublabel">De ${totalDisponiveis} disponíveis</div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon primary">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${taxaPercent}%</div>
          <div class="kpi-label">Taxa de Conquista</div>
          <div class="kpi-sublabel">${data.taxaTexto}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Conquistas Recentes</h2>
      </div>
      <div class="activity-grid">
        ${conquistasHtml || '<p class="empty-state">Nenhuma conquista registrada ainda.</p>'}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Metas em Progresso</h2>
      </div>
      <div class="medal-metas-wrapper">
        ${metasHtml}
      </div>
    </div>

    <!-- Modal de detalhes da medalha -->
    <div id="medalhaDetalheModal" class="modal-backdrop"
         style="display:none;"
         onclick="if (event.target === this) closeMedalModal();">
      <div class="modal medal-modal">
        <button class="modal-close" type="button" onclick="closeMedalModal()">&times;</button>

        <div class="medal-modal-header">
          <h3 id="medalhaModalTitle" class="modal-title">Título da medalha</h3>
          <span id="medalhaModalBadge" class="badge info">Nível</span>
        </div>

        <div class="medal-modal-meta">
          <div><strong>Conquistada em:</strong> <span id="medalhaModalData">-</span></div>
          <div><strong>Categoria:</strong> <span id="medalhaModalCategoria">-</span></div>
          <div><strong>Nível:</strong> <span id="medalhaModalNivel">-</span></div>
          <div><strong>Pontos:</strong> <span id="medalhaModalPontos">-</span></div>
        </div>

        <div class="medal-modal-section">
          <h4>Descrição</h4>
          <p id="medalhaModalDescricao">-</p>
        </div>

        <div class="medal-modal-section">
          <h4>Próxima Meta</h4>
          <p id="medalhaModalProxima">-</p>
        </div>
      </div>
    </div>
  `;
}
