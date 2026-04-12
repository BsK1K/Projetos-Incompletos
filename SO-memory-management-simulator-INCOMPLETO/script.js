// =======================================================
// VARIÁVEIS GLOBAIS DE ESTADO
// =======================================================
let MEMORIA_TOTAL = 32; // em KB
const PERCENTUAL_SO = 10; // 10%
let MEMORIA_SO = (MEMORIA_TOTAL * PERCENTUAL_SO) / 100;

/**
 * Estrutura para manter o estado de toda a memória.
 * Cada elemento representa um bloco (ocupado ou livre).
 * Bloco Ocupado (Processo): { tipo: 'processo', id: 'P1', tamanho: 10, inicio: 3.2, fim: 13.2, cor: '#...' }
 * Bloco Livre (Lacuna):    { tipo: 'livre', tamanho: 5, inicio: 13.2, fim: 18.2 }
 */
let memoriaEstado = []; // Será inicializado com o bloco do S.O. e o bloco Livre inicial.

// Cores para os processos
const CORES_PROCESSOS = ['#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#1abc9c'];
let proximoProcessoId = 1;

// =======================================================
// FUNÇÕES DE UTILIDADE E CÁLCULO
// =======================================================

/**
 * Inicializa o array memoriaEstado e garante a coerência dos endereços.
 */
function inicializarMemoria() {
    MEMORIA_SO = (MEMORIA_TOTAL * PERCENTUAL_SO) / 100;
    const memoriaLivreInicial = MEMORIA_TOTAL - MEMORIA_SO;

    memoriaEstado = [];
    
    // 1. Bloco do Sistema Operacional (Ocupado)
    memoriaEstado.push({
        tipo: 'so',
        id: 'S.O.',
        tamanho: MEMORIA_SO,
        inicio: 0,
        fim: MEMORIA_SO,
        cor: 'var(--os-color)'
    });

    // 2. Bloco Livre Inicial (Lacuna)
    if (memoriaLivreInicial > 0) {
        memoriaEstado.push({
            tipo: 'livre',
            tamanho: memoriaLivreInicial,
            inicio: MEMORIA_SO,
            fim: MEMORIA_TOTAL
        });
    }
}

/**
 * Recalcula a memória usada/livre baseada em `memoriaEstado`.
 * @returns {object} {totalUsada, totalLivre, processosOcupados}
 */
function calcularUsoDeMemoria() {
    let processosOcupados = 0;
    
    memoriaEstado.forEach(bloco => {
        if (bloco.tipo === 'processo') {
            processosOcupados += bloco.tamanho;
        }
    });

    const totalUsada = MEMORIA_SO + processosOcupados;
    const totalLivre = MEMORIA_TOTAL - totalUsada;

    return { totalUsada, totalLivre, processosOcupados };
}

/**
 * Atualiza todos os indicadores de status (valores e barra gráfica).
 */
function atualizarStatus() {
    // 1. Obter e Validar o valor de Memória Total
    const totalInput = document.getElementById('memoria-total');
    MEMORIA_TOTAL = parseFloat(totalInput.value);

    if (isNaN(MEMORIA_TOTAL) || MEMORIA_TOTAL < 1) {
        alert("Memória Total deve ser um número positivo.");
        totalInput.value = 32;
        MEMORIA_TOTAL = 32;
    }
    
    // Garante que o estado da memória seja coerente com o novo total
    if (memoriaEstado.length === 0 || memoriaEstado[0].tamanho !== (MEMORIA_TOTAL * PERCENTUAL_SO) / 100) {
        inicializarMemoria();
    }
    
    // 2. Recalcular o uso e status
    const { totalUsada, totalLivre } = calcularUsoDeMemoria();

    // 3. Atualizar os Textos na UI
    document.getElementById('so-ocupado').textContent = MEMORIA_SO.toFixed(1);
    document.getElementById('so-porcentagem').textContent = PERCENTUAL_SO;
    document.getElementById('memoria-usada').textContent = totalUsada.toFixed(1);
    document.getElementById('memoria-livre').textContent = Math.max(0, totalLivre).toFixed(1); // Garante que não é negativo

    // 4. Atualizar a Barra Gráfica
    atualizarBarraGrafica();
    
    // 5. Chamar a função de visualização da técnica atual
    const tecnicaAtual = document.getElementById('tecnica-selector').value;
    if (tecnicaAtual) {
        renderizarVisualizacao(tecnicaAtual);
    }
}

