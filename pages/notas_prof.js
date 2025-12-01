const NOTAS_CACHE_KEY = 'teacherNotas:v2';

// chave única por combinação de filtros
function notasKey(turma, disciplina, bimestre) {
  return `${turma}::${disciplina}::${bimestre}`;
}

// cria dados mockados iniciais para várias combinações
function buildInitialNotasData() {
  const base = {
    turmaSelecionada: '9º A',
    disciplinaSelecionada: 'Matemática',
    bimestreSelecionado: '1º Bimestre',

    turmasDisponiveis: ['9º A', '9º B', '8º A'],
    disciplinasDisponiveis: ['Matemática'],
    bimestresDisponiveis: ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'],

    // dados por combinação de filtro
    registrosPorFiltro: {}
  };

  const map = base.registrosPorFiltro;

  // 9º A – 1º Bimestre
  map[notasKey('9º A', 'Matemática', '1º Bimestre')] = {
    pendentes: [
      {
        matricula: '2024001',
        nome: 'Ana Silva',
        avaliacoes: [null, null, null, null],
        media: null
      },
      {
        matricula: '2024002',
        nome: 'Bruno Santos',
        avaliacoes: [null, null, null, null],
        media: null
      },
      {
        matricula: '2024003',
        nome: 'Carlos Lima',
        avaliacoes: [null, null, null, null],
        media: null
      }
    ],
    lancadas: [
      {
        matricula: '2023999',
        nome: 'João Pedro',
        avaliacoes: [8.5, 8.7, 9.0, 8.8],
        media: 8.8
      }
    ]
  };

  // 9º A – 2º Bimestre
  map[notasKey('9º A', 'Matemática', '2º Bimestre')] = {
    pendentes: [
      {
        matricula: '2024001',
        nome: 'Ana Silva',
        avaliacoes: [null, null, null, null],
        media: null
      },
      {
        matricula: '2024004',
        nome: 'Diego Costa',
        avaliacoes: [null, null, null, null],
        media: null
      }
    ],
    lancadas: []
  };

  // 9º B – 1º Bimestre
  map[notasKey('9º B', 'Matemática', '1º Bimestre')] = {
    pendentes: [
      {
        matricula: '2024101',
        nome: 'Eduarda Melo',
        avaliacoes: [null, null, null, null],
        media: null
      },
      {
        matricula: '2024102',
        nome: 'Felipe Souza',
        avaliacoes: [null, null, null, null],
        media: null
      }
    ],
    lancadas: [
      {
        matricula: '2024103',
        nome: 'Gabriel Lima',
        avaliacoes: [7.5, 8.0, 7.8, 8.2],
        media: 7.9
      }
    ]
  };

  // 8º A – 1º Bimestre
  map[notasKey('8º A', 'Matemática', '1º Bimestre')] = {
    pendentes: [
      {
        matricula: '2024201',
        nome: 'Helena Rocha',
        avaliacoes: [null, null, null, null],
        media: null
      },
      {
        matricula: '2024202',
        nome: 'Igor Martins',
        avaliacoes: [null, null, null, null],
        media: null
      },
      {
        matricula: '2024203',
        nome: 'Juliana Alves',
        avaliacoes: [null, null, null, null],
        media: null
      }
    ],
    lancadas: []
  };

  return base;
}

function getNotasData() {
  const cached = localStorage.getItem(NOTAS_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler notas do cache:', e);
    }
  }

  const initialData = buildInitialNotasData();
  localStorage.setItem(NOTAS_CACHE_KEY, JSON.stringify(initialData));
  return initialData;
}

function updateNotasData(newData) {
  localStorage.setItem(NOTAS_CACHE_KEY, JSON.stringify(newData));
}

// garante que exista um "contexto" (pendentes/lancadas) para a combinação atual
function getNotasContext(data) {
  const key = notasKey(
    data.turmaSelecionada,
    data.disciplinaSelecionada,
    data.bimestreSelecionado
  );

  if (!data.registrosPorFiltro[key]) {
    data.registrosPorFiltro[key] = {
      pendentes: [],
      lancadas: []
    };
  }

  return data.registrosPorFiltro[key];
}

