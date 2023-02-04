import { Card } from "../../domain/entities/card";
import { ICardRepository } from "../../domain/repositories/card.repository";

export class CardUseCases {
    constructor(
        readonly CardRepository: ICardRepository
    ) {}
    
    getCardList(): Promise<Card[]> {
        return this.CardRepository.find();
    }

}