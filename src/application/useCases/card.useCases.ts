import { Card } from "../../domain/entities/card";
import { ICardRepository } from "../../domain/repositories/card.repository";
import { ICardUpdatePayload } from "../../infrastructure/repositories/mgCard.repository";

export class CardUseCases {
    constructor(
        readonly CardRepository: ICardRepository
    ) {}
    
    getCardList(): Promise<Card[]> {
        return this.CardRepository.find();
    }

    async createCard(payload: ICardUpdatePayload): Promise<string> {
        const cardId = await this.CardRepository.create(payload);
        return cardId;
    }

    async updateCard(id: string, payload: ICardUpdatePayload): Promise<void> {
        await this.CardRepository.updateOne(id, payload);
    }

    async removeCard(id: string): Promise<void> {
        await this.CardRepository.deleteOne(id);
    }

}