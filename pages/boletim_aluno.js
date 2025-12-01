const BOLETIM_CACHE_KEY = 'studentBoletim:v1';

function openBoletimExportModal() {
  const modal = document.getElementById('boletimExportModal');
  if (modal) modal.style.display = 'flex';
}

function closeBoletimExportModal() {
  const modal = document.getElementById('boletimExportModal');
  if (modal) modal.style.display = 'none';
}

/**
 * Gera o conteúdo CSV a partir do boletim atual.
 */
function buildBoletimCsv() {
  const data = getBoletimData();

  const header = [
    'Disciplina',
    'Avaliação 1',
    'Avaliação 2',
    'Avaliação 3',
    'Avaliação 4',
    'Média',
    'Situação'
  ];

  const linhas = data.disciplinas.map((disc) => {
    const [a1, a2, a3, a4] = disc.avaliacoes;
    return [
      disc.nome,
      a1 ?? '',
      a2 ?? '',
      a3 ?? '',
      a4 ?? '',
      disc.media != null ? disc.media.toFixed(1) : '',
      disc.situacao || ''
    ];
  });

  // monta CSV com ; (bem comum em pt-BR)
  const todas = [header, ...linhas];

  const csv = todas
    .map(cols =>
      cols
        .map(value => {
          const str = String(value ?? '');
          // escapa aspas
          const limpo = str.replace(/"/g, '""');
          return `"${limpo}"`;
        })
        .join(';')
    )
    .join('\r\n');

  return csv;
}

/**
 * Faz o download do arquivo (CSV ou "Excel").
 */
function exportBoletim(tipo) {
  const csvContent = buildBoletimCsv();
  const data = getBoletimData();
  const ano = data.ano || 'ano';
  const bimestre = (data.bimestre || 'bimestre')
    .replace(/\s+/g, '_')
    .replace(/[º°]/g, '');

  let mimeType = 'text/csv;charset=utf-8;';
  let fileName = `boletim_${ano}_${bimestre}.csv`;

  if (tipo === 'excel') {
    // ainda é CSV, mas com mime/ extensão amigáveis pro Excel
    mimeType = 'application/vnd.ms-excel;charset=utf-8;';
    fileName = `boletim_${ano}_${bimestre}.xls`;
  }

  const blob = new Blob([csvContent], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);

  closeBoletimExportModal();

  if (tipo === 'excel') {
    showToast('Boletim exportado em Excel.');
  } else {
    showToast('Boletim exportado em CSV.');
  }
}


function getBoletimData() {
  // tenta pegar do cache
  const cached = localStorage.getItem(BOLETIM_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler boletim do cache:', e);
    }
  }

  // se não tiver cache (primeira vez), usa esses dados iniciais
  const initialData = {
    ano: '2024',
    bimestre: '1º Bimestre',
    anosDisponiveis: ['2024', '2023'],
    bimestresDisponiveis: ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'],
    disciplinas: [
      {
        nome: 'Matemática',
        avaliacoes: [9.5, 9.0, 9.2, 9.0],
        media: 9.2,
        situacao: 'Aprovado'
      },
      {
        nome: 'Português',
        avaliacoes: [8.5, 8.8, 8.7, 9.0],
        media: 8.7,
        situacao: 'Aprovado'
      },
      {
        nome: 'História',
        avaliacoes: [8.0, 7.8, 8.2, 8.0],
        media: 8.0,
        situacao: 'Aprovado'
      },
      {
        nome: 'Geografia',
        avaliacoes: [8.5, 8.3, 8.7, 8.5],
        media: 8.5,
        situacao: 'Aprovado'
      },
      {
        nome: 'Ciências',
        avaliacoes: [9.0, 9.2, 8.8, 9.0],
        media: 9.0,
        situacao: 'Aprovado'
      },
      {
        nome: 'Inglês',
        avaliacoes: [7.5, 8.0, 7.8, null], // null = ainda sem nota
        media: 7.8,
        situacao: 'Em andamento'
      },
      {
        nome: 'Educação Física',
        avaliacoes: [10.0, 10.0, 9.5, 10.0],
        media: 9.9,
        situacao: 'Aprovado'
      },
      {
        nome: 'Artes',
        avaliacoes: [9.0, 8.5, 9.0, 8.8],
        media: 8.8,
        situacao: 'Aprovado'
      }
    ]
  };

  // salva no cache
  localStorage.setItem(BOLETIM_CACHE_KEY, JSON.stringify(initialData));

  return initialData;
}

// (opcional) função para atualizar boletim via API depois
function updateBoletimData(newData) {
  localStorage.setItem(BOLETIM_CACHE_KEY, JSON.stringify(newData));
}

// Boletim View
function getBoletimView() {
  const data = getBoletimData();

  const anoOptions = data.anosDisponiveis
    .map(ano => `<option ${ano === data.ano ? 'selected' : ''}>${ano}</option>`)
    .join('');

  const bimestreOptions = data.bimestresDisponiveis
    .map(b => `<option ${b === data.bimestre ? 'selected' : ''}>${b}</option>`)
    .join('');

  const linhasDisciplinas = data.disciplinas
    .map((disc) => {
      const [a1, a2, a3, a4] = disc.avaliacoes;

      const situacaoClass =
        disc.situacao === 'Aprovado'
          ? 'success'
          : disc.situacao === 'Reprovado'
            ? 'error'
            : 'warning';

      return `
        <tr>
          <td><strong>${disc.nome}</strong></td>
          <td>${a1 ?? '-'}</td>
          <td>${a2 ?? '-'}</td>
          <td>${a3 ?? '-'}</td>
          <td>${a4 ?? '-'}</td>
          <td><strong>${disc.media.toFixed(1)}</strong></td>
          <td><span class="badge ${situacaoClass}">${disc.situacao}</span></td>
        </tr>
      `;
    })
    .join('');

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
            ${anoOptions}
          </select>
          <select class="filter-select" style="width: auto; margin-right: 8px;">
            ${bimestreOptions}
          </select>
          <button class="btn-secondary" onclick="openBoletimExportModal()">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar
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
            ${linhasDisciplinas}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Exportação do Boletim -->
    <div id="boletimExportModal" class="modal-backdrop" style="display:none;" onclick="if (event.target === this) closeBoletimExportModal();">
      <div class="modal">
        <button class="modal-close" type="button" onclick="closeBoletimExportModal()">&times;</button>
        <h3 class="modal-title">Exportar boletim</h3>
        <p class="modal-text">Escolha o formato de exportação:</p>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" onclick="exportBoletim('csv')">
            CSV
          </button>
          <button type="button" class="btn-primary-limited" onclick="exportBoletim('excel')">
            Excel
          </button>
        </div>
      </div>
    </div>
  `;
}