// Troca de filtros
function changeNotasFilter(tipo, valor) {
  const data = getNotasData();

  if (tipo === 'turma') {
    data.turmaSelecionada = valor;
  } else if (tipo === 'disciplina') {
    data.disciplinaSelecionada = valor;
  } else if (tipo === 'bimestre') {
    data.bimestreSelecionado = valor;
  }

  updateNotasData(data);

  if (typeof loadView === 'function') {
    loadView('notas');
  }
}

// Lê a tabela de pendentes, move para lançadas e limpa da primeira
function salvarNotasFromTable() {
  const data = getNotasData();
  const ctx = getNotasContext(data);

  const rows = document.querySelectorAll('#notasPendentesTable tbody tr');

  const novosPendentes = [];
  const lancadasNovas = [...ctx.lancadas];

  ctx.pendentes.forEach((reg, idx) => {
    const row = rows[idx];
    if (!row) {
      novosPendentes.push(reg);
      return;
    }

    const inputs = row.querySelectorAll('input[type="number"]');
    const notas = [];

    inputs.forEach(input => {
      const v = input.value.trim();
      if (v === '') {
        notas.push(null);
      } else {
        const num = parseFloat(v.replace(',', '.'));
        notas.push(isNaN(num) ? null : num);
      }
    });

    const hasAnyNota = notas.some(n => n !== null);

    // se não tiver nenhuma nota preenchida, continua pendente
    if (!hasAnyNota) {
      novosPendentes.push(reg);
      return;
    }

    const validas = notas.filter(n => typeof n === 'number' && !isNaN(n));
    const media = validas.length
      ? validas.reduce((s, n) => s + n, 0) / validas.length
      : null;

    lancadasNovas.push({
      ...reg,
      avaliacoes: notas,
      media
    });
  });

  ctx.pendentes = novosPendentes;
  ctx.lancadas = lancadasNovas;

  updateNotasData(data);

  showToast('Notas lançadas com sucesso!');
  // Recarrega a view para atualizar as duas tabelas
  if (typeof loadView === 'function') {
    loadView('notas');
  }
}
function clampNota(input) {
  let v = input.value.trim();

  if (v === '') return; // deixa vazio se o professor quiser limpar

  // troca vírgula por ponto
  v = v.replace(',', '.');

  let num = parseFloat(v);
  if (isNaN(num)) {
    input.value = '';
    return;
  }

  if (num < 0) num = 0;
  if (num > 10) num = 10;

  // sempre com ponto / padrão do number
  input.value = num;
}

