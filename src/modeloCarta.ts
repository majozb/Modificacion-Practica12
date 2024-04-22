import { Document, connect, model, Schema } from 'mongoose';

connect('mongodb://127.0.0.1:27017/cards-app').then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});

interface CardDocumentInterface extends Document {
  ID: number,
  Name: string,
  Coste_mana: number,
  Color: 'balnco' | 'azul' | 'negro' | 'rojo' | 'verde' | 'incoloro' | 'multicolor',
  Linea_tipo: 'tierra' | 'criatura' | 'encantamiento' | 'conjuro' | 'instantaneo' | 'artefacto' | 'planeswalker',
  Rareza: 'comun' | 'infrecuente' | 'rara' | 'mitica',
  Reglas: string,
  Fuerza: number,
  Resistencia: number,
  Lealtad: number,
  Coste: number
}

const CardSchema = new Schema<CardDocumentInterface>({
  ID: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Coste_mana: {
    type: Number,
    required: true,
 	},
  Color: {
		type: String,
    required: true,
	},
  Linea_tipo: {
		type: String,
    required: true,
	},
  Rareza: {
		type: String,
    required: true,
	},
  Reglas: {
		type: String,
    required: true,
	},
  Fuerza: {
		type: Number,
	},
  Resistencia: {
		type: Number,
	},
  Lealtad: {
		type: Number,
	},
  Coste: {
    type: Number,
    required: true,
  },
});

export const Card = model<CardDocumentInterface>('Card', CardSchema);


// card.save().then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.log(error);
// });