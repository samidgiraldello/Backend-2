 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterUserValidator  from 'App/Validators/RegisterUserValidator'
import { request } from 'http'
import Response from '@ioc:Adonis/Core/Response'


export default class AuthController {
       public async register ({ request }: HttpContexContract ) {
           const data = await request.validate(RegisterUserValidator)
           const user = await User.create(data)
           return user
        }  
        public async login({ request, auth, respnde}: HttpContexContract)  {
          try {
              const {email, password} = request.all()
              const token = await auth.use('api').attempt(email, password {
                   expiresIn: '1day'
                })
              const user = await User.findBy0rFail("email", email)
              return {token, user}
            } catch (error) {
                  response.status(401).send("Login ou senha incorreta!!")
              
            }
        }   
}
