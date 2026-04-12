// Variáveis Globais de Estado
let memoriaTotal = 128; 
let soTamanho = 38; 
let listaMemoria = []; // Estrutura principal da memória

// --- Funções de Ajuda ---

// Função para converter string de input em array de números (e filtrar valores inválidos)
function parseInput(inputString) {
    return inputString.split(',')
                      .map(s => parseFloat(s.trim()))
                      .filter(n => !isNaN(n) && n > 0);
}

// Função para Alocar (First-Fit)
function alocarProcessoEstatico(nome, tamanho, listaParticoes) {
    // Procurar a primeira partição livre que pode acomodar o processo
    const particaoEncontrada = listaParticoes.find(bloco => 
        bloco.tipo === 'Livre' && 
        bloco.tamanho >= tamanho && 
        bloco.id.startsWith('P')
    );

    if (particaoEncontrada) {
        // Alocação
        particaoEncontrada.tipo = 'Processo';
        particaoEncontrada.cor = 'segmento-processo';
        particaoEncontrada.processo = { id: nome, tamanho: tamanho };
        
        // Cálculo da Fragmentação Interna
        particaoEncontrada.fragInterna = particaoEncontrada.tamanho - tamanho;
        return true; // Alocação bem-sucedida
    }
    return false; // Falha na alocação
}

// --- Função Principal de Simulação ---

function simularEstatica() {
    // 1. Ler e validar inputs
    memoriaTotal = parseFloat(document.getElementById('memoriaTotal').value);
    soTamanho = parseFloat(document.getElementById('soTamanho').value);
    const particoesEstaticas = parseInput(document.getElementById('inputParticoes').value);
    const processosIniciais = parseInput(document.getElementById('inputProcessos').value)
                                .map((tamanho, index) => ({ id: `P${index + 1}`, tamanho: tamanho })); // PA, PB, PC...

    if (isNaN(memoriaTotal) || memoriaTotal <= 0 || isNaN(soTamanho) || soTamanho >= memoriaTotal) {
        alert("Configurações de Memória Total e S.O. inválidas.");
        return;
    }
    if (particoesEstaticas.length === 0) {
        alert("Insira pelo menos um tamanho de partição.");
        return;
    }

    // 2. Inicializar Estrutura da Memória
    listaMemoria = [];
    let enderecoBaseAtual = 0;
    const totalParticoes = particoesEstaticas.reduce((acc, val) => acc + val, 0);

    // Bloco do Sistema Operacional
    listaMemoria.push({ 
        id: 'SO', tipo: 'SO', tamanho: soTamanho, cor: 'segment-so', nome: 'Sistema Operacional', base: 0 
    });
    enderecoBaseAtual = soTamanho;

    // Criar Partições de Usuário
    particoesEstaticas.forEach((tamanhoParticao, index) => {
        listaMemoria.push({
            id: `P${index + 1}`, 
            tipo: 'Livre', 
            tamanho: tamanhoParticao, 
            cor: 'segment-livre', 
            nome: `Partição ${index + 1}`,
            processo: null, 
            fragInterna: 0, 
            base: enderecoBaseAtual
        });
        enderecoBaseAtual += tamanhoParticao;
    });

    // Bloco Livre Remanescente (se houver)
    const livreRemanescente = memoriaTotal - enderecoBaseAtual;
    if (livreRemanescente > 0) {
        listaMemoria.push({ 
            id: 'LIVRE_REMANESCENTE', 
            tipo: 'Livre', 
            tamanho: livreRemanescente, 
            cor: 'segment-livre', 
            nome: 'Área Livre Remanescente',
            processo: null,
            fragInterna: 0,
            base: enderecoBaseAtual
        });
    } else if (enderecoBaseAtual > memoriaTotal) {
         alert(`Aviso: Ocupação (S.O. + Partições = ${enderecoBaseAtual.toFixed(1)} KB) excede a Memória Total (${memoriaTotal.toFixed(0)} KB).`);
    }

    // 3. Alocar Processos
    const partiçõesDeUsuário = listaMemoria.filter(b => b.id.startsWith('P'));
    let processosNaoAlocados = [];

    processosIniciais.forEach(p => {
        const alocado = alocarProcessoEstatico(p.id, p.tamanho, partiçõesDeUsuário);
        if (!alocado) {
            processosNaoAlocados.push(p);
        }
    });

    // 4. Atualizar Display e Resultados
    atualizarDisplayEstatica(processosNaoAlocados);
}

// --- Funções de Renderização e Cálculo (Adaptadas para Estática) ---

