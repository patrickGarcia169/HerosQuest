// Stats
let health = 100;
let xp = 0;
let gold = 0;

// Buttons
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let button4 = document.getElementById("button4");

// Visuals
let healthText = document.getElementById("health");
let xpText = document.getElementById("xp");
let goldText = document.getElementById("gold");
let mainText = document.getElementById("mainText");

let visual = document.getElementById("screen");

// Weapons
class Weapon{
    constructor(name, damage, value){
        this.name = name;
        this.damage = damage;
        this.value = value;
    }
}
let stick = new Weapon("Stick", 10, 1);
let club = new Weapon("Club", 15, 5);
let sword = new Weapon("Sword", 25, 10);
let axe = new Weapon("Axe", 35, 25);
let megaSword = new Weapon("Mega Sword", 50, 50);

let inv = [stick];
let shopInv = [club, sword, axe, megaSword];

// Enemies
class Enemy{
    constructor(name, health, damage, xp, gold){
        this.name = name;
        this.health = health;
        this.damage = damage;
        this.xp = xp;
        this.gold = gold;
    }
}

// Arena
let gruntEnemy = new Enemy("Grunt", 50, 15, 1, 1);
let captainEnemy = new Enemy("Captain", 100, 30, 3, 3);

// Bosses
let firstBoss = new Enemy("Dirt Face", 200, 55, 6, 6);
let secondBoss = new Enemy("Grong", 250, 60, 10, 10);
let thirdBoss = new Enemy("Herp", 300, 70, 25, 15);
let fourthBoss = new Enemy("Krinkle", 400, 80, 50, 20);
let finalBoss = new Enemy("Smelgor", 1000, 100, 100, 100);

let normalArr = [firstBoss, secondBoss, thirdBoss, fourthBoss, finalBoss];
let bossArr = [firstBoss, secondBoss, thirdBoss, fourthBoss, finalBoss];

/*-------------------------------------------------------------------*/

// Starting Function
function begin(){
    
    setLS();

    healthText.innerHTML = "Health: " + health;
    xpText.innerHTML = "XP: " + xp;
    goldText.innerHTML = "Gold: " + gold;
    
    button4.style.background = "rgb(212, 198, 69)";
    
}

// Main
function town(){
   
    visual.style.background = "white";

    button1.disabled = false;

    resetStats();


    button1.style.background = "#75a57c";
    button2.style.background = "rgb(179, 81, 81)";
    button3.style.background = "rgb(89, 182, 206)";

    button1.innerHTML = "Store";
    button2.innerHTML = "Arena";
    button3.innerHTML = "Bosses";

    button3.style.display = "block";

    button1.onclick = store;
    button2.onclick = arena;
    button3.onclick = bosses;

    mainText.innerHTML = "Welcome to Hero Town. This is the place to slay foes, fight bosses, and buy new weapons. What do you want to do?"
}

function resetColors(){
    button1.style.background = "";
    button2.style.background = "";
    button3.style.background = "";
}

function resetStats(){

    health = 100+xp;
    healthText.innerHTML = "Health: " + health;
    
    gruntEnemy.health = 50;
    captainEnemy.health = 100;

    firstBoss.health = 200;
    secondBoss.health = 250;
    thirdBoss.health = 300;
    fourthBoss.health = 400;
    finalBoss.health = 1000;
}

begin();
town();

/*-------------------------------------------------------------------*/

// Store Function
function store(){
    visual.style.background = "#75a57c";

    resetColors();

    button1.innerHTML = "Look";
    button2.innerHTML = "Sell";
    button3.innerHTML = "Town";

    button3.style.display = "block";

    button1.onclick = look;
    button2.onclick = sell;
    button3.onclick = town;

    mainText.innerHTML = "This is the shop. There is no freedom. You buy whatever we have for you. You sell whatever you have."
}

// Buy and Sell
function look(){
    visual.style.background = "#75a57c";

    if(shopInv.length === 0){
        mainText.innerHTML = "How in the world are you not happy with the megasword?! Learn to love it, I guess";
    }

    button1.innerHTML = "Buy";
    button2.innerHTML = "Back";
    
    button3.style.display = "none";

    button1.onclick = buy;
    button2.onclick = store;

    mainText.innerHTML = "Buy the " + shopInv[0].name + " for " + shopInv[0].value + " gold";
}

