import { createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";

import {CEO, Bendahara, KepalaDivisi, Staff} from "../utils/karyawan.js"

export default function Tambah({tambahActive, setTambahActive, addKaryawan}){
    const [karyawan, setKaryawan] = createStore({
        kodeKaryawan: "",
        namaKaryawan: "",
        masaKerja: 0,
        gender: "L",
    })

    const [posisi, setPosisi] = createSignal("ceo")

    function validateKaryawan(){
        for (const key in karyawan) {
            if (!karyawan[key]) return
        }

        let newKaryawan = null

        switch (posisi()) {
            case "ceo":
                newKaryawan = new CEO(karyawan.kodeKaryawan, karyawan.namaKaryawan, karyawan.masaKerja, karyawan.gender)
                break
            case "bendahara":
                newKaryawan = new Bendahara(karyawan.kodeKaryawan, karyawan.namaKaryawan, karyawan.masaKerja, karyawan.gender)
                break
            case "kepdiv":
                newKaryawan = new KepalaDivisi(karyawan.kodeKaryawan, karyawan.namaKaryawan, karyawan.masaKerja, karyawan.gender, karyawan.divisi)
                break
            case "staff":
                newKaryawan = new Staff(karyawan.kodeKaryawan, karyawan.namaKaryawan, karyawan.masaKerja, karyawan.gender, karyawan.divisi)
        }

        addKaryawan(newKaryawan)
        setTambahActive(false)
    }

    return <Show when={tambahActive()}>
        <div class="w-full h-full bg-white absolute top-0 left-0 p-2 md:left-auto max-w-5xl">
            <button onClick={() => setTambahActive(false)} class="my-4 border border-black/50 p-2 rounded-md shadow-lg active:border-black active:bg-black/10">Kembali</button>
            <div class="flex flex-col max-w-md m-auto overflow-auto">
                <label>Kode Karyawan</label>
                <input onInput={(e) => setKaryawan({kodeKaryawan: e.target.value})} type="text" class="border mb-4 p-2 rounded-md shadow-md" />
                <label>Nama Karyawan</label>
                <input onInput={(e) => setKaryawan({namaKaryawan: e.target.value})} type="text" class="border mb-4 p-2 rounded-md shadow-md" />
                <label>Posisi</label>
                <select name="posisi" onInput={(e) => setPosisi(e.target.value)} class="border mb-4 p-2 rounded-md shadow-md">
                    <option value="ceo">CEO</option>
                    <option value="bendahara">Bendahara</option>
                    <option value="kepdiv">Kepala Divisi</option>
                    <option value="staff">Staff</option>
                </select>
                {/* <input type="text" class="border mb-4 p-2 rounded-md shadow-md" /> */}
                <label>Masa Kerja</label>
                <input onInput={(e) => setKaryawan({masaKerja: e.target.value})} type="text" class="border mb-4 p-2 rounded-md shadow-md" />
                <label>Gender</label>
                <select onInput={(e) => setKaryawan({gender: e.target.value})} name="gender" class="border mb-4 p-2 rounded-md shadow-md">
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                </select>
                {/* <input onInput={(e) => setKaryawan({gender: e.target.value})} type="text" class="border mb-4 p-2 rounded-md shadow-md" /> */}
                <Show when={posisi() == "kepdiv" || posisi() == "staff"}>
                    <label>Divisi</label>
                    <input onInput={(e) => setKaryawan({divisi: e.target.value})} type="text" class="border mb-4 p-2 rounded-md shadow-md" />
                </Show>
                <input onClick={() => validateKaryawan()} type="button" value="Tambah" class="border border-black/50 p-2 rounded-md shadow-lg active:border-black active:bg-black/10" />
            </div>
        </div>
    </Show>
}