// Notas View (Teacher)
function getNotasView() {
  const data = getNotasData();
  const ctx = getNotasContext(data);

  const turmaOptions = data.turmasDisponiveis.map(t => `
    <option ${t === data.turmaSelecionada ? 'selected' : ''}>${t}</option>
  `).join('');

  const disciplinaOptions = data.disciplinasDisponiveis.map(d => `
    <option ${d === data.disciplinaSelecionada ? 'selected' : ''}>${d}</option>
  `).join('');

  const bimestreOptions = data.bimestresDisponiveis.map(b => `
    <option ${b === data.bimestreSelecionado ? 'selected' : ''}>${b}</option>
  `).join('');

  const inputHtml = (valor) => `
  <input
    type="number"
    class="form-input"
    style="width: 80px; padding: 8px;"
    value="${valor ?? ''}"
    placeholder="0.0"
    min="0"
    max="10"
    step="0.1"
    oninput="clampNota(this)"
  >
`;


  // tabela de pendentes (com inputs)
  const linhasPendentes = ctx.pendentes.length
    ? ctx.pendentes.map(reg => {
      const [a1, a2, a3, a4] = reg.avaliacoes || [null, null, null, null];

      return `
          <tr>
            <td>${reg.matricula}</td>
            <td><strong>${reg.nome}</strong></td>
            <td>${inputHtml(a1)}</td>
            <td>${inputHtml(a2)}</td>
            <td>${inputHtml(a3)}</td>
            <td>${inputHtml(a4)}</td>
            <td><strong>-</strong></td>
          </tr>
        `;
    }).join('')
    : `
      <tr>
        <td colspan="7" style="text-align:center; padding: 24px; color:#64748B;">
          Nenhum aluno pendente de lançamento para esses filtros.
        </td>
      </tr>
    `;

  // tabela de lançadas (somente leitura)
  const linhasLancadas = ctx.lancadas.length
    ? ctx.lancadas.map(reg => {
      const [a1, a2, a3, a4] = reg.avaliacoes || [null, null, null, null];

      const fmt = (v) => v == null ? '-' : v.toFixed(1);

      return `
          <tr>
            <td>${reg.matricula}</td>
            <td><strong>${reg.nome}</strong></td>
            <td>${fmt(a1)}</td>
            <td>${fmt(a2)}</td>
            <td>${fmt(a3)}</td>
            <td>${fmt(a4)}</td>
            <td><strong>${reg.media != null ? reg.media.toFixed(1) : '-'}</strong></td>
          </tr>
        `;
    }).join('')
    : `
      <tr>
        <td colspan="7" style="text-align:center; padding: 24px; color:#64748B;">
          Nenhuma nota lançada para esses filtros.
        </td>
      </tr>
    `;

  return `
    <div class="page-header">
      <h1 class="page-title">Lançamento de Notas</h1>
      <p class="page-subtitle">Gerencie as notas dos seus alunos</p>
    </div>

    <!-- CARD 1: PENDENTES -->
    <div class="card">
      <div class="filters">
        <div class="filter-group">
          <label class="filter-label">Turma</label>
          <select class="filter-select" onchange="changeNotasFilter('turma', this.value)">
            ${turmaOptions}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Disciplina</label>
          <select class="filter-select" onchange="changeNotasFilter('disciplina', this.value)">
            ${disciplinaOptions}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Bimestre</label>
          <select class="filter-select" onchange="changeNotasFilter('bimestre', this.value)">
            ${bimestreOptions}
          </select>
        </div>
      </div>

      <div class="table-container">
        <table class="table" id="notasPendentesTable">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Aluno</th>
              <th>Avaliação 1</th>
              <th>Avaliação 2</th>
              <th>Avaliação 3</th>
              <th>Avaliação 4</th>
              <th>Média</th>
            </tr>
          </thead>
          <tbody>
            ${linhasPendentes}
          </tbody>
        </table>
      </div>

      <div style="padding: 24px; border-top: 1px solid #E2E8F0; display: flex; justify-content: flex-end; gap: 12px;">
        <button class="btn-secondary" onclick="loadView('notas')">Cancelar</button>
        <button class="btn-primary-limited" onclick="salvarNotasFromTable()">Salvar Notas</button>
      </div>
    </div>

    <!-- CARD 2: LANÇADAS (MESMOS FILTROS) -->
    <div class="card" style="margin-top: 24px;">
      <div class="card-header">
        <div>
          <h2 class="card-title">Notas Lançadas</h2>
          <p class="card-subtitle" style="font-size:13px; color:#64748B; margin-top:4px;">
            Filtros aplicados:
          </p>
          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:8px;">
            <span class="badge neutral">Turma: ${data.turmaSelecionada}</span>
            <span class="badge neutral">Disciplina: ${data.disciplinaSelecionada}</span>
            <span class="badge neutral">Bimestre: ${data.bimestreSelecionado}</span>
          </div>
        </div>
      </div>



      <div class="table-container">
        <table class="table" id="notasLancadasTable">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Aluno</th>
              <th>Avaliação 1</th>
              <th>Avaliação 2</th>
              <th>Avaliação 3</th>
              <th>Avaliação 4</th>
              <th>Média</th>
            </tr>
          </thead>
          <tbody>
            ${linhasLancadas}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
