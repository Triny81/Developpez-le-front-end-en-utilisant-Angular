import { Participation } from "./Participation";

export class Olympic {
    private id: number;
    private name: string;
    private participations : Participation[];

    constructor(id: number, name: string, participations : Participation[]) {
        this.id = id;
        this.name = name;
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

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getParticipations(): Participation[] {
        return this.participations;
    }

    public setParticipations(participations: Participation[]): void {
        this.participations = participations;
    }
}

