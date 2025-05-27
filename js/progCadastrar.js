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
  
  let id = Number(document.getElementById('id').value)

  fetch(`https://api.npoint.io/d90f723848fc9d7668cc/${id - 1}`)
    .then(resp => resp.json())
    .then(dad => {
      nompro.value = dad.nome
      precoproEl.value = dad.preco
      quantproEl.value = dad.quantidade
      descpro.value = dad.descricao
      marcapro.value = dad.marca
      modpro.value = dad.modelo    
      fotourl.value = dad.fotoUrl
    })
    .catch((err) => {
      console.error('Erro ao buscar os dados', err)
    })
})

cadastrarCheck.addEventListener('click', (e) => {
  e.preventDefault();

  const valores = {
    nome: nompro.value,
    preco: Number(precoproEl.value),
    quantidade: Number(quantproEl.value),
    descricao: descpro.value,
    marca: marcapro.value,
    modelo: modpro.value,
    fotoUrl: fotourl.value
  };
  
  console.log(valores)
  res.innerHTML = ''

  fetch(`http://localhost:8081/produto`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(valores)
  })
  .then(resp => {
    if (!resp.ok) throw new Error(`Erro HTTP! Status: ${resp.status}`)
    return resp.json()
  })
  .then(dadosGrav => {
    console.log(dadosGrav)
    res.innerHTML = '' 
  
    res.innerHTML = `
    <table class="preview-tabela">
      <tr><th>Nome</th><td>${dadosGrav.nome}</td></tr>
      <tr><th>Preço</th><td>R$ ${dadosGrav.preco}</td></tr>
      <tr><th>Quantidade</th><td>${dadosGrav.quantidade}</td></tr>
      <tr><th>Descrição</th><td>${dadosGrav.descricao}</td></tr>
      <tr><th>Marca</th><td>${dadosGrav.marca}</td></tr>
      <tr><th>Modelo</th><td>${dadosGrav.modelo}</td></tr>
      <tr><th>Foto</th><td><img src="${dadosGrav.fotoUrl}" alt="Imagem do Produto"></td></tr>
    </table>
    `
  })
  .catch((err) => {
    console.error('Erro ao gravar os dados no banco de dados!', err)
  })
})