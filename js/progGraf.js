const grafQ = document.getElementById('grafQ')
const grafP = document.getElementById('grafP')

let graficoQtd = document.getElementById('graficoQtd')
let graficoPreco = document.getElementById('graficoPreco')

console.log(graficoQtd)
console.log(graficoPreco)

let vetProd = []
let vetQtde = []

graficoQtd.addEventListener('click', () => {
    vetProd = []
    vetQtde = []

    fetch(`http://localhost:8081/produto`)
    .then(resp => resp.json())
    .then(dados => {
        console.log(dados)
        
        dados.forEach(dad => {
            vetProd.push(dad.nome)
            vetQtde.push(dad.quantidade)
        })
        console.log('vetProd = ',vetProd)
        console.log('vetQtde = ',vetQtde)

        Chart.defaults.color = '#000000'
        Chart.defaults.font.size = 12
        if(Chart.getChart(grafQ)){
            Chart.getChart(grafQ).destroy()
        }
    
        
        new Chart(grafQ, {
            type: 'bar',
            data: {
                labels: vetProd, // nomes do produto
                datasets: [{
                    // label: 'Produto',
                    data: vetQtde,  // quantidade ou preço
                    borderWidth: 3,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(251, 135, 160)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                }]
            },
            options:{
                plugins:{
                    legend: {
                        display: false
                    },
                    title: { 
                        display: true,
                        text: 'Quantidade de produto que temos', // Defina o texto do seu título
                    }
                }
            }
        })
    })
    .catch((err)=>{
        console.error('Erro ao listar os dados!',err)
    })
})

graficoPreco.addEventListener('click', () => {
    vetProd = []
    vetQtde = []

    fetch(`http://localhost:8081/produto`)
    .then(resp => resp.json())
    .then(dados => {
        console.log(dados)
        
        dados.forEach(dad => {
            vetProd.push(dad.nome)
            vetQtde.push(dad.preco)
        })
        console.log('vetProd = ',vetProd)
        console.log('vetQtde = ',vetQtde)

        Chart.defaults.color = '#000000'
        Chart.defaults.font.size = 28


        if(Chart.getChart(grafP)){
            Chart.getChart(grafP).destroy()
        }
    
        
        new Chart(grafP, {
            type: 'doughnut',
            data: {
                labels: vetProd, // nomes do produto
                datasets: [{
                    // label: 'Produto',
                    data: vetQtde,  // quantidade ou preço
                    borderWidth: 3,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(251, 135, 160)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                }]
            },
            options:{
                plugins:{
                    legend: {
                        display: false
                    },
                    title: { 
                        display: true,
                        text: 'Proporção dos preços dos produtos', // Defina o texto do seu título
                    }
                }
            }
        })
    })
    .catch((err)=>{
        console.error('Erro ao listar os dados!',err)
    })
})