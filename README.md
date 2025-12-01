# Portal Acadêmico – Front-end

Interface web em **HTML + CSS + JavaScript vanilla** para alunos, professores, coordenadores e equipe administrativa acompanharem e gerenciarem informações acadêmicas (notas, frequência, atividades, planos de aula, turmas e usuários).

A aplicação funciona como uma **SPA simples**: as “páginas” são montadas dinamicamente via JavaScript, usando templates de string e uma função de roteamento (`loadView`) para trocar o conteúdo principal.

---

## Perfis Atendidos

- **Aluno**
  - Dashboard
  - Atividades
  - Medalhas / conquistas
  - Histórico de desempenho

- **Professor**
  - Dashboard
  - Lançamento de notas
  - Registro de frequência
  - Atividades (criação e controle de entregas)
  - Planos de aula (criação e edição)

- **Coordenação**
  - Dashboard
  - Planos de aula (acompanhamento e aprovação)
  - Notificações
  - Turmas
  - Usuários

Cada “view” é gerada por uma função do tipo:

```js
function getTeacherDashboard() { ... }
function getNotasView() { ... }
function getFrequenciaView() { ... }
function getTeacherPlanoView() { ... }
function getCoordinatorDashboard() { ... }
function getCoordinatorPlanoView() { ... }
function getNotificacoesView() { ... }
function getTurmasView() { ... }
function getUsuariosView() { ... }
O roteador (`loadView('nomeDaView')`) injeta o HTML retornado por essas funções no container principal da página.

---

## Arquitetura e Padrões

### Estrutura das Views

Padrão comum em todas as telas:

* **Cabeçalho da página**

```html
<div class="page-header">
  <h1 class="page-title">Título</h1>
  <p class="page-subtitle">Descrição curta</p>
</div>
```

* **Cards de conteúdo** (`.card`)

  * Header com título e ações (`.card-header`, `.card-title`, `.card-actions`)
  * Corpo com:

    * KPIs em grid (`.kpi-grid`, `.kpi-card`)
    * Tabelas (`.table-container`, `.table`)
    * Grids de atividades (`.activity-grid`, `.activity-card`)
    * Seções detalhadas em cards internos

* **Elementos reutilizáveis**

  * Badges de status: `.badge.success`, `.badge.warning`, `.badge.info`, `.badge.error`, `.badge.neutral`
  * Botões: `.btn-primary`, `.btn-primary-icon`, `.btn-secondary`, `.btn-small`, `.btn-icon`, `.btn-primary-limited`
  * Toasts de feedback: `showToast('mensagem')`

---

## Estado, Filtros e Cache (localStorage)

Telas com filtros usam um padrão comum de estado + cache:

* **Estado da tela** mantido em um objeto JS
* **Persistência** em `localStorage` com uma chave por módulo
  (ex.: `teacherNotas:v2`, `teacherPlano:v1`)
* **Funções auxiliares padrão**:

  * `getXData()` – lê do `localStorage` ou inicializa o estado
  * `updateXData(data)` – grava o objeto atualizado
  * `changeXFilter(tipo, valor)` – altera filtros, persiste e recarrega a view

Exemplo de padrão (simplificado):

```js
const NOTAS_CACHE_KEY = 'teacherNotas:v2';

function getNotasData() {
  const cached = localStorage.getItem(NOTAS_CACHE_KEY);
  // parse ou inicializa
}

function updateNotasData(newData) {
  localStorage.setItem(NOTAS_CACHE_KEY, JSON.stringify(newData));
}

function changeNotasFilter(tipo, valor) {
  const data = getNotasData();
  // altera filtro em data
  updateNotasData(data);
  loadView('notas');
}
```

Alguns módulos usam **chave composta** para segmentar o estado por combinação de filtros, por exemplo:

```js
function notasKey(turma, disciplina, bimestre) {
  return `${turma}::${disciplina}::${bimestre}`;
}

