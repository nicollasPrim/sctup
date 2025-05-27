let listarpro = document.getElementById('listarpro')
let res = document.getElementById('res')

listarpro.addEventListener('click', (e) => {
    e.preventDefault()

    fetch(`http://localhost:8081/produto`, {
        method: 'GET'
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Erro HTTP! Status: ${resp.status}`)
        return resp.json()
    })
    .then(produtos => {
        console.log('Produtos listados.', produtos)
        res.innerHTML = produtos.map(p => 
        `
        <table class="preview-tabela">
          <tr><th>Nome</th><td>${p.nome}</td></tr>
          <tr><th>Preço</th><td>R$ ${p.preco}</td></tr>
          <tr><th>Quantidade</th><td>${p.quantidade}</td></tr>
          <tr><th>Descrição</th><td>${p.descricao}</td></tr>
          <tr><th>Marca</th><td>${p.marca}</td></tr>
          <tr><th>Modelo</th><td>${p.modelo}</td></tr>
          <tr><th>Foto</th><td><img src="${p.fotoUrl}" alt="Imagem do Produto"></td></tr><br>
        </table>
        `
        ).join('')
    })
    .catch(err => {
        console.error('Erro ao listar os produtos', err)
        res.innerHTML = `Erro ao listar os produtos: ${err.message}`
    })
})