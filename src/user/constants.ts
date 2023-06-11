import { CommPlaceType } from "src/comm_place/entities/comm_place.entity";

interface Types {
    [x: string]: number;
}

export const minTypes: Types = {
    'community kitchen': 4.5 * 60 * 60 * 1000,
    'company store': 7 * 24 * 60 * 60 * 1000,
};