import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { from, map, mergeMap, Observable, switchMap, tap } from 'rxjs';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/models/user.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/models/user.dto';

@Injectable()
export class AuthService {
    constructor(private configService: ConfigService, private jwtService: JwtService,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    create(user: User): Observable<User> {
        return this.hashPassword(user.password).pipe(
            switchMap((hashPassword: string): Observable<User> => {
                user.password = hashPassword;
                return from(this.userRepository.save(user)).pipe(
                    map(data => {
                        const { password, ...user } = data;
                        return user;
                    })
                )
            })
        )

    }

    login(user: User): Observable<string> {

        return this.isUserExists(user).pipe(
            switchMap(isValidUser=>{
                if(isValidUser){
                    return this.generateToken(user)
                }
            })
        )
    }

    isUserExists(user: User): Observable<boolean> {
        return from(this.userRepository.findOneByOrFail({ email: user.email })).pipe(
            tap(user => console.log(user)),
            switchMap(validatedUser => {
                if (validatedUser) {
                    return this.comparePassword(user.password, validatedUser.password).pipe(
                        map(isValid => isValid)
                    )
                }
            })
        )
    }

    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password, Number(this.configService.get('BCRYPT_SALT'))))
    }

    comparePassword(password: string, hashedPassword: string): Observable<boolean | any> {
        console.log("Passoword", password, hashedPassword)
        return from<any | boolean>(bcrypt.compare(password, hashedPassword))
    }

    generateToken(user: User): Observable<string> {
        return from(this.jwtService.signAsync({ user }));
    }
}
