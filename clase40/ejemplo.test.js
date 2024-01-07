/* */

//npm i -D mocha

/*
"scripts": {
    "test": direccion del archivo ejemplo.test.js // "mocha ./test/Users.test.js"
}
*/

/* 
en el archivo de test, lo primero sera importar los recursos necesarios
ejemplo: el modulo dao a testear, mongoose, assert, etc.

luego, crear la conexion a mongo y escribir los test.

glosario:

describe: es una funcion que engloba un conjunto de test sobre un modulo especifibo.

it: es una funcion sobre un test especifico a un modulo, como probar una consulta, la respuesta, tipo de dato, etc.

before: funcion que se utiliza para ejecutar un codigo una vez antes de comenzar el conjunto de pruebas.
sirve por ejemplo, para instanciar un dato o una clase que se require en las pruebas unitarias.

beforeEach: funcion que se utiliza para ejecutar un codigo en cada una de las pruebas unitarias.
sirve para un valor que cambie en cada prueba o para una configuracion que se necesite en cada prueba.
*/

/* 

En Node.js, el módulo assert proporciona un conjunto de funciones que son comúnmente utilizadas para realizar aserciones en 
pruebas y para validar condiciones en tu código. Aquí hay algunos de los métodos clave proporcionados por el módulo assert y 
una breve descripción de su propósito:

assert.ok(value, [message]) (o assert(value, [message])):
Verifica si value es verdadero (truthy). Si value es falso (falsy), se lanza un error. Puede usarse en lugar de assert.equal(value, true, [message]).
assert.ok(true, 'Esto es verdadero');

assert.equal(actual, expected, [message]):
Verifica si actual es igual a expected. Si no son iguales, se lanza un error.
assert.equal(3, '3', 'Los valores son iguales en valor, pero no en tipo');

assert.strictEqual(actual, expected, [message]):
Verifica si actual es estrictamente igual (===) a expected. Si no son estrictamente iguales, se lanza un error.
assert.strictEqual(3, 3, 'Los valores no son estrictamente iguales');

assert.deepEqual(actual, expected, [message]):
Verifica si actual y expected son estructuralmente iguales mediante la recursión de sus propiedades. No verifica estrictamente la igualdad de tipos. Si no son iguales, se lanza un error.
assert.deepEqual({ a: 1 }, { a: '1' }, 'Los objetos no son estructuralmente iguales');

assert.notEqual(actual, expected, [message]):
Verifica si actual no es igual a expected. Si son iguales, se lanza un error.
assert.notEqual(1, 1, 'Los valores son iguales');

assert.notStrictEqual(actual, expected, [message]):
Verifica si actual no es estrictamente igual a expected. Si son estrictamente iguales, se lanza un error.
assert.notStrictEqual(1, '1', 'Los valores son estrictamente iguales');

assert.throws(block, [error], [message]):
Verifica si block (una función) lanza una excepción. Puedes opcionalmente especificar el tipo de error esperado y un mensaje personalizado.
assert.throws(() => {
    throw new Error('Este es un error personalizado');
}, /personalizado/, 'La excepción no coincide con el patrón esperado');

assert.doesNotThrow(block, [message]):
Verifica si block (una función) no lanza una excepción. Si se lanza una excepción, se lanza un error.
assert.doesNotThrow(() => {
    // Código que no debería lanzar una excepción
}, 'El bloque lanzó una excepción');

*/

/* 
import mongoose ...
import User ...
import asser ...
*/

/* 
mongoose.connect(URL MONGO)
const assert = assert.strict
*/

/* 
describe('Testing Users DAO get method', () => {
    before(function() {
        this.userDao = new User()
    })

    it('El DAO debe agregar a un usuario a la BD', async function () {
        let testUser = {
            first_name: "F_Name",
            last_nameL "L_Name",
            email: "email@sample.com",
            password: "ASDFG"
        };

        const result = await this.userDao.save(testUser);
        assert.ok(result._id, 'Usuario creado con exito')
    };

    it('El DAO debe optener un usuario por email y debe ser un objeto', async function () {
        let testUser = {
            first_name: "F_Name",
            last_nameL "L_Name",
            email: "email@sample.com",
            password: "ASDFG"
        };

        const result = await this.userDao.save(testUser);
        const user = await this.userDao.getBy({email: result.email});
        assert.strictEqual(typeok user, 'object')
    };

    )
})
*/