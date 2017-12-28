import { forEach, keys } from 'lodash';
import { CARDS } from '../fixtures/client-constants';

describe('JoinRoom page loads and works', () => {

	before(() => {
		cy.visit('http://localhost:3000', {
			onBeforeLoad: () => {
				window.sessionStorage.clear();
			}
		});
	});

	it('Loads the page controls correctly', () => {
    	// Assert the correct controls are loaded for a standard home page landing
    	cy.get('input[type="text"].room-name');
    	cy.get('input[type="text"].participant-name');
    	cy.contains('.btn', 'Join Room');
    	cy.contains('.btn', 'Create Room');

    	// Assert all the cardTypeOptions are coming from the constants file
    	const cardTypeOptions = keys(CARDS);
		cy.get('select').children().should('have.length', cardTypeOptions.length);
    	forEach(cardTypeOptions, (cardTypeOption) => {
			cy.get('option').contains(cardTypeOption);
		});
	});

	it('Fails correctly when trying to join an non-existant room', () => {
		cy.fixture('test-data').then(data => {
			cy.get('input[type="text"].room-name').type(data.roomName+"-"+Date.now());
    		cy.get('input[type="text"].participant-name').type(data.participantName);
		});
    	cy.get('div.btn.join-room').click();

    	cy.on('window:alert', (str) => {
    		expect(str).to.equal('No room exists with that name');
    	});
	});

	it('Creates and joins a room successfully', () => {
    	cy.get('div.btn.create-room').click().then(() => {
    		assert(cy.url().should('equal', 'http://localhost:3000/#/PokerRoom'));
    	});
	})
});

describe('PokerRoom page loads and works', () => {

	it('Loads the page controls correctly', () => {
		cy.get('input[type="text"].item-name:focus');

		cy.contains('.btn', 'Leave Room');
		cy.contains('.btn', 'Create Item');
	});

	it('Loads the correct poker cards', () => {
		const selectedCardType = keys(CARDS)[0];
		const cardValues = CARDS[selectedCardType];
		forEach(cardValues, cardValue => {
			cy.get('div.poker-card').should('have.class', 'disabled').contains(cardValue);
		})
	});

	it('Displays the participant with the correct name and icons', () => {

		cy.get('.participant-card').first().within(() => {
			cy.get('.participant-card__participant-icons').within(() => {
				cy.get('span.glyph.tower');
				cy.get('span.glyph.chevron-right');
			});

			cy.fixture('test-data').then(data => {
				cy.get('.participant-card__name').contains(data.participantName);
			});
		});
	});

	it('Creates an item and sets a score successfully (x3)', () => {
		cy.fixture('test-data').then(data => {
			const selectedCardType = keys(CARDS)[0];
			const cardValues = CARDS[selectedCardType];

			for (let i=0;i<3;i++) {
				cy.get('input[type="text"].item-name').type(data.itemName+i);
				cy.get('div.btn.create-item').click().then(() => {
					cy.get('div.participant-panel__header').contains(data.itemName+i);
					forEach(cardValues, cardValue => {
						cy.get('div.poker-card').contains(cardValue).should('not.have.class', 'disabled');
					})
				});

				cy.get('div.poker-card').contains(cardValues[i]).click().then(() => {
					cy.get('div.participant-card__item-score').contains(cardValues[i]);
					forEach(cardValues, cardValue => {
						cy.get('div.poker-card').contains(cardValue).should('have.class', 'disabled');
					})
				});
			}
		});
	});
});

describe('Clean up', () => {
	it('Leaves the room successfully', () => {
		cy.get('div.btn.leave-room').click().then(() => {
			assert(cy.url().should('equal', 'http://localhost:3000/#/JoinRoom'));
			assert.equal(window.sessionStorage.getItem("participantId"), null);
			assert.equal(window.sessionStorage.getItem("roomId"), null);
		});
	});
});
