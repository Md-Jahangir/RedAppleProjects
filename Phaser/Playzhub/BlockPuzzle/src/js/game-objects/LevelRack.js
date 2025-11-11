/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 09-12-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 09-12-2024
 * @Description :- Level Racks.
 ************************************/


export default class LevelRack {
  constructor(scene, num, currLvl) {
    this.scene = scene;

    this.lvlRackContainer = null;
    this.GetLevelNum(num, currLvl);
    this.CreateLevelRacks();
  }

  GetLevelNum(num, currLvl) {
    if (currLvl === null || currLvl <= 6) this.num = parseInt(num) + 1;
    else this.num = currLvl - 5 + num;
  }

  CreateLevelRacks() {
    this.lvlRackContainer = this.scene.add.container();

    this.lvlRack = this.scene.add.image(0, 0, 'game_obj', 'cake_rack').setOrigin(0.5).setName(this.num);

    //Add glow
    this.rackGlow = this.scene.add.image(this.lvlRack.x + 15, this.lvlRack.y - 12, 'game_obj', 'glow_menurack').setOrigin(0.5).setVisible(false).setAlpha(0);

    //Add lock
    this.lock = this.scene.add.image(this.lvlRack.x + 12.5, this.lvlRack.y - 20, 'game_obj', 'lock').setOrigin(0.5);//.setVisible(false);

    //Add number
    const fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '45px', fill: '#fedb37', align: 'center' };
    const text = this.num;
    this.lvlNum = this.scene.add.text(this.lock.x, this.lock.y, text, fontTextStyle).setOrigin(0.5).setVisible(false);
    this.lvlNum.setStroke('#d85600', 6);
    this.lvlNum.setShadow(0, 6, '#57167f', 2, true, false);
    this.check = this.scene.add.image(this.lvlNum.x, this.lvlNum.y - 55, 'game_obj', 'check').setOrigin(0.5).setVisible(false);

    this.lvlRackContainer.add([this.lvlRack, this.rackGlow, this.lock, this.lvlNum, this.check]);
  }
}