function buy(){
    visual.style.background = "#75a57c";

    if(shopInv.length === 0){
        mainText.innerHTML = "How in the world are you not happy with the megasword?! Learn to love it, I guess";
    }
    else{
        if(gold < shopInv[0].value){
            mainText.innerHTML = "You're too broke. Come back when you have coin.";
        }
        else{
            gold -= shopInv[0].value;
            inv.push(shopInv[0]); 
            goldText.innerHTML = "Gold: " + gold;
            mainText.innerHTML = "Thanks for the dabloons.<br/>";
            shopInv.shift();
            mainText.innerHTML += "Buy the " + shopInv[0].name + " for " + shopInv[0].value + " gold";

            saveToLS();
        }
    }
}

function sell(){
    visual.style.background = "#75a57c";

    if(inv[inv.length-1].name != "Stick"){
        mainText.innerHTML = "You sold your " + inv[inv.length-1].name + " for " + inv[inv.length-1].value + " gold.";
        gold += inv[inv.length-1].value;
        goldText.innerHTML = "Gold: " + gold;
        shopInv.unshift(inv[inv.length-1]);
        inv.pop();

        saveToLS();
    }
    else{
        mainText.innerHTML = "It's not smart to sell your only weapon.";
    }
}

/*-------------------------------------------------------------------*/

// Arena Function
function arena(){
    visual.style.background = "rgb(179, 81, 81)";
    resetColors();

    button1.innerHTML = "Fight Grunt";
    button2.innerHTML = "Fight Captain";
    button3.innerHTML = "Town";

    button1.onclick = grunt;
    button2.onclick = captain;
    button3.onclick = town;

    mainText.innerHTML = "You're almost inside the arena. Will you fight the grunt or will you fight the captain?"
}

// Grunt
function grunt(){

    changeButtons();

    button1.onclick = () => {fight(gruntEnemy, "rgb(179, 81, 81)", false)};
    button2.onclick = town;
    button3.style.display = "None";

    mainText.innerHTML = "You have " + health + " points of health. Your " + inv[inv.length-1].name + " does " + inv[inv.length-1].damage + " points of damage. <br/> The grunt has " + gruntEnemy.health + " points of health. He does " + gruntEnemy.damage + " points of damage.";
    
}

// Captain
function captain(){

    changeButtons();

    button1.onclick = () => {fight(captainEnemy, "rgb(179, 81, 81)"), false};
    button2.onclick = town;
    button3.style.display = "None";

    button1.disabled = false;

    mainText.innerHTML = "You have " + health + " points of health. Your " + inv[inv.length-1].name + " does " + inv[inv.length-1].damage + " points of damage. <br/>" + captainEnemy.name + " has " + captainEnemy.health + " points of health. He does " + captainEnemy.damage + " points of damage.";
}

// Fighting
function fight(enemyType, color, bossVariable){

    visual.style.background = color;
    
    if(health>0 || enemyType.health>0){

        enemyType.health -= inv[inv.length-1].damage;
        health -= enemyType.damage;
        if(health>0){
            healthText.innerHTML = "Health: " + health;
        }
        else{
            healthText.innerHTML = "Health: 0";
        }

        mainText.innerHTML = "You have " + health + " points of health. Your " + inv[inv.length-1].name + " has " + inv[inv.length-1].damage + " points of damage. <br/>" + enemyType.name + " has " + enemyType.health + " points of health. He does " + enemyType.damage + " points of damage.";

    }
    if(enemyType.health<=0){
        mainText.innerHTML = "You won!!!<br/><br/>You get " + enemyType.gold + " gold and " + enemyType.gold + " xp.";
        gold += enemyType.gold;
        goldText.innerHTML = "Gold: " + gold;
        xp += enemyType.xp;
        xpText.innerHTML = "XP: " + xp;

        button1.disabled = true;
        button2.innerHTML = "Town";

        if(bossVariable){
            normalArr.shift();
        }

        saveToLS();
        
    }
    if(health<=0){
        mainText.innerHTML = "You lost your life!!!<br/>And all your gold and xp too"
        gold = 0;
        xp = 0;
        goldText.innerHTML = "Gold: 0";
        xpText.innerHTML = "XP: 0";
        health = 100;

        button1.disabled = true;
        button2.innerHTML = "Town";

        inv = [];
        inv.push(stick); 

        resetLS();
    }
}

function changeButtons(){
    button1.innerHTML = "Fight";
    button2.innerHTML = "Flee";
    button3.style.display = "None";
}

