function showCepForm() {
  let divEndereco = document.getElementById("EnderecoForm");
  divEndereco.style.display = "none";

  let divCep = document.getElementById("CepForm");
  divCep.style.display = "block";

  let divBtnShowCepForm = document.getElementById("btnShowCepForm");
  divBtnShowCepForm.classList.add("selectedMainButton");

  let divBtnShowEnderecoForm = document.getElementById("btnShowEnderecoForm");
  divBtnShowEnderecoForm.classList.remove("selectedMainButton");
}

function showEnderecoForm() {
  let divCep = document.getElementById("CepForm");
  divCep.style.display = "none";

  let divEndereco = document.getElementById("EnderecoForm");
  divEndereco.style.display = "block";

  let divBtnShowCepForm = document.getElementById("btnShowCepForm");
  divBtnShowCepForm.classList.remove("selectedMainButton");

  let divBtnShowEnderecoForm = document.getElementById("btnShowEnderecoForm");
  divBtnShowEnderecoForm.classList.add("selectedMainButton");

}

areaResult = document.getElementById("result");

function formataEndereco(dados, tipo_busca) {
  areaResult.innerHTML = "<h3>RESULTADOS: </h3>";
  let arry_dados = [];
  if (tipo_busca === "cep") {
    arry_dados[0] = dados;
  } else if (tipo_busca === "completo") {
    arry_dados = dados;
  }
  for (let i = 0; i < arry_dados.length; i++) {
    let endereco = document.createElement("p");
    endereco.appendChild(document.createTextNode("CEP: " + arry_dados[i].cep));
    endereco.appendChild(document.createElement("br"));
    endereco.appendChild(
      document.createTextNode("Logradouro: " + arry_dados[i].logradouro)
    );
    endereco.appendChild(document.createElement("br"));
    endereco.appendChild(
      document.createTextNode("Complemento: " + arry_dados[i].complemento)
    );
    endereco.appendChild(document.createElement("br"));
    endereco.appendChild(
      document.createTextNode("Bairro: " + arry_dados[i].bairro)
    );
    endereco.appendChild(document.createElement("br"));
    endereco.appendChild(
      document.createTextNode("Localidade: " + arry_dados[i].localidade)
    );
    endereco.appendChild(document.createElement("br"));
    endereco.appendChild(document.createTextNode("UF: " + arry_dados[i].uf));
    endereco.appendChild(document.createElement("br"));
    retornaEndereco(endereco);
  }
}

function retornaEndereco(endereco_completo="") {
  CEP.value = "";
  logradouro.value = "";
  localidade.value = "";
  UF.value = "";
  areaResult.appendChild(endereco_completo);
}

async function BuscaPorCep() {
  let CEP = document.getElementById("CEP");

  if (CEP.value.length != 8) {
    areaResult.innerHTML = "<h3>Digite um CEP válido</h3>";
    return;
  }

  try {
    const {
      data
    } = await axios.get(
      `https://viacep.com.br/ws/${CEP.value}/json/`
    );

    if (data.erro === true) {
      areaResult.innerHTML = "<br><strong>CEP não encontrado<strong><br>";
      retornaEndereco();
    } else {
      formataEndereco(data, "cep");
    }
  } catch (err) {
    console.log(err);
    console.log("Verifique o CEP e tente novamente");
  }
}

async function BuscaPorEndereco() {
  let logradouro = document.getElementById("logradouro").value.toUpperCase();
  let localidade = document.getElementById("localidade").value.toUpperCase();
  let UF = document.getElementById("UF").value.toUpperCase();

  try {
    const {
      data
    } = await axios.get(
      `https://viacep.com.br/ws/${UF}/${localidade}/${logradouro}/json/`
    );
    console.log(data)
    if (data.erro === true || data.length === 0) {
      areaResult.innerHTML = "<br><strong>Endereço não encontrado<strong><br>";
      console.log("erro");
      retornaEndereco();
    } else {
      formataEndereco(data, "completo");
    }
  } catch (err) {
    console.log(err);
    areaResult.innerHTML =
      "<h3>Verifique se os dados digitados estão corretos</h3>";
  }
}