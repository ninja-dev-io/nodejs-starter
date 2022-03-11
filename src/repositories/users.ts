import {Entity, PrimaryGeneratedColumn, Column, EntityRepository, Repository} from 'typeorm';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({unique: true})
    name: string;

}

@EntityRepository(User)
export class UserRepository extends Repository<User> {}