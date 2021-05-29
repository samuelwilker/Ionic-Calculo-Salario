import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public titulo:string = "Cálculo de Sálario Liquido";
  valorBruto:number;
  qtdeDependente:number;
  valorLiquido:string;
  outrosDescontos:number = 0;
  salarioBase:number;
  aliquota:number;
  valorDeducao:number;



  constructor() {}

calcular():void{

  this.valorLiquido = this.calcularSalarioLiquido(this.valorBruto,this.qtdeDependente).toFixed(2);
}

encontarAliquotaINSS(valorBruto) {
  if (valorBruto <= 0) {
      return 0;
  }

  if (valorBruto <= 1751.81) {
      return 0.08;
  }
  else if (valorBruto >= 1751.82 || valorBruto <= 2919.73) {
      return 0.09;
  }
  else {
      return 0.11;
}
}

calcularDescontoINSS(valorBruto) {
  const aliquota = this.encontarAliquotaINSS(this.valorBruto);
  return valorBruto * aliquota;
}

calcularDeducaoDependentes(qtdeDependente) {
  const valorDeducaoPordependente = 189.59;
  return qtdeDependente * valorDeducaoPordependente;
}

calcularSalarioBase(valorBruto, qtdeDependentes) {
  var descontoINSS = this.calcularDescontoINSS(valorBruto);
  var deducaoDependentes = this.calcularDeducaoDependentes(qtdeDependentes);

  return valorBruto - descontoINSS - deducaoDependentes;
}

encontarAliquotaIRRF(salarioBase) {
  if (salarioBase <= 0) {
      return 0;
  }

  if (salarioBase <= 1903.98) {
      return 0;
  }
  else if (salarioBase >= 1903.99 || salarioBase <= 2826.65) {
      return 0.075;
  }
  else if (salarioBase >= 2826.66 || salarioBase <= 3751.05) {
      return 0.15;
  }
  else if (salarioBase >= 3751.06 || salarioBase <= 4664.68) {
      return 0.225;
  }
  else {
      return 0.275;
  }
}

encontarDeducaoIRRF(aliquota) {
  if (aliquota <= 0) {
      return 0;
  }
  else if (aliquota == 0.075) {
      return 142.8;
  }
  else if (aliquota == 0.15) {
      return 354.80;
  }
  else if (aliquota == 0.225) {
      return 636.13;
  }
  else {
      return 869.36;
  }
}

calcularDescontoIRRPF(salarioBase) {
  this.aliquota = this.encontarAliquotaIRRF(salarioBase);
  this.valorDeducao= this.encontarDeducaoIRRF(this.aliquota);

  return salarioBase * this.aliquota - this.valorDeducao;
}

calcularSalarioLiquido(valorBruto, dependentes) {
  var descontoINSS = this.calcularDescontoINSS(valorBruto);

  var salarioBase = this.calcularSalarioBase(valorBruto, dependentes);

  var descontoIRRF = this.calcularDescontoIRRPF(salarioBase);

  return valorBruto - descontoINSS - descontoIRRF - this.outrosDescontos;
}


 // function calcular() {
 //     const salarioBruto = parseFloat(document.getElementById("salarioBruto").value);
 //     const qtdeDependentes = parseInt(document.getElementsByName("qtdeDependente")[0].value);

//      var salarioLiquido = calcularSalarioLiquido(salarioBruto, qtdeDependentes);

 //     var tagResultado = document.getElementById("resultado");
 //     tagResultado.textContent = "Seu salário líquido é: " + salarioLiquido;
}




