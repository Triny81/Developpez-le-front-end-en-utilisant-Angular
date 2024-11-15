export class Participation {
    private id: number;
    private year: number;
    private city: string;
    private medalsCount: number;
    private athleteCount: number;

    constructor(id: number, year: number, city: string, medalsCount: number, athleteCount: number) {
        this.id = id;
        this.year = year;
        this.city = city;
        this.medalsCount = medalsCount;
        this.athleteCount = athleteCount;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getYear(): number {
        return this.year;
    }

    public setYear(year: number): void {
        this.year = year;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public getMedalsCount(): number {
        return this.medalsCount;
    }

    public setMedalsCount(medalsCount: number): void {
        this.medalsCount = medalsCount;
    }

    public getAthleteCount(): number {
        return this.athleteCount;
    }

    public setAthleteCount(athleteCount: number): void {
        this.athleteCount = athleteCount;
    }
}