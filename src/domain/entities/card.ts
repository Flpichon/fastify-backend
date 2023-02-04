export interface ICard {
    id: string;
    title: string;
    subtitle: string;
    imageSrc: string;
    descriptions: string;
    icon: string;
}

export interface ICardPayload extends Partial<ICard> {
    id: string;
    title: string;
    descriptions: string;
}

export class Card implements ICard {
    id: string;
    title: string;
    subtitle: string;
    imageSrc: string;
    descriptions: string;
    icon: string;
    constructor(
        data: ICardPayload
    ) {
        this.id = data.id;
        this.title = data.title;
        this.subtitle = data.subtitle ?? '';
        this.imageSrc = data.imageSrc ?? '';
        this.descriptions = data.descriptions;
        this.icon = data.icon ?? '';
    }
    
}