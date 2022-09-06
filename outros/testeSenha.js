const bcrypt = require('bcrypt');
let hash = bcrypt.hashSync('Andre', 10);
senha = "$2b$10$cUO4euHoPdTFlJ90oDUxBO7QbPJRHzBBYK4ZKK1T.3HrklP35ulbK"
console.log(hash);
console.log(senha);
if (bcrypt.compareSync('Ande', senha)) {
    console.log(true);
   } else {
    console.log(false);
   }

