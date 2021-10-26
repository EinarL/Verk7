/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Global breyta sem heldur utan um heildar sigra */
let wins = 0;

/** Global breyta sem heldur utan um heildar töp */
let losses = 0;

let playerRoundWins = 0;
let compRoundWins = 0;

function isValidBestOf(bestOf) {
  let returnValue = false;
  if(bestOf % 2 !== 0 && bestOf < MAX_BEST_OF && bestOf > 0){
    returnValue = true;
  }
  else if(bestOf !== null){ // ef player ýtti ekki á cancel takkann
    console.error("Talan verður að vera oddatala, minni en 10 og meiri en 0!");
  }
  return returnValue;
}

function checkGame(player, computer, compAutomaticWin, totalGames) {
  let playerAtk;
  let compAtk;
  let oldPlayerScore = playerRoundWins;
  let oldCompScore = compRoundWins;
  let whoWon;
  if(compAutomaticWin){
    compRoundWins++;
    alert("Þú valdir ekki 1,2 né 3, þannig tölvan vann 😔");
  }
  else{
    if(player == 1){ // ef player valdi skæri
      playerAtk = "skæri";
      if(computer == 2){ // blað
        compAtk = "blað";
        playerRoundWins++;
      }
      else if(computer == 3){ // steinn
        compAtk = "steinn";
        compRoundWins++;
      }
      else{
        compAtk = "skæri";
      }
    }
    else if(player == 2){ // blað
      playerAtk = "blað";
      if(computer == 1){ // skæri
        compAtk = "skæri";
        compRoundWins++;
      }
      else if(computer == 3){ // steinn
        compAtk = "stein";
        playerRoundWins++;
      }
      else{
        compAtk = "blað";
      }
    }
    else if(player == 3){ // steinn
      playerAtk = "stein";
      if(computer == 1){ // skæri
        compAtk = "skæri";
        playerRoundWins++;
      }
      else if(computer == 2){ // blað
        compAtk = "blað";
        compRoundWins++;
      }
      else{
        compAtk = "stein";
      }
    }
    if(playerRoundWins > oldPlayerScore){
      whoWon = ", Þú vannst! 👌";
    }
    else if(compRoundWins > oldCompScore){
      whoWon = ", Tölvan vann 😒";
    }
    else{
      whoWon = ", það er jafntefli, þannig enginn fékk stig 😐";
    }
    alert("Þú valdir " + playerAtk + " og tölvan valdi " + compAtk + whoWon);
  }
  isGameOver(totalGames);
}

function round(totalGames) {
  let playerChose = prompt("Veldu Skæri(1), Blað(2), eða Stein(3)!");

  if(playerChose !== null){ // ef player ýtti ekki á cancel
    if(playerChose != 1 && playerChose != 2 && playerChose != 3){ // ef player velur ólöglegt gildi
      checkGame(1,1,true,totalGames);
    }
    else{
      let compChose = Math.floor(Math.random() * 2 + 1);
      checkGame(playerChose, compChose, false, totalGames);
    }
  }
  else{ // ef player ýtti á cancel
    compRoundWins = 0;
    playerRoundWins = 0;
  }
}

function isGameOver(totalGames){
  if(compRoundWins === totalGames){ // ef comp er búinn að vinna
    alert("Tölvan vann leikinn. Gengur betur næst! 😣");
    losses++;
    compRoundWins = 0;
    playerRoundWins = 0;
  }
  else if(playerRoundWins === totalGames){ // ef player er búinn að vinna
    alert("Þú vannst leikinn. Til Hamingju! 🎉🎉🎉");
    wins++;
    compRoundWins = 0;
    playerRoundWins = 0;
  }
  else{
    round(totalGames);
  }
}

function play() {
  let gamesAmount = prompt("'Best af' hverju viltu spila? (það verður að vera oddatala, minni en 10!)");

  if(isValidBestOf(gamesAmount)){
    isGameOver(Math.ceil(gamesAmount/2));
  }
}

function games() {
  let winDivLoss = wins/(wins+losses);
  let lossDivWin = losses/(wins+losses);

  console.log("Þú hefur spilað " + (wins + losses) + " leiki.");
  if(wins+losses >= 1){
    console.log("þú hefur unnið " + wins + ", eða " + (winDivLoss*100).toFixed(2) + "% af heild.");
    console.log("þú hefur tapað " + losses + ", eða " + (lossDivWin*100).toFixed(2) + "% af heild.");
  }
}
