/* detalhes.js — página de informações de um prato */
document.addEventListener("DOMContentLoaded", () => {
    const nome = localStorage.getItem("detNome");
    const desc = localStorage.getItem("detDesc");
    const preco = parseFloat(localStorage.getItem("detPreco"));
    const img = localStorage.getItem("detImg");
  
    // Preenche informações
    if (nome) {
      document.getElementById("detalheNome").textContent = nome;
      document.getElementById("detalheDesc").textContent = desc || "Delicioso prato preparado com ingredientes frescos.";
      document.getElementById("detalhePreco").textContent = `Preço: R$ ${preco.toFixed(2)}`;
      document.getElementById("detalheImg").src = img;
    } else {
      document.getElementById("detalheContainer").innerHTML = "<p>❌ Nenhum prato selecionado.</p>";
      return;
    }
  
    // Botão adicionar ao carrinho
    document.getElementById("btnAddCarrinho").addEventListener("click", () => {
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      let total = parseFloat(localStorage.getItem("total")) || 0;
  
      carrinho.push({ nome, preco });
      total += preco;
  
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      localStorage.setItem("total", total);
  
      alert(`✅ ${nome} adicionado ao carrinho!`);
    });
  
    // Sugestões de pratos aleatórios (exemplo simples)
    const pratosSugeridos = JSON.parse(localStorage.getItem("todosPratos")) || [];
    const sugestoes = document.getElementById("sugestoes");
  
    pratosSugeridos
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .forEach((p) => {
        const card = document.createElement("div");
        card.className = "item";
        card.innerHTML = `
          <img src="${p.img}" alt="${p.nome}">
          <h3>${p.nome}</h3>
          <p class="desc">${p.desc}</p>
          <p class="price">R$ ${p.preco.toFixed(2)}</p>
          <button onclick="abrirDetalhes('${p.nome}')">Ver Detalhes</button>
        `;
        sugestoes.appendChild(card);
      });
  
    document.getElementById("ano").textContent = new Date().getFullYear();
  });
  
  // função global para voltar a abrir outro prato
  function abrirDetalhes(nome) {
    const todos = JSON.parse(localStorage.getItem("todosPratos")) || [];
    const prato = todos.find((p) => p.nome === nome);
    if (prato) {
      localStorage.setItem("detNome", prato.nome);
      localStorage.setItem("detDesc", prato.desc);
      localStorage.setItem("detPreco", prato.preco);
      localStorage.setItem("detImg", prato.img);
      window.location.href = "detalhes.html";
    }
  }
  