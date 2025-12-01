const FREQUENCIA_CACHE_KEY = 'teacherFrequencia:v1';

function buildInitialFrequenciaData() {
  return {
    // filtros do card de marcação
    turmaSelecionada: '9º A',
    dataSelecionada: '2024-03-22',

    // filtros do card de registro
    filtroRegistroTurma: '9º A',
    filtroRegistroData: 'todas', // 'todas' ou uma data (yyyy-mm-dd)
    filtroRegistroStatus: 'todos', // todos | presente | falta | atraso

    turmasDisponiveis: ['9º A', '9º B', '8º A'],

    // lista fixa de alunos por turma
    alunosPorTurma: {
      '9º A': [
        { matricula: '2024001', nome: 'Ana Silva' },
        { matricula: '2024002', nome: 'Bruno Santos' },
        { matricula: '2024003', nome: 'Carlos Lima' }
      ],
      '9º B': [
        { matricula: '2024101', nome: 'Eduarda Melo' },
        { matricula: '2024102', nome: 'Felipe Souza' },
        { matricula: '2024103', nome: 'Gabriel Lima' }
      ],
      '8º A': [
        { matricula: '2024201', nome: 'Helena Rocha' },
        { matricula: '2024202', nome: 'Igor Martins' },
        { matricula: '2024203', nome: 'Juliana Alves' }
      ]
    },

    // registros históricos de frequência
    // cada registro = 1 aluno em 1 dia
    registros: [
      // alguns mocks iniciais
      {
        turma: '9º A',
        data: '2024-03-21',
        matricula: '2024001',
        nome: 'Ana Silva',
        status: 'presente'
      },
      {
        turma: '9º A',
        data: '2024-03-21',
        matricula: '2024002',
        nome: 'Bruno Santos',
        status: 'falta'
      },
      {
        turma: '9º B',
        data: '2024-03-20',
        matricula: '2024101',
        nome: 'Eduarda Melo',
        status: 'atraso'
      }
    ]
  };
}

function getFrequenciaData() {
  const cached = localStorage.getItem(FREQUENCIA_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler frequência do cache:', e);
    }
  }

  const initialData = buildInitialFrequenciaData();
  localStorage.setItem(FREQUENCIA_CACHE_KEY, JSON.stringify(initialData));
  return initialData;
}

function updateFrequenciaData(newData) {
  localStorage.setItem(FREQUENCIA_CACHE_KEY, JSON.stringify(newData));
}

// alunos pendentes de marcar para turma + data selecionadas
function getPendentesParaData(data) {
  const turma = data.turmaSelecionada;
  const dia = data.dataSelecionada;
  const alunos = data.alunosPorTurma[turma] || [];

  return alunos.filter(aluno => {
    return !data.registros.some(r =>
      r.turma === turma &&
      r.data === dia &&
      r.matricula === aluno.matricula
    );
  });
}

// filtros do card 1 (marcar frequencia)
// filtros do card 1 (marcar frequencia)
function changeFrequenciaFilter(tipo, valor) {
  const data = getFrequenciaData();

  if (tipo === 'turma') {
    data.turmaSelecionada = valor;      // só afeta o card de cima
  } else if (tipo === 'data') {
    data.dataSelecionada = valor;       // só afeta o card de cima
  }

  // 🔸 NÃO sincronizamos mais com os filtros do registro (card de baixo)
  // data.filtroRegistroTurma = valor;  // <- REMOVIDO

  updateFrequenciaData(data);
  if (typeof loadView === 'function') {
    loadView('frequencia');
  }
}


