let checarpro = document.getElementById('checarpro')
let atualizarpro = document.getElementById('atualizarpro')
let resatualizar = document.getElementById('resatualizar')

let nompro = document.getElementById('nompro')
let precopro = document.getElementById('precopro')
let quantpro = document.getElementById('quantpro')
let marcapro = document.getElementById('marcapro')
let modpro = document.getElementById('modpro')
let descpro = document.getElementById('descpro')
let fotoUrl = document.getElementById('fotoUrl')

let res = document.getElementById('res')

checarpro.addEventListener('click', (e) => {
  e.preventDefault()

  const codpro = Number(document.getElementById('codpro').value)

  fetch(`http://localhost:8081/produto/${codpro}`)
    .then(resp => resp.json())
    .then(dado => {
      nompro.value = dado.nome  
      precopro.value = dado.preco 
      quantpro.value = dado.quantidade
      descpro.value = dado.descricao
      marcapro.value = dado.marca
      modpro.value = dado.modelo 
    })
    .catch(err => {
      console.error('Erro ao buscar o produto:', err)
      resatualizar.innerHTML = 'Erro ao buscar o produto.'
    })
})

atualizarpro.addEventListener('click', (e) => {
    e.preventDefault()
  
    const codpro = Number(document.getElementById('codpro').value)
  
    const dadosAtualizados = {
      nome: nompro.value,
      preco: Number(precopro.value),
      quantidade: Number(quantpro.value),
      descricao: descpro.value,
      marca: marcapro.value,
      modelo: modpro.value
    }
  
    fetch(`http://localhost:8081/produto/${codpro}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosAtualizados)
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(`Erro ao atualizar o produto (HTTP ${resp.status})`)
        }
        return resp.json()
      })
      .then(retorno => {

        res.innerHTML = `
        <table class="preview-tabela">
          <tr><th>Nome</th><td>${retorno.nome}</td></tr>
          <tr><th>Preço</th><td>R$ ${retorno.preco}</td></tr>
          <tr><th>Quantidade</th><td>${retorno.quantidade}</td></tr>
          <tr><th>Descrição</th><td>${retorno.descricao}</td></tr>
          <tr><th>Marca</th><td>${retorno.marca}</td></tr>
          <tr><th>Modelo</th><td>${retorno.modelo}</td></tr>
          <tr><th>Foto</th><td><img src="${retorno.fotoUrl}" alt="Imagem do Produto"></td></tr>
        </table>
        `

        console.log('Produto atualizado:', retorno)
        resatualizar.innerHTML = `Produto com ID ${codpro} atualizado com sucesso!`
      })
      .catch(err => {
        console.error('Erro ao atualizar o produto:', err)
        resatualizar.innerHTML = `Erro ao atualizar: ${err.message}`
      })
  })
  