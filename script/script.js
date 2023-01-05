const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon"

startGamer();

function startGamer() {

    initializeCards(game.createCardsFromTechs());

}

function initializeCards(cards) {

    let gamerBoard = document.getElementById("gamerBoard");
    gamerBoard.innerHTML = '';

    game.cards.forEach(card => {

        let cardElement = document.createElement('div');

        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        createCardContent(card, cardElement);
        cardElement.addEventListener('click', flipCard);
        gamerBoard.appendChild(cardElement);

    });

}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

};

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face === FRONT){

        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./img/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);

    } else {

        cardElementFace.innerHTML = "?";

    };
    element.appendChild(cardElementFace)

};

function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip");
        if (game.secondCard) {
            if ( game.checkMatch()) {
                game.clearCards();
                if ( game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gamerOver");
                    gameOverLayer.style.display = 'flex';
                }
            } else {

                setTimeout(() => {

                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCard();

                }, 1000)
            }
        }
    }
};

function restart() {

    game.clearCards();
    startGamer();
    let gameOverLayer = document.getElementById("gamerOver");
    gameOverLayer.style.display = 'none';

}