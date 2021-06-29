import UserRepository from '../repositories/UserRepository'
import { getCustomRepository } from 'typeorm'
import { RequestHandler } from 'express'

export const userExists:RequestHandler = async(req, res, next) =>{
  try{
    let userid
    if(req.params.user_id){
      userid = req.params.user_id
    }else if(req.body.user_id){
      userid = req.body.user_id
    }else if(req.query.user_id){
      userid = req.query.user_id
    }

    const userRepo = getCustomRepository(UserRepository)
    const user = await userRepo.findById(Number(userid))
    if(!user) {
      return res.status(404).json({error: "Couldn't find a user for the given userid"})
    }
    next()
  }catch(e){
    console.error(e)
    return
  }
}
