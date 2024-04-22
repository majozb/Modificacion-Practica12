import "mocha";
import { expect } from "chai";
import request from "request";

describe('Server', () => {
	it('GET: Funcional', (done) => {
		request.get({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
		  expect(response.body).to.deep.equal({
			"ID": 1,
			"Name": "carta1",
			"Coste_mana": 7,
			"Color": "incoloro",
			"Linea_tipo": "tierra",
			"Rareza": "comun",
			"Reglas": "reglas1",
			"Coste": 40,
			"_id": "66263a6b5c814f654a1b7f5d",
			"__v": 0
		  });
		  done();
		});
	});
	it('POST: debería añadir una carta a carlos', (done) => {
		const card = {
			"ID": 1,
			"Name": "carta1",
			"Coste_mana": 7,
			"Color": "incoloro",
			"Linea_tipo": "tierra",
			"Rareza": "comun",
			"Reglas": "reglas1",
			"Coste": 40
		}
		request.post({ url: 'http://localhost:3000/cards', json: card }, (error: Error, response) => {
			expect(response.body).to.deep.equal({
				"ID": 1,
				"Name": "carta1",
				"Coste_mana": 7,
				"Color": "incoloro",
				"Linea_tipo": "tierra",
				"Rareza": "comun",
				"Reglas": "reglas1",
				"Coste": 40,
				// "_id": "662638035c814f654a1b7f10",
				"__v": 0
			  });
		  done();
		});
	});
	it('GET: debería obtener una carta de un usuario', (done) => {
		request.get({ url: 'http://localhost:3000/cards?id=1', json: true }, (error: Error, response) => {
			expect(response.body.status).to.equal(404);
		  done();
		});
	});
	it('PATCH: debería actualizar una carta de un usuario', (done) => {
		const card = {
			"ID": 1,
			"Name": "carta1",
			"Coste_mana": 7,
			"Color": "incoloro",
			"Linea_tipo": "tierra",
			"Rareza": "comun",
			"Reglas": "reglas1",
			"Coste": 40
		}
		request.patch({ url: 'http://localhost:3000/cards?id=1', json: card }, (error: Error, response) => {
			expect(response.body.card).to.deep.equal(card);
		  done();
		});
	});
	it('DELETE: debería eliminar una carta de un usuario', (done) => {
		request.delete({ url: 'http://localhost:3000/cards?id=1', json: true }, (error: Error, response) => {
		expect(response.body).to.equal(200);
		  done();
		});
	});
	it('GET: debería obtener todas las cartas de un usuario', (done) => {
		request.get({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
		  expect(response.body).to.equal(200);
		  done();
		});
	});
	it('DELETE: Eliminar carta no existente', (done) => {
		request.delete({ url: 'http://localhost:3000/cards?id=80', json: true }, (error: Error, response) => {
		console.log('RESPONDE DELETE: ', response.body);	
		expect(response.body).to.equal(404);
		done();
		});
	});
	it('PATCH: Actualizar carta no existente', (done) => {
		const card = {
			"ID": 1,
			"Name": "carta1",
			"Coste_mana": 7,
			"Color": "incoloro",
			"Linea_tipo": "tierra",
			"Rareza": "comun",
			"Reglas": "reglas1",
			"Coste": 40
		}
		request.patch({ url: 'http://localhost:3000/cards?&id=1', json: card }, (error: Error, response) => {
			expect(response.body.error).to.equal('Update is not permitted');
		  done();
		});
	});
	// it('POST: Añadir carta con id 3 a carlos', (done) => {
	// 	const card = {
	// 		"ID": 3,
	// 		"Name": "carta3",
	// 		"Coste_mana": 3,
	// 		"Color": "incoloro",
	// 		"Linea_tipo": "tierra",
	// 		"Rareza": "comun",
	// 		"Reglas": "reglas3",
	// 		"Coste": 40
	// 	}
	// 	request.post({ url: 'http://localhost:3000/cards?user=carlos', json: card }, (error: Error, response) => {
	// 		expect(response.body.message).to.equal('New collection created with card added!');
	// 		expect(response.body.card).to.deep.equal(card);
	// 	  done();
	// 	});
	// });
	// it('POST: Añadir carta con id 2 a carlos', (done) => {
	// 	const card = {
	// 		"ID": 2,
	// 		"Name": "carta2",
	// 		"Coste_mana": 2,
	// 		"Color": "incoloro",
	// 		"Linea_tipo": "tierra",
	// 		"Rareza": "comun",
	// 		"Reglas": "reglas2",
	// 		"Coste": 40
	// 	}
	// 	request.post({ url: 'http://localhost:3000/cards?user=carlos', json: card }, (error: Error, response) => {
	// 		expect(response.body.message).to.equal('New collection created with card added!');
	// 		expect(response.body.card).to.deep.equal(card);
	// 	  done();
	// 	});
	// });
	// it('GET: Obtener carta con id 2 de carlos', (done) => {
	// 	request.get({ url: 'http://localhost:3000/cards?user=carlos&id=2', json: true }, (error: Error, response) => {
	// 		expect(response.body).to.equal('Card found in collection!\nID: 2\nName: carta2\nCoste_mana: 2\nColor: incoloro\nLinea_tipo: tierra\nRareza: comun\nReglas: reglas2\nCoste: 40\n');
	// 	  done();
	// 	});
	// });
	// it('GET: Obtener carta con id 3 de carlos', (done) => {
	// 	request.get({ url: 'http://localhost:3000/cards?user=carlos&id=3', json: true }, (error: Error, response) => {
	// 		expect(response.body).to.equal('Card found in collection!\nID: 3\nName: carta3\nCoste_mana: 3\nColor: incoloro\nLinea_tipo: tierra\nRareza: comun\nReglas: reglas3\nCoste: 40\n');
	// 	  done();
	// 	});
	// });
	// it('GET: Obtener todas las cartas de carlos', (done) => {
	// 	request.get({ url: 'http://localhost:3000/cards?user=carlos', json: true }, (error: Error, response) => {
	// 		expect(response.body).to.deep.equal('User collection found!\n-------------------\nID: 2\nName: carta2\nCoste_mana: 2\nColor: incoloro\nLinea_tipo: tierra\nRareza: comun\nReglas: reglas2\nCoste: 40\n-------------------\nID: 3\nName: carta3\nCoste_mana: 3\nColor: incoloro\nLinea_tipo: tierra\nRareza: comun\nReglas: reglas3\nCoste: 40\n-------------------\n');
	// 		done();
	// 	});
	// }); 
	// it('PATCH: Actualizar carta con id 2 de carlos', (done) => {
	// 	const card = {
	// 		"ID": 2,
	// 		"Name": "carta2",
	// 		"Coste_mana": 2,
	// 		"Color": "incoloro",
	// 		"Linea_tipo": "tierra",
	// 		"Rareza": "comun",
	// 		"Reglas": "reglas2",
	// 		"Coste": 50
	// 	}
	// 	request.patch({ url: 'http://localhost:3000/cards?user=carlos&id=2', json: card }, (error: Error, response) => {
	// 		expect(response.body.message).to.equal('Card updated at carlos collection!');
	// 		expect(response.body.card).to.deep.equal(card);
	// 	  done();
	// 	});
	// });
	// it('DELETE: Eliminar carta con id 3 de carlos', (done) => {
	// 	request.delete({ url: 'http://localhost:3000/cards?user=carlos&id=3', json: true }, (error: Error, response) => {
	// 		expect(response.body.message).to.equal('Card removed from carlos collection!');
	// 	  done();
	// 	});
	// });
	// it('DELETE: Eliminar carta con id 3 de carlos', (done) => {
	// 	request.delete({ url: 'http://localhost:3000/cards?user=carlos&id=3', json: true }, (error: Error, response) => {
	// 		expect(response.body.message).to.equal('Card not found at carlos collection!');
	// 	  done();
	// 	});
	// });
	// it('DELETE: Eliminar carta con id 2 de carlos', (done) => {
	// 	request.delete({ url: 'http://localhost:3000/cards?user=carlos&id=2', json: true }, (error: Error, response) => {
	// 		expect(response.body.message).to.equal('Card removed from carlos collection!');
	// 	  done();
	// 	});
	// });
});