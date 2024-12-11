const player1 = {
    NOME : "Mario",
    VELOCIDADE : 4,
    MANOBRABILIDADE : 3,
    PODER : 3,
    PONTOS : 0,
}

const player2 = {
    NOME : "Luigi",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 4,
    PONTOS : 0,
}

async function rolldice() {
    return Math.floor(Math.random() * 6) + 1;
    
}

async function logRollResult(player1, block, diceResult, attribute){
    console.log(
        `${player1} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
          diceResult + attribute
        }`
      );
}

async function getRandomBlock() {

    let random = Math.random();
    let result;

    switch (true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }
    return result;
    
}

async function playRaceEngine(player1, player2) {
    
    let pontuacao1 = 0;
    let pontuacao2 = 0;
    
    for (let round = 1; round <= 5; round++){
        
        console.log(`-----------------------------------------------------------\n🏁 Rodada ${round}`)

        // decisão do valor do bloco aleatório 
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}\n`);

        // rolagem dos dados
        let rollDiceResult1 = await rolldice();
        let rollDiceResult2 = await rolldice();

        // variavel que recebe o valor da soma das habilidades de acordo com o tipo do bloco
        let totalSkillResult1 = 0;
        let totalSkillResult2 = 0;

        // verificação de qual será o tipo  do bloco aleatorio e a realização da soma do totalSkillResult
        if (block == "RETA"){
            
            totalSkillResult1 = rollDiceResult1 + player1.VELOCIDADE;
            totalSkillResult2 = rollDiceResult2 + player2.VELOCIDADE;

            await logRollResult(player1.NOME, "reta", rollDiceResult1, player1.VELOCIDADE);
            await logRollResult(player2.NOME, "reta", rollDiceResult2, player2.VELOCIDADE);
        }

        if (block == "CURVA"){

            totalSkillResult1 = rollDiceResult1 + player1.MANOBRABILIDADE;
            totalSkillResult2 = rollDiceResult2 + player2.MANOBRABILIDADE;
            
            await logRollResult(player1.NOME, "curva", rollDiceResult1, player1.MANOBRABILIDADE);
            await logRollResult(player2.NOME, "curva", rollDiceResult2, player2.MANOBRABILIDADE);
        }

        if (block == "CONFRONTO"){

            totalSkillResult1 = rollDiceResult1 + player1.PODER;
            totalSkillResult2 = rollDiceResult2 + player2.PODER;
            
            await logRollResult(player1.NOME, "confronto", rollDiceResult1, player1.PODER);
            await logRollResult(player2.NOME, "confronto", rollDiceResult2, player2.PODER);
        }

        // decisão para o vencedor
        if (totalSkillResult1 > totalSkillResult2) {

            console.log(`\nVencedor da ${round}° rodada -> ${player1.NOME}!!`);
            player1.PONTOS++;
            
            if (player2.PONTOS == 0){
                player2.PONTOS = 0;
            }
            else{
                player2.PONTOS--;
            }
        }

        else if (totalSkillResult1 == totalSkillResult2){

            console.log("\n🚩 Empate, nenhum dos jogadores recebeu ou perdeu pontos!");

        }

        // encerramento e verificação de quem foi o campeão através dos pontos
        else{
            console.log(`\nVencedor da ${round}° rodada -> ${player2.NOME}!!`);
            player2.PONTOS++;
            
            if (player1.PONTOS == 0){
                player1.PONTOS = 0;
            }
            else{
                player1.PONTOS--;
            }
        }

        
    }
    console.log(`-----------------------------------------------------------\n\nResultado final:\n${player1.NOME} = ${player1.PONTOS} pontos\n${player2.NOME} = ${player2.PONTOS} pontos`)
    
    if (player1.PONTOS > player2.PONTOS) {
        console.log(`${player1.NOME} foi o grande vencedor!!`);
    }

    else {
        console.log(`${player2.NOME} foi o grande vencedor!!`);
    }
}

(async function main() {
    
    console.log(`=================================================\n🏁 Corrida entre ${player1.NOME} vs ${player2.NOME} começando...\n=================================================`);
    await playRaceEngine(player1, player2);
    console.log("=================================================\nFim de jogo\n=================================================");
    

})();

