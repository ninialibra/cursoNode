// ====================
// PUERTO
// ====================
process.env.PORT = process.env.PORT || 3000;

// ====================
// ENTORNO
// ====================
process.env.NODE_ENV = process.env.NODE_ENV || 'des';

// ====================
// BD
// ====================
let urlBD;

if (process.env.NODE_ENV === 'des') {
  urlBD = 'mongodb://localhost:27017/cafe';
} else {
  urlBD = 'mongodb+srv://ninialibra:KLrHldh98m@cluster0-v8foc.mongodb.net/cafe';
}

process.env.URLBD = urlBD;