/**
 * Renderiza a barra gráfica colorida de uso da memória, usando `memoriaEstado`.
 */
function atualizarBarraGrafica() {
    const barra = document.getElementById('memory-bar');
    barra.innerHTML = ''; // Limpa a barra atual

    memoriaEstado.forEach(bloco => {
        const percent = (bloco.tamanho / MEMORIA_TOTAL) * 100;
        
        const segment = document.createElement('div');
        segment.className = `segment`;
        segment.style.width = `${percent.toFixed(2)}%`;
        segment.textContent = `${bloco.id || 'Lacuna'} (${bloco.tamanho.toFixed(1)} KB)`;

        if (bloco.tipo === 'so') {
            segment.classList.add('os-segment');
        } else if (bloco.tipo === 'livre') {
            segment.classList.add('free-segment');
            // Mudar a cor do texto para o verde para ter contraste
            segment.style.color = '#333'; 
        } else if (bloco.tipo === 'processo') {
            segment.classList.add('process-segment');
            segment.style.backgroundColor = bloco.cor;
        }
        
        barra.appendChild(segment);
    });
}

// =======================================================
// FUNÇÕES DE INTERAÇÃO (SELEÇÃO E ALOCAÇÃO)
// =======================================================

/**
 * Lida com a seleção de uma nova técnica no menu.
 */
function selecionarTecnica() {
    const tecnica = document.getElementById('tecnica-selector').value;
    const title = document.getElementById('simulation-title');
    const controls = document.getElementById('process-input-area');
    
    title.textContent = `Simulação: ${document.querySelector(`#tecnica-selector option[value="${tecnica}"]`).textContent}`;
    
    // Exibe ou oculta os controles de Alocação (básico)
    if (tecnica.includes('particionada') || tecnica.includes('contigua') || tecnica.includes('paginada')) {
        controls.style.display = 'flex';
        document.getElementById('process-table').style.display = 'table';
    } else {
        controls.style.display = 'none';
        document.getElementById('process-table').style.display = 'none';
    }

    limparAlocacoes(); // Limpa e inicializa para a nova simulação
    renderizarExplicacao(tecnica);
}

/**
 * Implementa o algoritmo **First-Fit** para Alocação Particionada Dinâmica.
 * Busca a primeira lacuna (bloco livre) que seja grande o suficiente.
 */
function alocarProcesso() {
    const nome = document.getElementById('processo-nome').value.trim();
    const tamanho = parseFloat(document.getElementById('processo-tamanho').value);

    if (!nome || isNaN(tamanho) || tamanho <= 0) {
        alert("Por favor, insira um nome e um tamanho válido (> 0 KB) para o processo.");
        return;
    }
    
    let blocoEncontradoIndex = -1;
    
    // 1. Algoritmo First-Fit (Primeiro Encaixe)
    for (let i = 0; i < memoriaEstado.length; i++) {
        const bloco = memoriaEstado[i];
        if (bloco.tipo === 'livre' && bloco.tamanho >= tamanho) {
            blocoEncontradoIndex = i;
            break; // Encontrou o primeiro que cabe, sai do loop
        }
    }

    // 2. Verificar se há espaço
    if (blocoEncontradoIndex === -1) {
        alert(`❌ Erro: O processo de ${tamanho} KB não cabe em nenhuma lacuna livre (Fragmentação Externa pode estar ocorrendo).`);
        return;
    }

    // 3. Preparar o novo bloco de Processo
    const blocoLivre = memoriaEstado[blocoEncontradoIndex];
    const novoProcesso = {
        tipo: 'processo',
        id: nome,
        tamanho: tamanho,
        inicio: blocoLivre.inicio,
        fim: blocoLivre.inicio + tamanho,
        cor: CORES_PROCESSOS[(proximoProcessoId - 1) % CORES_PROCESSOS.length]
    };

    // 4. Inserir o novo processo e atualizar a lacuna
    const tamanhoRestante = blocoLivre.tamanho - tamanho;

    if (tamanhoRestante > 0) {
        // A. Há uma sobra (fragmentação externa) - Atualiza o bloco livre existente
        blocoLivre.tipo = 'livre'; // Mantém o tipo, mas atualiza o tamanho/endereço
        blocoLivre.tamanho = tamanhoRestante;
        blocoLivre.inicio = novoProcesso.fim; // O novo bloco livre começa onde o processo termina
        // O Fim do bloco livre permanece o mesmo
        
        // B. Insere o novo processo *antes* do bloco livre remanescente
        memoriaEstado.splice(blocoEncontradoIndex, 0, novoProcesso);
    } else {
        // O. A lacuna foi preenchida exatamente (tamanhoRestante <= 0)
        memoriaEstado[blocoEncontradoIndex] = novoProcesso;
    }

    proximoProcessoId++;
    
    // 5. Limpa os campos e atualiza o estado
    document.getElementById('processo-nome').value = '';
    document.getElementById('processo-tamanho').value = '';

    atualizarStatus();
    renderizarTabelaProcessos();
    
    // 6. Tenta consolidar lacunas adjacentes após a alocação (para evitar lacunas de 0 KB)
    consolidarLacunas();
    atualizarStatus();
}