// salva marcações do card 1 -> joga para registros históricos
function salvarFrequenciaFromTable() {
  const data = getFrequenciaData();
  const turma = data.turmaSelecionada;
  const dia = data.dataSelecionada;

  const pendentes = getPendentesParaData(data);
  const rows = document.querySelectorAll('#freqPendentesTable tbody tr');

  const novosRegistros = [...data.registros];

  pendentes.forEach((aluno, idx) => {
    const row = rows[idx];
    if (!row) return;

    const radios = row.querySelectorAll('input[type="radio"]');
    let statusSelecionado = null;

    radios.forEach(r => {
      if (r.checked) statusSelecionado = r.value;
    });

    if (!statusSelecionado) {
      // se não marcou nada, não cria registro (continua pendente)
      return;
    }

    // remove registro antigo para o mesmo aluno/dia se existir
    for (let i = novosRegistros.length - 1; i >= 0; i--) {
      const r = novosRegistros[i];
      if (r.turma === turma && r.data === dia && r.matricula === aluno.matricula) {
        novosRegistros.splice(i, 1);
      }
    }

    novosRegistros.push({
      turma,
      data: dia,
      matricula: aluno.matricula,
      nome: aluno.nome,
      status: statusSelecionado
    });
  });

  data.registros = novosRegistros;
  updateFrequenciaData(data);

  showToast('Frequência registrada com sucesso!');
  if (typeof loadView === 'function') {
    loadView('frequencia');
  }
}

// filtros do card 2 (registro histórico)
function changeRegistroFilter(tipo, valor) {
  const data = getFrequenciaData();

  if (tipo === 'turma') {
    data.filtroRegistroTurma = valor;
  } else if (tipo === 'data') {
    data.filtroRegistroData = valor;
  } else if (tipo === 'status') {
    data.filtroRegistroStatus = valor;
  }

  updateFrequenciaData(data);
  if (typeof loadView === 'function') {
    loadView('frequencia');
  }
}

// edição de um aluno específico no registro
function changeRegistroStatus(turma, dia, matricula, novoStatus) {
  const data = getFrequenciaData();

  const reg = data.registros.find(r =>
    r.turma === turma &&
    r.data === dia &&
    r.matricula === matricula
  );

  if (reg) {
    reg.status = novoStatus;
    updateFrequenciaData(data);
    showToast('Frequência atualizada para o aluno.');
  }
}

