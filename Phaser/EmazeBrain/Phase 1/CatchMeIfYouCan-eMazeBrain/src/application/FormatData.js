import Facade from "@/Facade";
import Utils from "@base/utils/Utils";
import Config from "@/config/Config";

export default new class FormatData {

  formatToCoins(value) {
    return `${Facade.model.currentcyCode} ${Number(value).toFixed(Config.TO_FIXED_VALUES)}`.toUpperCase()
  }

  formatToFixed(value) {
    return `${Number(value).toFixed(Config.TO_FIXED_VALUES)}`
  }
}