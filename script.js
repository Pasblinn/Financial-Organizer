class FinanceApp {
    constructor() {
        this.mesAtual = new Date().getMonth();
        this.anoAtual = new Date().getFullYear();
        this.dados = this.carregarDados();
        this.charts = {};
        this.init();
    }

    init() {
        this.initTheme();
        this.setupEventListeners();
        this.atualizarMesDisplay();
        this.atualizarResumo();
        this.renderizarEntradas();
        this.renderizarGastos();
        this.atualizarReservaEmergencia();
        this.initCharts();
    }

    setupEventListeners() {
        // Navegação de mês
        document.getElementById('mesAnterior').addEventListener('click', () => {
            this.mesAtual--;
            if (this.mesAtual < 0) {
                this.mesAtual = 11;
                this.anoAtual--;
            }
            this.atualizarMesDisplay();
            this.atualizarResumo();
            this.renderizarEntradas();
            this.renderizarGastos();
        });

        document.getElementById('mesProximo').addEventListener('click', () => {
            this.mesAtual++;
            if (this.mesAtual > 11) {
                this.mesAtual = 0;
                this.anoAtual++;
            }
            this.atualizarMesDisplay();
            this.atualizarResumo();
            this.renderizarEntradas();
            this.renderizarGastos();
        });

        // Tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.mostrarTab(tabName);
            });
        });

        // Modais
        document.getElementById('addEntrada').addEventListener('click', () => {
            document.getElementById('modalEntrada').style.display = 'block';
        });

        document.getElementById('addGasto').addEventListener('click', () => {
            document.getElementById('modalGasto').style.display = 'block';
        });

        // Fechar modais
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Fechar modal clicando fora
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Formulários
        document.getElementById('formEntrada').addEventListener('submit', (e) => {
            e.preventDefault();
            this.adicionarEntrada();
        });

        document.getElementById('formGasto').addEventListener('submit', (e) => {
            e.preventDefault();
            this.adicionarGasto();
        });

        // Reserva de emergência - event listener modificado
        document.getElementById('salvarMeta').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Botão salvar meta clicado');
            this.salvarMetaReserva();
        });

        // Tema
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Exportar dados
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportarDados();
        });

        // Event listeners para campos numéricos - abordagem simples
        this.setupSimpleNumericInputs();

    }

    mostrarTab(tabName) {
        // Remover classe active de todas as tabs
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Adicionar classe active na tab selecionada
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
    }

    atualizarMesDisplay() {
        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        document.getElementById('mesAtual').textContent = `${meses[this.mesAtual]} ${this.anoAtual}`;
    }

    getChaveMes() {
        return `${this.anoAtual}-${this.mesAtual.toString().padStart(2, '0')}`;
    }

    carregarDados() {
        const dadosSalvos = localStorage.getItem('financeApp-dados');
        if (dadosSalvos) {
            return JSON.parse(dadosSalvos);
        }
        return {
            meses: {},
            metaReserva: 10000
        };
    }

    salvarDados() {
        localStorage.setItem('financeApp-dados', JSON.stringify(this.dados));
    }

    adicionarEntrada() {
        const tipo = document.getElementById('tipoEntrada').value;
        const valorInput = document.getElementById('valorEntrada').value;
        const valor = this.parseValorBrasil(valorInput);
        const descricao = document.getElementById('descricaoEntrada').value || '';
        
        if (isNaN(valor) || valor <= 0) {
            alert('Por favor, insira um valor válido (ex: 1500,00)');
            return;
        }

        const chave = this.getChaveMes();
        if (!this.dados.meses[chave]) {
            this.dados.meses[chave] = { entradas: [], gastos: [] };
        }

        this.dados.meses[chave].entradas.push({
            id: Date.now(),
            tipo,
            valor,
            descricao,
            data: new Date().toISOString()
        });

        this.salvarDados();
        this.renderizarEntradas();
        this.atualizarResumo();
        
        // Limpar formulário e fechar modal
        document.getElementById('formEntrada').reset();
        document.getElementById('modalEntrada').style.display = 'none';
    }

    adicionarGasto() {
        const especificacao = document.getElementById('especificacaoGasto').value;
        const diaInput = document.getElementById('diaGasto').value;
        const dia = parseInt(diaInput);
        const tipo = document.getElementById('tipoGasto').value;
        const tipoCompra = document.getElementById('tipoCompra').value;
        const categoria = document.getElementById('categoriaGasto').value;
        const valorInput = document.getElementById('valorGasto').value;
        const valor = this.parseValorBrasil(valorInput);
        const pago = document.getElementById('pagoGasto').checked;
        const descricao = document.getElementById('descricaoGasto').value || '';
        
        if (isNaN(dia) || dia < 1 || dia > 31) {
            alert('Por favor, insira um dia válido (1-31)');
            return;
        }
        
        if (isNaN(valor) || valor <= 0) {
            alert('Por favor, insira um valor válido (ex: 250,50)');
            return;
        }

        const chave = this.getChaveMes();
        if (!this.dados.meses[chave]) {
            this.dados.meses[chave] = { entradas: [], gastos: [] };
        }

        this.dados.meses[chave].gastos.push({
            id: Date.now(),
            especificacao,
            dia,
            tipo,
            tipoCompra,
            categoria,
            valor,
            pago,
            descricao,
            data: new Date().toISOString()
        });

        // Se for reserva de emergência e estiver pago, adicionar ao total da reserva
        if (especificacao === 'reserva-emergencia' && pago) {
            this.dados.totalReserva = (this.dados.totalReserva || 0) + valor;
        }

        this.salvarDados();
        this.renderizarGastos();
        this.atualizarResumo();
        this.atualizarReservaEmergencia();
        
        // Limpar formulário e fechar modal
        document.getElementById('formGasto').reset();
        document.getElementById('modalGasto').style.display = 'none';
    }

    renderizarEntradas() {
        const chave = this.getChaveMes();
        const entradas = this.dados.meses[chave]?.entradas || [];
        const lista = document.getElementById('listaEntradas');

        if (entradas.length === 0) {
            lista.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 40px;">Nenhuma entrada cadastrada para este mês</p>';
            return;
        }

        lista.innerHTML = entradas.map(entrada => `
            <div class="item-lista">
                <div class="item-info">
                    <h4>${this.formatarTipoEntrada(entrada.tipo)}</h4>
                    <p>${entrada.descricao}</p>
                    <div class="item-tags">
                        <span class="tag">${entrada.tipo}</span>
                    </div>
                </div>
                <div class="item-valor entrada">+R$ ${entrada.valor.toFixed(2)}</div>
                <div class="item-acoes">
                    <button class="btn-pequeno btn-remover" onclick="app.removerEntrada('${chave}', ${entrada.id})">Remover</button>
                </div>
            </div>
        `).join('');
    }

    renderizarGastos() {
        const chave = this.getChaveMes();
        const gastos = this.dados.meses[chave]?.gastos || [];
        const lista = document.getElementById('listaGastos');

        if (gastos.length === 0) {
            lista.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 40px;">Nenhum gasto cadastrado para este mês</p>';
            return;
        }

        // Ordenar por dia
        gastos.sort((a, b) => a.dia - b.dia);

        lista.innerHTML = gastos.map(gasto => `
            <div class="item-lista">
                <div class="item-info">
                    <h4>${gasto.descricao || this.formatarCategoria(gasto.categoria)} (Dia ${gasto.dia}) ${gasto.programado ? '🗓️ Programado' : ''}</h4>
                    <p>
                        <span class="${gasto.pago ? 'status-pago' : 'status-pendente'}">
                            ${gasto.pago ? '✓ Pago' : '⏳ Pendente'}
                        </span>
                        ${gasto.programado ? '<span class="status-programado">📋 Programado</span>' : ''}
                    </p>
                    <div class="item-tags">
                        <span class="tag">${gasto.especificacao}</span>
                        <span class="tag">${gasto.tipo}</span>
                        <span class="tag">${gasto.tipoCompra}</span>
                        <span class="tag categoria-${gasto.categoria}">${this.formatarCategoria(gasto.categoria)}</span>
                    </div>
                </div>
                <div class="item-valor saida">-R$ ${gasto.valor.toFixed(2)}</div>
                <div class="item-acoes">
                    <button class="btn-pequeno btn-editar" onclick="app.togglePago('${chave}', ${gasto.id})">
                        ${gasto.pago ? 'Marcar Pendente' : 'Marcar Pago'}
                    </button>
                    <button class="btn-pequeno btn-programar" onclick="app.programarGastoExistente('${chave}', ${gasto.id})">📅 Próximo Mês</button>
                    <button class="btn-pequeno btn-remover" onclick="app.removerGasto('${chave}', ${gasto.id})">Remover</button>
                </div>
            </div>
        `).join('');
    }

    atualizarResumo() {
        const chave = this.getChaveMes();
        const dados = this.dados.meses[chave] || { entradas: [], gastos: [] };

        const totalEntradas = dados.entradas.reduce((sum, entrada) => sum + entrada.valor, 0);
        const totalSaidas = dados.gastos.reduce((sum, gasto) => sum + gasto.valor, 0);
        const saldoFinal = totalEntradas - totalSaidas;

        document.getElementById('totalEntradas').textContent = `R$ ${totalEntradas.toFixed(2)}`;
        document.getElementById('totalSaidas').textContent = `R$ ${totalSaidas.toFixed(2)}`;
        document.getElementById('saldoFinal').textContent = `R$ ${saldoFinal.toFixed(2)}`;
        document.getElementById('totalReserva').textContent = `R$ ${(this.dados.totalReserva || 0).toFixed(2)}`;
        document.getElementById('metaReserva').textContent = `R$ ${this.dados.metaReserva.toFixed(2)}`;

        // NÃO ALTERAR NADA NO CARD DO SALDO - DEIXAR COMO ESTÁ NO HTML
    }

    atualizarReservaEmergencia() {
        const totalReserva = this.dados.totalReserva || 0;
        const metaReserva = this.dados.metaReserva || 0;
        
        const progressoPercent = metaReserva > 0 ? Math.min((totalReserva / metaReserva) * 100, 100) : 0;
        
        document.getElementById('progressFill').style.width = `${progressoPercent}%`;
        document.getElementById('progressoAtual').textContent = `${Math.round(progressoPercent)}%`;
        document.getElementById('metaReservaInput').value = this.formatarValorBrasil(metaReserva);
    }

    salvarMetaReserva() {
        // NOVA VERSÃO COMPLETAMENTE ISOLADA E FUNCIONAL
        try {
            const metaInput = document.getElementById('metaReservaInput');
            if (!metaInput) return;
            
            const valorInput = metaInput.value;
            console.log('Valor do input:', valorInput);
            
            if (!valorInput || valorInput.trim() === '') {
                console.log('Valor vazio');
                return;
            }
            
            const novaMeta = this.parseValorBrasil(valorInput);
            console.log('Nova meta processada:', novaMeta);
            
            if (!isNaN(novaMeta) && novaMeta > 0) {
                // Salvar apenas os dados essenciais
                this.dados.metaReserva = novaMeta;
                
                // Salvar no localStorage de forma isolada
                try {
                    localStorage.setItem('financeApp-dados', JSON.stringify(this.dados));
                    console.log('Meta salva com sucesso:', novaMeta);
                    
                    // Atualizar só o display do valor na tela de resumo
                    const metaReservaDisplay = document.getElementById('metaReserva');
                    if (metaReservaDisplay) {
                        metaReservaDisplay.textContent = `R$ ${novaMeta.toFixed(2).replace('.', ',')}`;
                    }
                    
                    // Mostrar mensagem de sucesso SEM ALERT
                    this.mostrarNotificacao('Meta de reserva atualizada com sucesso!', 'sucesso');
                    
                } catch (error) {
                    console.error('Erro ao salvar:', error);
                    this.mostrarNotificacao('Erro ao salvar a meta. Tente novamente.', 'erro');
                }
                
            } else {
                console.log('Valor inválido:', novaMeta);
                this.mostrarNotificacao('Por favor, insira um valor válido para a meta (ex: 10000,00)', 'aviso');
            }
            
        } catch (error) {
            console.error('Erro na função salvarMetaReserva:', error);
        }
    }

    // Notificação visual que NÃO interfere com modais
    mostrarNotificacao(mensagem, tipo) {
        // Remover notificação anterior se existir
        const notificacaoExistente = document.getElementById('notificacao-temp');
        if (notificacaoExistente) {
            notificacaoExistente.remove();
        }

        // Criar elemento de notificação
        const notif = document.createElement('div');
        notif.id = 'notificacao-temp';
        notif.style.position = 'fixed';
        notif.style.top = '20px';
        notif.style.right = '20px';
        notif.style.padding = '12px 20px';
        notif.style.borderRadius = '4px';
        notif.style.color = 'white';
        notif.style.fontWeight = 'bold';
        notif.style.zIndex = '10000';
        notif.style.fontSize = '14px';
        notif.style.maxWidth = '300px';
        notif.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        
        // Cores baseadas no tipo
        if (tipo === 'sucesso') {
            notif.style.backgroundColor = '#27ae60';
        } else if (tipo === 'erro') {
            notif.style.backgroundColor = '#e74c3c';
        } else if (tipo === 'aviso') {
            notif.style.backgroundColor = '#f39c12';
        }
        
        notif.textContent = mensagem;
        
        // Adicionar à página
        document.body.appendChild(notif);
        
        // Remover após 3 segundos
        setTimeout(() => {
            if (notif && notif.parentNode) {
                notif.remove();
            }
        }, 3000);
    }

    removerEntrada(chave, id) {
        if (confirm('Deseja realmente remover esta entrada?')) {
            this.dados.meses[chave].entradas = this.dados.meses[chave].entradas.filter(e => e.id !== id);
            this.salvarDados();
            this.renderizarEntradas();
            this.atualizarResumo();
        }
    }

    removerGasto(chave, id) {
        if (confirm('Deseja realmente remover este gasto?')) {
            const gasto = this.dados.meses[chave].gastos.find(g => g.id === id);
            
            // Se era uma reserva de emergência paga, subtrair do total
            if (gasto && gasto.especificacao === 'reserva-emergencia' && gasto.pago) {
                this.dados.totalReserva = (this.dados.totalReserva || 0) - gasto.valor;
            }
            
            this.dados.meses[chave].gastos = this.dados.meses[chave].gastos.filter(g => g.id !== id);
            this.salvarDados();
            this.renderizarGastos();
            this.atualizarResumo();
            this.atualizarReservaEmergencia();
            this.atualizarGraficos();
        }
    }

    togglePago(chave, id) {
        const gasto = this.dados.meses[chave].gastos.find(g => g.id === id);
        if (gasto) {
            gasto.pago = !gasto.pago;
            
            // Atualizar reserva de emergência se necessário
            if (gasto.especificacao === 'reserva-emergencia') {
                if (gasto.pago) {
                    this.dados.totalReserva = (this.dados.totalReserva || 0) + gasto.valor;
                } else {
                    this.dados.totalReserva = (this.dados.totalReserva || 0) - gasto.valor;
                }
            }
            
            this.salvarDados();
            this.renderizarGastos();
            this.atualizarResumo();
            this.atualizarReservaEmergencia();
            this.atualizarGraficos();
        }
    }

    formatarTipoEntrada(tipo) {
        const tipos = {
            'salario': 'Salário',
            'ganhos-fora': 'Ganhos por Fora',
            'juros-recebidos': 'Juros Recebidos',
            'emprestado': 'Emprestado'
        };
        return tipos[tipo] || tipo;
    }

    formatarCategoria(categoria) {
        const categorias = {
            'academia': 'Academia',
            'alimentacao': 'Alimentação',
            'uber': 'Uber',
            'mercado': 'Mercado',
            'parcela': 'Parcela',
            'contas': 'Contas',
            'assinatura': 'Assinatura',
            'vestuario': 'Vestuário e Acessórios',
            'restaurante': 'Restaurante',
            'lazer': 'Lazer',
            'fatura': 'Fatura'
        };
        return categorias[categoria] || categoria;
    }

    // Utilitário para valores brasileiros
    parseValorBrasil(valor) {
        if (!valor) return 0;
        // Remove espaços e converte vírgula para ponto
        const valorLimpo = valor.toString().replace(/\s/g, '').replace(',', '.');
        return parseFloat(valorLimpo);
    }

    formatarValorBrasil(valor) {
        return valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Configuração simples para campos numéricos - versão ultra simples
    setupSimpleNumericInputs() {
        // APENAS para campo de reserva de emergência - sem interferir nos modais
        const metaReservaInput = document.getElementById('metaReservaInput');
        if (metaReservaInput) {
            metaReservaInput.addEventListener('keydown', (e) => {
                // Permitir tudo exceto letras normais
                if ((e.keyCode >= 65 && e.keyCode <= 90) && !e.ctrlKey) {
                    e.preventDefault();
                }
            });
            
            metaReservaInput.addEventListener('input', (e) => {
                let value = e.target.value;
                value = value.replace(/\./g, ',');
                const parts = value.split(',');
                if (parts.length > 2) {
                    value = parts[0] + ',' + parts.slice(1).join('');
                }
                if (parts[1] && parts[1].length > 2) {
                    value = parts[0] + ',' + parts[1].substring(0, 2);
                }
                e.target.value = value;
            });

            metaReservaInput.addEventListener('focus', (e) => {
                if (e.target.value === '0,00' || e.target.value === '10000,00') {
                    e.target.value = '';
                }
            });
        }

        // Para campos dos modais - deixar funcionarem normalmente
        // REMOVER TODAS as validações que estavam interferindo
    }


    // Tema escuro/claro
    initTheme() {
        const savedTheme = this.dados.theme || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        this.dados.theme = newTheme;
        this.salvarDados();
        this.updateThemeIcon(newTheme);
        
        // Atualizar gráficos com novo tema
        setTimeout(() => {
            this.destroyCharts();
            this.initCharts();
        }, 100);
    }

    updateThemeIcon(theme) {
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    // Gráficos
    initCharts() {
        this.createEvolucaoChart();
        this.atualizarGraficos();
    }

    destroyCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }

    getChartColors() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        return {
            background: isDark ? '#3d3d3d' : '#ffffff',
            text: isDark ? '#ffffff' : '#333333',
            grid: isDark ? '#4a4a4a' : '#ecf0f1',
            colors: ['#3498db', '#e74c3c', '#f39c12', '#27ae60', '#9b59b6', '#e67e22', '#1abc9c', '#34495e']
        };
    }

    createEvolucaoChart() {
        const ctx = document.getElementById('chartEvolucao');
        if (!ctx) return;

        const colors = this.getChartColors();
        const dadosEvolucao = this.getDadosEvolucao();

        this.charts.evolucao = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dadosEvolucao.labels,
                datasets: [{
                    label: 'Entradas',
                    data: dadosEvolucao.entradas,
                    borderColor: colors.colors[3],
                    backgroundColor: colors.colors[3] + '20',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Saídas',
                    data: dadosEvolucao.saidas,
                    borderColor: colors.colors[1],
                    backgroundColor: colors.colors[1] + '20',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Saldo',
                    data: dadosEvolucao.saldos,
                    borderColor: colors.colors[0],
                    backgroundColor: colors.colors[0] + '20',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: colors.text
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: colors.text,
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        },
                        grid: {
                            color: colors.grid
                        }
                    },
                    x: {
                        ticks: {
                            color: colors.text
                        },
                        grid: {
                            color: colors.grid
                        }
                    }
                }
            }
        });
    }

    getDadosEvolucao() {
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const dados = { labels: [], entradas: [], saidas: [], saldos: [] };
        
        // Pegar os últimos 6 meses
        for (let i = 5; i >= 0; i--) {
            let mes = this.mesAtual - i;
            let ano = this.anoAtual;
            
            if (mes < 0) {
                mes += 12;
                ano--;
            }
            
            const chave = `${ano}-${mes.toString().padStart(2, '0')}`;
            const dadosMes = this.dados.meses[chave] || { entradas: [], gastos: [] };
            
            const totalEntradas = dadosMes.entradas.reduce((sum, e) => sum + e.valor, 0);
            const totalSaidas = dadosMes.gastos.reduce((sum, g) => sum + g.valor, 0);
            const saldo = totalEntradas - totalSaidas;
            
            dados.labels.push(meses[mes]);
            dados.entradas.push(totalEntradas);
            dados.saidas.push(totalSaidas);
            dados.saldos.push(saldo);
        }
        
        return dados;
    }

    atualizarGraficos() {
        this.atualizarGraficoCategorias();
        this.atualizarGraficoEntradas();
        this.atualizarGraficoEssencial();
        this.atualizarGraficoPagamento();
        
        // Atualizar gráfico de evolução
        if (this.charts.evolucao) {
            const dadosEvolucao = this.getDadosEvolucao();
            this.charts.evolucao.data.labels = dadosEvolucao.labels;
            this.charts.evolucao.data.datasets[0].data = dadosEvolucao.entradas;
            this.charts.evolucao.data.datasets[1].data = dadosEvolucao.saidas;
            this.charts.evolucao.data.datasets[2].data = dadosEvolucao.saldos;
            this.charts.evolucao.update();
        }
    }

    atualizarGraficoCategorias() {
        const ctx = document.getElementById('chartCategorias');
        if (!ctx) return;

        const chave = this.getChaveMes();
        const gastos = this.dados.meses[chave]?.gastos || [];
        
        const categorias = {};
        gastos.forEach(gasto => {
            categorias[gasto.categoria] = (categorias[gasto.categoria] || 0) + gasto.valor;
        });

        const colors = this.getChartColors();
        
        if (this.charts.categorias) {
            this.charts.categorias.destroy();
        }

        this.charts.categorias = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(categorias).map(cat => this.formatarCategoria(cat)),
                datasets: [{
                    data: Object.values(categorias),
                    backgroundColor: colors.colors
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: colors.text,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                return context.label + ': R$ ' + value.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2
                                });
                            }
                        }
                    }
                }
            }
        });
    }

    atualizarGraficoEntradas() {
        const ctx = document.getElementById('chartEntradas');
        if (!ctx) return;

        const chave = this.getChaveMes();
        const entradas = this.dados.meses[chave]?.entradas || [];
        
        const tipos = {};
        entradas.forEach(entrada => {
            tipos[entrada.tipo] = (tipos[entrada.tipo] || 0) + entrada.valor;
        });

        const colors = this.getChartColors();
        
        if (this.charts.entradas) {
            this.charts.entradas.destroy();
        }

        this.charts.entradas = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(tipos).map(tipo => this.formatarTipoEntrada(tipo)),
                datasets: [{
                    data: Object.values(tipos),
                    backgroundColor: colors.colors
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: colors.text,
                            padding: 15
                        }
                    }
                }
            }
        });
    }

    atualizarGraficoEssencial() {
        const ctx = document.getElementById('chartEssencial');
        if (!ctx) return;

        const chave = this.getChaveMes();
        const gastos = this.dados.meses[chave]?.gastos || [];
        
        const tipos = { essencial: 0, 'nao-essencial': 0 };
        gastos.forEach(gasto => {
            tipos[gasto.tipo] = (tipos[gasto.tipo] || 0) + gasto.valor;
        });

        const colors = this.getChartColors();
        
        if (this.charts.essencial) {
            this.charts.essencial.destroy();
        }

        this.charts.essencial = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Essencial', 'Não Essencial'],
                datasets: [{
                    data: [tipos.essencial, tipos['nao-essencial']],
                    backgroundColor: [colors.colors[3], colors.colors[1]]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: colors.text
                        }
                    }
                }
            }
        });
    }

    atualizarGraficoPagamento() {
        const ctx = document.getElementById('chartPagamento');
        if (!ctx) return;

        const chave = this.getChaveMes();
        const gastos = this.dados.meses[chave]?.gastos || [];
        
        const tipos = {};
        gastos.forEach(gasto => {
            tipos[gasto.tipoCompra] = (tipos[gasto.tipoCompra] || 0) + gasto.valor;
        });

        const colors = this.getChartColors();
        
        if (this.charts.pagamento) {
            this.charts.pagamento.destroy();
        }

        const labels = {
            'pix': 'PIX/Dinheiro',
            'debito': 'Débito',
            'credito': 'Crédito',
            'investimento': 'Investimento'
        };

        this.charts.pagamento = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(tipos).map(tipo => labels[tipo] || tipo),
                datasets: [{
                    data: Object.values(tipos),
                    backgroundColor: colors.colors
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: colors.text
                        }
                    }
                }
            }
        });
    }

    // Exportar dados
    exportarDados() {
        const dadosExport = {
            ...this.dados,
            exportadoEm: new Date().toISOString(),
            versao: '1.0.0'
        };
        
        const blob = new Blob([JSON.stringify(dadosExport, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `financas-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Dados exportados com sucesso!');
    }

    programarGastoExistente(chave, gastoId) {
        const gasto = this.dados.meses[chave].gastos.find(g => g.id === gastoId);
        if (!gasto) return;

        if (confirm(`Deseja programar este gasto (${gasto.descricao || this.formatarCategoria(gasto.categoria)}) para o próximo mês?`)) {
            // Calcular o próximo mês
            let proximoMes = this.mesAtual + 1;
            let proximoAno = this.anoAtual;
            
            if (proximoMes > 11) {
                proximoMes = 0;
                proximoAno++;
            }

            const chaveProximoMes = `${proximoAno}-${proximoMes.toString().padStart(2, '0')}`;
            
            if (!this.dados.meses[chaveProximoMes]) {
                this.dados.meses[chaveProximoMes] = { entradas: [], gastos: [] };
            }

            // Criar uma cópia do gasto para o próximo mês
            this.dados.meses[chaveProximoMes].gastos.push({
                id: Date.now(),
                especificacao: gasto.especificacao,
                dia: gasto.dia,
                tipo: gasto.tipo,
                tipoCompra: gasto.tipoCompra,
                categoria: gasto.categoria,
                valor: gasto.valor,
                pago: false, // Gastos programados sempre começam como não pagos
                descricao: gasto.descricao,
                data: new Date().toISOString(),
                programado: true // Marcar como gasto programado
            });

            this.salvarDados();
            
            const meses = [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];
            
            alert(`Gasto programado para ${meses[proximoMes]} ${proximoAno} com sucesso!`);
        }
    }
}

// Inicializar app
const app = new FinanceApp();