// registrosPorFiltro[key] = { pendentes: [...], lancadas: [...] }
```

---

## Fluxos Principais por Tela

### Lançamento de Notas (Professor)

Tela estruturada em dois blocos:

1. **Tabela de notas pendentes**

   * Filtros: turma, disciplina, bimestre
   * Inputs `type="number"` para cada avaliação
   * Validação de faixa (0 a 10) com `oninput="clampNota(this)"`
   * Estado separado por combinação de filtros usando `notasKey(...)`
   * Ao salvar:

     * Registros com pelo menos uma nota preenchida são removidos da lista de pendentes
     * Esses registros são adicionados à lista de notas lançadas
     * Médias são calculadas a partir das notas válidas
     * A view é recarregada para refletir o novo estado

2. **Tabela de notas lançadas**

   * Mesmos filtros da tabela de pendentes (compartilham o mesmo contexto)
   * Exibe valores apenas em modo leitura (sem inputs)
   * Mostra médias já calculadas no fluxo de salvamento

---

### Registro de Frequência (Professor)

Dois cartões principais na mesma view:

1. **Marcação da frequência do dia**

   * Filtros: turma, data
   * Tabela de alunos com radios:

     * `presente`, `falta`, `atraso`
   * Resumo de contagens: presentes, faltas, atrasos
   * Ao salvar:

     * Estado é associado à turma + data
     * Os valores podem ser usados em relatórios e históricos

2. **Histórico por aluno**

   * Lista fixa de alunos
   * Para cada aluno, visão consolidada de presença/falta/atraso por período
   * Filtros independentes da área de marcação diária (não se interferem)
   * Permite abrir e editar o registro de um aluno específico por dia

Cada bloco tem seu próprio conjunto de filtros e tratamento de estado para evitar interferência de um no outro.

---

### Atividades do Professor

* Listagem de atividades com colunas como: título, turma, data de entrega, quantidade de entregas, status e ações.

* Filtros por turma e status.

* Botão “Nova Atividade” abre modal com formulário:

  * Título
  * Turma
  * Data de entrega
  * Status
  * Tipo de atividade / descrição
  * Associação com alunos (entregas)

* Modal de entregas reutiliza a lista de alunos usada em outros módulos para marcar quem entregou e detalhes da entrega.

---

### Planos de Aula – Professor

* Listagem de planos com filtros por:

  * Turma
  * Status (ex.: Aprovado, Pendente, Em revisão)
* Colunas típicas:

  * Título
  * Turma
  * Data
  * Status (badge)
  * Ações (visualizar, editar)

**Modais principais:**

1. **Formulário de plano** (`openPlanoFormModal`)

   * Campos:

     * Título do plano
     * Turma (select)
     * Data (date)
     * Status (select)
     * Objetivos
     * Conteúdo / etapas
     * Estratégias de ensino
     * Avaliação
   * Funciona tanto para criar quanto para editar, com base no `id` do plano.

2. **Detalhes do plano** (`openPlanoDetailsModal`)

   * Exibe, em cards internos:

     * Metadados (turma, data, status)
     * Objetivos
     * Conteúdo / etapas
     * Estratégias de ensino
     * Avaliação
   * Botão para ir direto à edição do mesmo plano.

---

### Planos de Aula – Coordenação

* Filtros por:

  * Professor
  * Turma
  * Status (Pendente, Aprovado, Reprovado, etc.)
* Tabela listando planos associados aos professores e turmas.
* Ações típicas:

  * **Revisar**: abre o plano para análise e mudança de status.
  * **Visualizar**: abre em modo leitura.
* Atualizações de status feitas pela coordenação são refletidas no mesmo modelo de dados consumido pela tela do professor.

---

### Turmas

* Tela para gestão de turmas:

  * Colunas:

    * Turma
    * Ano
    * Turno
    * Quantidade de alunos
    * Professor responsável
    * Status (Ativa/Inativa)
  * Ação de edição por linha (com ícone de edição).
* Ponto de extensão natural para:

  * Modal de criação/edição de turma.
  * Associação com professores da tela de Usuários.

---

### Usuários

* Tela de gestão de usuários da instituição:

  * Filtros:

    * **Tipo**: Professor, Aluno, Coordenação, etc.
    * **Status**: Ativo, Inativo
  * Colunas:

    * Nome
    * E-mail
    * Tipo (com badge)
    * Turma / Disciplina / Setor (dependendo do tipo)
    * Status
    * Ações (edição)

* Modal de usuário (padrão):

  * Campos:

    * Nome
    * E-mail
    * Tipo
    * Status
    * Campo contextual (rótulo dinâmico):

      * Professor → Disciplina
      * Aluno → Turma
      * Coordenação → Área / Setor

---

### Notificações

* Feed de notificações com:

  * Nível de prioridade (Urgente, Normal, etc.) em badges
  * Indicação de tempo relativo (“há X horas”, “ontem”)
  * Título + texto explicativo
  * Ações como “Ver detalhes” ou “Baixar relatório”

* Botão “Marcar todas como lidas” centralizado na barra de ações do card.

---

## Sistema de Modais

Modais unificados reutilizados em todas as telas que exigem formulário ou detalhamento.

### Overlay

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
}
```

