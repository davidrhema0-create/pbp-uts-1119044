export type Buku = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deskripsi: string;
  tahun: number;
  judul: string;
  kategori: "komik" | "novel" | "majalah";
  status: "available" | "borrowed";
  peminjam: {
    nama: string;
  } | null;
  imageUrl: string;
}

export type BukuListResponse = GenericListResponse<Buku>;

export type GenericListResponse<DataType> = {
  info: {
    count: number;
  },
  records: DataType[]
}

export type PostResponse = Buku;