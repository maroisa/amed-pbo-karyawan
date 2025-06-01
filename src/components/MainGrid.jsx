export default function MainGrid({karyawan, setDetails, hapusKaryawan}){
    function getKaryawanData(item){
        return { 
            ...item.getData(), 
            ...item.hitungGaji() 
        }
    }

    return <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <For each={karyawan()}>
            {(item, index) => <div class="border p-2 rounded-md shadow-lg">
                <div class="flex flex-row justify-between">
                    <p><strong class="text-lg">{item.namaKaryawan}</strong> ({item.kodeKaryawan})</p>
                    <p>{item.posisi}</p>
                </div>
                <button onClick={() => {setDetails(getKaryawanData(item))}} class="my-2 border rounded-md p-1 shadow-lg active:border-black active:bg-black/10">Detail</button>
                <button onClick={() => {hapusKaryawan(index())}} class="my-2 ml-2 rounded-md p-1 shadow-lg border text-red-800 active:text-red-500 active:bg-red-500/10">Hapus</button>
            </div>}
        </For>
    </div>
}