function atualizarDisplayEstatica(processosNaoAlocados) {
    let memoriaOcupada = soTamanho;
    let fragmentacaoInternaTotal = 0;
    let memoriaProcessos = 0;

    // Calcular métricas
    listaMemoria.filter(b => b.id.startsWith('P')).forEach(bloco => {
        if (bloco.processo) {
            memoriaProcessos += bloco.processo.tamanho;
            fragmentacaoInternaTotal += bloco.fragInterna;
        }
    });

    const livreRemanescente = listaMemoria.find(b => b.id === 'LIVRE_REMANESCENTE')?.tamanho || 0;
    const particoesLivres = listaMemoria.filter(b => b.id.startsWith('P') && !b.processo).reduce((sum, b) => sum + b.tamanho, 0);
    const memoriaLivreTotal = fragmentacaoInternaTotal + particoesLivres + livreRemanescente;
    
    const soPorcentagem = (soTamanho / memoriaTotal) * 100;

    // Gerar Tabela de Resultados do Exercício
    let tabelaResultado = `
        <h3>✅ Tabela de Resultados (Particionada Estática)</h3>
        <table>
            <thead>
                <tr>
                    <th>Partição</th>
                    <th>Tamanho (KB)</th>
                    <th>Processo Alocado</th>
                    <th>Tamanho Processo (KB)</th>
                    <th>Fragmentação Interna (KB)</th>
                </tr>
            </thead>
            <tbody>
    `;

    listaMemoria.filter(b => b.id.startsWith('P')).forEach(bloco => {
        tabelaResultado += `
            <tr>
                <td>${bloco.id}</td>
                <td>${bloco.tamanho.toFixed(0)}</td>
                <td>${bloco.processo ? bloco.processo.id : 'LIVRE'}</td>
                <td>${bloco.processo ? bloco.processo.tamanho.toFixed(0) : '0'}</td>
                <td>${bloco.fragInterna.toFixed(1)}</td>
            </tr>
        `;
    });
    
    tabelaResultado += `
            </tbody>
        </table>
        
        <h4>Sumário Final:</h4>
        <p><strong>Total de Processos Alocados:</strong> ${memoriaProcessos.toFixed(1)} KB</p>
        <p><strong>Fragmentação Interna Total:</strong> ${fragmentacaoInternaTotal.toFixed(1)} KB</p>
        <p><strong>Memória Livre Total:</strong> ${memoriaLivreTotal.toFixed(1)} KB</p>
    `;
    
    if (processosNaoAlocados.length > 0) {
        tabelaResultado += `<p style="color:red; font-weight:bold;">⚠️ Processos Não Alocados: ${processosNaoAlocados.map(p => `${p.id} (${p.tamanho}KB)`).join(', ')} (Não há partição adequada ou livre).</p>`;
    }


    // Atualizar Status Textual (Topo da Página)
    document.getElementById('statusMemoria').innerHTML = `
        <p><strong>Memória Total:</strong> ${memoriaTotal.toFixed(0)} KB</p>
        <p><strong>S.O. Ocupa:</strong> ${soTamanho.toFixed(0)} KB (${soPorcentagem.toFixed(1)}%)</p>
        <p><strong>Memória de Processos Ocupada:</strong> ${memoriaProcessos.toFixed(1)} KB</p>
        <p><strong>Fragmentação Interna:</strong> ${fragmentacaoInternaTotal.toFixed(1)} KB</p>
        <p><strong>Memória Livre Total:</strong> ${memoriaLivreTotal.toFixed(1)} KB</p>
    `;

    // Injetar a Tabela de Resultados na Explicação
    document.getElementById('explicacaoConteudo').innerHTML = tabelaResultado;


    // Atualizar Gráfico e Bloco Visual
    renderizarGraficoEstatica(memoriaProcessos, fragmentacaoInternaTotal, memoriaLivreTotal);
    renderizarSimulacaoVisualEstatica();
}

// Renderização Gráfica (Barra Horizontal)
function renderizarGraficoEstatica() {
    const grafico = document.getElementById('graficoMemoria');
    grafico.innerHTML = '';
    
    const totalProcessos = listaMemoria.filter(b => b.id.startsWith('P') && b.processo).reduce((sum, b) => sum + b.processo.tamanho, 0);
    const totalFragInterna = listaMemoria.filter(b => b.id.startsWith('P') && b.processo).reduce((sum, b) => sum + b.fragInterna, 0);
    const livreRemanescente = listaMemoria.find(b => b.id === 'LIVRE_REMANESCENTE')?.tamanho || 0;
    const particoesLivres = listaMemoria.filter(b => b.id.startsWith('P') && !b.processo).reduce((sum, b) => sum + b.tamanho, 0);
    
    const dadosGrafico = [
        { tamanho: soTamanho, cor: 'segment-so', nome: 'S.O.' },
        { tamanho: totalProcessos, cor: 'segment-processo', nome: 'Processos' },
        { tamanho: totalFragInterna + particoesLivres + livreRemanescente, cor: 'segment-livre', nome: 'Livre/Fragmentação' }
    ].filter(d => d.tamanho > 0.1);

    dadosGrafico.forEach(bloco => {
        const percentual = (bloco.tamanho / memoriaTotal) * 100;
        const segmento = document.createElement('div');
        segmento.className = `memory-bar-segment ${bloco.cor}`;
        segmento.style.width = `${percentual}%`;
        segmento.title = `${bloco.nome}: ${bloco.tamanho.toFixed(1)} KB`;
        if (percentual > 3) { 
             segmento.textContent = `${bloco.tamanho.toFixed(0)} Kb`;
        }
        grafico.appendChild(segmento);
    });
}