// view principal
function getFrequenciaView() {
  const data = getFrequenciaData();
  const pendentes = getPendentesParaData(data);

  const turmaOptions = data.turmasDisponiveis.map(t => `
    <option ${t === data.turmaSelecionada ? 'selected' : ''}>${t}</option>
  `).join('');

  const turmaRegistroOptions = data.turmasDisponiveis.map(t => `
    <option ${t === data.filtroRegistroTurma ? 'selected' : ''}>${t}</option>
  `).join('');

  // datas disponíveis no registro
  const datasDisponiveisSet = new Set(
    data.registros
      .filter(r => r.turma === data.filtroRegistroTurma)
      .map(r => r.data)
  );
  const datasDisponiveis = Array.from(datasDisponiveisSet).sort();

  const dataRegistroOptions = [
    `<option value="todas" ${data.filtroRegistroData === 'todas' ? 'selected' : ''}>Todas</option>`,
    ...datasDisponiveis.map(d => `
      <option value="${d}" ${data.filtroRegistroData === d ? 'selected' : ''}>${d}</option>
    `)
  ].join('');

  const statusOptions = `
    <option value="todos" ${data.filtroRegistroStatus === 'todos' ? 'selected' : ''}>Todos</option>
    <option value="presente" ${data.filtroRegistroStatus === 'presente' ? 'selected' : ''}>Presente</option>
    <option value="falta" ${data.filtroRegistroStatus === 'falta' ? 'selected' : ''}>Falta</option>
    <option value="atraso" ${data.filtroRegistroStatus === 'atraso' ? 'selected' : ''}>Atraso</option>
  `;

  // linhas da tabela de pendentes (card 1)
  const linhasPendentes = pendentes.length
    ? pendentes.map(aluno => {
        const name = `freq_${aluno.matricula}`;
        return `
          <tr>
            <td>${aluno.matricula}</td>
            <td><strong>${aluno.nome}</strong></td>
            <td style="text-align:center;">
              <input type="radio" name="${name}" value="presente" style="width: 20px; height: 20px; cursor: pointer;">
            </td>
            <td style="text-align:center;">
              <input type="radio" name="${name}" value="falta" style="width: 20px; height: 20px; cursor: pointer;">
            </td>
            <td style="text-align:center;">
              <input type="radio" name="${name}" value="atraso" style="width: 20px; height: 20px; cursor: pointer;">
            </td>
          </tr>
        `;
      }).join('')
    : `
      <tr>
        <td colspan="5" style="text-align:center; padding: 24px; color:#64748B;">
          Nenhum aluno pendente de marcação para esta turma e data.
        </td>
      </tr>
    `;

  // registros filtrados para o card 2
  const registrosFiltrados = data.registros.filter(r => {
    if (r.turma !== data.filtroRegistroTurma) return false;

    if (data.filtroRegistroData !== 'todas' && r.data !== data.filtroRegistroData) return false;

    if (data.filtroRegistroStatus !== 'todos' && r.status !== data.filtroRegistroStatus) return false;

    return true;
  });

  const linhasRegistro = registrosFiltrados.length
    ? registrosFiltrados.map(r => {
        return `
          <tr>
            <td>${r.matricula}</td>
            <td><strong>${r.nome}</strong></td>
            <td>${r.data}</td>
            <td>
              <select
                class="filter-select"
                style="width: 140px;"
                onchange="changeRegistroStatus('${r.turma}', '${r.data}', '${r.matricula}', this.value)"
              >
                <option value="presente" ${r.status === 'presente' ? 'selected' : ''}>Presente</option>
                <option value="falta" ${r.status === 'falta' ? 'selected' : ''}>Falta</option>
                <option value="atraso" ${r.status === 'atraso' ? 'selected' : ''}>Atraso</option>
              </select>
            </td>
          </tr>
        `;
      }).join('')
    : `
      <tr>
        <td colspan="4" style="text-align:center; padding: 24px; color:#64748B;">
          Nenhum registro encontrado para os filtros selecionados.
        </td>
      </tr>
    `;

  return `
    <div class="page-header">
      <h1 class="page-title">Registro de Frequência</h1>
      <p class="page-subtitle">Marque presença, faltas e atrasos</p>
    </div>

    <!-- CARD 1: MARCAR FREQUÊNCIA (PENDENTES) -->
    <div class="card">
      <div class="filters">
        <div class="filter-group">
          <label class="filter-label">Turma</label>
          <select class="filter-select" onchange="changeFrequenciaFilter('turma', this.value)">
            ${turmaOptions}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Data</label>
          <input
            type="date"
            class="filter-select"
            value="${data.dataSelecionada}"
            onchange="changeFrequenciaFilter('data', this.value)"
          >
        </div>
      </div>

      <div class="table-container">
        <table class="table" id="freqPendentesTable">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Aluno</th>
              <th style="text-align:center;">Presente</th>
              <th style="text-align:center;">Falta</th>
              <th style="text-align:center;">Atraso</th>
            </tr>
          </thead>
          <tbody>
            ${linhasPendentes}
          </tbody>
        </table>
      </div>

      <div style="padding: 24px; border-top: 1px solid #E2E8F0; display:flex; justify-content:flex-end; gap:12px;">
        <button class="btn-secondary" onclick="loadView('frequencia')">Cancelar</button>
        <button class="btn-primary-limited" onclick="salvarFrequenciaFromTable()">
          Salvar Frequência
        </button>
      </div>
    </div>

    <!-- CARD 2: REGISTRO HISTÓRICO -->
    <div class="card" style="margin-top: 24px;">
      <div class="card-header">
        <div>
          <h2 class="card-title">Histórico de Frequência</h2>
          <p class="card-subtitle" style="font-size:13px; color:#64748B; margin-top:4px;">
            Veja e edite a frequência registrada por dia.
          </p>
        </div>
        <div class="filters" style="gap: 12px;">
          <div class="filter-group">
            <label class="filter-label">Turma</label>
            <select class="filter-select" onchange="changeRegistroFilter('turma', this.value)">
              ${turmaRegistroOptions}
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">Data</label>
            <select class="filter-select" onchange="changeRegistroFilter('data', this.value)">
              ${dataRegistroOptions}
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">Status</label>
            <select class="filter-select" onchange="changeRegistroFilter('status', this.value)">
              ${statusOptions}
            </select>
          </div>
        </div>
      </div>

      <div class="table-container">
        <table class="table" id="freqRegistroTable">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Aluno</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${linhasRegistro}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
