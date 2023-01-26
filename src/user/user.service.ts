import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    create(user: UserInterface):Observable<UserInterface> {
        return from(this.userRepository.save(user));
    }

    findAll():Observable<UserInterface[]>{
        return from(this.userRepository.find())
    }

    findOne(id: number): Observable<UserInterface>{
        return from(this.userRepository.findOneBy({id}))
    }

    deleteOne(id:number):Observable<any>{
        return from(this.userRepository.delete(id));
    }

    updateOne(id: number, user: UserInterface): Observable<any>{
        return from(this.userRepository.update(id, user))
    }
}
