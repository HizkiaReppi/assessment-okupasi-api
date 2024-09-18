export type AddKonsentrasiSekolahReq = {
  id: string
}

export type AddKonsentrasiSekolahInput = {
  id_sekolah: string
  id_konsentrasi: string
}

export type EditKonsentrasiSekolahReq = {
  id: string,
  konsentrasi: AddKonsentrasiSekolahReq[]
}

export function mapAddKonsentrasiSekolahReq(
    idSekolah: string, req: AddKonsentrasiSekolahReq[],
): AddKonsentrasiSekolahInput[] {
  return req.map((v) => {
    return {
      id_sekolah: idSekolah,
      id_konsentrasi: v.id,
    };
  });
}
