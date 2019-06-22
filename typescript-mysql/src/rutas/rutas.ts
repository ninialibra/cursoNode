import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response)=>{

    const query = `
        SELECT *
        FROM heroes
    `;

    MySQL.ejecutarQuery(query, (error:any, heroes:Object[])=>{

        if(error){
            res.status(400).json({
                ok: false,
                error
            });
        }else{

            res.json({
                ok: true,
                heroes
            });
        }
    });

});

router.get('/heroes/:id', (req: Request, res: Response)=>{

    const id = req.params.id;
    const escapeID = MySQL.instance.conexion.escape(id);

    const query = `
        SELECT *
        FROM heroes
        WHERE id = ${escapeID}
    `;

    MySQL.ejecutarQuery(query, (error:any, heroe:Object[])=>{

        if(error){
            res.status(400).json({
                ok: false,
                error
            });
        }else{

            res.json({
                ok: true,
                heroe
            });
        }
    });

});

export default router;