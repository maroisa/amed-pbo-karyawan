class Karyawan {
    static gaji = 0;
    static posisi = "";

    constructor(kodeKaryawan, namaKaryawan, masaKerja, gender) {
        this.kodeKaryawan = kodeKaryawan;
        this.namaKaryawan = namaKaryawan;
        this.masaKerja = masaKerja;
        this.gender = gender;
    }

    getData() {
        return {
            kodeKaryawan: this.kodeKaryawan,
            namaKaryawan: this.namaKaryawan,
            masaKerja: this.masaKerja,
            gender: this.gender,
            posisi: this.posisi
        };
    }

    setGaji(gaji) {
        this.gaji = gaji;
    }

    setPosisi(posisi) {
        this.posisi = posisi;
    }

    hitungInsentif() {
        if (this.posisi == "CEO") return 0;
        if (this.masa_kerja >= 10) return this.gaji * 0.4;
        return this.gaji * 0.2;
    }

    hitungTunjangan() {
        if (this.gender == "L") return this.gaji * 0.2;
        return 0;
    }

    hitungGaji() {
        const insentif = this.hitungInsentif();
        const tunjangan = this.hitungTunjangan();

        return {
            gaji: this.gaji,
            insentif,
            tunjangan,
            totalGaji: this.gaji + insentif + tunjangan,
        };
    }
}

class KaryawanDivisi extends Karyawan {
    constructor(kode_karyawan, nama_karyawan, masa_kerja, gender, divisi) {
        super(kode_karyawan, nama_karyawan, masa_kerja, gender);
        this.divisi = divisi;
    }

    getData() {
        return {
            kodeKaryawan: this.kodeKaryawan,
            namaKaryawan: this.namaKaryawan,
            masaKerja: this.masaKerja,
            gender: this.gender,
            divisi: this.divisi,
            posisi: this.posisi
        };
    }
}

class CEO extends Karyawan {
    gaji = 15000000;
    posisi = "CEO";
}

class Bendahara extends Karyawan {
    gaji = 10000000;
    posisi = "Bendahara";
}

class KepalaDivisi extends KaryawanDivisi {
    gaji = 8000000;
    posisi = "Kepala Divisi";
}

class Staff extends KaryawanDivisi {
    gaji = 6000000;
    posisi = "Staff";
}

function toClass(item) {
    let newKaryawan = null;

    if (item.posisi.toLowerCase() == "ceo") {
        newKaryawan = new CEO(
            item.kodeKaryawan,
            item.namaKaryawan,
            item.masaKerja,
            item.gender,
        );
    }

    if (item.posisi.toLowerCase() == "bendahara") {
        newKaryawan = new Bendahara(
            item.kodeKaryawan,
            item.namaKaryawan,
            item.masaKerja,
            item.gender,
        );
    }
    if (item.posisi == "Kepala Divisi" || item.posisi == "kepdiv") {
        newKaryawan = new KepalaDivisi(
            item.kodeKaryawan,
            item.namaKaryawan,
            item.masaKerja,
            item.gender,
            item.divisi,
        );
    }

    if (item.posisi.toLowerCase() == "staff") {
        newKaryawan = new Staff(
            item.kodeKaryawan,
            item.namaKaryawan,
            item.masaKerja,
            item.gender,
            item.divisi,
        );
    }
    return newKaryawan;
}

export { CEO, Bendahara, KepalaDivisi, Staff, toClass };