/**
 * Limpa todos os processos alocados e retorna ao estado inicial.
 */
function limparAlocacoes() {
    inicializarMemoria(); // Reseta para S.O. e um único bloco Livre
    proximoProcessoId = 1;
    atualizarStatus();
    renderizarTabelaProcessos();
    document.getElementById('memory-visualization').innerHTML = '<p>O gráfico visual será exibido aqui.</p>';
}

/**
 * Consolida (mescla) blocos livres adjacentes para evitar fragmentação externa excessiva.
 * **Importante para a Simulação Dinâmica**
 */
function consolidarLacunas() {
    // 1. Filtra para remover quaisquer blocos livres com tamanho <= 0 (deveriam ser raros)
    memoriaEstado = memoriaEstado.filter(bloco => bloco.tipo !== 'livre' || bloco.tamanho > 0);

    let i = 0;
    while (i < memoriaEstado.length - 1) {
        const atual = memoriaEstado[i];
        const proximo = memoriaEstado[i+1];

        // Se o bloco atual e o próximo são livres E o final do atual bate com o início do próximo
        if (atual.tipo === 'livre' && proximo.tipo === 'livre' && atual.fim === proximo.inicio) {
            // Consolida
            atual.tamanho += proximo.tamanho;
            atual.fim = proximo.fim;
            
            // Remove o bloco seguinte
            memoriaEstado.splice(i + 1, 1);
            // Não incrementa 'i' porque queremos checar se o bloco recém-consolidado pode ser mesclado com o novo próximo
        } else {
            i++; // Move para o próximo bloco
        }
    }
}


// =======================================================
// FUNÇÕES DE RENDERIZAÇÃO ESPECÍFICAS
// =======================================================

/**
 * Renderiza a visualização detalhada de blocos (Particionada Dinâmica).
 */
function renderizarVisualizacao(tecnica) {
    const visArea = document.getElementById('memory-visualization');
    visArea.innerHTML = ''; 

    // O First-Fit se aplica à Particionada Dinâmica e Contígua
    if (tecnica.includes('particionada-dinamica') || tecnica.includes('contigua')) {
        
        memoriaEstado.forEach(bloco => {
            if (bloco.tamanho > 0) {
                const blockDiv = document.createElement('div');
                blockDiv.className = `memory-block`;
                
                // Altura proporcional: Usamos 200px como altura base para a área de visualização.
                const alturaRelativa = (bloco.tamanho / MEMORIA_TOTAL) * 200; 
                blockDiv.style.height = `${Math.max(10, alturaRelativa)}px`; // Altura mínima de 10px

                let texto = `${bloco.id || 'Lacuna'} (${bloco.tamanho.toFixed(1)} KB)`;

                if (bloco.tipo === 'so') {
                    blockDiv.classList.add('os-segment');
                    blockDiv.style.backgroundColor = 'var(--os-color)';
                } else if (bloco.tipo === 'processo') {
                    blockDiv.classList.add('process-segment');
                    blockDiv.style.backgroundColor = bloco.cor;
                    texto = `${bloco.id} (Início: ${bloco.inicio.toFixed(1)} KB)`;
                } else if (bloco.tipo === 'livre') {
                    blockDiv.classList.add('free-segment');
                    blockDiv.style.backgroundColor = 'var(--free-color)';
                    blockDiv.style.color = '#333';
                    texto = `LIVRE (${bloco.tamanho.toFixed(1)} KB)`;
                }
                
                blockDiv.textContent = texto;
                visArea.appendChild(blockDiv);
            }
        });
        
    } else {
        visArea.innerHTML = `<p>Visualização não implementada para esta técnica (Ainda). Use o algoritmo **First-Fit** como exemplo para Particionada Dinâmica.</p>`;
    }
}

