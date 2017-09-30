import XLSX from 'xlsx'
import {saveAs} from 'file-saver'

export const s2ab = (out) => {
  if (typeof ArrayBuffer !== 'undefined') {
    let buf = new ArrayBuffer(out.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i !== out.length; ++i) view[i] = out.charCodeAt(i) & 0xFF
    return buf
  } else {
    let buf = new Array(out.length)
    for (let i = 0; i !== out.length; ++i) buf[i] = out.charCodeAt(i) & 0xFF
    return buf
  }
}

export const exportXls = (sheets, fileName) => {
  let wb = XLSX.utils.book_new()
  if (sheets) {
    sheets.forEach(sheet => {
      let ws = XLSX.utils.aoa_to_sheet(sheet.data)
      XLSX.utils.book_append_sheet(wb, ws, sheet.name)
    })
    let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'})
    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), fileName)
  }
}
