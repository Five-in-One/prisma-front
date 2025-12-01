const STUDENT_ATIVIDADES_CACHE_KEY = 'studentAtividades:v1';

function getStudentAtividadesData() {
  const cached = localStorage.getItem(STUDENT_ATIVIDADES_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler atividades do cache:', e);
    }
  }

  // Dados iniciais (mock)
  const initialData = {
    pendentes: [
      {
        id: 'alg-cap5',
        titulo: 'Exercícios de Álgebra - Capítulo 5',
        disciplina: 'Matemática',
        disciplinaIcon: '📚',
        prazoLabel: '25/03/2024',
        prazoIso: '2024-03-25',
        status: 'Pendente',
        tipo: 'Lista de exercícios',
        professor: 'Prof. Santos',
        turma: '9º Ano A',
        peso: 2.0,
        descricao: 'Resolva os exercícios 1 a 12 do capítulo 5 do livro, mostrando todos os cálculos.',
        observacoes: 'Anexar as respostas em PDF ou foto legível.',
        anexos: [
          { nome: 'Capítulo 5 - Álgebra.pdf', tipo: 'PDF' }
        ],
        nota: null,
        dataEntregaLabel: null
      },
      {
        id: 'redacao-texto-lit',
        titulo: 'Redação: Análise de Texto Literário',
        disciplina: 'Português',
        disciplinaIcon: '📝',
        prazoLabel: '28/03/2024',
        prazoIso: '2024-03-28',
        status: 'Pendente',
        tipo: 'Redação',
        professor: 'Profa. Almeida',
        turma: '9º Ano A',
        peso: 1.5,
        descricao: 'Produzir uma redação analisando o texto fornecido em sala, com no mínimo 25 linhas.',
        observacoes: 'Caprichar na argumentação e na coesão do texto.',
        anexos: [
          { nome: 'Texto base - Crônica literária.pdf', tipo: 'PDF' }
        ],
        nota: null,
        dataEntregaLabel: null
      },
      {
        id: 'pesq-rev-industrial',
        titulo: 'Pesquisa sobre Revolução Industrial',
        disciplina: 'História',
        disciplinaIcon: '🌍',
        prazoLabel: '30/03/2024',
        prazoIso: '2024-03-30',
        status: 'Pendente',
        tipo: 'Pesquisa',
        professor: 'Prof. Henrique',
        turma: '9º Ano A',
        peso: 2.5,
        descricao: 'Elaborar uma pesquisa sobre as principais etapas da Revolução Industrial e seus impactos sociais.',
        observacoes: 'Trazer no mínimo 3 fontes de pesquisa e citar no final do trabalho.',
        anexos: [],
        nota: null,
        dataEntregaLabel: null
      }
    ],
    entregues: [
      {
        id: 'trab-fotossintese',
        titulo: 'Trabalho sobre Fotossíntese',
        disciplina: 'Ciências',
        disciplinaIcon: '🔬',
        status: 'Entregue',
        tipo: 'Trabalho em grupo',
        professor: 'Profa. Marina',
        turma: '9º Ano A',
        peso: 2.0,
        prazoLabel: '18/03/2024',
        prazoIso: '2024-03-18',
        dataEntregaLabel: '20/03/2024',
        nota: 9.5,
        descricao: 'Apresentação em grupo explicando o processo de fotossíntese e sua importância para os ecossistemas.',
        observacoes: 'Ótima apresentação! Apenas revisar alguns conceitos de respiração celular.',
        anexos: [
          { nome: 'Slides - Fotossíntese.pptx', tipo: 'Apresentação' }
        ]
      },
      {
        id: 'lista-geo',
        titulo: 'Lista de Exercícios - Geometria',
        disciplina: 'Matemática',
        disciplinaIcon: '📚',
        status: 'Entregue',
        tipo: 'Lista de exercícios',
        professor: 'Prof. Santos',
        turma: '9º Ano A',
        peso: 1.0,
        prazoLabel: '16/03/2024',
        prazoIso: '2024-03-16',
        dataEntregaLabel: '18/03/2024',
        nota: 10.0,
        descricao: 'Lista de exercícios sobre polígonos, ângulos internos e externos.',
        observacoes: 'Resolução perfeita. Continue assim!',
        anexos: []
      },
      {
        id: 'interp-texto',
        titulo: 'Interpretação de Texto',
        disciplina: 'Português',
        disciplinaIcon: '📝',
        status: 'Entregue',
        tipo: 'Atividade avaliativa',
        professor: 'Profa. Almeida',
        turma: '9º Ano A',
        peso: 1.5,
        prazoLabel: '14/03/2024',
        prazoIso: '2024-03-14',
        dataEntregaLabel: '15/03/2024',
        nota: 8.5,
        descricao: 'Atividade de interpretação de texto com foco em compreensão literal e inferencial.',
        observacoes: 'Boa interpretação, mas pode melhorar nas questões inferenciais.',
        anexos: []
      }
    ]
  };

  localStorage.setItem(STUDENT_ATIVIDADES_CACHE_KEY, JSON.stringify(initialData));
  return initialData;
}

