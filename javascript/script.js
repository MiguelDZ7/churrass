/* script.js — cardápio, reserva e carrinho
   Estrutura modular e mais "humana" nas mensagens.
*/
(() => {
    // ===== Utils =====
    const fmtBRL = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
  
    // ===== Dados do cardápio (pode ser extraído pra JSON futuramente) =====
    const pratos = {
      entradas: [
        { nome: "Bruschetta", preco: 14, img: "../img/bruscheta.jpg", desc: "Pão crocante, tomate, manjericão e azeite." },
        { nome: "Mini Coxinha", preco: 12, img: "../img/coxinha.jpeg", desc: "Croquete clássico — recheio suculento." },
        { nome: "Tábua de Frios", preco: 12, img: "../img/tabuadefrios.jpg", desc: "Servido com arroz e batata palha crocante." },
        { nome: "Bolinho de Bacalhau", preco: 12, img: "../img/bolinhodebacalhau.jpg", desc: "Bolinho crocante e gostoso." },
        { nome: "Pastel de Queijo", preco: 12, img: "../img/pasteldequeijo.jpeg", desc: "Crocante e bastante queijo." },
        { nome: "Pão de Alho", preco: 10, img: "../img/pãodealho.jpg", desc: "Manteiga de ervas e queijo gratinado." }
      ],
      principais: [
        { nome: "Feijoada Completa", preco: 35, img: "../img/feijoada.jpg", desc: "Servida com arroz, farofa e laranja." },
        { nome: "Frango à Parmegiana", preco: 12, img: "../img/frangoparmegiana.jpeg", desc: "Servido com arroz e batata palha crocante." },
        { nome: "Peixe Grelhado", preco: 32, img: "../img/peixegrelhado.jpg", desc: "Filé fresco, legumes na manteiga." },
        { nome: "Estrogonofe de Carne", preco: 12, img: "../img/Estrogonofedecarne.jpg", desc: "Servido com arroz e batata palha crocante." },
        { nome: "Risoto de Camarão", preco: 12, img: "../img/risotocamaron.jpg", desc: "Servido com arroz e batata palha crocante." },
        { nome: "Frango Grelhado", preco: 12, img: "../img/frangogrelhado.jpeg", desc: "Servido com arroz e batata palha crocante." },
        { nome: "Carne de Panela", preco: 12, img: "../img/carnedepanela.jpg", desc: "Servido com arroz e batata palha crocante." },
        { nome: "Bife Acebolado", preco: 12, img: "../img/bife-acebolado2.webp", desc: "Servido com arroz e batata palha crocante." }
      ],
      massas: [
        { nome: "Lasanha à Bolonhesa", preco: 35, img: "../img/lasanha.jpg", desc: "Molho ragu caseiro e queijo gratinado." }
      ],
      carnes: [
        { nome: "Picanha na Chapa", preco: 45, img: "../img/picanha.jpeg", desc: "Ponto perfeito, acompanhamentos à escolha." }
      ],
      sobremesas: [
        { nome: "Pudim de Leite", preco: 12, img: "../img/pedaçopudim.jpg", desc: "Cremoso, com calda na medida certa." }
      ],
      bebidas: [
        { nome: "Coca-Cola (lata)", preco: 8, img: "../img/coca.webp", desc: "Gelada, 350ml." },
        { nome: "Água Mineral", preco: 4, img: "https://images.unsplash.com/photo-1524593119776-1996bdb0a07c", desc: "500ml" }
      ]
    };
  
    // ===== Render do cardápio =====
    const renderCardapio = () => {
      Object.keys(pratos).forEach(categoria => {
        const secao = document.querySelector(`#${categoria} .menu`);
        if (!secao) return;
        pratos[categoria].forEach(item => {
          const el = document.createElement('article');
          el.className = 'item';
          el.innerHTML = `
            <img src="${item.img}" alt="${item.nome}">
            <h3>${item.nome}</h3>
            <p class="desc">${item.desc || ''}</p>
            <div class="price">${fmtBRL(item.preco)}</div>
            <div style="display:flex;gap:.5rem;margin-top:.5rem">
              <button class="btn add" data-n="${item.nome}" data-p="${item.preco}">Adicionar</button>
              <button class="secondary" onclick="alert('Descrição: ${item.desc || 'Sem descrição.'}')">Detalhes</button>
            </div>
          `;
          secao.appendChild(el);
        });
      });
    };
  
    // ===== Carrinho =====
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let total = parseFloat(localStorage.getItem('total')) || 0;
  
    const listaCarrinho = document.getElementById('listaCarrinho');
    const totalEl = document.getElementById('total');
  
    const salvarCarrinho = () => {
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      localStorage.setItem('total', total);
    };
  
    const atualizarUI = () => {
      // Lista
      listaCarrinho.innerHTML = '';
      if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<li>Seu carrinho está vazio. 😊</li>';
      } else {
        carrinho.forEach((item, i) => {
          const li = document.createElement('li');
          li.innerHTML = `
            <span>${item.nome} <small style="color:#666"> — ${fmtBRL(item.preco)}</small></span>
            <span>
              <button class="secondary" data-i="${i}" aria-label="Remover ${item.nome}">Remover</button>
            </span>
          `;
          listaCarrinho.appendChild(li);
        });
      }
      totalEl.textContent = `Total: ${fmtBRL(total)}`;
      salvarCarrinho();
    };
  
    // Eventos delegados
    document.addEventListener('click', (e) => {
      if (e.target.matches('.add')) {
        const nome = e.target.dataset.n;
        const preco = parseFloat(e.target.dataset.p);
        adicionarAoCarrinho(nome, preco);
      }
  
      if (e.target.matches('#finalizar')) {
        if (carrinho.length === 0) {
          alert('Carrinho vazio — adicione itens antes de finalizar.');
          return;
        }
        // salva e vai para checkout
        salvarCarrinho();
        window.location.href = 'checkout.html';
      }
  
      if (e.target.matches('#limparCarrinho')) {
        if (!confirm('Tem certeza que deseja limpar o carrinho?')) return;
        carrinho = [];
        total = 0;
        atualizarUI();
      }
  
      if (e.target.matches('.cart-list button') || e.target.matches('#listaCarrinho button') || e.target.closest('#listaCarrinho button')) {
        const btn = e.target.closest('button');
        const idx = Number(btn.dataset.i);
        if (!Number.isNaN(idx)) {
          const item = carrinho[idx];
          total = Math.max(0, total - item.preco);
          carrinho.splice(idx, 1);
          atualizarUI();
        }
      }
    });
  
    const adicionarAoCarrinho = (nome, preco) => {
      carrinho.push({ nome, preco });
      total += preco;
      atualizarUI();
      // feedback simples
      const old = document.getElementById('mensagem');
      if (old) {
        old.textContent = `Adicionado ${nome} ao carrinho — ${fmtBRL(preco)}.`;
        old.className = 'mensagem sucesso';
        setTimeout(()=> { if (old) old.textContent = '' }, 2500);
      }
    };
  
    // ===== Reserva (mensagens mais humanas) =====
    document.getElementById('reservaForm').addEventListener('submit', (ev) => {
      ev.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const data = document.getElementById('data').value;
      const hora = document.getElementById('hora').value;
      const pessoas = document.getElementById('pessoas').value;
      const msgEl = document.getElementById('mensagem');
  
      if (!nome || !telefone || !data || !hora || !pessoas) {
        msgEl.textContent = 'Ops — preencha todos os campos para confirmar a reserva.';
        msgEl.className = 'mensagem erro';
        return;
      }
  
      const dt = new Date(`${data}T${hora}`);
      const dataFmt = dt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
      const horaFmt = dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
      msgEl.innerHTML = `
        🎉 Reserva confirmada!<br>
        <strong>${nome}</strong>, sua mesa para <strong>${pessoas}</strong> pessoa(s) está marcada para
        <strong>${dataFmt}</strong> às <strong>${horaFmt}</strong>.<br>
        Entraremos em contato pelo número <strong>${telefone}</strong> se precisarmos confirmar algo.
      `;
      msgEl.className = 'mensagem sucesso';
      ev.target.reset();
    });
  
    // ===== Menu toggle mobile =====
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        mainNav.style.display = expanded ? 'none' : 'flex';
      });
    }
  
    // ===== Inicialização =====
    const init = () => {
      renderCardapio();
      atualizarUI();
      document.getElementById('ano').textContent = new Date().getFullYear();
    };
  
    // expõe uma função global para usar em template (remover se preferir)
    window.adicionarAoCarrinho = adicionarAoCarrinho;
  
    init();
  })();
  