Criado via JavaScript:

```js
const overlay = document.createElement('div');
overlay.id = 'planoModalOverlay'; // ou outro id
overlay.className = 'modal-overlay';
overlay.innerHTML = `...`; // conteúdo do modal
document.body.appendChild(overlay);
```

### Tipos de modal

* `.modal.modal--small`

  * Usado para confirmações simples (ex.: remover, exportar, etc.)
  * `max-width` reduzido e padding interno.

* `.modal.modal--large`

  * Usado para formulários extensos e detalhes (planos, atividades, etc.).
  * Características:

    ```css
    .modal.modal--large {
      max-width: 720px;
      width: 95vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    ```

### Layout interno

* **Header e footer fixos** com flex-shrink:

  ```css
  .modal-header,
  .modal-footer {
    padding: 16px 24px;
    border-bottom: 1px solid #E2E8F0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .modal-footer {
    border-top: 1px solid #E2E8F0;
    border-bottom: none;
  }
  ```

* **Corpo rolável**:

  ```css
  .modal-body {
    padding: 16px 24px 8px;
    overflow-y: auto;   /* scroll interno */
    flex: 1;            /* ocupa espaço entre header e footer */
    min-height: 0;      /* evita estourar o container flex */
  }
  ```

* **Botão de fechar (X)**:

  ```css
  .modal-close {
    position: absolute;
    top: 8px;
    right: 10px;
    border: none;
    background: transparent;
    font-size: 20px;
    cursor: pointer;
  }
  ```

---

## Estilos Globais Relevantes

* KPIs: `.kpi-grid`, `.kpi-card`, `.kpi-icon`, `.kpi-content`
* Tabelas: `.table-container`, `.table`
* Atividades: `.activity-grid`, `.activity-card`, `.activity-info`, `.activity-actions`
* Badges: `.badge.success`, `.badge.warning`, `.badge.info`, `.badge.error`, `.badge.neutral`
* Botões: `.btn-primary`, `.btn-secondary`, `.btn-primary-icon`, `.btn-small`, `.btn-icon`, `.btn-primary-limited`
* Layout de página: `.page-header`, `.page-title`, `.page-subtitle`, `.card`, `.card-header`, `.card-title`, `.card-actions`

---

## Extensões Futuras

### Nova view

1. Criar uma função:

   ```js
   function getMinhaNovaView() {
     return `
       <div class="page-header">...</div>
       <div class="card">...</div>
     `;
   }
   ```

2. Registrar essa view no roteador (`loadView`).

3. Caso precise de estado persistente:

   * Definir `const MINHA_VIEW_CACHE_KEY = '...'`
   * Criar `getMinhaViewData()` e `updateMinhaViewData()` usando `localStorage`.

### Integração com API

* Substituir acesso ao `localStorage` por chamadas HTTP (fetch/axios), mantendo a mesma estrutura de objetos em memória.
* Tratar estados de carregamento e erro no front (ex.: placeholders, mensagens de erro).
* Aproveitar filtros já existentes para montar queries para a API (turma, bimestre, status, etc.).

---

## Resumo

* SPA em JS vanilla com views geradas por funções `get*View()`.
* Padrão consistente de layout: `page-header` + `card` + `table`/`grid`.
* Estado de interface persistido em `localStorage` por módulo e, quando necessário, por combinação de filtros.
* Sistema de modais reutilizável, com scroll interno e header/footer fixos.
* Estrutura pronta para ser plugada em APIs reais sem grandes mudanças de UX.

```
```
