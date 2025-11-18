document.addEventListener("DOMContentLoaded", () => {
    // Dados do pedido (simulação)
    const pedido = [
      { nome: "Churrasco Completo", quantidade: 1, preco: 59.90 },
      { nome: "Arroz à Grega", quantidade: 2, preco: 19.90 },
      { nome: "Suco Natural", quantidade: 3, preco: 7.50 }
    ];
  
    // Exibe o resumo do pedido
    const listaResumo = document.getElementById("listaResumo");
    const totalResumo = document.getElementById("totalResumo");
  
    function exibirResumoPedido() {
      let total = 0;
      pedido.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.quantidade}x ${item.nome} - R$ ${item.preco.toFixed(2)}`;
        listaResumo.appendChild(li);
        total += item.quantidade * item.preco;
      });
      totalResumo.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
  
    exibirResumoPedido();
  
    // Exibir detalhes de pagamento conforme a escolha
    const botoesPagamento = document.querySelectorAll(".btn-pagamento");
    const detalhesPagamento = document.getElementById("detalhesPagamento");
  
    botoesPagamento.forEach(button => {
      button.addEventListener("click", () => {
        const metodo = button.getAttribute("data-pag");
        mostrarDetalhesPagamento(metodo);
      });
    });
  
    function mostrarDetalhesPagamento(metodo) {
      detalhesPagamento.innerHTML = ""; // Limpa o conteúdo anterior
      const descricao = document.createElement("p");
  
      switch (metodo) {
        case "pix":
          descricao.textContent = "Escolha o seu banco e faça o pagamento via Pix. O código de pagamento será gerado após a confirmação.";
          break;
        case "cartao":
          descricao.textContent = "Informe os dados do seu cartão de crédito para realizar o pagamento.";
          break;
        case "dinheiro":
          descricao.textContent = "Você poderá pagar com dinheiro no momento da entrega.";
          break;
        default:
          descricao.textContent = "Escolha uma forma de pagamento.";
      }
      detalhesPagamento.appendChild(descricao);
    }
  
    // Modal de sucesso
    const modalSucesso = document.getElementById("modal-sucesso");
    const fecharModal = document.getElementById("fecharModal");
    const voltarMenu = document.getElementById("voltarMenu");
  
    function mostrarModal() {
      modalSucesso.style.display = "flex";
    }
  
    fecharModal.addEventListener("click", () => {
      modalSucesso.style.display = "none";
    });
  
    voltarMenu.addEventListener("click", () => {
      window.location.href = "./index.html"; // Volta ao cardápio
    });
  
    // Simulação do processo de pagamento
    function confirmarPedido() {
      mostrarModal();
    }
  
    // Adicionar um botão para confirmar o pedido
    const btnConfirmar = document.createElement("button");
    btnConfirmar.classList.add("btn");
    btnConfirmar.textContent = "Confirmar Pedido";
    btnConfirmar.addEventListener("click", confirmarPedido);
    document.body.appendChild(btnConfirmar);
  });
  