import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Factory } from "nestjs-seeder";

@Entity({name: 'cities'})
export class City {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Factory(faker => faker.address.city())
    @Column({ nullable: false })
    name: string;

    @Factory(faker => faker.address.state())
    @Column({ nullable: true})
    state: string;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;
}
