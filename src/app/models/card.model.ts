export interface ICard {
  averageUserRating: number;
  artworkUrl60: string;
  artworkUrl512: string;
  formattedPrice: string;
  trackName: string;
  artistName: string;
  description: string;
  genres: string[];
  version: number;
  fileSizeBytes: number;
  currentVersionReleaseDate: string;
  trackId: number;
}

export class CardModel implements ICard {
  public averageUserRating: number;
  public artworkUrl60: string;
  public artworkUrl512: string;
  public formattedPrice: string;
  public trackName: string;
  public artistName: string;
  public description: string;
  public genres: string[];
  public version: number;
  public fileSizeBytes: number;
  public currentVersionReleaseDate: string;
  public trackId: number;

  constructor(card: any = {}) {
    let desc: string = card.description || '';
    desc = desc.replace(/\n\n/g, '<br/>');
    desc = desc.replace(/\n/g, '<br/>');

    this.averageUserRating = card.averageUserRating || null;
    this.artworkUrl60 = card.artworkUrl60 || null;
    this.artworkUrl512 = card.artworkUrl512 || null;
    this.formattedPrice = card.formattedPrice || null;
    this.trackName = card.trackName || null;
    this.artistName = card.artistName || null;
    this.description = desc || null;
    this.genres = card.genres || [];
    this.version = card.version || null;
    this.fileSizeBytes = card.fileSizeBytes || null;
    this.currentVersionReleaseDate = card.currentVersionReleaseDate || null;
    this.trackId = card.trackId || null;
  }
}
