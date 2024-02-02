import foldSvg from '@/assets/filetype/wenjianjia.svg?raw';
import AI from '@/assets/filetype/AI.svg?raw';
import DWG from '@/assets/filetype/DWG.svg?raw';
import EXCEL from '@/assets/filetype/excel.svg?raw';
import HTML from '@/assets/filetype/HTML.svg?raw';
import PDF from '@/assets/filetype/pdf.svg?raw';
import SVG from '@/assets/filetype/SVG.svg?raw';
import PPT from '@/assets/filetype/pptl.svg?raw';
import PSD from '@/assets/filetype/PSD.svg?raw';
import RVT from '@/assets/filetype/RVT.svg?raw';
import VIDEO from '@/assets/filetype/shipin.svg?raw';
import SKP from '@/assets/filetype/SKP.svg?raw';
import PIC from '@/assets/filetype/tupian.svg?raw';
import TXT from '@/assets/filetype/txt.svg?raw';
import UNKNOWN from '@/assets/filetype/weizhiwenjian.svg?raw';
import WORD from '@/assets/filetype/word.svg?raw';
import ZIP from '@/assets/filetype/yasuo.svg?raw';
import AUDIO from '@/assets/filetype/yinpin.svg?raw';

const isAI = (name: string) => ['.ai'].some(v => name.endsWith(v));
const isDWG = (name: string) => ['.dwg'].some(v => name.endsWith(v));
const isPDF = (name: string) => ['.pdf'].some(v => name.endsWith(v));
const isSVG = (name: string) => ['.svg'].some(v => name.endsWith(v));
const isEXCEL = (name: string) => ['.xls', '.xlsx', '.xlsm', '.xlsb', '.xltx', '.xltm', '.csv', '.ods'].some(v => name.endsWith(v));
const isHTML = (name: string) => ['.html', '.htm'].some(v => name.endsWith(v));
const isPPT = (name: string) => ['.ppt', '.pptx', '.pptm', '.ppsx', '.ppsm', '.potx', '.potm'].some(v => name.endsWith(v));
const isPSD = (name: string) => ['.psd'].some(v => name.endsWith(v));
const isRVT = (name: string) => ['.rvt'].some(v => name.endsWith(v));
const isVIDEO = (name: string) => ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.webm'].some(v => name.endsWith(v));
const isSKP = (name: string) => ['.skp'].some(v => name.endsWith(v));
const isPIC = (name: string) => ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.tif', '.raw', '.svg', '.webp'].some(v => name.endsWith(v));
const isTXT = (name: string) => ['.txt'].some(v => name.endsWith(v));
const isWORD = (name: string) => ['.doc', '.docx', '.dot', '.dotx', '.docm', '.dotm'].some(v => name.endsWith(v));
const isZIP = (name: string) => ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz'].some(v => name.endsWith(v));
const isAUDIO = (name: string) => ['.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a', '.wma'].some(v => name.endsWith(v));

export const listTypes = [
  {
    fun: isAI,
    svgraw: AI,
  },
  {
    fun: isDWG,
    svgraw: DWG,
  },
  {
    fun: isPDF,
    svgraw: PDF,
  },
  {
    fun: isEXCEL,
    svgraw: EXCEL,
  },
  {
    fun: isHTML,
    svgraw: HTML,
  },
  {
    fun: isPPT,
    svgraw: PPT,
  },
  {
    fun: isPSD,
    svgraw: PSD,
  },
  {
    fun: isRVT,
    svgraw: RVT,
  },
  {
    fun: isVIDEO,
    svgraw: VIDEO,
  },
  {
    fun: isSKP,
    svgraw: SKP,
  },
  {
    fun: isSVG,
    svgraw: SVG,
  },
  {
    fun: isPIC,
    svgraw: PIC,
  },
  {
    fun: isTXT,
    svgraw: TXT,
  },
  {
    fun: isWORD,
    svgraw: WORD,
  },
  {
    fun: isZIP,
    svgraw: ZIP,
  },
  {
    fun: isAUDIO,
    svgraw: AUDIO,
  }
]

export const renderIcon = (file: any) => {
  let svgRaw = UNKNOWN;
  
  if (file.type === "dir") {
    svgRaw = foldSvg;
  } else {
    const find = listTypes.find(obj => obj.fun(file.name));
    if (find) {
      svgRaw = find.svgraw;
    }
  }
  return <span className="w-5 h-5 flex svg-wrapper" dangerouslySetInnerHTML={{__html: svgRaw}}></span>;
}

export const renderCardIcon = (file: any) => {
  let svgRaw = UNKNOWN;

  const find = listTypes.find(obj => obj.fun(file.name));
  if (find) {
    svgRaw = find.svgraw;
  }
  return <span className="w-[60px] h-[60px] svg-wrapper" dangerouslySetInnerHTML={{__html: svgRaw}}></span>;
}