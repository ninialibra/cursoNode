const jwt = require('jsonwebtoken');

// =====================
// Verificar token
// =====================
let verificaToken = (req, res, next) => {
    
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (error, decode)=>{

        if (error){
            return res.status(401).json({
                ok: false,
                error: {
                    mensaje: 'Token no válido',
                },
            });
        }

        req.usuario = decode.usuario;
        next();

    });
    
};

// =====================
// Verificar admin role
// =====================
let verificaAdminRole = (req, res, next) => {
    
    let usuario = req.usuario;

    if(usuario.role !== 'ADMIN_ROLE'){

        return res.status(401).json({
            ok: false,
            error: {
                mensaje: 'El usuario no es administrador',
            },
        });
    }

    next();
    
};

module.exports = {
    verificaToken,
    verificaAdminRole 
}