/**
 * Renderiza a tabela de processos alocados.
 */
function renderizarTabelaProcessos() {
    const tbody = document.querySelector('#process-table tbody');
    tbody.innerHTML = '';
    
    // Filtra apenas os processos (excluindo S.O. e blocos livres)
    const processos = memoriaEstado.filter(bloco => bloco.tipo === 'processo');

    if (processos.length === 0) {
        document.getElementById('process-table').style.display = 'none';
        return;
    }
    
    document.getElementById('process-table').style.display = 'table';

    processos.forEach(p => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${p.id}</td>
            <td>${p.tamanho.toFixed(1)} KB</td>
            <td>${p.inicio.toFixed(1)} KB</td>
            <td>${p.fim.toFixed(1)} KB</td>
            <td>Alocado</td>
        `;
    });
}

/**
 * Renderiza o conteúdo teórico e o exemplo de cálculo.
 */
function renderizarExplicacao(tecnica) {
    const content = document.getElementById('explanation-content');
    let html = '';
    let calculo = '';

    // Lógica para carregar o conteúdo teórico de cada técnica
    if (tecnica === 'particionada-dinamica') {
        html = `
            <h3>Como Funciona (Particionada Dinâmica com First-Fit)</h3>
            <p>A memória é alocada dinamicamente, ajustando o tamanho da partição ao processo. O **First-Fit (Primeiro Encaixe)** é o algoritmo de busca. Ele percorre a lista de blocos livres (lacunas) sequencialmente e aloca o processo no **primeiro bloco** que for grande o suficiente para contê-lo.</p>
            <h3>Vantagens do First-Fit</h3>
            <ul>
                <li>**Rápido:** A busca é terminada assim que o primeiro bloco adequado é encontrado.</li>
                <li>Geralmente utiliza bem a memória inicial, mas pode gerar pequenas lacunas no início.</li>
            </ul>
            <h3>Desvantagens do First-Fit</h3>
            <ul>
                <li>Pode gerar **Fragmentação Externa** no início da memória, forçando blocos grandes a serem alocados no final, mesmo que o início tenha espaço.</li>
                <li>A busca sempre começa no início, o que pode sobrecarregar o gerenciamento dos primeiros blocos.</li>
            </ul>
        `;
        
        const processos = memoriaEstado.filter(b => b.tipo === 'processo');

        calculo = `
            Memória Total = ${MEMORIA_TOTAL} KB
            S.O. = ${MEMORIA_SO.toFixed(1)} KB

            Processos Atuais:
            ${processos.map(p => `- Processo ${p.id} → ${p.tamanho.toFixed(1)} KB (Início: ${p.inicio.toFixed(1)} KB)`).join('\n')}
            
            Lacunas Atuais (Blocos Livres):
            ${memoriaEstado.filter(b => b.tipo === 'livre').map(l => `- Lacuna (Início: ${l.inicio.toFixed(1)} KB) → ${l.tamanho.toFixed(1)} KB`).join('\n')}

            ---
            
            Exemplo First-Fit:
            - Novo Processo C (5 KB) chega.
            - O First-Fit procura a primeira lacuna >= 5 KB.
            - Aloca o Processo C lá, e se houver sobra, cria uma nova lacuna menor.
        `;
        
    } else {
        // Usa o esqueleto anterior para outras técnicas
        html = '<p>Conteúdo teórico para esta técnica (Ainda) não implementado. Use a simulação Particionada Dinâmica como exemplo.</p>';
        calculo = 'Selecione uma técnica para um exemplo de cálculo.';
    }

    // Atualiza a área de explicação
    document.querySelector('#explanation-content h3').nextElementSibling.innerHTML = html;
    document.getElementById('example-calculation').textContent = calculo;
}

// =======================================================
// INICIALIZAÇÃO
// =======================================================
window.onload = function() {
    inicializarMemoria(); // Configura o estado inicial da memória
    atualizarStatus(); // Renderiza o status inicial
};