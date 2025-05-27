let consultarBtn = document.getElementById('consultar')
let res = document.getElementById('res')

consultarBtn.addEventListener('click', (e) => {
    e.preventDefault()

    let id = document.getElementById('id').value

    if (!id) {
        res.innerHTML = 'Por favor, insira um ID válido.'
        return
    }

    fetch(`http://localhost:8081/produto/${id}`, {
        method: 'GET'
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Produto com ID ${id} não encontrado (Status: ${resp.status})`)
        return resp.json()
    })
    .then(produto => {
        console.log('Produto encontrado:', produto)
        res.innerHTML = `
        <table class="preview-tabela">
          <tr><th>Nome</th><td>${produto.nome}</td></tr>
          <tr><th>Preço</th><td>R$ ${produto.preco}</td></tr>
          <tr><th>Quantidade</th><td>${produto.quantidade}</td></tr>
          <tr><th>Descrição</th><td>${produto.descricao}</td></tr>
          <tr><th>Marca</th><td>${produto.marca}</td></tr>
          <tr><th>Modelo</th><td>${produto.modelo}</td></tr>
          <tr><th>Foto</th><td><img src="${produto.fotoUrl}" alt="Imagem do Produto"></td></tr>
        </table>
        `
    })
    .catch(err => {
        console.error('Erro ao consultar o produto', err)
        res.innerHTML = `<p style="color:red;">Erro ao consultar: ${err.message}</p>`
    })
})