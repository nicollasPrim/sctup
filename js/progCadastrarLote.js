let cadastrarId = document.getElementById('cadastrarId')
let cadastrarCheck = document.getElementById('cadastrarCheck')
let res = document.getElementById('res')
let nompro = document.getElementById('nompro')
let precoproEl = document.getElementById('precoproEl')
let quantproEl = document.getElementById('quantproEl')
let marcapro = document.getElementById('marcapro')
let modpro = document.getElementById('modpro')
let descpro = document.getElementById('descpro')
let fotourl = document.getElementById('fotourl')
cadastrarId.addEventListener('click', (e) => {
    e.preventDefault()
    fetch(`https://api.npoint.io/d90f723848fc9d7668cc`) 
      .then(resp => resp.json())
      .then(listaDeProdutos => {
        res.innerHTML = ''
        fetch(`http://localhost:8081/produto/lote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(listaDeProdutos)
        })
          .then(resp => {
            if (!resp.ok) throw new Error(`Erro HTTP! Status: ${resp.status}`)
            return resp.json()
          })
          .then(produtosGravados => {
            res.innerHTML = '<h3>Produtos cadastrados:</h3><br>'
            produtosGravados.forEach(p => {
              res.innerHTML += `
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
            })
          })
          .catch((err) => {
            console.error('Erro ao gravar os dados em lote!', err)
          })
      })
      .catch((err) => {
        console.error('Erro ao buscar os dados', err)
      })
  })