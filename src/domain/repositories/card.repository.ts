import { ICardUpdatePayload } from "../../infrastructure/repositories/mgCard.repository";
import { Card } from "../entities/card";
import { TMaybe } from "../entities/entity";



export interface ICardRepository {
    create(payload: ICardUpdatePayload): Promise<string>;
    find(): Promise<Card[]>;
    findOne(id: string): Promise<TMaybe<Card>>;
    updateOne(id: string, payload: ICardUpdatePayload): Promise<void>;
    deleteOne(id: string): Promise<void>;
}