function updateStudentAtividadesData(newData) {
  localStorage.setItem(STUDENT_ATIVIDADES_CACHE_KEY, JSON.stringify(newData));
}

// Abre modal de detalhes
function openStudentActivityModal(activityId) {
  const data = getStudentAtividadesData();
  const all = [...data.pendentes, ...data.entregues];
  const atividade = all.find(a => a.id === activityId);
  if (!atividade) {
    console.warn('Atividade não encontrada:', activityId);
    return;
  }

  const modal = document.getElementById('atividadeDetalheModal');
  if (!modal) return;

  // Título
  const titleEl = document.getElementById('atividadeModalTitle');
  const badgeEl = document.getElementById('atividadeModalBadge');
  const discEl = document.getElementById('atividadeModalDisciplina');
  const prazoEl = document.getElementById('atividadeModalPrazo');
  const entregaEl = document.getElementById('atividadeModalEntrega');
  const notaEl = document.getElementById('atividadeModalNota');
  const descEl = document.getElementById('atividadeModalDescricao');
  const anexosSection = document.getElementById('atividadeModalAnexosSection');
  const anexosList = document.getElementById('atividadeModalAnexos');
  const obsSection = document.getElementById('atividadeModalObsSection');
  const obsEl = document.getElementById('atividadeModalObservacoes');

  if (titleEl) titleEl.textContent = atividade.titulo;

  if (badgeEl) {
    badgeEl.textContent = atividade.status || '';
    badgeEl.className = 'badge ' + (
      atividade.status === 'Entregue'
        ? 'success'
        : atividade.status === 'Pendente'
          ? 'warning'
          : 'neutral'
    );
  }

  if (discEl) {
    const icon = atividade.disciplinaIcon || '';
    const disc = atividade.disciplina || '';
    const prof = atividade.professor ? ` • ${atividade.professor}` : '';
    const turma = atividade.turma ? ` • Turma: ${atividade.turma}` : '';
    discEl.textContent = `${icon} ${disc}${prof}${turma}`;
  }

  if (prazoEl) {
    prazoEl.textContent = atividade.prazoLabel || '-';
  }

  if (entregaEl) {
    entregaEl.textContent = atividade.dataEntregaLabel || 'Ainda não entregue';
  }

  if (notaEl) {
    notaEl.textContent = atividade.nota != null ? atividade.nota.toFixed(1) : '-';
  }

  if (descEl) {
    descEl.textContent = atividade.descricao || 'Sem descrição cadastrada.';
  }

  // Anexos
  if (anexosSection && anexosList) {
    anexosList.innerHTML = '';
    if (atividade.anexos && atividade.anexos.length > 0) {
      atividade.anexos.forEach((anexo) => {
        const li = document.createElement('li');
        li.textContent = `${anexo.nome} (${anexo.tipo})`;
        anexosList.appendChild(li);
      });
      anexosSection.style.display = 'block';
    } else {
      anexosSection.style.display = 'none';
    }
  }

  // Observações
  if (obsSection && obsEl) {
    if (atividade.observacoes) {
      obsEl.textContent = atividade.observacoes;
      obsSection.style.display = 'block';
    } else {
      obsSection.style.display = 'none';
    }
  }

  modal.style.display = 'flex';
}

