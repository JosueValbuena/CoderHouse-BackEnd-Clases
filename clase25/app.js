const express = require('express');
const { program } = require('commander');
const dotenv = require('dotenv');

program
    .requiredOption('--mode <mode>', 'especificar el modo de ejecucion (development o production)')
    .parse(process.argv);

if (!program._optionValues.mode) {
    console.error('Debe especificar el entorno');
    process.exit(1);
};

dotenv.config({ path: `.env.${program.mode}` });

const app = express();
const port = program._optionValues.mode === 'development' ? 8080 : 3000;

app.get('/', (req, res) => {
    res.send('express');
});

app.listen(port, () => {
    console.log('Server started on port ' + port)
});