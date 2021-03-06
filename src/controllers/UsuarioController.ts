import { Request, Response } from  'express';
import db from '../database/connection';

export default class UsuarioController {
    async create(request: Request, response: Response) {
        const {
            nome,
            email,
            password,
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            await trx ('usuario').insert({
                nome,
                email,
                password,
                usuario_desativado: false,    
            });
    
            await trx.commit();
    
            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Erro ao cadastrar um usuário'
            });
        }
    }

    async put(request: Request, response: Response) {
        const {
            id,
            nome,
            email,
            password,
        } = request.body;

        const trx = await db.transaction();
        try {
            await trx ('usuario')
                .where('id', '=', Number(id)) 
                .update({
                    nome,
                    email,
                    password,
                });
    
            await trx.commit();
    
            return response.status(200).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Erro ao editar o usuário'
            });
        }
    }

    async delite(request: Request, response: Response) {
        const {
            id,
        } = request.body;

        const trx = await db.transaction();
        try {
            await trx ('usuario')
                .where('id', '=', Number(id)) 
                .update({
                    usuario_desativado: true
                });
    
            await trx.commit();
    
            return response.status(200).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Erro ao deletar o usuário'
            });
        }
    }
}