function closeStudentActivityModal() {
  const modal = document.getElementById('atividadeDetalheModal');
  if (modal) modal.style.display = 'none';
}

// Student Activities View
function getStudentAtividades() {
  const data = getStudentAtividadesData();
  const pendentesCount = data.pendentes.length;
  const entreguesCount = data.entregues.length;

  const pendentesHtml = data.pendentes.map((a) => {
    return `
      <div class="activity-card">
        <div class="activity-info">
          <div class="activity-title">${a.titulo}</div>
          <div class="activity-meta">
            <span>${a.disciplinaIcon || ''} ${a.disciplina}</span>
            <span>📅 Prazo: ${a.prazoLabel || '-'}</span>
          </div>
          <span class="badge warning">Pendente</span>
        </div>
        <div class="activity-actions">
          <button class="btn-small primary" onclick="openStudentActivityModal('${a.id}')">
            Ver detalhes
          </button>
        </div>
      </div>
    `;
  }).join('');

  const entreguesHtml = data.entregues.map((a) => {
    const notaLabel = a.nota != null ? a.nota.toFixed(1) : '-';
    return `
      <div class="activity-card">
        <div class="activity-info">
          <div class="activity-title">${a.titulo}</div>
          <div class="activity-meta">
            <span>${a.disciplinaIcon || ''} ${a.disciplina}</span>
            <span>📅 Entregue: ${a.dataEntregaLabel || '-'}</span>
            <span>⭐ Nota: ${notaLabel}</span>
          </div>
          <span class="badge success">Entregue</span>
        </div>
        <div class="activity-actions">
          <button class="btn-small secondary" onclick="openStudentActivityModal('${a.id}')">
            Ver detalhes
          </button>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="page-header">
      <h1 class="page-title">Atividades</h1>
      <p class="page-subtitle">Acompanhe suas tarefas e entregas</p>
    </div>

    <div class="card">
      <div class="tabs">
        <button class="tab active" onclick="switchTab(event, 'pendentes')">
          Pendentes (${pendentesCount})
        </button>
        <button class="tab" onclick="switchTab(event, 'entregues')">
          Entregues (${entreguesCount})
        </button>
      </div>

      <div id="pendentes" class="activity-grid">
        ${pendentesHtml || '<p class="empty-state">Nenhuma atividade pendente 🎉</p>'}
      </div>

      <div id="entregues" class="activity-grid" style="display: none;">
        ${entreguesHtml || '<p class="empty-state">Nenhuma atividade entregue ainda.</p>'}
      </div>
    </div>

    <!-- Modal de detalhes da atividade -->
    <div id="atividadeDetalheModal" class="modal-backdrop"
         style="display:none;"
         onclick="if (event.target === this) closeStudentActivityModal();">
      <div class="modal atividade-modal">
        <button class="modal-close" type="button" onclick="closeStudentActivityModal()">&times;</button>

        <div class="atividade-modal-header">
          <h3 id="atividadeModalTitle" class="modal-title">Título da atividade</h3>
          <span id="atividadeModalBadge" class="badge neutral">Status</span>
        </div>

        <p id="atividadeModalDisciplina" class="modal-text"></p>

        <div class="atividade-modal-meta">
          <div><strong>Prazo:</strong> <span id="atividadeModalPrazo">-</span></div>
          <div><strong>Entrega:</strong> <span id="atividadeModalEntrega">-</span></div>
          <div><strong>Nota:</strong> <span id="atividadeModalNota">-</span></div>
        </div>

        <div class="atividade-modal-section">
          <h4>Descrição</h4>
          <p id="atividadeModalDescricao">-</p>
        </div>

        <div class="atividade-modal-section" id="atividadeModalAnexosSection">
          <h4>Materiais / Anexos</h4>
          <ul id="atividadeModalAnexos"></ul>
        </div>

        <div class="atividade-modal-section" id="atividadeModalObsSection">
          <h4>Observações do professor</h4>
          <p id="atividadeModalObservacoes"></p>
        </div>
      </div>
    </div>
  `;
}
