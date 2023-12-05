//test se reciben dos parametros
// los parametros deben ser numeros

const suma = (a, b) => {

    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('todos los parametros deben ser numeros')
    };

    if (arguments.length < 2) {
        throw new Error('se requieren 2 parametros')
    };

    return a + b
};

console.log(suma(2, 3));

function testSumar() {
    try {
        //Prueba 1: verificar si se agregan dos parametros
        const resultado1 = suma(2, 3);

        if (resultado1 !== 5) {
            console.error('Prueba fallida; Se esperaba 5 pero se optuvo:' + resultado1);
        };

        //Prueba 2: Verificar si lanza un error cuando ubno de los parametros no es un numero

        let errorLanzado = false;

        try {
            suma(2, 3);
        } catch (error) {
            errorLanzado = true;
            if (error.message !== "todos los parametros deben ser numeros") {
                console.error("Prueba 2 fallida: Se esperaba un error con el mensaje: 'todos los parametros deben ser numeros'")
            };
        }

        if (!errorLanzado) {
            console.error("Prueba 2 fallida: No se lanzo un error cuando se esperaba")
        }
    } catch (error) {
        console.error('Error al ejecutar las pruebas');
    };
};

testSumar();
