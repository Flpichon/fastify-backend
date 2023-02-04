import { Card, ICardPayload } from "../../domain/entities/card";
import { ICardRepository } from "../../domain/repositories/card.repository";
import { Db, ObjectId } from 'mongodb';
import { TMaybe } from "../../domain/entities/entity";

export interface ICardUpdatePayload extends Partial<ICardPayload> {};

export class MgCardRepository implements ICardRepository {
    constructor(
        private readonly mongodb: Db
    ) {}
    async find(): Promise<Card[]> {
        const mgCards = await this.mongodb.collection('card').find({}).toArray();
        return mgCards.map(mgCard => {
            return new Card({
                id: mgCard._id.toString(),
                title: mgCard.title,
                descriptions: mgCard.descriptions,
                subtitle: mgCard.subtitle,
                icon: mgCard.icon,
                imageSrc: mgCard.imageSrc
            });
        });
    }

    async findOne(id: string): Promise<TMaybe<Card>> {
        const mgCard = await this.mongodb.collection('card').findOne({_id: new ObjectId(id)});
        if (mgCard) {
            return new Card({
                id: mgCard._id.toString(),
                title: mgCard.title,
                descriptions: mgCard.descriptions,
                subtitle: mgCard.subtitle,
                icon: mgCard.icon,
                imageSrc: mgCard.imageSrc
            });
        }
    }

    async create(payload: ICardUpdatePayload): Promise<string> {
        const inserted = await this.mongodb.collection('card').insertOne(payload);
        return inserted.insertedId.toJSON();
    }

    async updateOne(id: string, payload: ICardUpdatePayload): Promise<void> {
        await this.mongodb.collection('card').updateOne({_id: new ObjectId(id)}, {$set: payload});
    }

    async deleteOne(id: string): Promise<void> {
        await this.mongodb.collection('card').deleteOne({_id: new ObjectId(id)});
    }

}