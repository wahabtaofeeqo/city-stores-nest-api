import { City } from "src/modules/city/entities/city.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name: 'stores'})
export class Store {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    location: string;

    @ManyToOne(() => User)
    @JoinColumn({name: "user_id", referencedColumnName: "id"})
    user: User;

    @ManyToOne(() => City)
    @JoinColumn({name: "city_id", referencedColumnName: "id"})
    city: City

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;
}
