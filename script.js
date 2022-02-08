//pega os dados da formulario
document.querySelector('.busca').addEventListener('submit', async (event)=> {
    //previnir que o formulario seja enviado
    event.preventDefault(); //preventDefaut:previne que o comportamento padrão seja executado
    //pega que o usuário digitou
    let  input = document.querySelector('#searchInput').value;

    if(input !== '') {
        clearInfo();
        showWarning('carregando...');
        //url da openweathermap
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=1b72665a062343e1a7efd0b7f7a20d16&units=metric&lang=pt_br`;
        //requisição
        let results = await fetch(url); //await:faça a requisição e espera o resultado
        let json = await  results.json(); //pega a  solução e guarda em jason

        //verificação da cidade existente
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })

        }else {
            clearInfo();
            showWarning('Não encotramos esta localização.');
        }
    } else {
        clearInfo();
    }
});
//especifica para mostrar as informação
function showInfo(json) {
    showWarning('');
    

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

//função que exibe mensagem
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML= msg;
}
//limpar o formulario logo depois de uma consulta
function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';

}