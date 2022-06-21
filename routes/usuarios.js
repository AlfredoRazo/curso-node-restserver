const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const {
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRol
} = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    //check('rol','No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);
router.delete('/:id', [
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;