import { CountryData, CountryInfo } from "../types";

export default function toCountry(
    data: CountryData,
    id: number
): CountryInfo | void {
    if (
        data?.name?.common &&
        data?.flags?.svg &&
        data?.population &&
        data?.area
    ) {
        return {
            id: id + 1,
            area: data.area,
            name: data.name.common,
            flagUrl: data.flags.svg,
            population: data.population,
        };
    }
}
