import { createSignal, onMount, createEffect } from "solid-js";

import { CEO, Bendahara, KepalaDivisi, toClass } from "./utils/karyawan.js";

import MainGrid from "./components/MainGrid.jsx";
import Details from "./components/Details.jsx";
import Tambah from "./components/Tambah.jsx";

export default function App() {
    const [karyawan, setKaryawan] = createSignal([]);
    const [details, setDetails] = createSignal({});
    const [tambahActive, setTambahActive] = createSignal(false);

    onMount(() => {
        let storedKaryawan = localStorage.getItem("karyawan");

        if (storedKaryawan == null || storedKaryawan == "[]") {
            let krywn = new CEO("K01", "Budi", 12, "L");
            let krywn2 = new Bendahara("K02", "Anton", 8, "L");
            let krywn3 = new KepalaDivisi(
                "K03",
                "Clara",
                4,
                "P",
                "Pemberdayaan",
            );
            setKaryawan([...karyawan(), krywn]);
            setKaryawan([...karyawan(), krywn2]);
            setKaryawan([...karyawan(), krywn3]);
        } else {
            storedKaryawan = JSON.parse(storedKaryawan);
            storedKaryawan = storedKaryawan.map((val) => {
                return toClass(val);
            });
            setKaryawan(storedKaryawan);
        }
    });

    createEffect(() => {
        const data = karyawan();
        localStorage.setItem("karyawan", JSON.stringify(data));
    });

    function addKaryawan(val) {
        setKaryawan([...karyawan(), val]);
    }

    function hapusKaryawan(index) {
        let newKaryawan = karyawan();
        newKaryawan.splice(index, 1);
        setKaryawan([...newKaryawan]);
    }

    return (
        <div class="w-full max-w-5xl m-auto p-2">
            <div class="my-4 flex flex-row justify-between items-center">
                <h1 class="text-2xl font-bold">Data Karyawan</h1>
                <button
                    onClick={() => setTambahActive(true)}
                    class="border border-black/50 p-2 rounded-md shadow-lg active:border-black active:bg-black/10"
                >
                    Tambah
                </button>
            </div>
            <MainGrid
                karyawan={karyawan}
                setDetails={setDetails}
                hapusKaryawan={hapusKaryawan}
            />
            <Details details={details} setDetails={setDetails} />
            <Tambah
                tambahActive={tambahActive}
                setTambahActive={setTambahActive}
                addKaryawan={addKaryawan}
            />
        </div>
    );
}
