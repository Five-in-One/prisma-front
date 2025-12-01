// =========================
// CACHE E MODELO DE DADOS
// =========================
const USUARIOS_CACHE_KEY = 'coordinatorUsuarios:v1';

function buildInitialUsuariosData() {
  return {
    filtroTipo: 'Todos',
    filtroStatus: 'Todos',

    tiposDisponiveis: ['Todos', 'Professor', 'Aluno', 'Coordenação'],
    statusDisponiveis: ['Todos', 'Ativo', 'Inativo'],

    usuarios: [
      {
        id: 'u1',
        nome: 'Prof. Santos',
        email: 'santos@escola.com',
        tipo: 'Professor',
        contexto: 'Matemática',
        status: 'Ativo'
      },
      {
        id: 'u2',
        nome: 'Ana Silva',
        email: 'ana.silva@escola.com',
        tipo: 'Aluno',
        contexto: '9º A',
        status: 'Ativo'
      },
      {
        id: 'u3',
        nome: 'Coord. Lima',
        email: 'lima@escola.com',
        tipo: 'Coordenação',
        contexto: 'Geral',
        status: 'Ativo'
      }
    ]
  };
}

function getUsuariosData() {
  const cached = localStorage.getItem(USUARIOS_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Erro ao ler usuários do cache:', e);
    }
  }

  const initial = buildInitialUsuariosData();
  localStorage.setItem(USUARIOS_CACHE_KEY, JSON.stringify(initial));
  return initial;
}

function updateUsuariosData(data) {
  localStorage.setItem(USUARIOS_CACHE_KEY, JSON.stringify(data));
}

function changeUsuariosFilter(tipo, valor) {
  const data = getUsuariosData();

  if (tipo === 'tipo') {
    data.filtroTipo = valor;
  } else if (tipo === 'status') {
    data.filtroStatus = valor;
  }

  updateUsuariosData(data);

  if (typeof loadView === 'function') {
    loadView('usuarios');
  }
}

function getUsuarioTipoBadgeClass(tipo) {
  if (tipo === 'Professor') return 'info';
  if (tipo === 'Aluno') return 'neutral';
  if (tipo === 'Coordenação') return 'warning';
  return 'neutral';
}

function getUsuarioStatusBadgeClass(status) {
  if (status === 'Ativo') return 'success';
  if (status === 'Inativo') return 'error';
  return 'neutral';
}

// =========================
// MODAL – CRIAR / EDITAR USUÁRIO
// =========================
function closeUsuarioModal() {
  const overlay = document.getElementById('usuarioModalOverlay');
  if (overlay) overlay.remove();
}