// Renderização Visual para Particionada Estática (Bloco Vertical)
function renderizarSimulacaoVisualEstatica() {
    const areaSimulacao = document.getElementById('areaSimulacao');
    areaSimulacao.innerHTML = '';
    
    const alturaTotalPx = 400; 

    listaMemoria.forEach(bloco => {
        const alturaProporcional = (bloco.tamanho / memoriaTotal) * alturaTotalPx; 
        
        const blocoDiv = document.createElement('div');
        let cssClass = '';
        let textoPrincipal = '';
        let textoSecundario = `${bloco.tamanho.toFixed(0)} KB`;
        
        if (bloco.tipo === 'SO') {
            cssClass = 'block-so';
            textoPrincipal = 'S.O.';
        } else if (bloco.id.startsWith('P')) {
            // Partição de Usuário
            if (bloco.processo) {
                cssClass = 'block-processo';
                textoPrincipal = `${bloco.id}: ${bloco.processo.id} (${bloco.processo.tamanho}KB)`;
                textoSecundario += ` | F.I.: ${bloco.fragInterna.toFixed(1)}KB`;
            } else {
                cssClass = 'block-livre';
                textoPrincipal = `${bloco.id} Livre`;
            }
        } else if (bloco.id === 'LIVRE_REMANESCENTE') {
            cssClass = 'block-livre';
            textoPrincipal = 'Livre Remanescente';
        }
        
        blocoDiv.className = `memory-block ${cssClass}`;
        blocoDiv.style.height = `${Math.max(20, alturaProporcional)}px`; 
        blocoDiv.style.border = bloco.id.startsWith('P') ? '1px solid #000' : 'none'; 
        
        const base = document.createElement('span');
        base.style.position = 'absolute';
        base.style.top = '-15px';
        base.style.left = '5px';
        base.style.fontSize = '0.7em';
        base.textContent = `Base: ${bloco.base.toFixed(0)} KB`;
        
        const strong = document.createElement('strong');
        strong.textContent = textoPrincipal;

        const small = document.createElement('small');
        small.textContent = textoSecundario;
        
        blocoDiv.style.position = 'relative'; // Para que a base fique absoluta em relação a ele
        
        // Adiciona a base address apenas para SO e Partições
        if (bloco.id !== 'LIVRE_REMANESCENTE') {
             blocoDiv.appendChild(base); 
        }

        blocoDiv.appendChild(strong);
        blocoDiv.appendChild(small);
        areaSimulacao.appendChild(blocoDiv);
    });
    
    const areaSim = document.getElementById('areaSimulacao');
    areaSim.style.position = 'relative'; 
    areaSim.style.paddingTop = '20px'; 
    areaSim.style.width = '250px';
}


// Chamada inicial (carrega a configuração padrão)
document.addEventListener('DOMContentLoaded', () => {
    // Esconder inputs de processo/liberação padrão que não são usados
    const genericInputs = document.querySelectorAll('.card .input-group:nth-child(4), .card .input-group:nth-child(5)');
    genericInputs.forEach(el => el.style.display = 'none');
    
    // Configuração Inicial de Memória (para mostrar algo ao carregar)
    document.getElementById('memoriaTotal').value = 128;
    document.getElementById('soTamanho').value = 38;
    document.getElementById('tipoGerenciamento').value = 'particionada_estatica';
    document.getElementById('tecnicaAtual').textContent = "Alocação Particionada Estática Realocável";
    
    simularEstatica();
});

// A função 'aplicarConfiguracao' agora apenas chama a simulação específica
function aplicarConfiguracao() {
    if (document.getElementById('tipoGerenciamento').value === 'particionada_estatica') {
        simularEstatica();
    } else {
        alert("A simulação interativa está configurada apenas para Particionada Estática. Altere a técnica no código JavaScript para outras simulações.");
    }
}