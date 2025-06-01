import { For } from "solid-js"

export default function Details({details, setDetails}){

    function toTitleCase(val){
        let newVal = val.replace(/([a-z])([A-Z])/g, '$1 $2')
        newVal = newVal.charAt(0).toUpperCase() + newVal.slice(1)
        return newVal
    }

    function formatItem(key, val){
        if (key == "gender"){
            if (val == "L") return "Laki-laki"
            else if (val == "P") return "Perempuan"
        }

        if (key == "gaji" || key == "insentif" || key == "tunjangan" || key == "totalGaji"){
            const formatter = new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"})
            return formatter.format(val)
        } else return val
    }

    return <Show when={Object.keys(details()).length}>
        <div class="w-full h-full bg-white absolute top-0 left-0 p-2 md:left-auto">
            <button onClick={() => setDetails({})} class="my-4 border border-black/50 p-2 rounded-md shadow-lg active:border-black active:bg-black/10">Kembali</button>
            <div class="max-w-md border shadow-lg">
                <For each={Object.keys(details())}>
                    {(item, index) => <>
                        <p class="even:bg-gray-200 p-2"><strong>{toTitleCase(item)}:</strong> {formatItem(item, details()[item])}</p>
                    </>}
                </For>
            </div>
        </div>
    </Show>
}