function openUsuarioFormModal(usuarioId) {
  const data = getUsuariosData();
  const usuario = usuarioId ? data.usuarios.find(u => u.id === usuarioId) : null;
  const isEdit = !!usuario;

  const tipoOptions = data.tiposDisponiveis
    .filter(t => t !== 'Todos')
    .map(t => `<option value="${t}" ${usuario && usuario.tipo === t ? 'selected' : ''}>${t}</option>`)
    .join('');

  const statusOptions = data.statusDisponiveis
    .filter(s => s !== 'Todos')
    .map(s => `<option value="${s}" ${usuario && usuario.status === s ? 'selected' : ''}>${s}</option>`)
    .join('');

  // label dinâmico do campo "Turma/Disciplina" de acordo com tipo
  const contextoLabel = (usuario && usuario.tipo === 'Professor')
    ? 'Disciplina'
    : (usuario && usuario.tipo === 'Aluno')
      ? 'Turma'
      : (usuario && usuario.tipo === 'Coordenação')
        ? 'Área / Setor'
        : 'Turma / Disciplina / Setor';

  const overlay = document.createElement('div');
  overlay.id = 'usuarioModalOverlay';
  overlay.className = 'modal-overlay';

  overlay.innerHTML = `
    <div class="modal modal--large">
      <div class="modal-header">
        <h2 class="modal-title">${isEdit ? 'Editar Usuário' : 'Novo Usuário'}</h2>
        <button class="modal-close" onclick="closeUsuarioModal()">×</button>
      </div>

      <form id="usuarioForm" onsubmit="handleSaveUsuario(event, '${usuarioId || ''}')">
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Nome</label>
            <input
              type="text"
              class="form-input"
              name="nome"
              required
              placeholder="Nome completo"
              value="${usuario ? usuario.nome : ''}"
            >
          </div>

          <div class="form-group">
            <label class="form-label">E-mail</label>
            <input
              type="email"
              class="form-input"
              name="email"
              required
              placeholder="email@escola.com"
              value="${usuario ? usuario.email : ''}"
            >
          </div>

          <div class="filters" style="margin-bottom: 16px;">
            <div class="filter-group">
              <label class="filter-label">Tipo</label>
              <select class="filter-select" name="tipo" required onchange="handleTipoChangeUsuario(this)">
                <option value="" disabled ${usuario ? '' : 'selected'}>Selecione</option>
                ${tipoOptions}
              </select>
            </div>
            <div class="filter-group">
              <label class="filter-label">Status</label>
              <select class="filter-select" name="status" required>
                ${statusOptions}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" id="labelContextoUsuario">${contextoLabel}</label>
            <input
              type="text"
              class="form-input"
              name="contexto"
              required
              placeholder="Ex: Matemática, 9º A, Coordenação Geral..."
              value="${usuario ? usuario.contexto : ''}"
            >
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-secondary" onclick="closeUsuarioModal()">Cancelar</button>
          <button type="submit" class="btn-primary-limited">
            ${isEdit ? 'Salvar Alterações' : 'Criar Usuário'}
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);
}

// ajusta label do campo contexto quando troca o tipo no modal
function handleTipoChangeUsuario(selectEl) {
  const tipo = selectEl.value;
  const labelEl = document.getElementById('labelContextoUsuario');
  if (!labelEl) return;

  if (tipo === 'Professor') {
    labelEl.textContent = 'Disciplina';
  } else if (tipo === 'Aluno') {
    labelEl.textContent = 'Turma';
  } else if (tipo === 'Coordenação') {
    labelEl.textContent = 'Área / Setor';
  } else {
    labelEl.textContent = 'Turma / Disciplina / Setor';
  }
}

function handleSaveUsuario(event, usuarioId) {
  event.preventDefault();
  const form = event.target;
  const data = getUsuariosData();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const tipo = form.tipo.value;
  const status = form.status.value;
  const contexto = form.contexto.value.trim();

  if (!nome || !email || !tipo || !status || !contexto) {
    showToast('Preencha todos os campos obrigatórios.');
    return;
  }

  if (usuarioId) {
    // edição
    const idx = data.usuarios.findIndex(u => u.id === usuarioId);
    if (idx !== -1) {
      data.usuarios[idx] = {
        ...data.usuarios[idx],
        nome,
        email,
        tipo,
        status,
        contexto
      };
    }
  } else {
    // novo
    const newId = 'u_' + Date.now();
    data.usuarios.push({
      id: newId,
      nome,
      email,
      tipo,
      status,
      contexto
    });
  }

  updateUsuariosData(data);
  closeUsuarioModal();
  showToast('Usuário salvo com sucesso!');

  if (typeof loadView === 'function') {
    loadView('usuarios');
  }
}

// =========================
// VIEW PRINCIPAL – USUÁRIOS
// =========================
function getUsuariosView() {
  const data = getUsuariosData();

  const tipoOptions = data.tiposDisponiveis.map(t => `
    <option ${t === data.filtroTipo ? 'selected' : ''}>${t}</option>
  `).join('');

  const statusOptions = data.statusDisponiveis.map(s => `
    <option ${s === data.filtroStatus ? 'selected' : ''}>${s}</option>
  `).join('');

  const usuariosFiltrados = data.usuarios.filter(u => {
    const tipoOk = data.filtroTipo === 'Todos' || u.tipo === data.filtroTipo;
    const statusOk = data.filtroStatus === 'Todos' || u.status === data.filtroStatus;
    return tipoOk && statusOk;
  });

  const linhas = usuariosFiltrados.length
    ? usuariosFiltrados.map(u => {
        const tipoClass = getUsuarioTipoBadgeClass(u.tipo);
        const statusClass = getUsuarioStatusBadgeClass(u.status);
        return `
          <tr>
            <td><strong>${u.nome}</strong></td>
            <td>${u.email}</td>
            <td><span class="badge ${tipoClass}">${u.tipo}</span></td>
            <td>${u.contexto}</td>
            <td><span class="badge ${statusClass}">${u.status}</span></td>
            <td>
              <button class="btn-icon" title="Editar usuário" onclick="openUsuarioFormModal('${u.id}')">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </td>
          </tr>
        `;
      }).join('')
    : `
      <tr>
        <td colspan="6" style="text-align:center; padding: 24px; color:#64748B;">
          Nenhum usuário encontrado com os filtros selecionados.
        </td>
      </tr>
    `;

  return `
    <div class="page-header">
      <h1 class="page-title">Usuários</h1>
      <p class="page-subtitle">Gerencie professores, alunos e coordenadores</p>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Lista de Usuários</h2>
          <p class="card-subtitle" style="font-size:13px; color:#64748B; margin-top:4px;">
            Use os filtros para localizar e editar rapidamente usuários da instituição.
          </p>
        </div>
        <div class="card-actions">
          <button class="btn-primary-icon" onclick="openUsuarioFormModal()">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Novo Usuário
          </button>
        </div>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label class="filter-label">Tipo</label>
          <select class="filter-select" onchange="changeUsuariosFilter('tipo', this.value)">
            ${tipoOptions}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <select class="filter-select" onchange="changeUsuariosFilter('status', this.value)">
            ${statusOptions}
          </select>
        </div>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Tipo</th>
              <th>Turma/Disciplina</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${linhas}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
                                                                                                                                                                                                                                                                                                                                                                                                                          