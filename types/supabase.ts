export type Series = {
    id: number;
    inserted_at: string; // or Date if you prefer
    name?: string; // Optional field
};

export interface SeriesModified extends Series {
    selected: boolean
}

export type Session = {
    id: number;
    inserted_at: string; // or Date if you prefer
    name?: string; // Optional field
    start?: string; // or Date if you prefer
    finish?: string; // or Date if you prefer
    duration?: string; // or Date if you prefer
    session_type: string; // Adjust based on your enum or type
    series_id: number; // Foreign key to Series
};
