//variáveis da bolinha 
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;

//velocidade da bolinha 
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raio = diametro / 2; 

//variaveis da raquete 
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 100;
let raqueteBorda = 55; 

//variaveis do oponente 
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let velocidadeYOponente; 
let chanceErro = 0;

let colidiu = false; 

//placar do jogo 

let meusPontos = 0;
let pontosDoOponente = 0; 

//sons do jogo 
let raquetada; 
let ponto;
let trilha; 

function preload(){
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop(); 
}

function draw() {
  background(0);
  mostraBolinha();
    movimentaBolinha ();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
    movimentaRaquete ();
  //verificaColisaoRaquete ();
  verificaColisaoRaquete (xRaquete, yRaquete);
  mostraRaquete (xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente (); 
  verificaColisaoRaquete (xRaqueteOponente, yRaqueteOponente);
  incluiPlacar(); 
  marcaPonto(); 
  bolinhaNaoFicaPresa ();

function mostraBolinha (){
  const amarelo = color (' #ffdd22')
  fill (amarelo)
  circle (xBolinha, yBolinha, diametro)
}
  
function bolinhaNaoFicaPresa (){
  if (xBolinha - raio < 0){
    xBolinha = 23
  }
}

function movimentaBolinha (){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha; 
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1; 
  }
  
  if (yBolinha + raio > height ||
   yBolinha - raio < 0){
   velocidadeYBolinha *= -1;
}
}
}

function mostraRaquete(x, y){
  const laranja = color ('#ff8c22')
  fill (laranja)
  rect(x, y, raqueteComprimento, raqueteAltura, raqueteBorda); 
}

function movimentaRaquete (){
  if (keyIsDown (UP_ARROW)){
    yRaquete -= 10;
  }
 if (keyIsDown (DOWN_ARROW)){
   yRaquete += 10; 
 }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1; 
    raquetada.play();
  }
}

function verificaColisaoRaquete (x, y){
  colidiu = 
    collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
    chanceErro = parseInt((Math.random() * (100 - 80) + 85).toFixed(0));
  }
}

function movimentaRaqueteOponente (){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento/2 - chanceErro;
  yRaqueteOponente += velocidadeYOponente 
}

function incluiPlacar(){
  textAlign (CENTER);
  textFont ('Fantasy', [20]);
  fill(255) 
  rect (130, 10, 40, 30, 5);
  fill ('#ff8c22')
  text (meusPontos, 150, 33);
  fill (255)
  rect (430, 10, 40, 30, 5 )
  fill ('#ff8c22')
  text (pontosDoOponente, 450, 33);
}

function marcaPonto (){
  if (xBolinha > 590){
    meusPontos += 1
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1; 
    ponto.play();
  }
}
