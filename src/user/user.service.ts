import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './models/user.dto';
import { UserEntity } from './models/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    

    findAll():Observable<User[]>{
        return from(this.userRepository.find())
    }

    findOne(id: number): Observable<User>{
        return from(this.userRepository.findOneBy({id}))
    }

    deleteOne(id:number):Observable<any>{
        return from(this.userRepository.delete(id));
    }

    updateOne(id: number, user: User): Observable<any>{
        return from(this.userRepository.update(id, user))
    }
}
