import { Participation } from "./Participation";

export class Olympic {
    private id: number;
    private country: string;
    private participations : Participation[];

    constructor(id: number, country: string, participations : Participation[]) {
        this.id = id;
        this.country = country;
        this.participations = participations;
    }

    addParticipation (participation: Participation): void {
        this.participations.push(participation);
    }
    
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public getParticipations(): Participation[] {
        return this.participations;
    }

    public setParticipations(participations: Participation[]): void {
        this.participations = participations;
    }
}