/*-------------------------------------------------------------------*/

// Bosses Function
function bosses(){
    visual.style.background = "rgb(89, 182, 206)";
    resetColors();

    button1.innerHTML = "Normal Boss";
    button2.innerHTML = "Random Boss";
    button3.innerHTML = "Town";

    button1.onclick = normalBoss;
    button2.onclick = randomBoss;
    button3.onclick = town;

    mainText.innerHTML = "You really think you got what it takes? Fight the normal boss and you might be able to take him on. Fight a random one and they may be a little too easy or too hard. You might even fight Smelgor."
}
function normalBoss(){
    
    let boss = normalArr[0];

    if(normalArr.length === 0){
        mainText.innerHTML = "Congratulations!!! You defeated all the bosses!!! <br/>Try the randomizer."
    }
    else{
        changeButtons();

        button1.onclick = () => {fight(boss, "rgb(89, 182, 206)", true)};
        button2.onclick = town;
        button3.style.display = "None";

        button1.disabled = false;

        mainText.innerHTML = "You have " + health + " points of health. Your " + inv[inv.length-1].name + " does " + inv[inv.length-1].damage + " points of damage. <br/>" + boss.name + " has " + boss.health + " points of health. He does " + boss.damage + " points of damage."; 
    }
    
}
function randomBoss(){

    let bossRan = bossArr[Math.floor(Math.random()*bossArr.length)];

    changeButtons();

    button1.onclick = () => {fight(bossRan, "rgb(89, 182, 206)", false)};
    button2.onclick = town;
    button3.style.display = "None";

    button1.disabled = false;

    mainText.innerHTML = "You have " + health + " points of health. Your " + inv[inv.length-1].name + " does " + inv[inv.length-1].damage + " points of damage. <br/>" + bossRan.name + " has " + bossRan.health + " points of health. He does " + bossRan.damage + " points of damage.";
}

/*-------------------------------------------------------------------*/

// Inventory
function inventory(){
    visual.style.background = "";

    mainText.innerHTML = "You have:";
    for(let i = 0; i < inv.length; i++){
        mainText.innerHTML += "<br/>" + inv[i].name + ": " + inv[i].damage + " damage & " + inv[i].value + " gold";
    }

}

/*-------------------------------------------------------------------*/

// Local Storage Check
if (localStorage){
    let goldLS = localStorage.getItem("Gold");
    console.log("Gold: " + goldLS);

    let xpLS = localStorage.getItem("XP");
    console.log("XP: " + xpLS);

    let invLS = localStorage.getItem("Weapons");
    console.log("Inventory: " + invLS);

    let bossLS = localStorage.getItem("Bosses");
    console.log("Bosses: " + bossLS);
}
else{
    console.log("Local storage is not supported");
}


// Local Storage Save
function saveToLS(){
    if(localStorage){
        localStorage.setItem("XP", JSON.stringify(xp));
        localStorage.setItem("Gold", JSON.stringify(gold));
        localStorage.setItem("Weapons", JSON.stringify(inv));
        localStorage.setItem("Bosses", JSON.stringify(normalArr));
    }
}

// Local Storage Delete
function resetLS(){
    if(localStorage){
        localStorage.setItem("XP", JSON.stringify(0));
        localStorage.setItem("Gold", JSON.stringify(0));
        localStorage.setItem("Weapons", JSON.stringify(inv[0]));
        localStorage.setItem("Bosses", JSON.stringify(bossArr));
    }
}

// Set from Local Storage
function setLS(){
    if(localStorage){
        gold = JSON.parse(localStorage.getItem("Gold"));
        xp = JSON.parse(localStorage.getItem("XP"));
        
        // if(inv.length === 0){
        //     inv += stick;
        // }
        // else{
        //     inv = JSON.parse(localStorage.getItem("Weapons"));
        // }
        
        //normalArr = JSON.parse(localStorage.getItem("Bosses"));
    }
}

// local storage turns it into an array while inv is an object [transfer and change the array into an object]
//inv = JSON.parse(localStorage.getItem("Weapons"));
console.log(inv);
// JSON is an object and the inv is an array, but inv becomes an object with inv = JSON.parse(localStorage.getItem("Weapons"));
console.log(typeof JSON.parse(localStorage.getItem("Weapons")) === "object");
console.log(typeof JSON.parse(localStorage.getItem("Weapons")) === "object");
console.log(Array.isArray(inv));